@extends('backend.layouts.app')

@section('content')
<div class="aiz-titlebar text-left mt-2 mb-3 pb-2 border-bottom border-gray">
    <h1 class="h3">{{ translate('Wafer King Website Settings') }}</h1>
</div>
<div class="card">
    <div class="card-header"><h5 class="mb-0 h6">{{ translate('Wafer King Storefront') }}</h5></div>
    <div class="card-body">
        <p>{{ translate('The Wafer King storefront uses this Laravel store for products, customer accounts, orders and business settings.') }}</p>
        <p><strong>{{ translate('Store Name') }}:</strong> {{ get_setting('website_name', config('app.name')) }}</p>
        <p><strong>{{ translate('Tagline') }}:</strong> {{ get_setting('site_motto') }}</p>
        <p><strong>{{ translate('Storefront URL') }}:</strong> {{ config('headless.storefront_url') }}</p>
        <a href="{{ config('headless.storefront_url') }}" target="_blank" rel="noopener" class="btn btn-primary">{{ translate('View Wafer King Storefront') }}</a>
        <a href="{{ route('website.select-homepage') }}" class="btn btn-light">{{ translate('Select Homepage') }}</a>
        @can('website_appearance')
            <a href="{{ route('website.appearance') }}" class="btn btn-light">{{ translate('Branding and SEO') }}</a>
        @endcan
        @can('header_setup')
            <a href="{{ route('website.header') }}" class="btn btn-light">{{ translate('Logo and Header') }}</a>
        @endcan
        @can('view_all_website_pages')
            <a href="{{ route('website.pages') }}" class="btn btn-light">{{ translate('Website Pages') }}</a>
        @endcan
        <p class="text-muted mt-3 mb-0">{{ translate('Selecting Wafer King sends the Laravel homepage to this storefront. Storefront layout is managed in the Wafer King frontend. The storefront URL is configured with STOREFRONT_URL.') }}</p>
    </div>
</div>
@endsection
