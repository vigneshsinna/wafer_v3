<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword;

class StorefrontResetPassword extends ResetPassword
{
    protected function resetUrl($notifiable)
    {
        return rtrim(config('headless.storefront_url'), '/') . '/reset-password?' . http_build_query([
            'token' => $this->token,
            'email' => $notifiable->getEmailForPasswordReset(),
        ]);
    }
}
