<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\RefundRequest;

class RefundRequestController extends Controller
{
    public function checkRefundableCategory(Request $request)
    {
        $category = Category::find($request->category_id);
        $refund_type = get_setting('refund_type');
        $is_refundable = false;
        if ($category) {
            if ($refund_type === 'category_based_refund') {
                $is_refundable = $category->refund_request_time > 0;
            } else {
                $is_refundable = true;
            }
        }
        return response()->json([
            'status' => 'success',
            'is_refundable' => (bool)$is_refundable,
        ]);
    }

    public function checkSellerRefundableCategory(Request $request)
    {
        return $this->checkRefundableCategory($request);
    }

    public function categoriesWiseProductRefund(Request $request)
    {
        $category_tabs = ['all-categories'];
        $categories = Category::where('level', 0)->orderBy('order_level', 'desc')->get();
        foreach ($categories as $cat) {
            $category_tabs[] = $cat->getTranslation('name');
        }
        $active_tab = $request->active_tab ?? 'all-categories';
        return view('backend.product.category_wise_refund.set_refund', compact('category_tabs', 'active_tab'));
    }

    public function filter_categories(Request $request)
    {
        $categories = Category::query();
        if ($request->search) {
            $categories->where('name', 'like', '%' . $request->search . '%');
        }
        if ($request->unassigned == 1) {
            $categories->where(function ($q) {
                $q->where('refund_request_time', 0)->orWhereNull('refund_request_time');
            });
        }
        $categories = $categories->paginate(15);
        $html = view('backend.product.category_wise_refund.table', compact('categories'))->render();
        return response()->json(['html' => $html]);
    }

    public function updateRefundSettings(Request $request)
    {
        $category = Category::find($request->id);
        if ($category) {
            $category->refund_request_time = $request->refund_request_time ?? 0;
            $category->save();
            return 1;
        }
        return 0;
    }

    public function updateBulkRefundDaysAssign(Request $request)
    {
        if ($request->id && $request->bulk_refund_days !== null) {
            Category::whereIn('id', $request->id)->update([
                'refund_request_time' => $request->bulk_refund_days
            ]);
            return 1;
        }
        return 0;
    }

    public function admin_index(Request $request)
    {
        $refund_requests = RefundRequest::orderBy('id', 'desc')->paginate(15);
        return back();
    }

    public function admin_dispute_index(Request $request)
    {
        return back();
    }

    public function refund_config(Request $request)
    {
        return back();
    }

    public function reject_refund_request(Request $request)
    {
        return response()->json(['status' => 1]);
    }

    public function refund_pay(Request $request)
    {
        return response()->json(['status' => 1]);
    }

    public function dispute_refund_pay(Request $request)
    {
        return response()->json(['status' => 1]);
    }

    public function refund_time_update(Request $request)
    {
        flash(translate('Refund settings updated successfully'))->success();
        return back();
    }

    public function refund_sticker_update(Request $request)
    {
        flash(translate('Refund settings updated successfully'))->success();
        return back();
    }

    public function refund_offline_pay(Request $request)
    {
        return response()->json(['status' => 1]);
    }

    public function dispute_refund_offline_pay(Request $request)
    {
        return response()->json(['status' => 1]);
    }

    public function filter_refund_request(Request $request)
    {
        return response()->json(['html' => '']);
    }

    public function filter_dispute_refund_request(Request $request)
    {
        return response()->json(['html' => '']);
    }

    public function payment_info_modal(Request $request)
    {
        return response()->json(['html' => '']);
    }

    public function refund_request_view(Request $request)
    {
        return response()->json(['html' => '']);
    }

    public function dispute_refund_time_update(Request $request)
    {
        flash(translate('Dispute refund settings updated successfully'))->success();
        return back();
    }

    // Customer & Seller methods
    public function request_store(Request $request, $id = null)
    {
        return back();
    }

    public function dispute_request_store(Request $request, $id = null)
    {
        return back();
    }

    public function customer_index(Request $request)
    {
        return back();
    }

    public function refund_request_send_page(Request $request, $id = null)
    {
        return back();
    }

    public function dispute_refund_request_send_page(Request $request, $id = null)
    {
        return back();
    }

    public function vendor_index(Request $request)
    {
        return back();
    }

    public function seller_filter(Request $request)
    {
        return response()->json(['html' => '']);
    }

    public function seller_refund_configuration(Request $request)
    {
        return back();
    }

    public function sellerCategoriesWiseProductRefund(Request $request)
    {
        return $this->categoriesWiseProductRefund($request);
    }

    public function request_approval_vendor(Request $request)
    {
        return response()->json(['status' => 1]);
    }

    public function seller_filter_categories(Request $request)
    {
        return $this->filter_categories($request);
    }
}
