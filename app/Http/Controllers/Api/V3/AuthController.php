<?php

namespace App\Http\Controllers\Api\V3;

use App\Services\Auth\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function forgotPassword(Request $request): JsonResponse
    {
        $validated = $request->validate(['email' => 'required|email|max:255']);
        try {
            $this->service->sendStorefrontResetLink($validated['email']);
        } catch (\Throwable $e) {
            Log::error('Storefront password reset email failed', ['exception' => get_class($e)]);
        }

        return $this->successResponse(null, ['message' => 'If the account exists, reset instructions will be sent.']);
    }

    public function resetPassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
            'token' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if (!$this->service->resetPassword($validated)) {
            return $this->errorResponse('Invalid or expired reset link.', 422, 'VALIDATION_FAILED');
        }

        return $this->successResponse(null, ['message' => 'Password reset.']);
    }

    private AuthService $service;

    public function __construct(AuthService $service)
    {
        $this->service = $service;
    }

    /**
     * POST /api/v3/auth/register
     */
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name'             => 'required|string|max:255',
            'email_or_phone'   => [
                'required',
                Rule::when($request->register_by === 'email', ['email', 'unique:users,email'], ['numeric', 'unique:users,phone']),
            ],
            'password'         => 'required|min:6|confirmed',
            'register_by'      => 'required|in:email,phone',
            'phone'            => 'nullable|string|max:30|unique:users,phone',
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator);
        }

        try {
            $result = $this->service->register($request->all());

            return $this->successResponse([
                'access_token' => $result['token'],
                'token_type'   => 'Bearer',
                'user'         => $this->service->formatUserData($result['user']),
            ], ['message' => 'Registration successful.'], 201);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 422, 'VALIDATION_FAILED');
        }
    }

    /**
     * POST /api/v3/auth/login
     */
    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required',
            'password' => 'required',
            'login_by' => 'required|in:email,phone',
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator);
        }

        try {
            $result = $this->service->login($request->all());

            return $this->successResponse([
                'access_token' => $result['token'],
                'token_type'   => 'Bearer',
                'user'         => $this->service->formatUserData($result['user']),
            ]);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401, 'UNAUTHORIZED');
        }
    }

    /**
     * DELETE /api/v3/auth/logout
     */
    public function logout(Request $request): JsonResponse
    {
        $this->service->logout($request->user());

        return $this->successResponse(null, ['message' => 'Logged out successfully.']);
    }

    /**
     * GET /api/v3/auth/user
     */
    public function user(Request $request): JsonResponse
    {
        return $this->successResponse(
            $this->service->formatUserData($request->user())
        );
    }
}
