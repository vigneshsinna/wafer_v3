<?php

namespace App\Services\Auth;

use App\Models\BusinessSetting;
use App\Models\Cart;
use App\Models\User;
use App\Notifications\StorefrontResetPassword;
use App\Notifications\AppEmailVerificationNotification;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

/**
 * AuthService — Registration, login, logout, password reset.
 *
 * Extracted from: App\Http\Controllers\Api\V2\AuthController
 */
class AuthService
{
    public function sendStorefrontResetLink(string $email): void
    {
        Password::broker('users')->sendResetLink(['email' => $email], function (User $user, string $token) {
            $user->notify(new StorefrontResetPassword($token));
        });
    }

    public function resetPassword(array $data): bool
    {
        $status = Password::broker('users')->reset($data, function (User $user, string $password) {
            $user->password = Hash::make($password);
            $user->setRememberToken(\Illuminate\Support\Str::random(60));
            $user->save();
            $user->tokens()->delete();
        });

        return $status === Password::PASSWORD_RESET;
    }

    /**
     * Register a new customer.
     *
     * @return array ['user' => User, 'token' => string]
     * @throws \Exception
     */
    public function register(array $data): array
    {
        $user = new User();
        $user->name = $data['name'];

        if (($data['register_by'] ?? 'email') === 'email') {
            $user->email = $data['email_or_phone'];
            $user->phone = $data['phone'] ?? null;
        } else {
            $user->phone = $data['email_or_phone'];
        }

        $user->password = bcrypt($data['password']);
        $user->verification_code = rand(100000, 999999);
        $user->email_verified_at = null;

        // Auto-verify if email verification is disabled
        if ($user->email !== null) {
            $verificationSetting = BusinessSetting::where('type', 'email_verification')->first();
            if ($verificationSetting && $verificationSetting->value != 1) {
                $user->email_verified_at = now();
            }
        }

        $user->save();

        // Send verification
        if ($user->email_verified_at === null && $user->email) {
            try {
                $user->notify(new AppEmailVerificationNotification());
            } catch (\Exception $e) {
                // Notification failure shouldn't block registration
            }
        }

        $token = $user->createToken('API Token')->plainTextToken;

        return [
            'user'  => $user,
            'token' => $token,
        ];
    }

    /**
     * Authenticate user and return token.
     *
     * @return array ['user' => User, 'token' => string]
     * @throws \Exception
     */
    public function login(array $credentials): array
    {
        $loginBy = $credentials['login_by'] ?? 'email';
        $email = $credentials['email'];
        $password = $credentials['password'];
        $userType = $credentials['user_type'] ?? 'customer';

        $user = User::where('user_type', $userType)
            ->where(function ($query) use ($email) {
                $query->where('email', $email)->orWhere('phone', $email);
            })
            ->first();

        if (!$user) {
            throw new \Exception('User not found.');
        }

        if ($user->banned) {
            throw new \Exception('User is banned.');
        }

        if (!Hash::check($password, $user->password)) {
            throw new \Exception('Invalid credentials.');
        }

        if ($user->user_type === 'seller' && $user->shop && $user->shop->registration_approval == 0) {
            throw new \Exception('Your seller account is under review.');
        }

        $token = $user->createToken('API Token')->plainTextToken;

        // Transfer temp cart to user
        if (!empty($credentials['temp_user_id'])) {
            Cart::where('temp_user_id', $credentials['temp_user_id'])
                ->update(['user_id' => $user->id, 'temp_user_id' => null]);
        }

        return [
            'user'  => $user,
            'token' => $token,
        ];
    }

    /**
     * Logout user (revoke current token).
     */
    public function logout(User $user): void
    {
        $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();
    }

    public function changePassword(User $user, string $currentPassword, string $newPassword): void
    {
        if (!Hash::check($currentPassword, $user->password)) {
            throw new \InvalidArgumentException('Current password is incorrect.');
        }

        $user->password = Hash::make($newPassword);
        $user->save();
        $user->tokens()->where('id', '!=', $user->currentAccessToken()->id)->delete();
    }

    /**
     * Format user data for API response.
     */
    public function formatUserData(User $user): array
    {
        return [
            'id'              => $user->id,
            'type'            => $user->user_type,
            'name'            => $user->name,
            'email'           => $user->email,
            'phone'           => $user->phone,
            'avatar_url'      => $user->avatar_original ? uploaded_asset($user->avatar_original) : null,
            'email_verified'  => $user->email_verified_at !== null,
        ];
    }
}
