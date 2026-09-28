<?php

namespace App\Services\Support;

use App\Models\Contact;

class ContactService
{
    public function submit(array $data): void
    {
        Contact::insert([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'content' => $data['subject'] . "\n\n" . $data['message'],
        ]);
    }
}
