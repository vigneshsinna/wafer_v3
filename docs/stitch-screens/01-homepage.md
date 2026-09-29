# Stitch Screen: Homepage — Artisan Black Rice Wafers

> **Stitch Project ID**: `8109637399058163454`  
> **Screen ID**: `821c0d97c8564f48a1c21e503e7c2f30`  
> **Resource Name**: `projects/8109637399058163454/screens/821c0d97c8564f48a1c21e503e7c2f30`  
> **Device**: DESKTOP  
> **Canvas Dimensions**: 2560px × 10152px  
> **Content Type**: `text/html`  
> **Screenshot Preview**: [View High-Res Design Screenshot](https://lh3.googleusercontent.com/aida/AEtjO1Wzck1srh4kRAtgk6R_FiZQbskYWa-9ZAVw9TV_ioLazorpEZ13hlNarWXixTzv2QGUWrURxjKVLCselUY-TDkEd3lGZeqZ7kpa6rkMIsijUQsqIJAD-0HJI5Dqyr_3rH1XuA7iv6Vvkfu-SHpmh5fBdHTD5NPX1Riub0dD12euxwJ2tqjFKbW8Ph-pY2eRp_AxHNeNxruk2VEnAJudJdmB-EYZm-R_RiAOe0CgcwQ8-VQ_jo3TpwNiwJM)  

---

## 1. Screen Overview & UI Structure

![Homepage — Artisan Black Rice Wafers](https://lh3.googleusercontent.com/aida/AEtjO1Wzck1srh4kRAtgk6R_FiZQbskYWa-9ZAVw9TV_ioLazorpEZ13hlNarWXixTzv2QGUWrURxjKVLCselUY-TDkEd3lGZeqZ7kpa6rkMIsijUQsqIJAD-0HJI5Dqyr_3rH1XuA7iv6Vvkfu-SHpmh5fBdHTD5NPX1Riub0dD12euxwJ2tqjFKbW8Ph-pY2eRp_AxHNeNxruk2VEnAJudJdmB-EYZm-R_RiAOe0CgcwQ8-VQ_jo3TpwNiwJM)

- **Screen Title**: Homepage — Artisan Black Rice Wafers
- **Target Route in Storefront**: `storefront/src/app/page.tsx` (`/`)

---

## 2. Key UI Elements & Layout Architecture


### Layout Sections:
1. **Top Announcement Bar**: "Free Shipping Across India Over ₹499 • Crafted In Erode, Tamil Nadu"
2. **Global Navigation Bar**:
   - Left: WaferKing Logo Mark & Wordmark
   - Center: Nav Links (`Shop`, `Our Story`, `Flavours`, `Health`, `Track Order`)
   - Right: Search input, User Account icon, Cart trigger button with golden item count badge
3. **Hero Showcase**:
   - Headline: *"Artisan Black Rice Wafers"* (Font: Outfit, Bold)
   - Eyebrow: *"TRADITIONAL GRAINS, MODERN CRUNCH"* (Font: Inter, tracking-widest)
   - Description: Nutrient-dense Karuppu Kavuni rice wafers roasted to crisp perfection in Erode with organic native botanicals.
   - Primary Action Button: "Explore Flavours"
   - Secondary Action Button: "Our Heritage Story"
   - Floating Attribute Badges: *"100% Gluten Free"*, *"Zero Palm Oil"*, *"Rich in Anthocyanin"*
4. **Trust Badges Row**:
   - Direct-from-Farm Erode Sourcing
   - 100% Whole Grain Black Rice
   - 55g Nitrogen-flushed Fresh Packs
5. **Collection Grid**:
   - 4 Flavour Cards: Avarampoo, Hibiscus, Makhana, Vallarai
   - Pack Weight: 55g
   - Price: ₹80 (strike-through MRP ₹95)
   - Quick Add to Cart Button with counter
6. **Health Comparison Matrix**:
   - Refined Potato/Corn Chips vs WaferKing Black Rice Wafers
7. **Customer Testimonials & Reviews Carousel**
8. **Newsletter & 10% First Order Incentive**
9. **Global 4-Column Footer**


---

## 3. Stitch Raw Source Code

```html
<!DOCTYPE html>

<html lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_standard" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={"darkMode":"class","theme":{"extend":{"colors":{"tertiary-fixed":"#ffddb6","outline-variant":"#d3c3c0","error":"#ba1a1a","inverse-on-surface":"#f4f0ea","secondary-fixed-dim":"#9dd3aa","secondary-container":"#b6edc2","surface-container-highest":"#e6e2dc","primary-700":"#2C1B10","inverse-primary":"#e3beb8","on-surface":"#1c1c18","outline":"#827472","background":"#fdf9f3","on-background":"#1c1c18","surface-variant":"#e6e2dc","surface-tint":"#745853","on-tertiary-fixed-variant":"#604011","on-secondary":"#ffffff","surface-container-lowest":"#ffffff","on-tertiary-container":"#b68c57","surface-container-low":"#f7f3ed","accent-700":"#754A22","primary":"#271310","state-error":"#DC2626","on-error":"#ffffff","primary-fixed-dim":"#e3beb8","surface-bright":"#fdf9f3","on-secondary-fixed-variant":"#1e5031","surface":"#fdf9f3","primary-300":"#61492E","background-cream":"#FFFDF9","on-primary":"#ffffff","on-tertiary":"#ffffff","on-primary-fixed-variant":"#5b403c","surface-container-high":"#ebe8e2","on-error-container":"#93000a","state-success":"#16A34A","inverse-surface":"#31302d","primary-fixed":"#ffdad4","tertiary":"#251400","error-container":"#ffdad6","secondary":"#376847","primary-50":"#8B7355","on-primary-container":"#ae8d87","primary-container":"#3e2723","on-tertiary-fixed":"#2a1800","on-secondary-fixed":"#00210e","surface-container":"#f1ede7","on-primary-fixed":"#2b1613","on-secondary-container":"#3b6d4b","on-surface-variant":"#504442","surface-dim":"#dddad4","secondary-fixed":"#b9efc5","background-warm":"#F1E7DA","tertiary-container":"#412700","tertiary-fixed-dim":"#edbe84","accent-50":"#FAF1E6"},"borderRadius":{"DEFAULT":"0.25rem","lg":"0.5rem","xl":"0.75rem","full":"9999px"},"spacing":{"space-xs":"0.25rem","space-lg":"1.5rem","margin":"2rem","space-md":"1rem","space-xl":"2.5rem","gutter-sm":"1rem","margin-mobile":"1rem","gutter":"1.5rem","space-sm":"0.5rem"},"fontFamily":{"headline-lg":["Outfit"],"label-md":["Inter"],"body-md":["Inter"],"headline-xl":["Outfit"],"body-sm":["Inter"],"headline-xl-mobile":["Outfit"],"headline-sm":["Outfit"],"headline-lg-mobile":["Outfit"],"label-lg":["Inter"],"headline-md":["Outfit"],"body-lg":["Inter"],"label-sm":["Inter"]},"fontSize":{"headline-lg":["36px",{"lineHeight":"44px","fontWeight":"600"}],"label-md":["12px",{"lineHeight":"16px","fontWeight":"600"}],"body-md":["16px",{"lineHeight":"24px","fontWeight":"400"}],"headline-xl":["48px",{"lineHeight":"56px","fontWeight":"700"}],"body-sm":["14px",{"lineHeight":"20px","fontWeight":"400"}],"headline-xl-mobile":["32px",{"lineHeight":"40px","fontWeight":"700"}],"headline-sm":["20px",{"lineHeight":"28px","fontWeight":"600"}],"headline-lg-mobile":["26px",{"lineHeight":"34px","fontWeight":"600"}],"label-lg":["14px",{"lineHeight":"20px","fontWeight":"600"}],"headline-md":["24px",{"lineHeight":"32px","fontWeight":"600"}],"body-lg":["18px",{"lineHeight":"28px","fontWeight":"400"}],"label-sm":["11px",{"lineHeight":"14px","fontWeight":"500"}]}}}};</script></head><body class="bg-background font-body-md text-on-surface antialiased"><header class="fixed top-0 left-0 right-0 z-50 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="bg-tertiary-container text-tertiary-fixed-dim text-center py-space-xs px-margin-mobile md:px-margin font-label-sm text-label-sm tracking-wide flex items-center justify-center gap-space-xs"><span class="material-symbols-outlined text-[14px] text-tertiary-fixed-dim">local_shipping</span><span>Free Shipping across India on orders over ₹499 | Handcrafted in Erode, Tamil Nadu</span></div><div class="h-20 bg-surface/90 backdrop-blur-xl"><div class="max-w-7xl mx-auto h-full px-gutter-sm md:px-gutter flex items-center justify-between gap-space-md"><div class="flex items-center gap-space-sm"><img alt="WaferKing Logo" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1VKEDdlq-eMyp5fq9B0nouVtYvr429cZ6uM40eA7ubKtZiEqY0H1PoxVLaW_8RT2elpiWL4I8zjHT0n4EU0BV3EmapvGdSwT1vDKxunDQc0NzUd6hwlXIWKWfgQ4zQwtTDCrZPrNN86BXmphhtxeze2nq19zANzkDXFVcIKHF5v6fSz8s-nRYPuByyLRJQ3F7dZOao-VP65wGluutayM6oyl_epTmxll79DVpOAWOPgwU1_Syd3l5BgQ3M"/><div class="flex flex-col"><span class="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">WaferKing</span><span class="font-label-sm text-label-sm text-primary-50 tracking-wider uppercase -mt-1 hidden sm:inline-block">Artisan Black Rice</span></div></div><nav class="hidden lg:flex items-center gap-space-sm" data-active-classes="bg-primary-container text-on-primary font-label-lg rounded-lg"><a aria-current="page" class="px-space-sm py-space-xs transition-colors bg-primary-container text-on-primary font-label-lg rounded-lg" data-path="shop" href="#">Shop</a><a class="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" data-path="our-story" href="#">Our Story</a><a class="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" data-path="flavours" href="#">Flavours</a><a class="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" data-path="track-order" href="#">Track Order</a><a class="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" data-path="faq" href="#">FAQ</a><a class="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" data-path="contact" href="#">Contact</a></nav><div class="flex items-center gap-space-sm"><button class="p-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" type="button"><span class="material-symbols-outlined">search</span></button><button class="flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-primary-container text-on-primary hover:bg-primary-700 transition-colors" type="button"><span class="material-symbols-outlined text-[20px]">shopping_bag</span><span class="font-label-lg text-label-lg">Cart (3)</span></button><div class="pl-space-xs flex items-center"><img alt="Profile" class="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGHXkE-e44qdo0CNRvlg_ShnYK6_55-K2vQjZUcOSAN4KmgEMFkHp4OTQnAQewTLTwHSTyJcuKes-JxYAoCF0vULixh9t7oLD2L6UJHLInmds5cW7YZJry6I9VUbePKJQoCoslD53rUr_55ijjSmqkA_sBMG2xkRnopVa_IT3BFuXzkmNHRWzAcuaDS09_ImfNmakJ9NkDlS7JLLfxWkUzc57UaRFXO2DnJWleC_5NzDpn6RSfjvh3"/></div></div></div></div></header><main class="w-full pt-20 bg-background"><div class="flex flex-col w-full">
<!-- SECTION 1: HERO SECTION -->
<section class="relative w-full overflow-hidden bg-background py-space-xl lg:py-24">
<!-- Ambient organic gradient background -->
<div class="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-tertiary-fixed/30 blur-3xl pointer-events-none"></div>
<div class="absolute top-1/2 right-0 w-[30rem] h-[30rem] rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
<div class="max-w-7xl mx-auto px-gutter-sm md:px-gutter relative z-10">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-8 items-center">
<!-- Left Editorial Column (7 cols) -->
<div class="lg:col-span-7 flex flex-col items-start gap-space-md">
<!-- Eyebrow Pill -->
<div class="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-accent-50 text-accent-700">
<span class="w-2 h-2 rounded-full bg-on-tertiary-container animate-pulse"></span>
<span class="font-label-sm text-label-sm tracking-widest uppercase font-semibold">Traditional Grains, Modern Crunch</span>
</div>
<!-- Main Headline -->
<h1 class="font-headline-xl text-headline-xl text-primary tracking-tight font-extrabold max-w-2xl">
            Artisan Black Rice Wafers from the Soil of Erode
          </h1>
<!-- Subtitle -->
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
            Crafted with heirloom Karuppu Kavuni black rice, cold-pressed cold oils, and wild botanicals. Zero palm oil, 100% gluten-free crunch slow-baked in the Kaveri delta basin.
          </p>
<!-- CTAs -->
<div class="flex flex-wrap items-center gap-space-md pt-space-xs w-full sm:w-auto">
<a class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-space-xs px-space-xl py-space-sm bg-primary-container text-on-primary font-label-lg text-label-lg rounded-full shadow-lg hover:bg-primary-700 transition-all transform active:scale-95 group" href="#flavours">
<span>Explore Flavours</span>
<span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</a>
<button class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-space-xs px-space-lg py-space-sm bg-surface-container text-primary font-label-lg text-label-lg rounded-full hover:bg-surface-container-high transition-colors" onclick="document.getElementById('craft-process').scrollIntoView({behavior: 'smooth'})" type="button">
<span class="material-symbols-outlined text-[20px] text-accent-700">play_circle</span>
<span>Watch Our Story</span>
</button>
</div>
<!-- Key Stats Ribbon -->
<div class="grid grid-cols-3 gap-space-md pt-space-lg mt-space-md w-full bg-surface-container-low p-space-md rounded-xl">
<div class="flex flex-col">
<span class="font-headline-sm text-headline-sm text-primary font-bold">110 kcal</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Per Serve (25g)</span>
</div>
<div class="flex flex-col border-l border-surface-container-high pl-space-md">
<span class="font-headline-sm text-headline-sm text-primary font-bold">3x More</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Antioxidants than Blueberries</span>
</div>
<div class="flex flex-col border-l border-surface-container-high pl-space-md">
<span class="font-headline-sm text-headline-sm text-secondary font-bold">100%</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Heirloom Whole Grain</span>
</div>
</div>
</div>
<!-- Right Visual Showcase Column (5 cols) -->
<div class="lg:col-span-5 relative flex justify-center items-center">
<!-- Background tactile circle -->
<div class="w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-background-warm/60 absolute -z-0"></div>
<!-- Main Product Composite Container -->
<div class="relative z-10 w-full max-w-md p-space-sm">
<img class="w-full h-[430px] object-cover rounded-2xl shadow-xl bg-surface-container" data-alt="Editorial close-up flatlay of artisan matte black craft pouches of WaferKing Karuppu Kavuni wafers. One bag features warm yellow Avarampoo floral illustrations, another deep ruby Hibiscus petals. Surrounding are rustic ceramic bowls filled with jet-black heirloom rice grains, dried botanical petals, and gossamer-thin textured crisp wafers, bathed in soft afternoon window light in a warm earthen palette." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4jC4vXyoV8cJChh_cp8E_725dWuC07yFO5h9G7cm8qR_tAZG8EoXt2kAExJ6rTiUyghhZKl7_OHfiLRa9JkQvTVZOzRhG06-GI79kiwzWrVjRRIH-2UNJsL47kTn2F3w56anoicSJittmvcrXjgrMQbmA-kvY0NC36nmeQsWNtjVoM5vbeatGcPuqFoZV_divXkh_vdUvo6EbRgwBsIAdsNiPSivyjOUDshJfyFnjAn3l3GWvYnUk"/>
<!-- Floating Guarantee Badges -->
<div class="absolute -top-3 -right-3 sm:-right-4 bg-background-cream text-accent-700 px-space-md py-space-xs rounded-full shadow-md flex items-center gap-space-xs font-label-md text-label-md animate-bounce" style="animation-duration: 4s;">
<span class="material-symbols-outlined text-[16px] text-accent-700">bolt</span>
<span>Only 110 kcal</span>
</div>
<div class="absolute bottom-6 -left-3 sm:-left-6 bg-surface-container-lowest text-primary px-space-md py-space-xs rounded-xl shadow-lg flex items-center gap-space-xs font-label-md text-label-md">
<span class="w-2.5 h-2.5 rounded-full bg-secondary"></span>
<div>
<p class="font-label-sm text-label-sm text-on-surface-variant">Natural Pigment</p>
<p class="font-semibold text-primary">Rich in Anthocyanin</p>
</div>
</div>
<div class="absolute -bottom-4 right-8 bg-primary-container text-on-primary px-space-md py-space-xs rounded-full shadow-md font-label-sm text-label-sm flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">check_circle</span>
<span>Zero Refined Flour</span>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- SECTION 2: VALUE TICKER / TRUST RIBBON -->
<section class="w-full bg-primary-container text-on-primary py-space-md">
<div class="max-w-7xl mx-auto px-gutter-sm md:px-gutter">
<div class="grid grid-cols-2 md:grid-cols-4 gap-space-md items-center text-center md:text-left">
<div class="flex items-center gap-space-sm justify-center md:justify-start">
<span class="material-symbols-outlined text-[28px] text-tertiary-fixed-dim">spa</span>
<div class="flex flex-col text-left">
<span class="font-label-md text-label-md text-surface-container-lowest font-semibold">100% Karuppu Kavuni</span>
<span class="font-label-sm text-label-sm text-tertiary-fixed opacity-90">Heirloom Tamil Nadu Grain</span>
</div>
</div>
<div class="flex items-center gap-space-sm justify-center md:justify-start">
<span class="material-symbols-outlined text-[28px] text-tertiary-fixed-dim">microwave</span>
<div class="flex flex-col text-left">
<span class="font-label-md text-label-md text-surface-container-lowest font-semibold">Cold-Extruded &amp; Oven-Baked</span>
<span class="font-label-sm text-label-sm text-tertiary-fixed opacity-90">Zero Palm Oil / Zero Trans Fat</span>
</div>
</div>
<div class="flex items-center gap-space-sm justify-center md:justify-start">
<span class="material-symbols-outlined text-[28px] text-tertiary-fixed-dim">inventory_2</span>
<div class="flex flex-col text-left">
<span class="font-label-md text-label-md text-surface-container-lowest font-semibold">55g Freshness Sealed</span>
<span class="font-label-sm text-label-sm text-tertiary-fixed opacity-90">Nitrogen-Flushed Artisan Pouches</span>
</div>
</div>
<div class="flex items-center gap-space-sm justify-center md:justify-start">
<span class="material-symbols-outlined text-[28px] text-tertiary-fixed-dim">location_on</span>
<div class="flex flex-col text-left">
<span class="font-label-md text-label-md text-surface-container-lowest font-semibold">Kaveri Basin Heritage</span>
<span class="font-label-sm text-label-sm text-tertiary-fixed opacity-90">Handmade in Erode, TN</span>
</div>
</div>
</div>
</div>
</section>
<!-- SECTION 3: THE FLAVOUR COLLECTION -->
<section class="w-full bg-background-cream py-space-xl lg:py-24" id="flavours">
<div class="max-w-7xl mx-auto px-gutter-sm md:px-gutter flex flex-col gap-space-xl">
<!-- Section Header -->
<div class="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
<div class="flex flex-col gap-space-xs max-w-xl">
<span class="font-label-md text-label-md text-accent-700 font-semibold uppercase tracking-wider">Small-Batch Harvest Wafers</span>
<h2 class="font-headline-lg text-headline-lg text-primary font-bold">The Botanical Crisp Collection</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Each batch pairs whole grain Kavuni rice with native South Indian medicinal botanicals for a savory, aromatic crunch.</p>
</div>
<div class="flex items-center gap-space-xs">
<span class="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-space-sm py-1 rounded-full font-semibold">All Flavours In Stock</span>
</div>
</div>
<!-- 4-Column Responsive Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
<!-- CARD 1: Avarampoo -->
<div class="flex flex-col bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow group">
<div class="relative w-full aspect-square rounded-lg overflow-hidden bg-background-warm mb-space-md">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Matte kraft package of WaferKing Avarampoo Golden Crisp Wafers with yellow Senna floral botanicals, placed against sunlit stone with thin crispy black rice wafers sprinkled with roasted cumin seeds in warm golden tone lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuASp2UkYfn_f5RxXyqGCz066auEroUvsv9BAb9HHZ5gf404xraWlTSf3A04BBHgQlbJHvGFt1IfmGcJVaXnBQX49lnn2NoxsiaulbgyL-FxFs6d6lHKKEQ6kJZaiXDEHU9OsaY6L8_DeIJw_TZ9z_-fEVOtIxzvI2QoE8EFUqZYnXsmRyjlES_J5PQssxZFWkbnnE0V9sWbjXlDMTdOKFKoaEIGwJM2CPbiqXiI5IbbRVlpuvVu8-K1"/>
<span class="absolute top-space-xs left-space-xs bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm px-2 py-0.5 rounded-full font-semibold">Bestseller</span>
<span class="absolute bottom-space-xs right-space-xs bg-surface/90 text-primary font-label-sm text-label-sm px-2 py-0.5 rounded-md font-semibold">55g</span>
</div>
<div class="flex items-center gap-1 text-accent-700 mb-1">
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="font-label-md text-label-md font-bold">4.9</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">(48)</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-primary font-bold leading-snug">Avarampoo Golden Crisp</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1 mb-space-md">
            Infused with wild senna flower petals, dry roasted jeera, and pink rock salt for digestive calm.
          </p>
<div class="mt-auto pt-space-xs flex items-center justify-between">
<div class="flex items-baseline gap-space-xs">
<span class="font-headline-sm text-headline-sm text-primary font-bold">₹80</span>
<span class="font-body-sm text-body-sm text-outline line-through">₹95</span>
<span class="font-label-sm text-label-sm text-secondary font-semibold">15% OFF</span>
</div>
<button class="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center hover:bg-primary-700 transition-transform active:scale-95" title="Add Avarampoo to Cart" type="button">
<span class="material-symbols-outlined text-[20px]">add_shopping_cart</span>
</button>
</div>
</div>
<!-- CARD 2: Hibiscus -->
<div class="flex flex-col bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow group">
<div class="relative w-full aspect-square rounded-lg overflow-hidden bg-background-warm mb-space-md">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Package of WaferKing Hibiscus Ruby Tang Black Rice Wafers shown with dried organic crimson hibiscus sepals and cracked black pepper corns on an earthen ceramic dish, styled in deep berry and warm cocoa tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfYG6-0R6ZBDuxrNIbw7ou_zTAs9DEcIQoOgVpLSFaPSUVEfSavHsbyLVI14LnqE3N4NNXhMrTwGYtatZMua6b1JyIV049GktCsLc1P-p5QzQeg2IwGc_XxWvVO1s6gFjgxGe4u7YNi5PRBAvOxpVEl5RHiN8cdx_x7chSKNOzN-8EnLasSMo7kZlwPmdEPjrqQHVLpo5WJllXaG0GqzFbqq085dA8aaXAZ86gJlu5jCYEGbe8vPl6"/>
<span class="absolute top-space-xs left-space-xs bg-error-container text-on-error-container font-label-sm text-label-sm px-2 py-0.5 rounded-full font-semibold">Tangy Profile</span>
<span class="absolute bottom-space-xs right-space-xs bg-surface/90 text-primary font-label-sm text-label-sm px-2 py-0.5 rounded-md font-semibold">55g</span>
</div>
<div class="flex items-center gap-1 text-accent-700 mb-1">
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="font-label-md text-label-md font-bold">4.8</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">(36)</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-primary font-bold leading-snug">Hibiscus Ruby Tang</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1 mb-space-md">
            Sun-dried organic hibiscus calyx paired with fiery Tellicherry pepper and Himalayan mineral salt.
          </p>
<div class="mt-auto pt-space-xs flex items-center justify-between">
<div class="flex items-baseline gap-space-xs">
<span class="font-headline-sm text-headline-sm text-primary font-bold">₹80</span>
<span class="font-body-sm text-body-sm text-outline line-through">₹95</span>
<span class="font-label-sm text-label-sm text-secondary font-semibold">15% OFF</span>
</div>
<button class="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center hover:bg-primary-700 transition-transform active:scale-95" title="Add Hibiscus to Cart" type="button">
<span class="material-symbols-outlined text-[20px]">add_shopping_cart</span>
</button>
</div>
</div>
<!-- CARD 3: Makhana Crunch -->
<div class="flex flex-col bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow group">
<div class="relative w-full aspect-square rounded-lg overflow-hidden bg-background-warm mb-space-md">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Artisan pouch of WaferKing Makhana and Black Rice Pepper Crunch with light popped water lily seeds, toasted crushed black pepper, and ultra-thin crisps in an airy, high-contrast studio setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJy7ezgl59jrxdxr6NsXhFpnuk4Q2F3mD4fD94dFVg5GzT5YnbCK1NDjrdlMpl-d16F-edFQ4KFyZPm3MljQ4dx1zPeBBQdkNe2Bp5n5HXwAdbDMVH4eFMEVl2_BL2Kg1JskfTSF01En7dDlzi5NXbRS03K5ZV5IaOAjjPSkzY37OWopJUhenNgEC2sa5syM9fUgiu2TGYOTmj09eO-imHqbrW9hy2Pyh0wBouAqWtiVBDy2awau91"/>
<span class="absolute top-space-xs left-space-xs bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-2 py-0.5 rounded-full font-semibold">High Protein</span>
<span class="absolute bottom-space-xs right-space-xs bg-surface/90 text-primary font-label-sm text-label-sm px-2 py-0.5 rounded-md font-semibold">55g</span>
</div>
<div class="flex items-center gap-1 text-accent-700 mb-1">
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="font-label-md text-label-md font-bold">5.0</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">(62)</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-primary font-bold leading-snug">Makhana &amp; Pepper Crisp</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1 mb-space-md">
            Slow-roasted foxnut flour blended with ancient black rice and Malabar black pepper grains.
          </p>
<div class="mt-auto pt-space-xs flex items-center justify-between">
<div class="flex items-baseline gap-space-xs">
<span class="font-headline-sm text-headline-sm text-primary font-bold">₹90</span>
<span class="font-body-sm text-body-sm text-outline line-through">₹105</span>
<span class="font-label-sm text-label-sm text-secondary font-semibold">14% OFF</span>
</div>
<button class="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center hover:bg-primary-700 transition-transform active:scale-95" title="Add Makhana to Cart" type="button">
<span class="material-symbols-outlined text-[20px]">add_shopping_cart</span>
</button>
</div>
</div>
<!-- CARD 4: Vallarai -->
<div class="flex flex-col bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow group">
<div class="relative w-full aspect-square rounded-lg overflow-hidden bg-background-warm mb-space-md">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Pack of WaferKing Vallarai Brain Herb Savory Crisp with fresh green pennywort herb leaves, cold-pressed golden sesame oil drops, and deep purple-black wafer crisps styled on artisanal stoneware." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7nmBRjdDza8xo-Plggvo1ChUNAQq63azJ5LBaWCV35HKQCNgJw17qx9UX03EeZ3deMsWgUpm3oW7jycNJqj93ZCjPyp29zgLPisFfiAokedkmCnz1GFDAMU5SrxpZQo53UABM_SlUV_y3AysZ6S2RR1dPNXZz7yaX1u4gQe6jznifRXXfjJRvDFvhWNC2hZpnXr_5fdPyddLy06TxLV6E35tI0iaEOMt03kTNExp9WJ1L64J6pBcm"/>
<span class="absolute top-space-xs left-space-xs bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm px-2 py-0.5 rounded-full font-semibold">Ancient Herb</span>
<span class="absolute bottom-space-xs right-space-xs bg-surface/90 text-primary font-label-sm text-label-sm px-2 py-0.5 rounded-md font-semibold">55g</span>
</div>
<div class="flex items-center gap-1 text-accent-700 mb-1">
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="font-label-md text-label-md font-bold">4.9</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">(29)</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-primary font-bold leading-snug">Vallarai Savory Crisp</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1 mb-space-md">
            Brahmi herbal infusion with stone-ground toasted sesame for gentle cognitive vitality and earthy taste.
          </p>
<div class="mt-auto pt-space-xs flex items-center justify-between">
<div class="flex items-baseline gap-space-xs">
<span class="font-headline-sm text-headline-sm text-primary font-bold">₹85</span>
<span class="font-body-sm text-body-sm text-outline line-through">₹100</span>
<span class="font-label-sm text-label-sm text-secondary font-semibold">15% OFF</span>
</div>
<button class="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center hover:bg-primary-700 transition-transform active:scale-95" title="Add Vallarai to Cart" type="button">
<span class="material-symbols-outlined text-[20px]">add_shopping_cart</span>
</button>
</div>
</div>
</div>
</div>
</section>
<!-- SECTION 4: WHY BLACK RICE (NUTRITIONAL COMPARISON MATRIX) -->
<section class="w-full bg-surface-container py-space-xl lg:py-24">
<div class="max-w-7xl mx-auto px-gutter-sm md:px-gutter flex flex-col gap-space-xl">
<!-- Section Intro -->
<div class="text-center max-w-2xl mx-auto flex flex-col items-center gap-space-xs">
<span class="font-label-md text-label-md text-accent-700 uppercase tracking-widest font-semibold">Nutritional Architecture</span>
<h2 class="font-headline-lg text-headline-lg text-primary font-bold">Why Karuppu Kavuni Beats Regular Chips</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Used historically by South Indian royal dynasties for strength and longevity, black rice offers vastly superior micronutrient density.</p>
</div>
<!-- Comparison Matrix Card -->
<div class="w-full bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden p-space-md lg:p-space-xl">
<div class="overflow-x-auto">
<table class="w-full text-left">
<thead>
<tr class="border-b border-surface-container">
<th class="py-space-md px-space-md font-label-lg text-label-lg text-on-surface-variant font-medium">Nutrient Metric</th>
<th class="py-space-md px-space-md font-headline-sm text-headline-sm text-primary font-bold bg-accent-50 rounded-t-lg">
<div class="flex items-center gap-space-xs">
<span class="w-3 h-3 rounded-full bg-secondary"></span>
<span>WaferKing Black Rice</span>
</div>
</th>
<th class="py-space-md px-space-md font-label-lg text-label-lg text-outline">Standard Fried Potato Chips</th>
<th class="py-space-md px-space-md font-label-lg text-label-lg text-outline">Processed Corn / Nacho Crisps</th>
</tr>
</thead>
<tbody class="divide-y divide-surface-container font-body-sm text-body-sm">
<tr>
<td class="py-space-md px-space-md font-medium text-primary flex items-center gap-space-xs">
<span class="material-symbols-outlined text-[18px] text-accent-700">shield_with_heart</span>
<span>Anthocyanin Antioxidants</span>
</td>
<td class="py-space-md px-space-md font-bold text-secondary bg-accent-50/70 text-body-md">
                  327 mg / 100g <span class="font-label-sm text-label-sm block text-secondary font-normal">(High Anti-inflammatory)</span>
</td>
<td class="py-space-md px-space-md text-on-surface-variant">0 mg (None)</td>
<td class="py-space-md px-space-md text-on-surface-variant">Trace (Near 0)</td>
</tr>
<tr>
<td class="py-space-md px-space-md font-medium text-primary flex items-center gap-space-xs">
<span class="material-symbols-outlined text-[18px] text-accent-700">grain</span>
<span>Dietary Fiber</span>
</td>
<td class="py-space-md px-space-md font-bold text-primary bg-accent-50/70 text-body-md">
                  6.2 g <span class="font-label-sm text-label-sm block text-secondary font-normal">(Whole Grain Endosperm)</span>
</td>
<td class="py-space-md px-space-md text-on-surface-variant">1.1 g</td>
<td class="py-space-md px-space-md text-on-surface-variant">1.8 g</td>
</tr>
<tr>
<td class="py-space-md px-space-md font-medium text-primary flex items-center gap-space-xs">
<span class="material-symbols-outlined text-[18px] text-accent-700">oil_barrel</span>
<span>Frying Oil Quality</span>
</td>
<td class="py-space-md px-space-md font-bold text-secondary bg-accent-50/70 text-body-md">
                  0% Palm Oil <span class="font-label-sm text-label-sm block text-secondary font-normal">(Light Cold-Pressed Sesame Mist)</span>
</td>
<td class="py-space-md px-space-md text-state-error">100% Palm Oil / Palmolein</td>
<td class="py-space-md px-space-md text-state-error">Hydrogenated Vegetable Fat</td>
</tr>
<tr>
<td class="py-space-md px-space-md font-medium text-primary flex items-center gap-space-xs">
<span class="material-symbols-outlined text-[18px] text-accent-700">trending_up</span>
<span>Glycemic Index (GI Spike)</span>
</td>
<td class="py-space-md px-space-md font-bold text-secondary bg-accent-50/70 text-body-md">
                  Low GI (42) <span class="font-label-sm text-label-sm block text-secondary font-normal">Sustained clean energy</span>
</td>
<td class="py-space-md px-space-md text-state-error">High GI (82) Rapid insulin spike</td>
<td class="py-space-md px-space-md text-state-error">High GI (74) Rapid hunger crash</td>
</tr>
<tr>
<td class="py-space-md px-space-md font-medium text-primary flex items-center gap-space-xs">
<span class="material-symbols-outlined text-[18px] text-accent-700">fitness_center</span>
<span>Iron &amp; Minerals</span>
</td>
<td class="py-space-md px-space-md font-bold text-primary bg-accent-50/70 text-body-md">
                  3.5 mg Iron + Zinc rich
                </td>
<td class="py-space-md px-space-md text-on-surface-variant">0.4 mg Iron</td>
<td class="py-space-md px-space-md text-on-surface-variant">0.6 mg Iron</td>
</tr>
</tbody>
</table>
</div>
<div class="mt-space-lg p-space-md bg-background-warm/50 rounded-xl flex flex-col md:flex-row items-center justify-between gap-space-md">
<div class="flex items-center gap-space-sm">
<span class="material-symbols-outlined text-[32px] text-accent-700">science</span>
<div>
<p class="font-label-lg text-label-lg font-semibold text-primary">Certified Laboratory Validated</p>
<p class="font-body-sm text-body-sm text-on-surface-variant">Nutritional values verified by accredited Food Testing Laboratory, Chennai.</p>
</div>
</div>
<a class="px-space-md py-space-xs rounded-full bg-accent-700 text-on-primary font-label-md text-label-md hover:bg-primary transition-colors" href="#flavours">
            Switch to Smart Crunch
          </a>
</div>
</div>
</div>
</section>
<!-- SECTION 5: HOW WE MAKE IT (3-STEP CLEAN CRAFT PROCESS) -->
<section class="w-full bg-background py-space-xl lg:py-24" id="craft-process">
<div class="max-w-7xl mx-auto px-gutter-sm md:px-gutter flex flex-col gap-space-xl">
<div class="flex flex-col max-w-xl">
<span class="font-label-md text-label-md text-accent-700 uppercase tracking-widest font-semibold">Traceable Farm to Crisp</span>
<h2 class="font-headline-lg text-headline-lg text-primary font-bold">The Slow 3-Step Craft Method</h2>
<p class="font-body-md text-body-md text-on-surface-variant">We reject ultra-processing. No high-heat continuous fryers, no synthetic binders, and no chemical preservation.</p>
</div>
<!-- 3 Steps Grid -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
<!-- Step 1 -->
<div class="flex flex-col bg-surface-container-low rounded-2xl p-space-lg relative overflow-hidden">
<span class="text-[64px] font-black font-headline-xl text-surface-container-high leading-none -mb-4">01</span>
<div class="w-full h-48 rounded-xl overflow-hidden mb-space-md">
<img class="w-full h-full object-cover" data-alt="Lush green paddy fields along the Bhavani river in Erode Tamil Nadu, with local agricultural farmers harvesting deep purple-black Karuppu Kavuni rice plants under warm morning sunlight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmrkmuNRdf7PDtYQKPUcKgqZP4igIzPKdNVe7ojA7J5vyx7x4rv1-BipJuSdWZvWGBVCDOuoSfh-8smIqCRM2HLMKInflk3DCZusFqR7jMQUq2d0_O0mc251Kk-TP7N0WXIc6w_GO2myBvSEmaPiIASfUeivESdE2-en1_l-Q67F0sM3cIDBDezJ0JBnetX5vM-ZvBkO4ww-zbyzCP17NVOW9Pe6BzQml46qN4moKn-IvsSW9U__Wl"/>
</div>
<h3 class="font-headline-sm text-headline-sm text-primary font-bold">Delta Soil Sourcing</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
            Directly sourced from multi-generational smallholder farmers in the Bhavani River basin of Erode who preserve heritage organic seeds without GMO tinkering.
          </p>
<div class="mt-space-md flex items-center gap-space-xs font-label-sm text-label-sm text-secondary">
<span class="material-symbols-outlined text-[16px]">eco</span>
<span>Ethical Fair Price Guaranteed</span>
</div>
</div>
<!-- Step 2 -->
<div class="flex flex-col bg-surface-container-low rounded-2xl p-space-lg relative overflow-hidden">
<span class="text-[64px] font-black font-headline-xl text-surface-container-high leading-none -mb-4">02</span>
<div class="w-full h-48 rounded-xl overflow-hidden mb-space-md">
<img class="w-full h-full object-cover" data-alt="Traditional granite stone flour mills gently crushing deep purple black rice into fine grain flour, next to brass bowls with fresh yellow Avarampoo and green herbal leaves in an artisan kitchen workshop." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTFVsUTTHOGANVp5-zYhlUM-mf0Q9mtAqRfOMPjFOIsTtCI2U6aTxatYJEvNj3eIluSjwqnZxjJAQ9SNV-E30OF99G-kuL4t3iA7b7YUyg87S1psaNfU602syot7MByKNDNRjkkaPAc5WrFmmM1v6IT8UxFpNqPkdy7wyHnnhxPV8QYSeSnhqn7EkDT3MUwBjv9_YHCPyvSPKDe9JugUhXQxjbQdTKD76x96d8Ulh3no26N_ZLAF8V"/>
</div>
<h3 class="font-headline-sm text-headline-sm text-primary font-bold">Stone-Milled Botanicals</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
            Slow granite stone-milled to retain the bran and germ layers. Blended with sun-dried Avarampoo, Hibiscus, and Vallarai extracts for functional restorative goodness.
          </p>
<div class="mt-space-md flex items-center gap-space-xs font-label-sm text-label-sm text-secondary">
<span class="material-symbols-outlined text-[16px]">local_florist</span>
<span>Whole Botanical Whole Grain</span>
</div>
</div>
<!-- Step 3 -->
<div class="flex flex-col bg-surface-container-low rounded-2xl p-space-lg relative overflow-hidden">
<span class="text-[64px] font-black font-headline-xl text-surface-container-high leading-none -mb-4">03</span>
<div class="w-full h-48 rounded-xl overflow-hidden mb-space-md">
<img class="w-full h-full object-cover" data-alt="Hot wafer baking trays coming out of an artisanal oven with gossamer-thin, crisp Karuppu Kavuni black rice wafers, with steam rising gently in a pristine clean kitchen atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWrQLJ_wJs_O5ctxUHZ3VVC7F_wb8O9op0RdI-Np8m2O2xf3_DueoZnv1dmqyVvwgUZT3FeWZ1F1C1Jd45m8VahHinrhvz4MuyREBiDb5R1v8YewQtXwZRvM1MO1SJ0u-Yhv4LqtOGz8N1s_AWTgYX9xeq8TnFoLkTrPf0vFkEOJKCNVANFSxRm_aZKw8P9RdL3L-IZlB4kf1lfZSQHghkn1515nms7IV5TIuxhtmrgyEhwWmo_0Bm"/>
</div>
<h3 class="font-headline-sm text-headline-sm text-primary font-bold">Oven-Crisped in Batches</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
            Lightly cold-extruded into wafer-thin leaves and baked gently at controlled temperatures. Finished with cold-pressed sesame oil mist and natural sea salt.
          </p>
<div class="mt-space-md flex items-center gap-space-xs font-label-sm text-label-sm text-secondary">
<span class="material-symbols-outlined text-[16px]">bakery_dining</span>
<span>Never Fried • Zero Trans Fats</span>
</div>
</div>
</div>
</div>
</section>
<!-- SECTION 6: VERIFIED CUSTOMER REVIEWS -->
<section class="w-full bg-background-cream py-space-xl lg:py-24">
<div class="max-w-7xl mx-auto px-gutter-sm md:px-gutter flex flex-col gap-space-xl">
<!-- Section Header -->
<div class="text-center max-w-xl mx-auto flex flex-col items-center gap-space-xs">
<span class="font-label-md text-label-md text-accent-700 uppercase tracking-widest font-semibold">Community Verified</span>
<h2 class="font-headline-lg text-headline-lg text-primary font-bold">Loved by 12,000+ Mindful Crunchers</h2>
<div class="flex items-center gap-1 text-accent-700 pt-1">
<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="font-label-md text-label-md text-primary font-bold ml-2">4.9 / 5 Overall Score</span>
</div>
</div>
<!-- Testimonial Cards (3) -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
<!-- Review 1 -->
<div class="flex flex-col bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm justify-between">
<div class="flex flex-col gap-space-sm">
<div class="flex text-accent-700 gap-0.5">
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">star</span>
</div>
<p class="font-body-md text-body-md text-primary italic leading-relaxed">
              "Finally a snack I can eat at 4 PM without feeling greasy or bloated. The Avarampoo wafers have this incredibly delicate floral aroma and an addictive snap. Ordered my 4th box!"
            </p>
</div>
<div class="flex items-center gap-space-sm pt-space-lg mt-space-md border-t border-surface-container">
<div class="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center font-bold text-on-tertiary-fixed-variant">
              SM
            </div>
<div class="flex flex-col">
<span class="font-label-md text-label-md font-bold text-primary">Sowmya Murugan</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Chennai, Tamil Nadu</span>
</div>
</div>
</div>
<!-- Review 2 -->
<div class="flex flex-col bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm justify-between">
<div class="flex flex-col gap-space-sm">
<div class="flex text-accent-700 gap-0.5">
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">star</span>
</div>
<p class="font-body-md text-body-md text-primary italic leading-relaxed">
              "Being diabetic, finding low-GI snacks that do not spike sugar was a nightmare. WaferKing solved this completely. Black rice has that rich nutty taste. The Hibiscus flavor is brilliant."
            </p>
</div>
<div class="flex items-center gap-space-sm pt-space-lg mt-space-md border-t border-surface-container">
<div class="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center font-bold text-on-secondary-fixed-variant">
              AK
            </div>
<div class="flex flex-col">
<span class="font-label-md text-label-md font-bold text-primary">Arvind Keshavan</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Bengaluru, Karnataka</span>
</div>
</div>
</div>
<!-- Review 3 -->
<div class="flex flex-col bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm justify-between">
<div class="flex flex-col gap-space-sm">
<div class="flex text-accent-700 gap-0.5">
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">star</span>
</div>
<p class="font-body-md text-body-md text-primary italic leading-relaxed">
              "Gave a pack to my kids and they preferred it over packaged potato chips! Clean label, zero palm oil, real heritage grains from our native soil. Proud of this brand from Erode."
            </p>
</div>
<div class="flex items-center gap-space-sm pt-space-lg mt-space-md border-t border-surface-container">
<div class="w-10 h-10 rounded-full bg-accent-50 flex items-center justify-center font-bold text-accent-700">
              PR
            </div>
<div class="flex flex-col">
<span class="font-label-md text-label-md font-bold text-primary">Priya Ramanathan</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Coimbatore, Tamil Nadu</span>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- SECTION 7: SAMPLER BOX PROMO BANNER -->
<section class="w-full bg-background py-space-xl lg:py-24">
<div class="max-w-7xl mx-auto px-gutter-sm md:px-gutter">
<div class="relative w-full rounded-3xl bg-primary-container text-on-primary overflow-hidden p-space-xl lg:p-16 shadow-2xl">
<!-- Ambient decorative background element -->
<div class="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-tertiary-container blur-2xl opacity-60 pointer-events-none"></div>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center relative z-10">
<!-- Banner Copy (7 cols) -->
<div class="lg:col-span-7 flex flex-col gap-space-md">
<div class="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant self-start font-label-sm text-label-sm font-bold uppercase tracking-wider">
              Limited Edition Heritage Pack
            </div>
<h2 class="font-headline-xl text-headline-xl text-surface-container-lowest font-extrabold leading-tight">
              Taste All 4 Flavours in Our Artisan Sampler Box
            </h2>
<p class="font-body-lg text-body-lg text-tertiary-fixed opacity-95 max-w-lg leading-relaxed">
              Can't decide? Discover your favourite crunch with our 4-pack sampler box. Includes Avarampoo, Hibiscus Ruby, Makhana Pepper, and Vallarai Herbal (55g each).
            </p>
<div class="flex flex-wrap items-baseline gap-space-md pt-space-xs">
<div class="flex items-baseline gap-2">
<span class="font-headline-xl text-headline-xl text-surface-container-lowest font-black">₹299</span>
<span class="font-body-lg text-body-lg text-tertiary-fixed-dim line-through opacity-75">₹395</span>
</div>
<span class="px-space-sm py-1 rounded bg-secondary text-on-primary font-label-md text-label-md font-semibold">Save 24%</span>
<span class="font-label-md text-label-md text-tertiary-fixed flex items-center gap-1">
<span class="material-symbols-outlined text-[16px]">local_shipping</span> Free Shipping across India
              </span>
</div>
<div class="pt-space-md flex flex-col sm:flex-row gap-space-sm">
<button class="inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md bg-tertiary-fixed text-on-tertiary-fixed font-label-lg text-label-lg rounded-full font-bold shadow-lg hover:bg-tertiary-fixed-dim transition-all active:scale-95" type="button">
<span class="material-symbols-outlined text-[20px]">shopping_bag</span>
<span>Claim Your Sampler Box (₹299)</span>
</button>
<div class="flex items-center gap-space-xs text-tertiary-fixed-dim font-label-sm text-label-sm justify-center sm:justify-start">
<span class="material-symbols-outlined text-[16px]">bolt</span>
<span>Dispatches today from Erode Kitchen</span>
</div>
</div>
</div>
<!-- Banner Visual (5 cols) -->
<div class="lg:col-span-5 relative flex justify-center">
<div class="w-full max-w-sm aspect-square rounded-2xl overflow-hidden bg-primary-700/60 p-2 shadow-2xl">
<img class="w-full h-full object-cover rounded-xl" data-alt="Luxury eco-friendly gift box packaging of the WaferKing Royal Heritage 4-flavour Sampler Box displaying all four artisan Karuppu Kavuni wafer pouches arranged neatly on a bed of natural shredded wood straw with Tamil Nadu botanical sprigs." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGaUaZfeMZD6t-Jm4WnAZtfjuYGGPp0xV37LxWZyN5YBpVtxvabWdaZA9qxSrdndh2FNjv4YcLaDCdrO6c6fMOq5c3rZHdmVlHRDJE-6ajBwtQ6P8a3HPO6muWOtrnSNICbbWJ3qdYT_19cNRiFhHosT_XXy2MRmD1swv1TB_rSciNZjIwHou1w89HUeGOZ_j3HvcAJZ_erO_7aV5FuxSB9oWMPaWaxWhjFa3g7s7kTRHOTnNwc_n3"/>
</div>
</div>
</div>
</div>
</div>
</section>
</div></main><footer class="w-full bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-space-xl pb-space-lg text-on-surface"><div class="max-w-7xl mx-auto px-gutter-sm md:px-gutter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl pb-space-xl"><div class="flex flex-col gap-space-sm"><div class="flex items-center gap-space-xs"><span class="font-headline-sm text-headline-sm text-primary font-bold">WaferKing</span></div><p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Handcrafted with heirloom Karuppu Kavuni traditional black rice in the Kaveri delta plains of Erode, Tamil Nadu. Clean wellness, slow stone-ground nutrition, and exquisite crunch.</p><div class="flex items-center gap-space-xs pt-space-xs"><span class="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-accent-50 text-accent-700 font-label-sm text-label-sm"><span class="material-symbols-outlined text-[16px]">verified</span>FSSAI Lic. #12423008000492</span></div></div><div class="flex flex-col gap-space-sm"><h4 class="font-label-lg text-label-lg text-primary uppercase tracking-wider">The Collection</h4><ul class="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant"><li><a class="hover:text-on-surface transition-colors" data-path="shop" href="#">Avarampoo Black Rice Wafers</a></li><li><a class="hover:text-on-surface transition-colors" data-path="shop" href="#">Hibiscus Petal Crunch Wafers</a></li><li><a class="hover:text-on-surface transition-colors" data-path="shop" href="#">Makhana Crunch Roasted Crisps</a></li><li><a class="hover:text-on-surface transition-colors" data-path="shop" href="#">Vallarai Herbal Infused Crisp</a></li><li><a class="hover:text-on-surface transition-colors" data-path="shop" href="#">The Royal Heritage Sampler Box</a></li></ul></div><div class="flex flex-col gap-space-sm"><h4 class="font-label-lg text-label-lg text-primary uppercase tracking-wider">Customer Care</h4><ul class="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant"><li><a class="hover:text-on-surface transition-colors" data-path="track-order" href="#">Track Your Consignment</a></li><li><a class="hover:text-on-surface transition-colors" data-path="shipping-policy" href="#">Shipping &amp; Domestic Express</a></li><li><a class="hover:text-on-surface transition-colors" data-path="returns-and-refund" href="#">Returns &amp; Freshness Guarantee</a></li><li><a class="hover:text-on-surface transition-colors" data-path="contact" href="#">Contact Our Kitchen Team</a></li><li><a class="hover:text-on-surface transition-colors" data-path="faq" href="#">Frequently Asked Questions</a></li></ul></div><div class="flex flex-col gap-space-sm"><h4 class="font-label-lg text-label-lg text-primary uppercase tracking-wider">Artisan Pantry Club</h4><p class="font-body-sm text-body-sm text-on-surface-variant">Receive 10% off your initial sampler box, botanical harvest updates, and seasonal specials.</p><form class="flex flex-col sm:flex-row gap-space-xs pt-space-xs" onsubmit="return false;"><input class="flex-1 bg-background-cream px-space-md py-space-xs rounded-lg font-body-sm text-body-sm text-primary placeholder-primary-50 focus:outline-none" placeholder="Enter your email" type="email"/><button class="px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary hover:bg-primary-700 font-label-lg text-label-lg transition-colors" type="submit">Join</button></form><div class="flex items-center gap-space-md pt-space-sm text-on-surface-variant"><div class="flex items-center gap-space-xs font-label-sm text-label-sm"><span class="material-symbols-outlined text-[16px] text-secondary">lock</span><span>256-Bit SSL Secured</span></div><div class="flex items-center gap-space-xs font-label-sm text-label-sm"><span class="material-symbols-outlined text-[16px] text-secondary">shield</span><span>Razorpay Verified</span></div></div></div></div><div class="max-w-7xl mx-auto px-gutter-sm md:px-gutter pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant"><p>© 2026 WaferKing Foods Private Limited. Handcrafted in Erode, Tamil Nadu, India.</p><p class="flex items-center gap-space-sm"><span>All Prices Inclusive of Applicable GST</span><span>•</span><a class="hover:text-on-surface transition-colors" data-path="privacy-policy" href="#">Privacy Policy</a><span>•</span><a class="hover:text-on-surface transition-colors" data-path="terms-of-service" href="#">Terms of Service</a></p></div></footer></body></html>
```
