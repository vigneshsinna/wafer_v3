<?php

namespace App\Http\Controllers\Api\V3;

use App\Services\Support\ContactService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request, ContactService $contacts): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:30',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|min:10|max:5000',
            'website' => 'prohibited',
        ]);

        $contacts->submit($validated);

        return $this->successResponse(null, ['message' => 'Message received.']);
    }
}
