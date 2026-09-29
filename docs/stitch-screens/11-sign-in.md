# Sign In & Authentication — WaferKing

Stitch project: `8109637399058163454`  
Screen: `6c92ccfd36984bfb96279055e56098d4`  
Canvas: 2560 × 3730  
Storefront: `/login`

![Stitch screen: Sign In & Authentication — WaferKing](../../.stitch/designs/6c92ccfd36984bfb96279055e56098d4.png)

## Exact Stitch source

~~~~html
<!DOCTYPE html>

<html lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_standard" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={"darkMode":"class","theme":{"extend":{"colors":{"primary-50":"#8B7355","surface":"#fdf9f3","secondary-fixed-dim":"#9dd3aa","on-tertiary":"#ffffff","secondary":"#376847","surface-bright":"#fdf9f3","accent-700":"#754A22","inverse-primary":"#e3beb8","primary-fixed-dim":"#e3beb8","state-success":"#16A34A","error-container":"#ffdad6","surface-variant":"#e6e2dc","on-tertiary-fixed-variant":"#604011","on-error":"#ffffff","background-warm":"#F1E7DA","surface-container-low":"#f7f3ed","error":"#ba1a1a","primary-fixed":"#ffdad4","on-secondary-container":"#3b6d4b","surface-dim":"#dddad4","background":"#fdf9f3","tertiary-fixed":"#ffddb6","on-primary-container":"#ae8d87","background-cream":"#FFFDF9","on-primary-fixed":"#2b1613","accent-50":"#FAF1E6","tertiary":"#251400","surface-container-highest":"#e6e2dc","inverse-surface":"#31302d","on-tertiary-container":"#b68c57","surface-container":"#f1ede7","primary":"#271310","on-error-container":"#93000a","surface-tint":"#745853","inverse-on-surface":"#f4f0ea","on-tertiary-fixed":"#2a1800","on-secondary-fixed":"#00210e","outline":"#827472","on-primary-fixed-variant":"#5b403c","primary-container":"#3e2723","tertiary-container":"#412700","secondary-fixed":"#b9efc5","on-surface-variant":"#504442","primary-300":"#61492E","surface-container-high":"#ebe8e2","tertiary-fixed-dim":"#edbe84","on-background":"#1c1c18","outline-variant":"#d3c3c0","primary-700":"#2C1B10","secondary-container":"#b6edc2","on-secondary":"#ffffff","state-error":"#DC2626","surface-container-lowest":"#ffffff","on-secondary-fixed-variant":"#1e5031","on-surface":"#1c1c18","on-primary":"#ffffff"},"borderRadius":{"DEFAULT":"0.25rem","lg":"0.5rem","xl":"0.75rem","full":"9999px"},"spacing":{"space-xs":"0.25rem","space-sm":"0.5rem","space-md":"1rem","space-lg":"1.5rem","margin":"2rem","margin-mobile":"1rem","gutter-sm":"1rem","space-xl":"2.5rem","gutter":"1.5rem"},"fontFamily":{"label-lg":["Inter"],"headline-xl-mobile":["Outfit"],"headline-lg":["Outfit"],"body-md":["Inter"],"body-sm":["Inter"],"headline-md":["Outfit"],"label-sm":["Inter"],"headline-xl":["Outfit"],"body-lg":["Inter"],"headline-sm":["Outfit"],"headline-lg-mobile":["Outfit"],"label-md":["Inter"]},"fontSize":{"label-lg":["14px",{"lineHeight":"20px","fontWeight":"600"}],"headline-xl-mobile":["32px",{"lineHeight":"40px","fontWeight":"700"}],"headline-lg":["36px",{"lineHeight":"44px","fontWeight":"600"}],"body-md":["16px",{"lineHeight":"24px","fontWeight":"400"}],"body-sm":["14px",{"lineHeight":"20px","fontWeight":"400"}],"headline-md":["24px",{"lineHeight":"32px","fontWeight":"600"}],"label-sm":["11px",{"lineHeight":"14px","fontWeight":"500"}],"headline-xl":["48px",{"lineHeight":"56px","fontWeight":"700"}],"body-lg":["18px",{"lineHeight":"28px","fontWeight":"400"}],"headline-sm":["20px",{"lineHeight":"28px","fontWeight":"600"}],"headline-lg-mobile":["26px",{"lineHeight":"34px","fontWeight":"600"}],"label-md":["12px",{"lineHeight":"16px","fontWeight":"600"}]}}}};</script></head><body class="bg-background font-body-md text-on-surface antialiased"><header class="fixed top-0 left-0 right-0 z-50 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="bg-tertiary-container text-tertiary-fixed-dim text-center py-space-xs px-margin-mobile md:px-margin font-label-sm text-label-sm tracking-wide flex items-center justify-center gap-space-xs"><span class="material-symbols-outlined text-[14px] text-tertiary-fixed-dim">local_shipping</span><span>Free Shipping across India on orders over ₹499 | Handcrafted in Erode, Tamil Nadu</span></div><div class="h-20 bg-surface/90 backdrop-blur-xl"><div class="max-w-7xl mx-auto h-full px-gutter-sm md:px-gutter flex items-center justify-between gap-space-md"><div class="flex items-center gap-space-sm"><img alt="WaferKing Logo" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1VKEDdlq-eMyp5fq9B0nouVtYvr429cZ6uM40eA7ubKtZiEqY0H1PoxVLaW_8RT2elpiWL4I8zjHT0n4EU0BV3EmapvGdSwT1vDKxunDQc0NzUd6hwlXIWKWfgQ4zQwtTDCrZPrNN86BXmphhtxeze2nq19zANzkDXFVcIKHF5v6fSz8s-nRYPuByyLRJQ3F7dZOao-VP65wGluutayM6oyl_epTmxll79DVpOAWOPgwU1_Syd3l5BgQ3M"/><div class="flex flex-col"><span class="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">WaferKing</span><span class="font-label-sm text-label-sm text-primary-50 tracking-wider uppercase -mt-1 hidden sm:inline-block">Artisan Black Rice</span></div></div><nav class="hidden lg:flex items-center gap-space-sm" data-active-classes="bg-primary-container text-on-primary font-label-lg rounded-lg"><a class="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" data-path="shop" href="#">Shop</a><a class="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" data-path="our-story" href="#">Our Story</a><a class="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" data-path="flavours" href="#">Flavours</a><a class="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" data-path="track-order" href="#">Track Order</a><a class="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" data-path="faq" href="#">FAQ</a><a class="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" data-path="contact" href="#">Contact</a></nav><div class="flex items-center gap-space-sm"><button class="p-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" type="button"><span class="material-symbols-outlined">search</span></button><button class="flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-primary-container text-on-primary hover:bg-primary-700 transition-colors" type="button"><span class="material-symbols-outlined text-[20px]">shopping_bag</span><span class="font-label-lg text-label-lg">Cart (3)</span></button><a class="pl-space-xs flex items-center rounded-full hover:ring-2 hover:ring-primary-50 transition-all" data-path="profile" href="#"><img alt="Profile" class="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGHXkE-e44qdo0CNRvlg_ShnYK6_55-K2vQjZUcOSAN4KmgEMFkHp4OTQnAQewTLTwHSTyJcuKes-JxYAoCF0vULixh9t7oLD2L6UJHLInmds5cW7YZJry6I9VUbePKJQoCoslD53rUr_55ijjSmqkA_sBMG2xkRnopVa_IT3BFuXzkmNHRWzAcuaDS09_ImfNmakJ9NkDlS7JLLfxWkUzc57UaRFXO2DnJWleC_5NzDpn6RSfjvh3"/></a></div></div></div></header><main class="w-full pt-20 bg-background"><div class="flex flex-col w-full">
<div class="relative w-full overflow-hidden py-space-xl lg:py-24 px-gutter-sm md:px-gutter flex items-center justify-center">
<div class="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-accent-50/70 blur-3xl pointer-events-none"></div>
<div class="absolute -bottom-36 -right-24 w-[32rem] h-[32rem] rounded-full bg-background-warm/60 blur-3xl pointer-events-none"></div>
<div class="absolute top-1/3 left-10 text-primary-50/15 select-none pointer-events-none hidden xl:block font-headline-xl text-headline-xl">
      🌾
    </div>
<div class="absolute bottom-20 right-14 text-primary-50/15 select-none pointer-events-none hidden xl:block font-headline-xl text-headline-xl">
      ✦
    </div>
<div class="relative w-full max-w-xl mx-auto">
<div class="bg-background-cream rounded-xl p-space-md sm:p-space-xl shadow-xl transition-all">
<div class="flex flex-col items-center text-center">
<div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-surface-container-high text-accent-700 shadow-sm mb-space-sm">
<span class="material-symbols-outlined text-[28px]">spa</span>
</div>
<div class="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-accent-50 text-accent-700 font-label-sm text-label-sm tracking-widest uppercase mb-space-sm">
<span class="material-symbols-outlined text-[14px]">local_florist</span>
<span>Welcome Back to the Crunch</span>
</div>
<h1 class="font-headline-lg text-headline-lg text-primary tracking-tight">
            Sign In to Your Artisan Pantry
          </h1>
<p class="font-body-md text-body-md text-on-surface-variant max-w-md mt-space-xs">
            Access saved addresses, track farm-fresh batches, and enjoy one-click reordering of heirloom Karuppu Kavuni crisps.
          </p>
</div>
<form class="mt-space-lg flex flex-col gap-space-md" onsubmit="return false;">
<div class="flex flex-col gap-1.5">
<label class="font-label-lg text-label-lg text-primary flex items-center justify-between" for="login-identifier">
<span>Email or Mobile Number</span>
<span class="font-label-sm text-label-sm text-primary-50">10-Digit Phone / Email</span>
</label>
<div class="relative flex items-center rounded-lg bg-surface-container-lowest shadow-sm">
<span class="material-symbols-outlined absolute left-space-md text-primary-50 text-[20px] pointer-events-none">
                person
              </span>
<input autocomplete="username" class="w-full bg-transparent pl-12 pr-space-md py-3.5 rounded-lg font-body-md text-body-md text-primary placeholder-primary-50 focus:outline-none transition-all" id="login-identifier" placeholder="e.g. kavuni@waferking.in or 9876543210" type="text"/>
</div>
</div>
<div class="flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<label class="font-label-lg text-label-lg text-primary" for="login-password">
                Password
              </label>
<a class="font-label-sm text-label-sm text-accent-700 hover:text-primary transition-colors underline underline-offset-4" href="#">
                Forgot Password?
              </a>
</div>
<div class="relative flex items-center rounded-lg bg-surface-container-lowest shadow-sm">
<span class="material-symbols-outlined absolute left-space-md text-primary-50 text-[20px] pointer-events-none">
                lock
              </span>
<input autocomplete="current-password" class="w-full bg-transparent pl-12 pr-12 py-3.5 rounded-lg font-body-md text-body-md text-primary placeholder-primary-50 focus:outline-none transition-all" id="login-password" placeholder="••••••••••••" type="password"/>
<button aria-label="Toggle password visibility" class="absolute right-space-sm p-1.5 text-primary-50 hover:text-primary transition-colors rounded" id="toggle-password-btn" onclick="
                  const input = document.getElementById('login-password');
                  const icon = this.querySelector('span');
                  if (input.type === 'password') {
                    input.type = 'text';
                    icon.textContent = 'visibility_off';
                  } else {
                    input.type = 'password';
                    icon.textContent = 'visibility';
                  }
                " type="button">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</button>
</div>
</div>
<div class="flex items-center justify-between pt-1">
<label class="flex items-center gap-space-sm cursor-pointer select-none">
<input checked="" class="w-4 h-4 rounded text-primary-container bg-surface-container accent-primary-container focus:ring-0 focus:outline-none cursor-pointer" type="checkbox"/>
<span class="font-body-sm text-body-sm text-on-surface-variant">Remember me on this trusted device</span>
</label>
<span class="hidden sm:inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary">
<span class="material-symbols-outlined text-[15px]">verified_user</span>
              Safe Device Mode
            </span>
</div>
<button class="w-full py-3.5 px-space-md rounded-lg bg-primary-container hover:bg-primary-700 text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-space-sm shadow-md transition-all active:scale-[0.99] group mt-1" type="submit">
<span>Sign In to Account</span>
<span class="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
</button>
</form>
<div class="relative my-space-lg flex items-center justify-center">
<div class="w-full h-px bg-surface-container-high"></div>
<span class="absolute bg-background-cream px-space-md font-label-sm text-label-sm text-primary-50 uppercase tracking-widest text-center">
            Or Sign In With Secure OTP
          </span>
</div>
<div class="flex flex-col gap-space-sm">
<button class="w-full py-3 px-space-md rounded-lg bg-accent-50 hover:bg-surface-container-high text-primary font-label-lg text-label-lg flex items-center justify-center gap-space-sm transition-all shadow-sm" onclick="
              const banner = document.getElementById('otp-status');
              banner.classList.remove('hidden');
              setTimeout(() =&gt; banner.classList.add('hidden'), 5000);
            " type="button">
<span class="material-symbols-outlined text-[20px] text-secondary">sms</span>
<span>Send WhatsApp / SMS One-Time Passcode</span>
</button>
<div class="hidden p-space-sm rounded-lg bg-secondary-container/50 text-on-secondary-container font-body-sm text-body-sm flex items-center gap-space-xs animate-fade-in" id="otp-status">
<span class="material-symbols-outlined text-[18px]">check_circle</span>
<span>OTP sent securely to your registered phone/WhatsApp.</span>
</div>
</div>
<div class="mt-space-lg p-space-md rounded-xl bg-surface-container-low text-center flex flex-col sm:flex-row items-center justify-between gap-space-sm">
<div class="text-left">
<p class="font-label-lg text-label-lg text-primary">New to WaferKing?</p>
<p class="font-body-sm text-body-sm text-on-surface-variant">Get 10% off your initial Karuppu Kavuni sampler pack.</p>
</div>
<a class="whitespace-nowrap px-space-md py-2 rounded-lg bg-surface-container-highest hover:bg-background-warm text-accent-700 font-label-lg text-label-lg transition-colors flex items-center gap-1" data-path="register" href="#">
<span>Create Account</span>
<span class="material-symbols-outlined text-[16px]">north_east</span>
</a>
</div>
<div class="mt-space-lg pt-space-md flex flex-wrap items-center justify-center gap-y-2 gap-x-space-md text-on-surface-variant font-label-sm text-label-sm">
<div class="flex items-center gap-1 text-primary-50">
<span class="material-symbols-outlined text-[15px] text-secondary">lock</span>
<span>256-Bit SSL Encrypted</span>
</div>
<span class="text-primary-50/40">•</span>
<div class="flex items-center gap-1 text-primary-50">
<span class="material-symbols-outlined text-[15px] text-secondary">eco</span>
<span>100% Traceable Organic Grains</span>
</div>
<span class="text-primary-50/40">•</span>
<div class="flex items-center gap-1 text-primary-50">
<span class="material-symbols-outlined text-[15px] text-secondary">verified</span>
<span>Razorpay Verified</span>
</div>
</div>
</div>
<div class="mt-space-md px-space-sm flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<a class="inline-flex items-center gap-1 hover:text-primary transition-colors" data-path="shop" href="#">
<span class="material-symbols-outlined text-[18px]">west</span>
<span>Continue browsing as guest</span>
</a>
<a class="hover:text-primary transition-colors" data-path="contact" href="#">
          Need assistance?
        </a>
</div>
</div>
</div>
<section class="w-full bg-surface-container-low py-space-xl px-gutter-sm md:px-gutter">
<div class="max-w-6xl mx-auto">
<div class="text-center max-w-xl mx-auto mb-space-lg">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-accent-700">Artisan Pantry Privilege</span>
<h2 class="font-headline-md text-headline-md text-primary mt-1">Why Savour With an Account?</h2>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
<div class="bg-background-cream p-space-lg rounded-xl shadow-sm flex flex-col gap-space-xs">
<div class="w-10 h-10 rounded-full bg-accent-50 text-accent-700 flex items-center justify-center mb-1">
<span class="material-symbols-outlined text-[20px]">history</span>
</div>
<h3 class="font-label-lg text-label-lg text-primary">Farm Harvest Tracking</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Trace batch timestamps, moisture analytics, and single-estate Karuppu Kavuni harvest logs from Erode.</p>
</div>
<div class="bg-background-cream p-space-lg rounded-xl shadow-sm flex flex-col gap-space-xs">
<div class="w-10 h-10 rounded-full bg-accent-50 text-accent-700 flex items-center justify-center mb-1">
<span class="material-symbols-outlined text-[20px]">bolt</span>
</div>
<h3 class="font-label-lg text-label-lg text-primary">One-Tap Replenish</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Zero-friction reordering for your favourite Avarampoo or Hibiscus crunches before kitchen stock runs out.</p>
</div>
<div class="bg-background-cream p-space-lg rounded-xl shadow-sm flex flex-col gap-space-xs">
<div class="w-10 h-10 rounded-full bg-accent-50 text-accent-700 flex items-center justify-center mb-1">
<span class="material-symbols-outlined text-[20px]">redeem</span>
</div>
<h3 class="font-label-lg text-label-lg text-primary">Private Small-Batch Allocations</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Members receive first reserve access to limited seasonal botanical presses and harvest gift samplers.</p>
</div>
</div>
</div>
</section>
</div></main><footer class="w-full bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-space-xl pb-space-lg text-on-surface"><div class="max-w-7xl mx-auto px-gutter-sm md:px-gutter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl pb-space-xl"><div class="flex flex-col gap-space-sm"><div class="flex items-center gap-space-xs"><span class="font-headline-sm text-headline-sm text-primary font-bold">WaferKing</span></div><p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Handcrafted with heirloom Karuppu Kavuni traditional black rice in the Kaveri delta plains of Erode, Tamil Nadu. Clean wellness, slow stone-ground nutrition, and exquisite crunch.</p><div class="flex items-center gap-space-xs pt-space-xs"><span class="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-accent-50 text-accent-700 font-label-sm text-label-sm"><span class="material-symbols-outlined text-[16px]">verified</span>FSSAI Lic. #12423008000492</span></div></div><div class="flex flex-col gap-space-sm"><h4 class="font-label-lg text-label-lg text-primary uppercase tracking-wider">The Collection</h4><ul class="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant"><li><a class="hover:text-on-surface transition-colors" data-path="shop" href="#">Avarampoo Black Rice Wafers</a></li><li><a class="hover:text-on-surface transition-colors" data-path="shop" href="#">Hibiscus Petal Crunch Wafers</a></li><li><a class="hover:text-on-surface transition-colors" data-path="shop" href="#">Makhana Crunch Roasted Crisps</a></li><li><a class="hover:text-on-surface transition-colors" data-path="shop" href="#">Vallarai Herbal Infused Crisp</a></li><li><a class="hover:text-on-surface transition-colors" data-path="shop" href="#">The Royal Heritage Sampler Box</a></li></ul></div><div class="flex flex-col gap-space-sm"><h4 class="font-label-lg text-label-lg text-primary uppercase tracking-wider">Customer Care</h4><ul class="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant"><li><a class="hover:text-on-surface transition-colors" data-path="profile" href="#">Account &amp; Addresses</a></li><li><a class="hover:text-on-surface transition-colors" data-path="track-order" href="#">Track Your Consignment</a></li><li><a class="hover:text-on-surface transition-colors" data-path="shipping-policy" href="#">Shipping &amp; Domestic Express</a></li><li><a class="hover:text-on-surface transition-colors" data-path="returns-and-refund" href="#">Returns &amp; Freshness Guarantee</a></li><li><a class="hover:text-on-surface transition-colors" data-path="contact" href="#">Contact Our Kitchen Team</a></li><li><a class="hover:text-on-surface transition-colors" data-path="faq" href="#">Frequently Asked Questions</a></li></ul></div><div class="flex flex-col gap-space-sm"><h4 class="font-label-lg text-label-lg text-primary uppercase tracking-wider">Artisan Pantry Club</h4><p class="font-body-sm text-body-sm text-on-surface-variant">Receive 10% off your initial sampler box, botanical harvest updates, and seasonal specials.</p><form class="flex flex-col sm:flex-row gap-space-xs pt-space-xs" onsubmit="return false;"><input class="flex-1 bg-background-cream px-space-md py-space-xs rounded-lg font-body-sm text-body-sm text-primary placeholder-primary-50 focus:outline-none" placeholder="Enter your email" type="email"/><button class="px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary hover:bg-primary-700 font-label-lg text-label-lg transition-colors" type="submit">Join</button></form><div class="flex items-center gap-space-md pt-space-sm text-on-surface-variant"><div class="flex items-center gap-space-xs font-label-sm text-label-sm"><span class="material-symbols-outlined text-[16px] text-secondary">lock</span><span>256-Bit SSL Secured</span></div><div class="flex items-center gap-space-xs font-label-sm text-label-sm"><span class="material-symbols-outlined text-[16px] text-secondary">shield</span><span>Razorpay Verified</span></div></div></div></div><div class="max-w-7xl mx-auto px-gutter-sm md:px-gutter pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant"><p>© 2026 WaferKing Foods Private Limited. Handcrafted in Erode, Tamil Nadu, India.</p><p class="flex items-center gap-space-sm"><span>All Prices Inclusive of Applicable GST</span><span>•</span><a class="hover:text-on-surface transition-colors" data-path="privacy-policy" href="#">Privacy Policy</a><span>•</span><a class="hover:text-on-surface transition-colors" data-path="terms-of-service" href="#">Terms of Service</a></p></div></footer></body></html>
~~~~
