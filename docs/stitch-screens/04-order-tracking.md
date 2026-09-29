# Stitch Screen: Live Order Tracking — WK-2026-9821

> **Stitch Project ID**: `8109637399058163454`  
> **Screen ID**: `4e27c73f836542c2a61f4aaf592146d4`  
> **Resource Name**: `projects/8109637399058163454/screens/4e27c73f836542c2a61f4aaf592146d4`  
> **Device**: DESKTOP  
> **Canvas Dimensions**: 2560px × 4600px  
> **Content Type**: `text/html`  
> **Screenshot Preview**: [View High-Res Design Screenshot](https://lh3.googleusercontent.com/aida/AEtjO1WCvpW6rrH7JX-udDkTpgrhsUerUal3QdsvZIsMq1ndGBZl1v8z1GGhLpVNxlj8WQj0TjwwZi-L1sIqq5xVAmfIkRnf4IOxvt4De1f8t3tLSodYUnmG52qIHC3FcILUMaEue_Z2QNBI6oDyNnjH_oYOqkzMp4wZeOSuDtwbid5bF82Px5xKYBymrZj3SvAIBeQzPLQD6ynUORn1YcdPlt4CcjhSxPOOj1-52uVYYOv15rKLDelKcx2JrA)  

---

## 1. Screen Overview & UI Structure

![Live Order Tracking — WK-2026-9821](https://lh3.googleusercontent.com/aida/AEtjO1WCvpW6rrH7JX-udDkTpgrhsUerUal3QdsvZIsMq1ndGBZl1v8z1GGhLpVNxlj8WQj0TjwwZi-L1sIqq5xVAmfIkRnf4IOxvt4De1f8t3tLSodYUnmG52qIHC3FcILUMaEue_Z2QNBI6oDyNnjH_oYOqkzMp4wZeOSuDtwbid5bF82Px5xKYBymrZj3SvAIBeQzPLQD6ynUORn1YcdPlt4CcjhSxPOOj1-52uVYYOv15rKLDelKcx2JrA)

- **Screen Title**: Live Order Tracking — WK-2026-9821
- **Target Route in Storefront**: `storefront/src/app/track/[orderId]/page.tsx` (`/track/[orderId]`)

---

## 2. Key UI Elements & Layout Architecture


### Layout Sections:
1. **Tracking Search Bar**:
   - Input fields: Order ID (e.g. WK-2026-9821) and Billing Phone Number
2. **Live Order Header**:
   - Order Number: #WK-2026-9821
   - Order Date, Estimated Delivery Date, Carrier: Delhivery / BlueDart
   - Current Status Badge: *"In Transit — Out for Delivery Soon"*
3. **Multi-Step Visual Stepper**:
   - Step 1: Order Confirmed
   - Step 2: Freshly Packed at Erode Kitchen
   - Step 3: Dispatched & In Transit (Active)
   - Step 4: Delivered
4. **Shipment Activity Log**:
   - Timestamped checkpoint history with city names and status updates
5. **Delivery Address & Summary Snapshot**


---

## 3. Stitch Raw Source Code

```html
<!DOCTYPE html>

<html lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_standard" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={"darkMode":"class","theme":{"extend":{"colors":{"tertiary-fixed":"#ffddb6","outline-variant":"#d3c3c0","error":"#ba1a1a","inverse-on-surface":"#f4f0ea","secondary-fixed-dim":"#9dd3aa","secondary-container":"#b6edc2","surface-container-highest":"#e6e2dc","primary-700":"#2C1B10","inverse-primary":"#e3beb8","on-surface":"#1c1c18","outline":"#827472","background":"#fdf9f3","on-background":"#1c1c18","surface-variant":"#e6e2dc","surface-tint":"#745853","on-tertiary-fixed-variant":"#604011","on-secondary":"#ffffff","surface-container-lowest":"#ffffff","on-tertiary-container":"#b68c57","surface-container-low":"#f7f3ed","accent-700":"#754A22","primary":"#271310","state-error":"#DC2626","on-error":"#ffffff","primary-fixed-dim":"#e3beb8","surface-bright":"#fdf9f3","on-secondary-fixed-variant":"#1e5031","surface":"#fdf9f3","primary-300":"#61492E","background-cream":"#FFFDF9","on-primary":"#ffffff","on-tertiary":"#ffffff","on-primary-fixed-variant":"#5b403c","surface-container-high":"#ebe8e2","on-error-container":"#93000a","state-success":"#16A34A","inverse-surface":"#31302d","primary-fixed":"#ffdad4","tertiary":"#251400","error-container":"#ffdad6","secondary":"#376847","primary-50":"#8B7355","on-primary-container":"#ae8d87","primary-container":"#3e2723","on-tertiary-fixed":"#2a1800","on-secondary-fixed":"#00210e","surface-container":"#f1ede7","on-primary-fixed":"#2b1613","on-secondary-container":"#3b6d4b","on-surface-variant":"#504442","surface-dim":"#dddad4","secondary-fixed":"#b9efc5","background-warm":"#F1E7DA","tertiary-container":"#412700","tertiary-fixed-dim":"#edbe84","accent-50":"#FAF1E6"},"borderRadius":{"DEFAULT":"0.25rem","lg":"0.5rem","xl":"0.75rem","full":"9999px"},"spacing":{"space-xs":"0.25rem","space-lg":"1.5rem","margin":"2rem","space-md":"1rem","space-xl":"2.5rem","gutter-sm":"1rem","margin-mobile":"1rem","gutter":"1.5rem","space-sm":"0.5rem"},"fontFamily":{"headline-lg":["Outfit"],"label-md":["Inter"],"body-md":["Inter"],"headline-xl":["Outfit"],"body-sm":["Inter"],"headline-xl-mobile":["Outfit"],"headline-sm":["Outfit"],"headline-lg-mobile":["Outfit"],"label-lg":["Inter"],"headline-md":["Outfit"],"body-lg":["Inter"],"label-sm":["Inter"]},"fontSize":{"headline-lg":["36px",{"lineHeight":"44px","fontWeight":"600"}],"label-md":["12px",{"lineHeight":"16px","fontWeight":"600"}],"body-md":["16px",{"lineHeight":"24px","fontWeight":"400"}],"headline-xl":["48px",{"lineHeight":"56px","fontWeight":"700"}],"body-sm":["14px",{"lineHeight":"20px","fontWeight":"400"}],"headline-xl-mobile":["32px",{"lineHeight":"40px","fontWeight":"700"}],"headline-sm":["20px",{"lineHeight":"28px","fontWeight":"600"}],"headline-lg-mobile":["26px",{"lineHeight":"34px","fontWeight":"600"}],"label-lg":["14px",{"lineHeight":"20px","fontWeight":"600"}],"headline-md":["24px",{"lineHeight":"32px","fontWeight":"600"}],"body-lg":["18px",{"lineHeight":"28px","fontWeight":"400"}],"label-sm":["11px",{"lineHeight":"14px","fontWeight":"500"}]}}}};</script></head><body class="bg-background font-body-md text-on-surface antialiased"><header class="fixed top-0 left-0 right-0 z-50 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="bg-tertiary-container text-tertiary-fixed-dim text-center py-space-xs px-margin-mobile md:px-margin font-label-sm text-label-sm tracking-wide flex items-center justify-center gap-space-xs"><span class="material-symbols-outlined text-[14px] text-tertiary-fixed-dim">local_shipping</span><span>Free Shipping across India on orders over ₹499 | Handcrafted in Erode, Tamil Nadu</span></div><div class="h-20 bg-surface/90 backdrop-blur-xl"><div class="max-w-7xl mx-auto h-full px-gutter-sm md:px-gutter flex items-center justify-between gap-space-md"><div class="flex items-center gap-space-sm"><img alt="WaferKing Logo" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1VKEDdlq-eMyp5fq9B0nouVtYvr429cZ6uM40eA7ubKtZiEqY0H1PoxVLaW_8RT2elpiWL4I8zjHT0n4EU0BV3EmapvGdSwT1vDKxunDQc0NzUd6hwlXIWKWfgQ4zQwtTDCrZPrNN86BXmphhtxeze2nq19zANzkDXFVcIKHF5v6fSz8s-nRYPuByyLRJQ3F7dZOao-VP65wGluutayM6oyl_epTmxll79DVpOAWOPgwU1_Syd3l5BgQ3M"/><div class="flex flex-col"><span class="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">WaferKing</span><span class="font-label-sm text-label-sm text-primary-50 tracking-wider uppercase -mt-1 hidden sm:inline-block">Artisan Black Rice</span></div></div><nav class="hidden lg:flex items-center gap-space-sm" data-active-classes="bg-primary-container text-on-primary font-label-lg rounded-lg"><a class="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" data-path="shop" href="#">Shop</a><a class="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" data-path="our-story" href="#">Our Story</a><a class="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" data-path="flavours" href="#">Flavours</a><a aria-current="page" class="px-space-sm py-space-xs transition-colors bg-primary-container text-on-primary font-label-lg rounded-lg" data-path="track-order" href="#">Track Order</a><a class="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" data-path="faq" href="#">FAQ</a><a class="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" data-path="contact" href="#">Contact</a></nav><div class="flex items-center gap-space-sm"><button class="p-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" type="button"><span class="material-symbols-outlined">search</span></button><button class="flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-primary-container text-on-primary hover:bg-primary-700 transition-colors" type="button"><span class="material-symbols-outlined text-[20px]">shopping_bag</span><span class="font-label-lg text-label-lg">Cart (3)</span></button><div class="pl-space-xs flex items-center"><img alt="Profile" class="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGHXkE-e44qdo0CNRvlg_ShnYK6_55-K2vQjZUcOSAN4KmgEMFkHp4OTQnAQewTLTwHSTyJcuKes-JxYAoCF0vULixh9t7oLD2L6UJHLInmds5cW7YZJry6I9VUbePKJQoCoslD53rUr_55ijjSmqkA_sBMG2xkRnopVa_IT3BFuXzkmNHRWzAcuaDS09_ImfNmakJ9NkDlS7JLLfxWkUzc57UaRFXO2DnJWleC_5NzDpn6RSfjvh3"/></div></div></div></div></header><main class="w-full pt-20 bg-background"><div class="flex flex-col w-full">
<!-- Subtle Header Notification & Track Context -->
<div class="w-full bg-surface-container-low py-space-sm px-gutter-sm md:px-gutter">
<div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-[16px] text-secondary">local_shipping</span>
<span>Consignment Ref: <strong class="text-primary font-semibold">WK-2026-9821</strong></span>
<span class="text-outline-variant">•</span>
<span>AWB: DEL-8392019482</span>
</div>
<div class="flex items-center gap-space-sm">
<span class="inline-flex items-center gap-1 text-secondary">
<span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          Live GPS Telemetry Active
        </span>
</div>
</div>
</div>
<section class="max-w-7xl mx-auto w-full px-gutter-sm md:px-gutter py-space-lg lg:py-space-xl flex flex-col gap-space-lg">
<!-- Top Bar: Tracking / Quick Lookup -->
<div class="bg-background-cream p-space-md md:p-space-lg rounded-xl shadow-sm">
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<div>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-accent-700">Artisan Consignment Dispatch</span>
<h1 class="font-headline-md text-headline-md text-primary mt-1">Track Consignment</h1>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Real-time status of your stone-ground heirloom wafers from our Erode bakehouse.</p>
</div>
<form class="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-xs bg-surface-container-low p-1.5 rounded-lg shadow-inner" id="track-form" onsubmit="event.preventDefault();">
<div class="relative flex-1 min-w-[180px]">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-primary-50">tag</span>
<input aria-label="Order Number" class="w-full bg-transparent pl-9 pr-3 py-2 text-primary font-body-sm text-body-sm focus:outline-none placeholder-primary-50" id="order-no" placeholder="Order #" type="text" value="WK-2026-9821"/>
</div>
<div class="relative flex-1 min-w-[190px]">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-primary-50">phone_iphone</span>
<input aria-label="Phone Number" class="w-full bg-transparent pl-9 pr-3 py-2 text-primary font-body-sm text-body-sm focus:outline-none placeholder-primary-50" id="phone-no" placeholder="Phone Number" type="text" value="+91 98421 82910"/>
</div>
<button class="px-space-md py-2.5 rounded-md bg-primary-container text-on-primary hover:bg-primary-700 font-label-md text-label-md transition-all flex items-center justify-center gap-1 active:scale-95 shadow-sm" id="btn-refresh-track" type="submit">
<span class="material-symbols-outlined text-[16px]">search</span>
<span>Track Shipment</span>
</button>
</form>
</div>
</div>
<!-- Main Grid: Status Hero + Timeline & Contents -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
<!-- Left Column: Primary Details & Detailed Timeline (8 cols) -->
<div class="lg:col-span-8 flex flex-col gap-space-lg">
<!-- Shipment Overview Card -->
<div class="bg-background-cream p-space-lg md:p-space-xl rounded-xl shadow-sm relative overflow-hidden">
<div class="absolute -right-12 -top-12 w-48 h-48 bg-tertiary-fixed-dim/15 rounded-full blur-3xl pointer-events-none"></div>
<div class="flex flex-wrap items-center justify-between gap-space-sm pb-space-md">
<div>
<div class="flex items-center gap-space-xs flex-wrap">
<span class="font-headline-sm text-headline-sm text-primary">Consignment #WK-2026-9821</span>
<span class="px-space-sm py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-semibold tracking-wide flex items-center gap-1">
<span class="w-1.5 h-1.5 rounded-full bg-on-tertiary-fixed-variant animate-ping"></span>
                  IN TRANSIT — ON SCHEDULE
                </span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Single-origin Karuppu Kavuni wafers crafted on order.</p>
</div>
<a class="inline-flex items-center gap-1.5 text-accent-700 hover:text-primary font-label-md text-label-md underline underline-offset-4 transition-colors" href="https://www.delhivery.com" rel="noopener noreferrer" target="_blank">
<span>Delhivery Direct Portal</span>
<span class="material-symbols-outlined text-[16px]">open_in_new</span>
</a>
</div>
<!-- Highlight Delivery Pill Box -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-space-md p-space-md bg-surface-container rounded-lg my-space-sm">
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-primary-50 uppercase tracking-wider">Estimated Delivery</span>
<span class="font-headline-sm text-headline-sm text-primary font-bold mt-0.5">Tomorrow, 4:00 PM</span>
<span class="font-body-sm text-body-sm text-secondary font-medium">Friday, Oct 2, 2026</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-primary-50 uppercase tracking-wider">Courier Partner</span>
<div class="flex items-center gap-1.5 mt-0.5">
<span class="material-symbols-outlined text-[18px] text-secondary">flight_takeoff</span>
<span class="font-label-lg text-label-lg text-primary font-semibold">Delhivery Express Air</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant font-mono">AWB: DEL-8392019482</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-primary-50 uppercase tracking-wider">Destination</span>
<span class="font-label-lg text-label-lg text-primary font-semibold mt-0.5 truncate">Vignesh S. (Home)</span>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">Erode, Tamil Nadu 638011</span>
</div>
</div>
<!-- Destination details drawer & verification strip -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pt-space-xs text-on-surface-variant font-body-sm text-body-sm">
<div class="flex items-start gap-2">
<span class="material-symbols-outlined text-[18px] text-accent-700 mt-0.5">pin_drop</span>
<span><strong>Shipping Address:</strong> 14 Perundurai Road, Near Collectorate Complex, Erode, TN — 638011</span>
</div>
<div class="flex items-center gap-1.5 text-secondary font-label-sm text-label-sm self-start sm:self-auto shrink-0 bg-secondary-container/40 px-space-sm py-1 rounded-full">
<span class="material-symbols-outlined text-[14px]">format_image_left</span>
<span>OTP Required on Delivery</span>
</div>
</div>
</div>
<!-- Visual Stepper & Live Timeline Card -->
<div class="bg-background-cream p-space-lg md:p-space-xl rounded-xl shadow-sm flex flex-col gap-space-lg">
<div class="flex flex-wrap items-center justify-between gap-space-sm">
<div>
<h2 class="font-headline-sm text-headline-sm text-primary">Live Tracking Timeline</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant">Step-by-step milestones from traditional stone-grinding to your doorstep.</p>
</div>
<span class="font-label-sm text-label-sm text-primary-50 bg-surface-container px-2.5 py-1 rounded-full">Latest Ping: 12 mins ago</span>
</div>
<!-- Vertical Timeline with Rich Micro-Content -->
<div class="relative pl-6 md:pl-8 space-y-space-lg">
<!-- Continuous Connector Track -->
<div class="absolute left-[15px] md:left-[19px] top-3 bottom-5 w-0.5 bg-background-warm -z-0"></div>
<!-- STEP 1: COMPLETED -->
<div class="relative flex items-start gap-space-md group">
<div class="absolute -left-[24px] md:-left-[28px] top-1 w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-sm">
<span class="material-symbols-outlined text-[15px]">check</span>
</div>
<div class="flex-1 bg-surface-container-low p-space-md rounded-lg shadow-sm">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
<h3 class="font-headline-sm text-headline-sm text-primary text-[17px]">Order Placed &amp; Confirmed</h3>
<span class="font-label-sm text-label-sm text-primary-50">28 Sep 2026, 10:30 AM</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Payment verified via Razorpay UPI (Ref: pay_NZ9201948). Order received by our master bakeshop team.</p>
<div class="mt-2 flex items-center gap-space-xs">
<span class="inline-flex items-center gap-1 font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-accent-50 text-accent-700">
<span class="material-symbols-outlined text-[13px]">receipt</span> Automated Tax Invoice Generated
                  </span>
</div>
</div>
</div>
<!-- STEP 2: COMPLETED -->
<div class="relative flex items-start gap-space-md group">
<div class="absolute -left-[24px] md:-left-[28px] top-1 w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-sm">
<span class="material-symbols-outlined text-[15px]">check</span>
</div>
<div class="flex-1 bg-surface-container-low p-space-md rounded-lg shadow-sm">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
<h3 class="font-headline-sm text-headline-sm text-primary text-[17px]">Crafted &amp; Packed in Erode</h3>
<span class="font-label-sm text-label-sm text-primary-50">28 Sep 2026, 04:15 PM</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Fresh batch <strong class="text-primary font-medium">#BK-410</strong> small-batch baked, moisture-sealed with food-grade nitrogen flush to preserve artisanal snap.</p>
<div class="mt-2.5 flex flex-wrap items-center gap-space-xs font-label-sm text-label-sm">
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">Roaster Unit: Alpha-Kaveri</span>
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">Quality Officer: Arumugam R.</span>
<span class="px-2 py-0.5 rounded bg-secondary-container/40 text-secondary font-medium">QC Passed (Moisture &lt; 2.1%)</span>
</div>
</div>
</div>
<!-- STEP 3: COMPLETED -->
<div class="relative flex items-start gap-space-md group">
<div class="absolute -left-[24px] md:-left-[28px] top-1 w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-sm">
<span class="material-symbols-outlined text-[15px]">check</span>
</div>
<div class="flex-1 bg-surface-container-low p-space-md rounded-lg shadow-sm">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
<h3 class="font-headline-sm text-headline-sm text-primary text-[17px]">Handed to Delhivery Hub</h3>
<span class="font-label-sm text-label-sm text-primary-50">29 Sep 2026, 08:30 AM</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Picked up from WaferKing Bakehouse dispatch bay. Transferred via express transit to Coimbatore Regional Air Sortation Facility.</p>
<div class="mt-2 text-on-surface-variant font-label-sm text-label-sm">
                  Consignment manifest closed: CJB-HUB-SORT-04
                </div>
</div>
</div>
<!-- STEP 4: ACTIVE / IN-PROGRESS -->
<div class="relative flex items-start gap-space-md group">
<div class="absolute -left-[24px] md:-left-[28px] top-1 w-6 h-6 rounded-full bg-primary-container text-on-primary ring-4 ring-tertiary-fixed-dim/50 flex items-center justify-center shadow-md">
<span class="material-symbols-outlined text-[15px] animate-spin">autorenew</span>
</div>
<div class="flex-1 bg-accent-50/70 p-space-md rounded-lg shadow-sm">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
<div class="flex items-center gap-2">
<h3 class="font-headline-sm text-headline-sm text-primary text-[17px]">In Transit to Destination Center</h3>
<span class="px-2 py-0.5 rounded-full bg-accent-700 text-on-primary font-label-sm text-label-sm">ACTIVE NOW</span>
</div>
<span class="font-label-sm text-label-sm text-accent-700 font-semibold">30 Sep 2026, 11:20 AM</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1.5">Package arrived at Erode Central Sorting Facility. Sorting completed for designated delivery beat #ERD-WEST-09.</p>
<!-- Mini Route Progress Card -->
<div class="mt-space-sm bg-background-cream p-space-sm rounded-lg flex flex-col gap-2">
<div class="flex justify-between items-center font-label-sm text-label-sm text-primary-50">
<span>Origin: Erode Bakehouse</span>
<span>Transit Hub: Coimbatore Air</span>
<span class="text-primary font-semibold">Current: Erode Delivery Station</span>
</div>
<!-- Progress bar -->
<div class="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div class="bg-accent-700 h-full rounded-full transition-all duration-500" style="width: 78%;"></div>
</div>
<span class="font-label-sm text-label-sm text-accent-700 flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">info</span>
                    Linehaul freight arrived on schedule without temperature variation.
                  </span>
</div>
</div>
</div>
<!-- STEP 5: UPCOMING -->
<div class="relative flex items-start gap-space-md opacity-70">
<div class="absolute -left-[24px] md:-left-[28px] top-1 w-6 h-6 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
<span class="material-symbols-outlined text-[15px]">schedule</span>
</div>
<div class="flex-1 bg-surface-container-low p-space-md rounded-lg">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
<h3 class="font-headline-sm text-headline-sm text-on-surface text-[17px]">Out for Delivery &amp; Doorstep Drop</h3>
<span class="font-label-sm text-label-sm text-primary-50">Expected Tomorrow, 02 Oct</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Designated courier pilot will initiate delivery contact via call/SMS prior to dispatch.</p>
</div>
</div>
</div>
</div>
<!-- Carrier Telemetry / Dispatch Location Preview -->
<div class="bg-background-cream p-space-lg rounded-xl shadow-sm">
<div class="flex items-center justify-between pb-space-sm">
<div>
<h3 class="font-headline-sm text-headline-sm text-primary">Regional Transit Geography</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Live station checkpoint near delivery beat.</p>
</div>
<span class="material-symbols-outlined text-[24px] text-primary-50">share_location</span>
</div>
<div class="w-full h-56 bg-cover bg-center rounded-lg relative overflow-hidden flex items-end p-space-md shadow-inner" data-location="Erode, Tamil Nadu" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDyJ6nwC4Kfcr6PAW8SbhL_JenrtLOQ2wEGNqxtEptuNj3YDg0u9Wlfo5PWASy6YJU0xGROBtgdKMUPa2vfFuaiJ_6txHAhiuQuiqYnH4qUxDfx9jOyOUgOuQaQmZPfXUm6tl-FwdR1_QsVzRRHhwrMg2DsiiF6gNmcNN2cN_JyfLRekLck94jQxn6S8-NPGwdi5FVResQVHqfpRtU-IDOr5QRaD0twsRO3Br2SwaVBOeeooo8GJd-H');">
<div class="bg-surface/90 backdrop-blur-md p-space-sm rounded-lg max-w-md shadow-md flex items-center gap-space-sm">
<div class="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-secondary shrink-0">
<span class="material-symbols-outlined text-[20px]">local_shipping</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-primary-50 uppercase tracking-wider">Current Station Hub</span>
<span class="font-label-lg text-label-lg text-primary font-semibold">Delhivery Hub, Chennimalai Road, Erode</span>
<span class="font-body-sm text-body-sm text-secondary text-[12px]">Last pinged: 30 Sep, 11:20 AM IST</span>
</div>
</div>
</div>
</div>
</div>
<!-- Right Column: Package Contents, Billing & Actions (4 cols) -->
<div class="lg:col-span-4 flex flex-col gap-space-lg">
<!-- Package Contents Preview Card -->
<div class="bg-background-cream p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
<div class="flex items-center justify-between">
<h3 class="font-headline-sm text-headline-sm text-primary">Consignment Items</h3>
<span class="font-label-sm text-label-sm text-accent-700 bg-accent-50 px-2 py-0.5 rounded-full font-semibold">2 Flavours (3 Packs)</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Packaged in oxygen-barrier pouches with biodegradable outer wrap.</p>
<div class="space-y-space-sm divide-y-0">
<!-- Item 1: Avarampoo Black Rice -->
<div class="flex items-center gap-space-sm bg-surface-container-low p-space-sm rounded-lg">
<img class="w-16 h-16 object-cover rounded-md bg-background-warm shrink-0" data-alt="Golden crisp Avarampoo flower infused black rice organic wafer snacks in an artisan botanical pouch pack with golden flower illustrations on textured craft paper background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsVP7u7YnN-tcsPsM8dEZ7x6G9lcocOtDPBPUnSe-uGKR-KZpqf0FyJTKk2vOX7Tz681c955sT2dVq1Gy2x2AjdTtrKIjNnuEgNIwKWnlPqHZPC5-EiI9e3KXOk3S2mJrdliHP3miodmWu5A3wDlxU4fwgdW4rbgkTfB-ZxQdSTqV6sNQsn4Wbvk8B0QDCa6KfLK31SZ0HNgaQFeIR8AOgOtX4o_M11cE1UwD-XOPPL7XbZR5Ymi4v"/>
<div class="flex-1 min-w-0">
<div class="flex justify-between items-start">
<h4 class="font-label-lg text-label-lg text-primary truncate">Avarampoo Black Rice Wafers</h4>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant">Qty: 2 • 55g each</span>
<div class="flex justify-between items-center mt-1">
<span class="font-label-sm text-label-sm text-secondary font-medium">Stone-Ground Kavuni</span>
<span class="font-label-md text-label-md text-primary font-semibold">₹160.00</span>
</div>
</div>
</div>
<!-- Item 2: Hibiscus Ruby Wafers -->
<div class="flex items-center gap-space-sm bg-surface-container-low p-space-sm rounded-lg">
<img class="w-16 h-16 object-cover rounded-md bg-background-warm shrink-0" data-alt="Artisanal crimson hibiscus petal wafer pack made with heirloom purple rice in clean minimalist pantry packaging with botanical tea petals nearby" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2OY0bh7s46w-A67v-5kOG1-SvWxw6scRRyELwE9EXlNGrLRjTToeBGI78LGLVLgtO9v1Z1nIPPbJe0fyMtAkXNEgRUycjLfuroGaZY_JiYjXfJtb84G7EBpbRhxjHhQfGOm8Xgkr3fB8fsbi1gfdkJgfKpscaTcSBsg0IJEI45zzHNhqn9a_9dUsW4vkL3HOqwcnTUskHofEuP4oJLzpQI7EA2XRkeMIYyQcdpMTWrSMGcwP2OLgT"/>
<div class="flex-1 min-w-0">
<div class="flex justify-between items-start">
<h4 class="font-label-lg text-label-lg text-primary truncate">Hibiscus Ruby Petal Wafers</h4>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant">Qty: 1 • 55g</span>
<div class="flex justify-between items-center mt-1">
<span class="font-label-sm text-label-sm text-secondary font-medium">Herbal Antioxidant</span>
<span class="font-label-md text-label-md text-primary font-semibold">₹80.00</span>
</div>
</div>
</div>
</div>
<!-- Financial Breakdown Summary -->
<div class="bg-surface-container p-space-sm rounded-lg flex flex-col gap-1.5 font-body-sm text-body-sm">
<div class="flex justify-between text-on-surface-variant">
<span>Subtotal (3 items)</span>
<span>₹240.00</span>
</div>
<div class="flex justify-between text-on-surface-variant">
<span>Artisan Packaging</span>
<span class="text-secondary font-medium">Free</span>
</div>
<div class="flex justify-between text-on-surface-variant">
<span>Express Regional Logistics</span>
<span class="text-secondary font-medium">Free</span>
</div>
<div class="flex justify-between text-primary font-headline-sm text-[16px] font-bold pt-2 mt-1">
<span>Total Paid (UPI)</span>
<span>₹240.00</span>
</div>
<span class="font-label-sm text-label-sm text-primary-50 text-right">Includes ₹11.42 GST (5%)</span>
</div>
<!-- Freshness Promise -->
<div class="flex items-start gap-space-xs p-space-sm bg-accent-50 rounded-lg text-accent-700">
<span class="material-symbols-outlined text-[18px] shrink-0 mt-0.5">verified_user</span>
<p class="font-label-sm text-label-sm leading-tight">
<strong>Guaranteed Crisp Seal:</strong> Crafted less than 72 hours ago. If the crunch is anything less than immaculate, immediate free batch replacement.
            </p>
</div>
</div>
<!-- Help & Action Hub Card -->
<div class="bg-background-cream p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
<h3 class="font-headline-sm text-headline-sm text-primary">Need Support?</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Direct liaison with our master dispatch team in Erode.</p>
<div class="flex flex-col gap-space-xs">
<!-- Action 1: WhatsApp Support -->
<a class="w-full flex items-center justify-between p-space-sm bg-secondary text-on-secondary rounded-lg hover:bg-secondary/90 transition-colors shadow-sm" href="https://wa.me/919842182910?text=Hi%20WaferKing%2C%20inquiry%20regarding%20WK-2026-9821" rel="noopener noreferrer" target="_blank">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-[20px]">chat</span>
<span class="font-label-lg text-label-lg">WhatsApp Concierge</span>
</div>
<span class="font-label-sm text-label-sm opacity-90">Replies &lt; 5m</span>
</a>
<!-- Action 2: Download Tax Invoice -->
<button class="w-full flex items-center justify-between p-space-sm bg-surface-container text-primary rounded-lg hover:bg-surface-container-high transition-colors font-label-lg text-label-lg" onclick="alert('Downloading Tax Invoice #INV-2026-WK9821 (PDF)...')" type="button">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-[20px] text-accent-700">download</span>
<span>Download Tax Invoice (PDF)</span>
</div>
<span class="material-symbols-outlined text-[16px] text-primary-50">arrow_forward_ios</span>
</button>
<!-- Action 3: Reschedule Delivery Window -->
<button class="w-full flex items-center justify-between p-space-sm bg-surface-container text-primary rounded-lg hover:bg-surface-container-high transition-colors font-label-lg text-label-lg" onclick="alert('Your delivery note has been forwarded to Delhivery Courier Pilot.')" type="button">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-[20px] text-primary-50">edit_calendar</span>
<span>Add Gate Drop Note</span>
</div>
<span class="material-symbols-outlined text-[16px] text-primary-50">arrow_forward_ios</span>
</button>
</div>
<!-- Bottom Navigation Link -->
<div class="pt-space-xs flex items-center justify-center">
<a class="inline-flex items-center gap-1.5 font-label-md text-label-md text-accent-700 hover:text-primary transition-colors py-1" data-path="shop" href="#">
<span class="material-symbols-outlined text-[16px]">arrow_back</span>
<span>Back to Pantry Collection</span>
</a>
</div>
</div>
<!-- Artisan Baker Note Badge -->
<div class="bg-surface-container-low p-space-md rounded-xl flex items-center gap-space-sm">
<img class="w-12 h-12 rounded-full object-cover shrink-0" data-alt="Traditional stone mill grinding organic black rice with earthy textures in Tamil Nadu bakehouse kitchen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQiFBL4jTWzxrZi6pHb3Dqu2QXkENvv6KUy4A_2TddluZZk5ZxTW9jg7hn66jBiWoUqEStQvO3-5seZh_f6-tVCFqoSkKTYIzrkNqgRIcXtrFdh8PAtg83jWxqiyW_PJSEL8aeY1kD0_ymDD9mIs9GCJ2q1SBXa5Vvz1z2BWs29JB9Z0hOA-gafSLABmZAIuymgR3-C08GAoUTVlqE8tAbQ20yJpvQysA_roBQHKkhZa188mya4Cli"/>
<div>
<h4 class="font-label-md text-label-md text-primary font-semibold">Heirloom Quality Standard</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant text-[13px] leading-snug">Zero refined palm oil, no artificial binders, slow baked with Kaveri spring-water hydration.</p>
</div>
</div>
</div>
</div>
</section>
<!-- Interactive JavaScript for Tab Lookup Micro-Interaction -->
<script>
    (function() {
      const btn = document.getElementById('btn-refresh-track');
      if (btn) {
        btn.addEventListener('click', function() {
          const originalText = btn.innerHTML;
          btn.innerHTML = '<span class="material-symbols-outlined text-[16px] animate-spin">sync</span><span>Syncing...</span>';
          btn.disabled = true;
          setTimeout(function() {
            btn.innerHTML = '<span class="material-symbols-outlined text-[16px]">check</span><span>Updated!</span>';
            setTimeout(function() {
              btn.innerHTML = originalText;
              btn.disabled = false;
            }, 1200);
          }, 800);
        });
      }
    })();
  </script>
</div></main><footer class="w-full bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-space-xl pb-space-lg text-on-surface"><div class="max-w-7xl mx-auto px-gutter-sm md:px-gutter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl pb-space-xl"><div class="flex flex-col gap-space-sm"><div class="flex items-center gap-space-xs"><span class="font-headline-sm text-headline-sm text-primary font-bold">WaferKing</span></div><p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Handcrafted with heirloom Karuppu Kavuni traditional black rice in the Kaveri delta plains of Erode, Tamil Nadu. Clean wellness, slow stone-ground nutrition, and exquisite crunch.</p><div class="flex items-center gap-space-xs pt-space-xs"><span class="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-accent-50 text-accent-700 font-label-sm text-label-sm"><span class="material-symbols-outlined text-[16px]">verified</span>FSSAI Lic. #12423008000492</span></div></div><div class="flex flex-col gap-space-sm"><h4 class="font-label-lg text-label-lg text-primary uppercase tracking-wider">The Collection</h4><ul class="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant"><li><a class="hover:text-on-surface transition-colors" data-path="shop" href="#">Avarampoo Black Rice Wafers</a></li><li><a class="hover:text-on-surface transition-colors" data-path="shop" href="#">Hibiscus Petal Crunch Wafers</a></li><li><a class="hover:text-on-surface transition-colors" data-path="shop" href="#">Makhana Crunch Roasted Crisps</a></li><li><a class="hover:text-on-surface transition-colors" data-path="shop" href="#">Vallarai Herbal Infused Crisp</a></li><li><a class="hover:text-on-surface transition-colors" data-path="shop" href="#">The Royal Heritage Sampler Box</a></li></ul></div><div class="flex flex-col gap-space-sm"><h4 class="font-label-lg text-label-lg text-primary uppercase tracking-wider">Customer Care</h4><ul class="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant"><li><a class="hover:text-on-surface transition-colors" data-path="track-order" href="#">Track Your Consignment</a></li><li><a class="hover:text-on-surface transition-colors" data-path="shipping-policy" href="#">Shipping &amp; Domestic Express</a></li><li><a class="hover:text-on-surface transition-colors" data-path="returns-and-refund" href="#">Returns &amp; Freshness Guarantee</a></li><li><a class="hover:text-on-surface transition-colors" data-path="contact" href="#">Contact Our Kitchen Team</a></li><li><a class="hover:text-on-surface transition-colors" data-path="faq" href="#">Frequently Asked Questions</a></li></ul></div><div class="flex flex-col gap-space-sm"><h4 class="font-label-lg text-label-lg text-primary uppercase tracking-wider">Artisan Pantry Club</h4><p class="font-body-sm text-body-sm text-on-surface-variant">Receive 10% off your initial sampler box, botanical harvest updates, and seasonal specials.</p><form class="flex flex-col sm:flex-row gap-space-xs pt-space-xs" onsubmit="return false;"><input class="flex-1 bg-background-cream px-space-md py-space-xs rounded-lg font-body-sm text-body-sm text-primary placeholder-primary-50 focus:outline-none" placeholder="Enter your email" type="email"/><button class="px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary hover:bg-primary-700 font-label-lg text-label-lg transition-colors" type="submit">Join</button></form><div class="flex items-center gap-space-md pt-space-sm text-on-surface-variant"><div class="flex items-center gap-space-xs font-label-sm text-label-sm"><span class="material-symbols-outlined text-[16px] text-secondary">lock</span><span>256-Bit SSL Secured</span></div><div class="flex items-center gap-space-xs font-label-sm text-label-sm"><span class="material-symbols-outlined text-[16px] text-secondary">shield</span><span>Razorpay Verified</span></div></div></div></div><div class="max-w-7xl mx-auto px-gutter-sm md:px-gutter pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant"><p>© 2026 WaferKing Foods Private Limited. Handcrafted in Erode, Tamil Nadu, India.</p><p class="flex items-center gap-space-sm"><span>All Prices Inclusive of Applicable GST</span><span>•</span><a class="hover:text-on-surface transition-colors" data-path="privacy-policy" href="#">Privacy Policy</a><span>•</span><a class="hover:text-on-surface transition-colors" data-path="terms-of-service" href="#">Terms of Service</a></p></div></footer></body></html>
```
