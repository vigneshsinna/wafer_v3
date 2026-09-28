<form class="form-horizontal" action="{{ route('payment_method.update') }}" method="POST">
    @csrf
    <input type="hidden" name="payment_method" value="razorpay">
    <div class="form-group row">
        <input type="hidden" name="types[]" value="RAZOR_KEY">
        <div class="col-md-4">
            <label class="col-from-label">{{ translate('RAZOR KEY') }}</label>
        </div>
        <div class="col-md-8">
            <input type="text" class="form-control" name="RAZOR_KEY"
                value="{{ env('RAZOR_KEY') }}" placeholder="{{ translate('RAZOR KEY') }}"
                required>
        </div>
    </div>
    <div class="form-group row">
        <input type="hidden" name="types[]" value="RAZOR_SECRET">
        <div class="col-md-4">
            <label class="col-from-label">{{ translate('RAZOR SECRET') }}</label>
        </div>
        <div class="col-md-8">
            <input type="password" class="form-control" name="RAZOR_SECRET"
                autocomplete="new-password" placeholder="{{ env('RAZOR_SECRET') ? 'Saved — leave blank to keep' : 'Razorpay secret key' }}">
        </div>
    </div>
    <div class="form-group row">
        <input type="hidden" name="types[]" value="RAZOR_WEBHOOK_SECRET">
        <div class="col-md-4"><label class="col-from-label" for="razor-webhook-secret">Webhook secret</label></div>
        <div class="col-md-8">
            <input id="razor-webhook-secret" type="password" class="form-control" name="RAZOR_WEBHOOK_SECRET"
                autocomplete="new-password" placeholder="{{ env('RAZOR_WEBHOOK_SECRET') ? 'Saved — leave blank to keep' : 'Razorpay webhook secret' }}">
            <small class="form-text text-muted">Set your Razorpay payment.captured webhook URL to {{ url('/api/v3/checkout/razorpay/webhook') }}.</small>
        </div>
    </div>
    <div class="form-group mb-0 text-right">
        <button type="submit" class="btn btn-sm btn-primary">{{ translate('Save') }}</button>
    </div>
</form>
