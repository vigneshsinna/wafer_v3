@php
    $storefront = rtrim(config('headless.storefront_url'), '/');
    $logo = get_setting('header_logo') ? uploaded_asset(get_setting('header_logo')) : static_asset('assets/img/waferking-logo.svg');
@endphp
<header class="wk-header stikcy-header-visibility rounded overflow-hidden shadow-sm">
    <div class="top-background-color-visibility top-text-color-visibility text-center py-2 px-3 fs-12"
         style="background-color:{{ get_setting('top_header_bg_color', '#412700') }};color:{{ get_setting('top_header_text_color', '#edbe84') }}">
        {{ get_setting('site_motto', 'Black rice wafers') }}
    </div>
    <div class="middle-background-color-visibility d-flex flex-wrap align-items-center justify-content-between px-4 py-3"
         style="background-color:{{ get_setting('middle_header_bg_color', '#fdf9f3') }};gap:12px">
        <a href="{{ $storefront }}" aria-label="{{ get_setting('site_name', 'Wafer King') }} home">
            <img id="header-logo-preview" src="{{ $logo }}" alt="{{ get_setting('site_name', 'Wafer King') }}" width="195" height="48" style="object-fit:contain;max-width:100%">
        </a>
        <a href="{{ $storefront }}/#flavours" class="btn rounded-pill fw-700 px-4" style="background-color:#3e2723;color:#fff">{{ translate('Shop wafers') }}</a>
    </div>
    <nav aria-label="{{ translate('Main navigation') }}" class="bottom-background-color-visibility d-flex flex-wrap justify-content-center border-top px-3 py-2"
         style="background-color:{{ get_setting('bottom_header_bg_color', '#fdf9f3') }};gap:4px 18px">
        @foreach (['/#flavours' => 'Shop', '/about' => 'Our Story', '/blog' => 'Blog', '/track' => 'Track Order', '/faq' => 'FAQ', '/contact' => 'Contact'] as $path => $label)
            <a href="{{ $storefront.$path }}" class="bottom-text-color-visibility fw-600 py-1" style="color:{{ get_setting('bottom_header_text_color', '#3e2723') }}">{{ translate($label) }}</a>
        @endforeach
    </nav>
</header>
