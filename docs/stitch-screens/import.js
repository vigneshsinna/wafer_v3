const fs = require('fs');
const path = require('path');
const https = require('https');

const screens = [
  {
    id: "75d423cef5444615a18df713b4cc2655",
    name: "00-waferking-logo",
    title: "WaferKing Logo Vector",
    type: "image/svg+xml",
    width: "240",
    height: "60",
    deviceType: "ASSET",
    screenshotUrl: "https://lh3.googleusercontent.com/aida/AEtjO1Wlg0MLXsOIjZ9Sd9xY5O6KpFnh1wJR48XTRgZk52PuYqm1C1TKpljmKTUijFTXifAIuLW-3M9Tb_MMNi8GxALg9PumulSJ4r15V3GhsysaZzy2tjE6d_xWV3G5snvFdwHfrkyr5JcKFqW3Syk1Qtkdlk65UeXLnVWrKIYW2vxKZT-7Kt7z_uCZL6tlr9GW8Q0xqo9vY3Ngl047Up5ZRtQ7uA0XN_o2qZgTg8YUNBnuAzg3DQCNmupg5A",
    downloadUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1YzhiMzRhZTU1OWUwNzc5YTQ5NzIzMDI2YzY0EgsSBxDvtqDJhwoYAZIBIwoKcHJvamVjdF9pZBIVQhM4MTA5NjM3Mzk5MDU4MTYzNDU0&filename=&opi=89354086"
  },
  {
    id: "821c0d97c8564f48a1c21e503e7c2f30",
    name: "01-homepage",
    title: "Homepage — Artisan Black Rice Wafers",
    type: "text/html",
    width: "2560",
    height: "10152",
    deviceType: "DESKTOP",
    screenshotUrl: "https://lh3.googleusercontent.com/aida/AEtjO1Wzck1srh4kRAtgk6R_FiZQbskYWa-9ZAVw9TV_ioLazorpEZ13hlNarWXixTzv2QGUWrURxjKVLCselUY-TDkEd3lGZeqZ7kpa6rkMIsijUQsqIJAD-0HJI5Dqyr_3rH1XuA7iv6Vvkfu-SHpmh5fBdHTD5NPX1Riub0dD12euxwJ2tqjFKbW8Ph-pY2eRp_AxHNeNxruk2VEnAJudJdmB-EYZm-R_RiAOe0CgcwQ8-VQ_jo3TpwNiwJM",
    downloadUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1YzhiM2IzMDcwZjcwODlhZjVlNTc0MGE0NmUxEgsSBxDvtqDJhwoYAZIBIwoKcHJvamVjdF9pZBIVQhM4MTA5NjM3Mzk5MDU4MTYzNDU0&filename=&opi=89354086"
  },
  {
    id: "bdb1510bd7be4eba894a08417c6f47ea",
    name: "02-product-detail",
    title: "Product Detail — Avarampoo Wafers 55g",
    type: "text/html",
    width: "2560",
    height: "6056",
    deviceType: "DESKTOP",
    screenshotUrl: "https://lh3.googleusercontent.com/aida/AEtjO1WArYGjuoes8Pj3GLYLv0ZP4sMmFaR48vxCKJScQNrcLyGCxWVk5sx9Ed9yuGt-MHp9bBSbyT3sguZi-kln4HUrcdDkFDbBjbxQLX0sjMemEcp1Vkm0COynZHTNhzC1o1RGEt9oXjTIRAoYnd-c8hqY5WN_R5gGnUxiuR4tYmb8cMbsh9z8UnLScY0epkT_Nc2aiuPTWAP3xwtl2kxwTmgdJbhLSNqjLznjqZYT0fzMWlYIJEiudbymtUE",
    downloadUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1YzhiM2MxYTBhNjQwMjJkNDA2YWZhMDMxMTgxEgsSBxDvtqDJhwoYAZIBIwoKcHJvamVjdF9pZBIVQhM4MTA5NjM3Mzk5MDU4MTYzNDU0&filename=&opi=89354086"
  },
  {
    id: "a8d1840d4fef4208bc63749ebfe1086e",
    name: "03-one-page-checkout",
    title: "One-Page Checkout — WaferKing",
    type: "text/html",
    width: "2560",
    height: "4152",
    deviceType: "DESKTOP",
    screenshotUrl: "https://lh3.googleusercontent.com/aida/AEtjO1VoCveMNf6jE9rolFDukjZa933_uaeCs28TxQBE5nmQTauDhAa8ZZYDL_yeZjZXk8_ksa-bgi-b12Yt_3GF8duCORj-bKaMGHkURCrIjvyPPbm8i_X9lxcPRaZD4IhGk4HboGh6bavY3uh2nUL_obC66Y6qzNl__38zZQEVAPvi1gyHu_MGsg65CHgfdTOb5d-l1m3ed6TlkBGBNgI6vFnZINJHdTd4GiG03Nmg7u4d6dfDXendLneTxtg",
    downloadUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1YzhiM2E0N2EwYzIwOTM0ZDk0YmE2M2EyYWNjEgsSBxDvtqDJhwoYAZIBIwoKcHJvamVjdF9pZBIVQhM4MTA5NjM3Mzk5MDU4MTYzNDU0&filename=&opi=89354086"
  },
  {
    id: "4e27c73f836542c2a61f4aaf592146d4",
    name: "04-order-tracking",
    title: "Live Order Tracking — WK-2026-9821",
    type: "text/html",
    width: "2560",
    height: "4600",
    deviceType: "DESKTOP",
    screenshotUrl: "https://lh3.googleusercontent.com/aida/AEtjO1WCvpW6rrH7JX-udDkTpgrhsUerUal3QdsvZIsMq1ndGBZl1v8z1GGhLpVNxlj8WQj0TjwwZi-L1sIqq5xVAmfIkRnf4IOxvt4De1f8t3tLSodYUnmG52qIHC3FcILUMaEue_Z2QNBI6oDyNnjH_oYOqkzMp4wZeOSuDtwbid5bF82Px5xKYBymrZj3SvAIBeQzPLQD6ynUORn1YcdPlt4CcjhSxPOOj1-52uVYYOv15rKLDelKcx2JrA",
    downloadUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1YzhiMzliNWNhNWMwNTc2MmM4Yjc1MGU4NjhmEgsSBxDvtqDJhwoYAZIBIwoKcHJvamVjdF9pZBIVQhM4MTA5NjM3Mzk5MDU4MTYzNDU0&filename=&opi=89354086"
  },
  {
    id: "9cc77eca99e74b16a896bc7884586d38",
    name: "05-brand-story",
    title: "Brand Story & Heritage — WaferKing Erode",
    type: "text/html",
    width: "2560",
    height: "9272",
    deviceType: "DESKTOP",
    screenshotUrl: "https://lh3.googleusercontent.com/aida/AEtjO1XO5NbIr7K0ZNrfH8q-S6FUg7uxmwf7ZPkokwTA-KlWR2wo_z_k0brquJWzPYD0j83T65toVMA4fdozCVgYLVWKVm_Ci5EnOZf-pEkcf7vgHCC03Z-mHpB9wZTPUiMiK7ysPG1VuQ_GX5gQIqv4PV8f0JHEc28ar_XgQiRMIbtd1nvELkcmQx712_NDM2RU0wgWV_xIqqpC7_v93-U1NRHt__Z7Cb2ksJJZ1HnIolrmTi85jwn1zUUVY8E",
    downloadUrl: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1YzhiMzllMTViNGUwMjJkN2VlMjMxMDZmNGUyEgsSBxDvtqDJhwoYAZIBIwoKcHJvamVjdF9pZBIVQhM4MTA5NjM3Mzk5MDU4MTYzNDU0&filename=&opi=89354086"
  },
  {
    id: "f597a5ed377a4ffe8bcf6d5266ac0466",
    name: "06-customer-portrait",
    title: "Customer Portrait Asset — Erode Customer Review",
    type: "image/png",
    width: "1024",
    height: "1024",
    deviceType: "ASSET",
    screenshotUrl: "https://lh3.googleusercontent.com/aida/AEtjO1VjJYSq12sIj0ZzBvrsgW_3odeSLORUIWO0842P46aIXrnldlm_DiYkAE4mssHdh7MonK4wA73bC_ObKZFm_aBL5C27UOe042r_wDLxcb-J1BZn29FIPD9aqIwaLyQ-rTI9w_fNn9_LCwKYpYmpyuSv9fnZmHeJpWyDo3JMLNYrOxL9lVXqf70p9mFwfuWbiAEU9l9lpRZnhffGxgEkXzRLh0LXQKBBcWr980Xg8ri8fuMVH4GN9lLpgIs",
    downloadUrl: null
  }
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const targetDir = path.resolve('v:/pers/Freelance/waferking/rudraspirit/docs/stitch-screens');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  for (const screen of screens) {
    console.log(`Processing: ${screen.title}...`);
    let content = '';
    if (screen.downloadUrl) {
      try {
        content = await fetchUrl(screen.downloadUrl);
      } catch (err) {
        console.error(`Failed to download for ${screen.name}:`, err.message);
      }
    }

    // Write raw code if SVG or HTML
    if (content) {
      const ext = screen.type === 'image/svg+xml' ? '.svg' : '.html';
      fs.writeFileSync(path.join(targetDir, `${screen.name}${ext}`), content, 'utf8');
    }

    // Write comprehensive markdown documentation
    const mdContent = `# Stitch Screen: ${screen.title}

> **Stitch Project ID**: \`8109637399058163454\`  
> **Screen ID**: \`${screen.id}\`  
> **Resource Name**: \`projects/8109637399058163454/screens/${screen.id}\`  
> **Device**: ${screen.deviceType}  
> **Canvas Dimensions**: ${screen.width}px × ${screen.height}px  
> **Content Type**: \`${screen.type}\`  
> **Screenshot Preview**: [View High-Res Design Screenshot](${screen.screenshotUrl})  

---

## 1. Screen Overview & UI Structure

![${screen.title}](${screen.screenshotUrl})

- **Screen Title**: ${screen.title}
- **Target Route in Storefront**: ${
  screen.name.includes('homepage') ? '\`storefront/src/app/page.tsx\` (\`/\`)' :
  screen.name.includes('product-detail') ? '\`storefront/src/app/product/[slug]/page.tsx\` (\`/product/[slug]\`)' :
  screen.name.includes('checkout') ? '\`storefront/src/app/checkout/page.tsx\` (\`/checkout\`)' :
  screen.name.includes('tracking') ? '\`storefront/src/app/track/[orderId]/page.tsx\` (\`/track/[orderId]\`)' :
  screen.name.includes('brand-story') ? '\`storefront/src/app/about/page.tsx\` (\`/about\`)' :
  screen.name.includes('logo') ? '\`storefront/src/components/layout/Header.tsx\` & \`public/images/logo.svg\`' :
  'Component Asset / Avatar'
}

---

## 2. Key UI Elements & Layout Architecture

${
  screen.name.includes('homepage') ? `
### Layout Sections:
1. **Top Announcement Bar**: "Free Shipping Across India Over ₹499 • Crafted In Erode, Tamil Nadu"
2. **Global Navigation Bar**:
   - Left: WaferKing Logo Mark & Wordmark
   - Center: Nav Links (\`Shop\`, \`Our Story\`, \`Flavours\`, \`Health\`, \`Track Order\`)
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
` : screen.name.includes('product-detail') ? `
### Layout Sections:
1. **Breadcrumbs**: Home > Shop > Wafers > Avarampoo Black Rice Wafers 55g
2. **Product Gallery (Left 50%)**:
   - Main High-Res pack image with interactive zoom & rounded organic frame
   - Thumbnail strip (Front pack, Ingredients label, Nutritional facts, Crunch texture)
3. **Product Information & Buy Box (Right 50%)**:
   - Eyebrow: *"100% ORGANIC KARUPPU KAVUNI"*
   - Product Title: *"Avarampoo Black Rice Wafers"*
   - Rating: ★★★★★ (4.9 / 5 from 48 verified buyers)
   - Price: ₹80 per 55g pack (Inclusive of all taxes)
   - Real-time stock status badge: *"Freshly Packed in Erode — In Stock"*
   - Quantity Stepper: [-] [ 1 ] [+]
   - Action Buttons:
     - Primary: "Add to Cart — ₹80"
     - Secondary: "Buy Now with 1-Click"
   - Feature Highlights: Zero Palm Oil, Gluten Free, 110 kcal per serving
4. **Tabbed Detailed Specifications**:
   - **Ingredients**: Black Rice (Karuppu Kavuni), Avarampoo Petal Extract, Cold Pressed Sesame Oil, Rock Salt, Cumin.
   - **Nutritional Table**: Energy, Protein, Carbohydrates, Dietary Fiber, Iron, Antioxidants.
   - **Storage & Shelf Life**: 6 months in cool dry environment.
5. **Verified Customer Reviews Section**:
   - Rating distribution bar chart
   - User reviews with verified purchase tags
   - "Write a Review" form
` : screen.name.includes('checkout') ? `
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
` : screen.name.includes('tracking') ? `
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
` : screen.name.includes('brand-story') ? `
### Layout Sections:
1. **Editorial Hero**:
   - "Rooted in Tamil Soil, Crafted for Everyday Wellness"
   - Large visual of Kongu Nadu black rice paddy fields
2. **The Karuppu Kavuni Heritage**:
   - History of Emperor's Rice in Tamil culture and its high anthocyanin antioxidant content
3. **The Erode Kitchen Craft**:
   - Traditional stone-ground process combined with gentle low-temperature air puffing
   - Native herbal infusions: Avarampoo, Hibiscus, Vallarai, Lotus seeds
4. **Founder's Pledge**:
   - Clean ingredient manifesto: No preservatives, no MSG, no artificial colors, no palm oil
5. **Interactive Factory Location**:
   - Erode, Tamil Nadu facility details with sustainable packaging promise
` : screen.name.includes('logo') ? `
### Vector Logo Specification:
- **Dimensions**: 240px × 60px
- **Colors**:
  - Circle & Base: Primary Dark Chocolate Brown (\`#3E2723\`)
  - Grain / Sprout Motif: Warm Harvest Gold (\`#C39861\`)
  - Typography: \`WAFER\` in \`#3E2723\` (Outfit font, 800 weight), \`KING\` in \`#C39861\`
  - Tagline: \`ARTISAN BLACK RICE • ERODE\` in \`#8B7355\` (Inter font, 600 weight, tracking 1.8px)
` : `
### Customer Avatar Asset:
- Portrait image used in testimonials, customer profile, and social proof components.
`
}

---

## 3. Stitch Raw Source Code

\`\`\`${screen.type === 'image/svg+xml' ? 'xml' : 'html'}
${content || '/* Binary Image Asset: ' + screen.screenshotUrl + ' */'}
\`\`\`
`;

    fs.writeFileSync(path.join(targetDir, `${screen.name}.md`), mdContent, 'utf8');
    console.log(`Saved: ${screen.name}.md`);
  }
}

run().catch(console.error);
