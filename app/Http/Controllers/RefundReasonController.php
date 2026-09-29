<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\RefundReason;

class RefundReasonController extends Controller
{
    public function index(Request $request)
    {
        return back();
    }

    public function create()
    {
        return back();
    }

    public function store(Request $request)
    {
        return back();
    }

    public function filter(Request $request)
    {
        return response()->json(['html' => '']);
    }

    public function edit($id)
    {
        return back();
    }

    public function update(Request $request, $id)
    {
        return back();
    }

    public function storeAjax(Request $request)
    {
        return response()->json(['status' => 1]);
    }

    public function update_status(Request $request)
    {
        return response()->json(['status' => 1]);
    }

    public function bulk_update(Request $request)
    {
        return response()->json(['status' => 1]);
    }
}
