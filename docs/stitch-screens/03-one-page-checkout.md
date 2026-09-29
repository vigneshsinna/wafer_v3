# Stitch Screen: One-Page Checkout — WaferKing

> **Stitch Project ID**: `8109637399058163454`  
> **Screen ID**: `a8d1840d4fef4208bc63749ebfe1086e`  
> **Resource Name**: `projects/8109637399058163454/screens/a8d1840d4fef4208bc63749ebfe1086e`  
> **Device**: DESKTOP  
> **Canvas Dimensions**: 2560px × 4152px  
> **Content Type**: `text/html`  
> **Screenshot Preview**: [View High-Res Design Screenshot](https://lh3.googleusercontent.com/aida/AEtjO1VoCveMNf6jE9rolFDukjZa933_uaeCs28TxQBE5nmQTauDhAa8ZZYDL_yeZjZXk8_ksa-bgi-b12Yt_3GF8duCORj-bKaMGHkURCrIjvyPPbm8i_X9lxcPRaZD4IhGk4HboGh6bavY3uh2nUL_obC66Y6qzNl__38zZQEVAPvi1gyHu_MGsg65CHgfdTOb5d-l1m3ed6TlkBGBNgI6vFnZINJHdTd4GiG03Nmg7u4d6dfDXendLneTxtg)  

---

## 1. Screen Overview & UI Structure

![One-Page Checkout — WaferKing](https://lh3.googleusercontent.com/aida/AEtjO1VoCveMNf6jE9rolFDukjZa933_uaeCs28TxQBE5nmQTauDhAa8ZZYDL_yeZjZXk8_ksa-bgi-b12Yt_3GF8duCORj-bKaMGHkURCrIjvyPPbm8i_X9lxcPRaZD4IhGk4HboGh6bavY3uh2nUL_obC66Y6qzNl__38zZQEVAPvi1gyHu_MGsg65CHgfdTOb5d-l1m3ed6TlkBGBNgI6vFnZINJHdTd4GiG03Nmg7u4d6dfDXendLneTxtg)

- **Screen Title**: One-Page Checkout — WaferKing
- **Target Route in Storefront**: `storefront/src/app/checkout/page.tsx` (`/checkout`)

---

## 2. Key UI Elements & Layout Architecture


### Layout Sections:
1. **Streamlined Checkout Header**:
   - Brand Logo centered with SSL 256-bit secure badge
2. **Two-Column Checkout Grid**:
   - **Left Column (Forms)**:
     - Step 1: Customer Contact (Email & Indian Phone number with +91)
     - Step 2: Delivery Address (Full Name, Address Line, Landmark, City, State: Tamil Nadu/all India, PIN Code: 6-digit)
     - Step 3: Payment Options:
       - Online Payment (Razorpay UPI, Credit/Debit Cards, NetBanking, Wallets)
       - Cash on Delivery (COD)
   - **Right Column (Order Summary)**:
     - Itemized cart rows with thumbnails, quantities, and prices
     - Promo / Coupon Code box with "Apply" button
     - Price breakdown: Subtotal, Shipping (Free over ₹499), Taxes (GST included)
     - Grand Total in INR (₹)
     - Primary Button: "Pay via Razorpay" or "Place Cash on Delivery Order"


---

## 3. Stitch Raw Source Code

```html
<!DOCTYPE html>

<html lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_standard" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={"darkMode":"class","theme":{"extend":{"colors":{"tertiary-fixed":"#ffddb6","outline-variant":"#d3c3c0","error":"#ba1a1a","inverse-on-surface":"#f4f0ea","secondary-fixed-dim":"#9dd3aa","secondary-container":"#b6edc2","surface-container-highest":"#e6e2dc","primary-700":"#2C1B10","inverse-primary":"#e3beb8","on-surface":"#1c1c18","outline":"#827472","background":"#fdf9f3","on-background":"#1c1c18","surface-variant":"#e6e2dc","surface-tint":"#745853","on-tertiary-fixed-variant":"#604011","on-secondary":"#ffffff","surface-container-lowest":"#ffffff","on-tertiary-container":"#b68c57","surface-container-low":"#f7f3ed","accent-700":"#754A22","primary":"#271310","state-error":"#DC2626","on-error":"#ffffff","primary-fixed-dim":"#e3beb8","surface-bright":"#fdf9f3","on-secondary-fixed-variant":"#1e5031","surface":"#fdf9f3","primary-300":"#61492E","background-cream":"#FFFDF9","on-primary":"#ffffff","on-tertiary":"#ffffff","on-primary-fixed-variant":"#5b403c","surface-container-high":"#ebe8e2","on-error-container":"#93000a","state-success":"#16A34A","inverse-surface":"#31302d","primary-fixed":"#ffdad4","tertiary":"#251400","error-container":"#ffdad6","secondary":"#376847","primary-50":"#8B7355","on-primary-container":"#ae8d87","primary-container":"#3e2723","on-tertiary-fixed":"#2a1800","on-secondary-fixed":"#00210e","surface-container":"#f1ede7","on-primary-fixed":"#2b1613","on-secondary-container":"#3b6d4b","on-surface-variant":"#504442","surface-dim":"#dddad4","secondary-fixed":"#b9efc5","background-warm":"#F1E7DA","tertiary-container":"#412700","tertiary-fixed-dim":"#edbe84","accent-50":"#FAF1E6"},"borderRadius":{"DEFAULT":"0.25rem","lg":"0.5rem","xl":"0.75rem","full":"9999px"},"spacing":{"space-xs":"0.25rem","space-lg":"1.5rem","margin":"2rem","space-md":"1rem","space-xl":"2.5rem","gutter-sm":"1rem","margin-mobile":"1rem","gutter":"1.5rem","space-sm":"0.5rem"},"fontFamily":{"headline-lg":["Outfit"],"label-md":["Inter"],"body-md":["Inter"],"headline-xl":["Outfit"],"body-sm":["Inter"],"headline-xl-mobile":["Outfit"],"headline-sm":["Outfit"],"headline-lg-mobile":["Outfit"],"label-lg":["Inter"],"headline-md":["Outfit"],"body-lg":["Inter"],"label-sm":["Inter"]},"fontSize":{"headline-lg":["36px",{"lineHeight":"44px","fontWeight":"600"}],"label-md":["12px",{"lineHeight":"16px","fontWeight":"600"}],"body-md":["16px",{"lineHeight":"24px","fontWeight":"400"}],"headline-xl":["48px",{"lineHeight":"56px","fontWeight":"700"}],"body-sm":["14px",{"lineHeight":"20px","fontWeight":"400"}],"headline-xl-mobile":["32px",{"lineHeight":"40px","fontWeight":"700"}],"headline-sm":["20px",{"lineHeight":"28px","fontWeight":"600"}],"headline-lg-mobile":["26px",{"lineHeight":"34px","fontWeight":"600"}],"label-lg":["14px",{"lineHeight":"20px","fontWeight":"600"}],"headline-md":["24px",{"lineHeight":"32px","fontWeight":"600"}],"body-lg":["18px",{"lineHeight":"28px","fontWeight":"400"}],"label-sm":["11px",{"lineHeight":"14px","fontWeight":"500"}]}}}};</script></head><body class="bg-background font-body-md text-on-surface antialiased"><header class="fixed top-0 left-0 right-0 z-50 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="bg-tertiary-container text-tertiary-fixed-dim text-center py-space-xs px-margin-mobile md:px-margin font-label-sm text-label-sm tracking-wide flex items-center justify-center gap-space-xs"><span class="material-symbols-outlined text-[14px] text-tertiary-fixed-dim">local_shipping</span><span>Free Shipping across India on orders over ₹499 | Handcrafted in Erode, Tamil Nadu</span></div><div class="h-20 bg-surface/90 backdrop-blur-xl"><div class="max-w-7xl mx-auto h-full px-gutter-sm md:px-gutter flex items-center justify-between gap-space-md"><div class="flex items-center gap-space-sm"><img alt="WaferKing Logo" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1VKEDdlq-eMyp5fq9B0nouVtYvr429cZ6uM40eA7ubKtZiEqY0H1PoxVLaW_8RT2elpiWL4I8zjHT0n4EU0BV3EmapvGdSwT1vDKxunDQc0NzUd6hwlXIWKWfgQ4zQwtTDCrZPrNN86BXmphhtxeze2nq19zANzkDXFVcIKHF5v6fSz8s-nRYPuByyLRJQ3F7dZOao-VP65wGluutayM6oyl_epTmxll79DVpOAWOPgwU1_Syd3l5BgQ3M"/><div class="flex flex-col"><span class="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">WaferKing</span><span class="font-label-sm text-label-sm text-primary-50 tracking-wider uppercase -mt-1 hidden sm:inline-block">Artisan Black Rice</span></div></div><nav class="hidden lg:flex items-center gap-space-sm" data-active-classes="bg-primary-container text-on-primary font-label-lg rounded-lg"><a aria-current="page" class="px-space-sm py-space-xs transition-colors bg-primary-container text-on-primary font-label-lg rounded-lg" data-path="shop" href="#">Shop</a><a class="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" data-path="our-story" href="#">Our Story</a><a class="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" data-path="flavours" href="#">Flavours</a><a class="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" data-path="track-order" href="#">Track Order</a><a class="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" data-path="faq" href="#">FAQ</a><a class="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" data-path="contact" href="#">Contact</a></nav><div class="flex items-center gap-space-sm"><button class="p-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" type="button"><span class="material-symbols-outlined">search</span></button><button class="flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-primary-container text-on-primary hover:bg-primary-700 transition-colors" type="button"><span class="material-symbols-outlined text-[20px]">shopping_bag</span><span class="font-label-lg text-label-lg">Cart (3)</span></button><div class="pl-space-xs flex items-center"><img alt="Profile" class="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGHXkE-e44qdo0CNRvlg_ShnYK6_55-K2vQjZUcOSAN4KmgEMFkHp4OTQnAQewTLTwHSTyJcuKes-JxYAoCF0vULixh9t7oLD2L6UJHLInmds5cW7YZJry6I9VUbePKJQoCoslD53rUr_55ijjSmqkA_sBMG2xkRnopVa_IT3BFuXzkmNHRWzAcuaDS09_ImfNmakJ9NkDlS7JLLfxWkUzc57UaRFXO2DnJWleC_5NzDpn6RSfjvh3"/></div></div></div></div></header><main class="w-full pt-20 bg-background"><div class="flex flex-col w-full">
<!-- Minimalist Checkout Breadcrumb Bar -->
<div class="w-full bg-surface-container-low py-space-sm px-gutter-sm md:px-gutter">
<div class="max-w-7xl mx-auto flex items-center justify-between">
<div class="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
<a class="hover:text-primary transition-colors flex items-center gap-1" data-path="shop" href="#">
<span class="material-symbols-outlined text-[16px]">arrow_back</span>
<span>Return to Pantry</span>
</a>
<span>/</span>
<span class="text-primary font-semibold">One-Page Express Checkout</span>
</div>
<div class="hidden sm:flex items-center gap-space-sm">
<span class="inline-flex items-center gap-1 px-space-sm py-1 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm font-semibold">
<span class="material-symbols-outlined text-[15px]">verified_user</span>
          256-Bit SSL Encrypted
        </span>
<span class="text-outline-variant">•</span>
<span class="font-label-sm text-label-sm text-primary-50">Erode Heritage Kitchens</span>
</div>
</div>
</div>
<!-- Main Checkout Container (2-Column Grid) -->
<div class="max-w-7xl mx-auto w-full px-gutter-sm md:px-gutter py-space-xl">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
<!-- LEFT COLUMN: Multi-Step Interactive Form (7 of 12 cols) -->
<div class="lg:col-span-7 flex flex-col gap-space-lg">
<!-- Banner Alert: Karuppu Kavuni Harvest Freshness -->
<div class="bg-accent-50 rounded-lg p-space-md flex items-start gap-space-sm">
<div class="w-9 h-9 rounded-full bg-accent-700/10 flex items-center justify-center shrink-0 text-accent-700">
<span class="material-symbols-outlined text-[20px]">spa</span>
</div>
<div class="flex-1">
<p class="font-label-lg text-label-lg text-accent-700 font-semibold">Directly From Our Kaveri Basin Millers</p>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Your artisanal black rice batches are crisp-baked to order in small bronze vessels. Dispatched within 24 hours.</p>
</div>
</div>
<!-- STEP 1: CONTACT INFORMATION -->
<section class="bg-background-cream rounded-lg p-space-lg shadow-sm flex flex-col gap-space-md">
<div class="flex items-center justify-between pb-space-xs">
<div class="flex items-center gap-space-sm">
<span class="w-7 h-7 rounded-full bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center font-bold">1</span>
<h2 class="font-headline-sm text-headline-sm text-primary">Contact Information</h2>
</div>
<span class="font-label-sm text-label-sm text-secondary flex items-center gap-1 font-semibold">
<span class="material-symbols-outlined text-[16px]">check_circle</span> Verified
            </span>
</div>
<!-- Account Toggle Tabs -->
<div class="grid grid-cols-2 p-1 bg-surface-container rounded-lg gap-1">
<button class="py-space-xs px-space-sm text-center font-label-md text-label-md rounded-md bg-background-cream text-primary shadow-sm font-semibold transition-all" id="tab-auth" type="button">
              Logged In
            </button>
<button class="py-space-xs px-space-sm text-center font-label-md text-label-md rounded-md text-on-surface-variant hover:text-primary transition-all" id="tab-guest" type="button">
              Checkout as Guest
            </button>
</div>
<!-- User Info Pill / Logged In State -->
<div class="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low" id="user-logged-box">
<div class="flex items-center gap-space-sm min-w-0">
<div class="w-10 h-10 rounded-full bg-primary-container text-tertiary-fixed flex items-center justify-center font-headline-sm text-[16px] font-bold shrink-0">
                VS
              </div>
<div class="flex flex-col min-w-0">
<span class="font-label-lg text-label-lg text-primary font-semibold truncate">Vignesh S.</span>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">vignesh@example.com</span>
</div>
</div>
<button class="text-accent-700 hover:text-primary font-label-md text-label-md font-semibold px-space-sm py-1 rounded hover:bg-surface-container transition-colors" type="button">
              Switch
            </button>
</div>
<!-- Phone Number Input Grid -->
<div class="grid grid-cols-1 sm:grid-cols-12 gap-space-sm">
<div class="sm:col-span-5 flex flex-col gap-1">
<label class="font-label-md text-label-md text-primary-300">Email Address</label>
<input class="w-full bg-surface-container-low px-space-md py-space-xs rounded-lg font-body-sm text-body-sm text-primary focus:bg-background-cream focus:outline-none focus:ring-2 focus:ring-accent-700/20" type="email" value="vignesh@example.com"/>
</div>
<div class="sm:col-span-7 flex flex-col gap-1">
<label class="font-label-md text-label-md text-primary-300">WhatsApp / Mobile for Live Tracking</label>
<div class="flex rounded-lg bg-surface-container-low overflow-hidden focus-within:ring-2 focus-within:ring-accent-700/20 focus-within:bg-background-cream">
<span class="px-space-sm py-space-xs bg-surface-container font-label-md text-label-md text-primary-300 flex items-center gap-1 shrink-0">
<span class="text-base leading-none">🇮🇳</span> +91
                </span>
<input class="w-full bg-transparent px-space-sm py-space-xs font-body-sm text-body-sm text-primary focus:outline-none" type="tel" value="98427 12345"/>
</div>
</div>
</div>
<label class="flex items-center gap-space-sm cursor-pointer select-none">
<input checked="" class="w-4 h-4 rounded text-primary-container accent-primary-container focus:ring-accent-700" type="checkbox"/>
<span class="font-body-sm text-body-sm text-on-surface-variant">Send instant courier live dispatch updates via SMS &amp; WhatsApp</span>
</label>
</section>
<!-- STEP 2: SHIPPING ADDRESS -->
<section class="bg-background-cream rounded-lg p-space-lg shadow-sm flex flex-col gap-space-md">
<div class="flex items-center justify-between pb-space-xs">
<div class="flex items-center gap-space-sm">
<span class="w-7 h-7 rounded-full bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center font-bold">2</span>
<div>
<h2 class="font-headline-sm text-headline-sm text-primary">Shipping Address</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant">All India Priority Domestic Express Network</p>
</div>
</div>
<span class="font-label-sm text-label-sm text-secondary bg-secondary/10 px-space-sm py-1 rounded-full font-medium flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">local_shipping</span> Serviceable
            </span>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
<div class="flex flex-col gap-1">
<label class="font-label-md text-label-md text-primary-300">Recipient Full Name *</label>
<input class="w-full bg-surface-container-low px-space-md py-space-xs rounded-lg font-body-sm text-body-sm text-primary focus:bg-background-cream focus:outline-none focus:ring-2 focus:ring-accent-700/20" type="text" value="Vignesh Somasundaram"/>
</div>
<div class="flex flex-col gap-1">
<label class="font-label-md text-label-md text-primary-300">Contact Number for Delivery *</label>
<input class="w-full bg-surface-container-low px-space-md py-space-xs rounded-lg font-body-sm text-body-sm text-primary focus:bg-background-cream focus:outline-none focus:ring-2 focus:ring-accent-700/20" type="tel" value="+91 98427 12345"/>
</div>
</div>
<div class="flex flex-col gap-1">
<label class="font-label-md text-label-md text-primary-300">Flat / House No., Apartment, Colony Name *</label>
<input class="w-full bg-surface-container-low px-space-md py-space-xs rounded-lg font-body-sm text-body-sm text-primary focus:bg-background-cream focus:outline-none focus:ring-2 focus:ring-accent-700/20" type="text" value="Plot 42, Sri Bhavani Nilayam, Perundurai Road"/>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
<div class="flex flex-col gap-1">
<label class="font-label-md text-label-md text-primary-300">Landmark / Locality (Optional)</label>
<input class="w-full bg-surface-container-low px-space-md py-space-xs rounded-lg font-body-sm text-body-sm text-primary focus:bg-background-cream focus:outline-none focus:ring-2 focus:ring-accent-700/20" type="text" value="Near Sengunthar School Ground"/>
</div>
<div class="flex flex-col gap-1">
<label class="font-label-md text-label-md text-primary-300">PIN Code *</label>
<div class="relative">
<input class="w-full bg-surface-container-low px-space-md py-space-xs rounded-lg font-body-sm text-body-sm text-primary tracking-wider font-semibold focus:bg-background-cream focus:outline-none focus:ring-2 focus:ring-accent-700/20" id="pincode-input" maxlength="6" type="text" value="638001"/>
<span class="absolute right-3 top-2.5 text-secondary flex items-center gap-1 font-label-sm text-label-sm font-semibold">
<span class="material-symbols-outlined text-[16px]">check</span> Valid PIN
                </span>
</div>
</div>
</div>
<div class="grid grid-cols-2 gap-space-md">
<div class="flex flex-col gap-1">
<label class="font-label-md text-label-md text-primary-300">City / District</label>
<input class="w-full bg-surface-container px-space-md py-space-xs rounded-lg font-body-sm text-body-sm text-on-surface-variant font-medium cursor-not-allowed" readonly="" type="text" value="Erode"/>
</div>
<div class="flex flex-col gap-1">
<label class="font-label-md text-label-md text-primary-300">State</label>
<input class="w-full bg-surface-container px-space-md py-space-xs rounded-lg font-body-sm text-body-sm text-on-surface-variant font-medium cursor-not-allowed" readonly="" type="text" value="Tamil Nadu"/>
</div>
</div>
<!-- Address Tag Pills -->
<div class="flex flex-col gap-1.5 pt-space-xs">
<label class="font-label-md text-label-md text-primary-300">Delivery Address Type</label>
<div class="flex items-center gap-space-sm" id="address-type-selector">
<button class="addr-type-btn active px-space-md py-1.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-1 transition-all" type="button">
<span class="material-symbols-outlined text-[16px]">home</span> Home (All Days)
              </button>
<button class="addr-type-btn px-space-md py-1.5 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-label-md text-label-md flex items-center gap-1 transition-all" type="button">
<span class="material-symbols-outlined text-[16px]">apartment</span> Office (10 AM - 6 PM)
              </button>
<button class="addr-type-btn px-space-md py-1.5 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-label-md text-label-md flex items-center gap-1 transition-all" type="button">
<span class="material-symbols-outlined text-[16px]">location_on</span> Other
              </button>
</div>
</div>
<label class="flex items-center gap-space-sm cursor-pointer select-none pt-space-xs">
<input checked="" class="w-4 h-4 rounded text-primary-container accent-primary-container focus:ring-accent-700" type="checkbox"/>
<span class="font-body-sm text-body-sm text-on-surface-variant">Save this address to my WaferKing Pantry Profile</span>
</label>
</section>
<!-- STEP 3: SHIPPING METHOD -->
<section class="bg-background-cream rounded-lg p-space-lg shadow-sm flex flex-col gap-space-md">
<div class="flex items-center gap-space-sm pb-space-xs">
<span class="w-7 h-7 rounded-full bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center font-bold">3</span>
<div>
<h2 class="font-headline-sm text-headline-sm text-primary">Shipping Method</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant">Protected moisture-sealed tin &amp; craft courier carton</p>
</div>
</div>
<div class="p-space-md rounded-lg bg-surface-container-low flex items-start gap-space-md relative overflow-hidden">
<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
<div class="pt-0.5">
<input checked="" class="w-5 h-5 accent-secondary cursor-pointer" name="shipping-method" type="radio"/>
</div>
<div class="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<div class="flex flex-col">
<div class="flex items-center gap-space-xs">
<span class="font-label-lg text-label-lg text-primary font-bold">Standard Ground Express</span>
<span class="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-label-sm text-label-sm font-semibold uppercase tracking-wider">Free Promo</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Via BlueDart Air / Delhivery Express • Est. Delivery: <strong>2-3 Business Days</strong></p>
</div>
<div class="text-right">
<span class="font-headline-sm text-headline-sm text-secondary font-bold">FREE</span>
<span class="block font-label-sm text-label-sm line-through text-outline">₹65.00</span>
</div>
</div>
</div>
</section>
<!-- STEP 4: PAYMENT OPTIONS -->
<section class="bg-background-cream rounded-lg p-space-lg shadow-sm flex flex-col gap-space-md">
<div class="flex items-center justify-between pb-space-xs">
<div class="flex items-center gap-space-sm">
<span class="w-7 h-7 rounded-full bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center font-bold">4</span>
<div>
<h2 class="font-headline-sm text-headline-sm text-primary">Payment Options</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant">Encrypted payment gateway with bank-grade safety</p>
</div>
</div>
<div class="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px] text-secondary">lock</span>
<span>100% Encrypted</span>
</div>
</div>
<div class="flex flex-col gap-space-sm" id="payment-options-container">
<!-- Option 1: Razorpay Secure (Selected) -->
<label class="payment-option selected p-space-md rounded-lg bg-surface-container-low cursor-pointer flex flex-col gap-space-sm transition-all relative">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-sm">
<input checked="" class="w-5 h-5 accent-primary-container" name="payment_choice" type="radio" value="razorpay"/>
<div>
<span class="font-label-lg text-label-lg text-primary font-bold">Razorpay Secure Online</span>
<span class="ml-2 font-label-sm text-label-sm bg-accent-50 text-accent-700 px-2 py-0.5 rounded-full font-semibold">Recommended</span>
</div>
</div>
<span class="font-label-sm text-label-sm text-secondary font-semibold">Zero Fee</span>
</div>
<!-- Badges for supported types -->
<div class="pl-8 flex flex-wrap items-center gap-space-xs pt-1">
<span class="px-2 py-1 bg-surface-container rounded font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">account_balance_wallet</span> UPI (GPay, PhonePe, Paytm)
                </span>
<span class="px-2 py-1 bg-surface-container rounded font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">credit_card</span> All Cards (Visa, Mastercard, RuPay)
                </span>
<span class="px-2 py-1 bg-surface-container rounded font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">account_balance</span> 50+ NetBanking
                </span>
</div>
</label>
<!-- Option 2: Cash on Delivery -->
<label class="payment-option p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer flex items-center justify-between transition-all">
<div class="flex items-center gap-space-sm">
<input class="w-5 h-5 accent-primary-container" name="payment_choice" type="radio" value="cod"/>
<div class="flex flex-col">
<span class="font-label-lg text-label-lg text-primary font-semibold">Cash on Delivery (COD)</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Pay with cash or scan delivery QR upon receipt</span>
</div>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded">
                +₹30 handling fee
              </span>
</label>
</div>
</section>
<!-- PRIMARY SUBMIT ACTION -->
<div class="flex flex-col gap-space-sm pt-space-xs">
<button class="w-full py-space-md px-space-xl bg-primary-container hover:bg-primary-700 active:scale-[0.99] text-on-primary rounded-lg font-headline-sm text-headline-sm transition-all shadow-md flex items-center justify-center gap-space-sm" id="pay-button" type="button">
<span class="material-symbols-outlined text-[24px]">lock</span>
<span id="button-label">Pay ₹289.00 &amp; Place Order</span>
</button>
<div class="flex flex-wrap items-center justify-center gap-space-md text-on-surface-variant font-label-sm text-label-sm pt-space-xs">
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-[16px] text-secondary">verified</span>
              Razorpay Safe Verified
            </span>
<span>•</span>
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-[16px] text-secondary">replay</span>
              7-Day Freshness Guarantee
            </span>
<span>•</span>
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-[16px] text-secondary">eco</span>
              Plastic-Neutral Shipping
            </span>
</div>
</div>
</div>
<!-- RIGHT COLUMN: Sticky Order Summary (5 of 12 cols) -->
<div class="lg:col-span-5 flex flex-col gap-space-lg lg:sticky lg:top-24">
<!-- Cart Summary Card -->
<div class="bg-background-cream rounded-lg p-space-lg shadow-sm flex flex-col gap-space-md">
<div class="flex items-center justify-between pb-space-xs">
<div class="flex items-center gap-space-xs">
<h2 class="font-headline-sm text-headline-sm text-primary">Your Harvest Box</h2>
<span class="w-6 h-6 rounded-full bg-accent-50 text-accent-700 font-label-sm text-label-sm flex items-center justify-center font-bold">3</span>
</div>
<a class="font-label-md text-label-md text-accent-700 hover:text-primary underline" data-path="shop" href="#">Edit Items</a>
</div>
<!-- Order Items List -->
<div class="flex flex-col divide-y divide-surface-container gap-space-sm">
<!-- Item 1: Avarampoo Black Rice -->
<div class="flex items-center justify-between gap-space-sm pt-space-xs">
<div class="flex items-center gap-space-sm min-w-0">
<div class="relative shrink-0">
<div class="w-16 h-16 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden">
<img class="w-full h-full object-cover" data-alt="A gourmet close-up pack of organic Karuppu Kavuni black rice crisps infused with bright golden Avarampoo flowers, set on rich textured craft paper with warm organic studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAe9se0b5daXLN3lPTlxajPiKR2PPqrrmGI21QykamLCRt3KzhAqXAHvczsRh6jwv1r9KiWsw8etmx0ws7TUkjChVw7TV5AixwLWFixKQtyeEN1doaB8TirFpYlCOVF9hQw5Gy2hQSYJ9tfRhq7k8wA_VjHeZGU-omLYx2CkKlTINGf_mPv96Z4F6pV2woncZgtRXfqhnusbocOan7W-nDYu6yItUYdZpG3t9MGD07N597-KtzFEn4i"/>
</div>
<span class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold">2</span>
</div>
<div class="flex flex-col min-w-0">
<h3 class="font-label-lg text-label-lg text-primary truncate font-semibold">Avarampoo Black Rice Wafers</h3>
<span class="font-body-sm text-body-sm text-on-surface-variant">55g Handcrafted batch × 2</span>
<span class="font-label-sm text-label-sm text-secondary flex items-center gap-0.5 mt-0.5">
<span class="material-symbols-outlined text-[13px]">eco</span> Low GI Botanical
                  </span>
</div>
</div>
<div class="text-right shrink-0">
<span class="font-label-lg text-label-lg text-primary font-bold">₹160.00</span>
<span class="block font-label-sm text-label-sm text-primary-50">₹80 each</span>
</div>
</div>
<!-- Item 2: Hibiscus Ruby Black Rice -->
<div class="flex items-center justify-between gap-space-sm pt-space-sm">
<div class="flex items-center gap-space-sm min-w-0">
<div class="relative shrink-0">
<div class="w-16 h-16 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden">
<img class="w-full h-full object-cover" data-alt="Ruby tinted natural black rice wafers with dehydrated hibiscus petal flecks, minimal botanical presentation, earthy luxury ambient background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtLGnZhN3cL_SDpckwKy11pqDij1HIMz6z66EW0yzXtC0T_ViLYTJeg_yAqi2kul_SPguvCoIqWMun4mc9DXiX06K3PoVS13jW9ZfUWTnoKj5vF2Gr0KYc1kg37a96m92PFcr1OcT6O53vpkywfPLdlq2srAMuWoOkAb0th8Su9WWs26jY9T83SMIYX_HHrAqnaWBMg8yOtwKbE7PrXPMOgUevnNKdXmbtEyg-ZjxoTZf8UxWRpEfr"/>
</div>
<span class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold">1</span>
</div>
<div class="flex flex-col min-w-0">
<h3 class="font-label-lg text-label-lg text-primary truncate font-semibold">Hibiscus Ruby Crisps</h3>
<span class="font-body-sm text-body-sm text-on-surface-variant">55g Handcrafted batch</span>
<span class="font-label-sm text-label-sm text-accent-700 flex items-center gap-0.5 mt-0.5">
<span class="material-symbols-outlined text-[13px]">favorite</span> Antioxidant Rich
                  </span>
</div>
</div>
<div class="text-right shrink-0">
<span class="font-label-lg text-label-lg text-primary font-bold">₹80.00</span>
</div>
</div>
<!-- Item 3: Makhana & Black Pepper Crunch -->
<div class="flex items-center justify-between gap-space-sm pt-space-sm">
<div class="flex items-center gap-space-sm min-w-0">
<div class="relative shrink-0">
<div class="w-16 h-16 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden">
<img class="w-full h-full object-cover" data-alt="Slow roasted artisan makhana and pepper crunch snack in earthy minimal bowl with Tellicherry black pepper and roasted lotus seeds" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB65u67flpbmCpj8mUVczEcgdIT8OzG5oqnKKAxaM6JBTU8CiC3he4ps9pvOaY5lUk0WGhhdN7_MnYvwu9M0TgloHEiUlKTb5fl3pENWExWBwEpsuf6DELXzxjXih0DOPlD33c61Jv0GvJld-LdDQbg63hyP2KnkyxpksiZ_Zmm20jM2N9D7aL4ZXDlmF4X1DHQZrJehMjL9iszu7p83hr8j5jWoAL8IC-C6qcSGoFcLWVZ27xbKd6e"/>
</div>
<span class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold">1</span>
</div>
<div class="flex flex-col min-w-0">
<h3 class="font-label-lg text-label-lg text-primary truncate font-semibold">Makhana &amp; Pepper Crunch</h3>
<span class="font-body-sm text-body-sm text-on-surface-variant">55g Slow-roasted batch</span>
<span class="font-label-sm text-label-sm text-secondary flex items-center gap-0.5 mt-0.5">
<span class="material-symbols-outlined text-[13px]">bolt</span> High Protein
                  </span>
</div>
</div>
<div class="text-right shrink-0">
<span class="font-label-lg text-label-lg text-primary font-bold">₹90.00</span>
</div>
</div>
</div>
<!-- Coupon Code Section -->
<div class="pt-space-sm flex flex-col gap-space-xs">
<label class="font-label-sm text-label-sm text-primary-300 uppercase tracking-wider font-semibold">Promo Code / Heritage Voucher</label>
<div class="flex items-center justify-between p-space-sm bg-accent-50 rounded-lg" id="applied-coupon">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-[18px] text-accent-700">confirmation_number</span>
<div>
<span class="font-label-md text-label-md text-accent-700 font-bold tracking-wide">ERODE10</span>
<span class="font-label-sm text-label-sm text-accent-700 ml-1.5 font-medium">(-₹41.00 applied)</span>
</div>
</div>
<button class="font-label-sm text-label-sm text-error hover:underline font-semibold" id="remove-coupon-btn" type="button">
                Remove
              </button>
</div>
<!-- Hidden alternate input field shown when coupon removed -->
<div class="hidden flex items-center gap-space-xs" id="coupon-input-wrapper">
<input class="flex-1 bg-surface-container-low px-space-md py-space-xs rounded-lg font-body-sm text-body-sm text-primary uppercase focus:bg-background-cream focus:outline-none" id="coupon-text-field" placeholder="Enter coupon code" type="text"/>
<button class="px-space-md py-space-xs rounded-lg bg-surface-container text-primary font-label-md text-label-md hover:bg-surface-container-highest transition-colors font-semibold" id="apply-coupon-btn" type="button">
                Apply
              </button>
</div>
</div>
<!-- Cost Breakdown List -->
<div class="pt-space-xs flex flex-col gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
<div class="flex items-center justify-between">
<span>Items Subtotal</span>
<span class="font-label-md text-label-md text-primary font-semibold">₹330.00</span>
</div>
<div class="flex items-center justify-between text-secondary">
<span class="flex items-center gap-1">
<span>Coupon Discount (ERODE10)</span>
</span>
<span class="font-label-md text-label-md font-semibold" id="discount-display">-₹41.00</span>
</div>
<div class="flex items-center justify-between">
<span class="flex items-center gap-1">
<span>Priority Courier Shipping</span>
<span class="material-symbols-outlined text-[14px] text-secondary">info</span>
</span>
<span class="font-label-md text-label-md text-secondary font-bold" id="shipping-display">FREE</span>
</div>
<div class="flex items-center justify-between text-on-surface-variant">
<span class="text-xs">GST Included (CGST 6% + SGST 6%)</span>
<span class="font-label-sm text-label-sm text-on-surface-variant font-medium">₹30.96</span>
</div>
<!-- Grand Total Row -->
<div class="pt-space-sm mt-space-xs flex items-baseline justify-between bg-surface-container-low p-space-md rounded-lg">
<div class="flex flex-col">
<span class="font-label-lg text-label-lg text-primary font-bold">Total Amount</span>
<span class="font-label-sm text-label-sm text-primary-50">Inclusive of all taxes &amp; packaging</span>
</div>
<div class="text-right">
<span class="font-headline-md text-headline-md text-primary font-bold" id="grand-total">₹289.00</span>
</div>
</div>
</div>
</div>
<!-- Trust & Kitchen Credentials Card -->
<div class="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm shadow-sm">
<div class="flex items-center gap-space-sm">
<div class="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
<span class="material-symbols-outlined text-[18px]">verified</span>
</div>
<div class="flex flex-col">
<span class="font-label-md text-label-md text-primary font-bold">100% Artisanal Quality Promise</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Naturally rich in anthocyanins. Zero preservatives, zero palm oil.</span>
</div>
</div>
<div class="flex items-center gap-space-sm pt-space-xs">
<div class="w-8 h-8 rounded-full bg-accent-700/10 flex items-center justify-center text-accent-700 shrink-0">
<span class="material-symbols-outlined text-[18px]">shield</span>
</div>
<div class="flex flex-col">
<span class="font-label-md text-label-md text-primary font-bold">FSSAI Certified Facility</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Lic. #12423008000492 • Small-batch hygiene protocols.</span>
</div>
</div>
<div class="flex items-center gap-space-sm pt-space-xs">
<div class="w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container shrink-0">
<span class="material-symbols-outlined text-[18px]">inventory_2</span>
</div>
<div class="flex flex-col">
<span class="font-label-md text-label-md text-primary font-bold">Eco-Shield Packaging</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Triple-layer nitrogen sealed for authentic harvest crunch.</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<script>
  (function() {
    // 1. Address Type Selection Toggle
    const addrButtons = document.querySelectorAll('.addr-type-btn');
    addrButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        addrButtons.forEach(b => {
          b.classList.remove('bg-primary-container', 'text-on-primary', 'active');
          b.classList.add('bg-surface-container-low', 'text-on-surface-variant');
        });
        btn.classList.add('bg-primary-container', 'text-on-primary', 'active');
        btn.classList.remove('bg-surface-container-low', 'text-on-surface-variant');
      });
    });

    // 2. Tab switching between Logged-in / Guest
    const tabAuth = document.getElementById('tab-auth');
    const tabGuest = document.getElementById('tab-guest');
    const userBox = document.getElementById('user-logged-box');

    if (tabAuth && tabGuest && userBox) {
      tabGuest.addEventListener('click', () => {
        tabGuest.classList.add('bg-background-cream', 'text-primary', 'shadow-sm', 'font-semibold');
        tabGuest.classList.remove('text-on-surface-variant');
        tabAuth.classList.remove('bg-background-cream', 'text-primary', 'shadow-sm', 'font-semibold');
        tabAuth.classList.add('text-on-surface-variant');
        userBox.classList.add('hidden');
      });

      tabAuth.addEventListener('click', () => {
        tabAuth.classList.add('bg-background-cream', 'text-primary', 'shadow-sm', 'font-semibold');
        tabAuth.classList.remove('text-on-surface-variant');
        tabGuest.classList.remove('bg-background-cream', 'text-primary', 'shadow-sm', 'font-semibold');
        tabGuest.classList.add('text-on-surface-variant');
        userBox.classList.remove('hidden');
      });
    }

    // 3. Dynamic Calculation: Payment method & COD Fee
    let hasCoupon = true;
    let basePrice = 330;
    let couponDiscount = 41;
    let codFee = 0;

    const paymentRadios = document.querySelectorAll('input[name="payment_choice"]');
    const grandTotalEl = document.getElementById('grand-total');
    const buttonLabelEl = document.getElementById('button-label');

    function calculateTotal() {
      const discount = hasCoupon ? couponDiscount : 0;
      const total = basePrice - discount + codFee;
      const formatted = '₹' + total.toFixed(2);
      
      if (grandTotalEl) grandTotalEl.textContent = formatted;
      if (buttonLabelEl) {
        if (codFee > 0) {
          buttonLabelEl.textContent = 'Place COD Order (' + formatted + ')';
        } else {
          buttonLabelEl.textContent = 'Pay ' + formatted + ' & Place Order';
        }
      }
    }

    paymentRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.value === 'cod') {
          codFee = 30;
        } else {
          codFee = 0;
        }
        calculateTotal();
      });
    });

    // 4. Coupon Code Application / Removal
    const appliedCouponBox = document.getElementById('applied-coupon');
    const couponInputWrapper = document.getElementById('coupon-input-wrapper');
    const removeCouponBtn = document.getElementById('remove-coupon-btn');
    const applyCouponBtn = document.getElementById('apply-coupon-btn');
    const discountDisplay = document.getElementById('discount-display');

    if (removeCouponBtn) {
      removeCouponBtn.addEventListener('click', () => {
        hasCoupon = false;
        appliedCouponBox.classList.add('hidden');
        couponInputWrapper.classList.remove('hidden');
        if (discountDisplay) discountDisplay.textContent = '₹0.00';
        calculateTotal();
      });
    }

    if (applyCouponBtn) {
      applyCouponBtn.addEventListener('click', () => {
        const inputField = document.getElementById('coupon-text-field');
        if (inputField && inputField.value.trim().toUpperCase() === 'ERODE10') {
          hasCoupon = true;
          couponInputWrapper.classList.add('hidden');
          appliedCouponBox.classList.remove('hidden');
          if (discountDisplay) discountDisplay.textContent = '-₹41.00';
          calculateTotal();
        } else {
          alert('Invalid promo code. Please enter ERODE10');
        }
      });
    }

    // 5. Submit interaction feedback
    const payBtn = document.getElementById('pay-button');
    if (payBtn) {
      payBtn.addEventListener('click', () => {
        payBtn.disabled = true;
        payBtn.classList.add('opacity-75');
        payBtn.innerHTML = '<span class="material-symbols-outlined text-[20px] animate-spin">refresh</span> Processing Artisan Order...';
        setTimeout(() => {
          payBtn.innerHTML = '<span class="material-symbols-outlined text-[20px]">check_circle</span> Order Confirmed!';
          payBtn.classList.remove('bg-primary-container');
          payBtn.classList.add('bg-secondary');
        }, 1200);
      });
    }
  })();
</script></main><footer class="w-full bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-space-xl pb-space-lg text-on-surface"><div class="max-w-7xl mx-auto px-gutter-sm md:px-gutter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl pb-space-xl"><div class="flex flex-col gap-space-sm"><div class="flex items-center gap-space-xs"><span class="font-headline-sm text-headline-sm text-primary font-bold">WaferKing</span></div><p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Handcrafted with heirloom Karuppu Kavuni traditional black rice in the Kaveri delta plains of Erode, Tamil Nadu. Clean wellness, slow stone-ground nutrition, and exquisite crunch.</p><div class="flex items-center gap-space-xs pt-space-xs"><span class="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-accent-50 text-accent-700 font-label-sm text-label-sm"><span class="material-symbols-outlined text-[16px]">verified</span>FSSAI Lic. #12423008000492</span></div></div><div class="flex flex-col gap-space-sm"><h4 class="font-label-lg text-label-lg text-primary uppercase tracking-wider">The Collection</h4><ul class="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant"><li><a class="hover:text-on-surface transition-colors" data-path="shop" href="#">Avarampoo Black Rice Wafers</a></li><li><a class="hover:text-on-surface transition-colors" data-path="shop" href="#">Hibiscus Petal Crunch Wafers</a></li><li><a class="hover:text-on-surface transition-colors" data-path="shop" href="#">Makhana Crunch Roasted Crisps</a></li><li><a class="hover:text-on-surface transition-colors" data-path="shop" href="#">Vallarai Herbal Infused Crisp</a></li><li><a class="hover:text-on-surface transition-colors" data-path="shop" href="#">The Royal Heritage Sampler Box</a></li></ul></div><div class="flex flex-col gap-space-sm"><h4 class="font-label-lg text-label-lg text-primary uppercase tracking-wider">Customer Care</h4><ul class="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant"><li><a class="hover:text-on-surface transition-colors" data-path="track-order" href="#">Track Your Consignment</a></li><li><a class="hover:text-on-surface transition-colors" data-path="shipping-policy" href="#">Shipping &amp; Domestic Express</a></li><li><a class="hover:text-on-surface transition-colors" data-path="returns-and-refund" href="#">Returns &amp; Freshness Guarantee</a></li><li><a class="hover:text-on-surface transition-colors" data-path="contact" href="#">Contact Our Kitchen Team</a></li><li><a class="hover:text-on-surface transition-colors" data-path="faq" href="#">Frequently Asked Questions</a></li></ul></div><div class="flex flex-col gap-space-sm"><h4 class="font-label-lg text-label-lg text-primary uppercase tracking-wider">Artisan Pantry Club</h4><p class="font-body-sm text-body-sm text-on-surface-variant">Receive 10% off your initial sampler box, botanical harvest updates, and seasonal specials.</p><form class="flex flex-col sm:flex-row gap-space-xs pt-space-xs" onsubmit="return false;"><input class="flex-1 bg-background-cream px-space-md py-space-xs rounded-lg font-body-sm text-body-sm text-primary placeholder-primary-50 focus:outline-none" placeholder="Enter your email" type="email"/><button class="px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary hover:bg-primary-700 font-label-lg text-label-lg transition-colors" type="submit">Join</button></form><div class="flex items-center gap-space-md pt-space-sm text-on-surface-variant"><div class="flex items-center gap-space-xs font-label-sm text-label-sm"><span class="material-symbols-outlined text-[16px] text-secondary">lock</span><span>256-Bit SSL Secured</span></div><div class="flex items-center gap-space-xs font-label-sm text-label-sm"><span class="material-symbols-outlined text-[16px] text-secondary">shield</span><span>Razorpay Verified</span></div></div></div></div><div class="max-w-7xl mx-auto px-gutter-sm md:px-gutter pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant"><p>© 2026 WaferKing Foods Private Limited. Handcrafted in Erode, Tamil Nadu, India.</p><p class="flex items-center gap-space-sm"><span>All Prices Inclusive of Applicable GST</span><span>•</span><a class="hover:text-on-surface transition-colors" data-path="privacy-policy" href="#">Privacy Policy</a><span>•</span><a class="hover:text-on-surface transition-colors" data-path="terms-of-service" href="#">Terms of Service</a></p></div></footer></body></html>
```
