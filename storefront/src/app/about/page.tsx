import Image from "next/image";
import Link from "next/link";
import { getStorePage } from "@/lib/storeContent";
import { getProducts } from "@/lib/api";
import { isOptimizableImage } from "@/lib/images";

export default async function AboutPage() {
    const [page, products] = await Promise.all([getStorePage("about"), getProducts().catch(() => [])]);
    const paragraphs = page?.content.split(/\n\s*\n|\n/).map(text => text.trim()).filter(Boolean) || [];
    const storyImages = products.filter(product => product.thumbnail_url).slice(0, 2);

    return (
        <div className="min-h-screen bg-background pt-20">
            <section className="relative overflow-hidden border-b border-surface-container-high bg-surface-container-low py-space-xl md:py-28">
                <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-tertiary-fixed-dim/20 blur-3xl" />
                <div data-scroll-stagger className="relative mx-auto grid max-w-7xl items-center gap-space-xl px-gutter-sm md:px-gutter lg:grid-cols-12">
                    <div className="flex flex-col gap-space-md lg:col-span-7">
                        <span className="inline-flex self-start rounded-full bg-accent-50 px-space-md py-space-xs text-label-md font-semibold uppercase tracking-widest text-accent-700">The WaferKing story</span>
                        <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl font-bold tracking-tight text-primary">{page?.title || "Our Story"}</h1>
                        <p className="max-w-2xl whitespace-pre-line font-body-lg text-body-lg leading-relaxed text-on-surface-variant">{paragraphs[0] || "Discover the people, ingredients, and ideas behind WaferKing."}</p>
                        <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
                            <Link href="/#flavours" className="inline-flex items-center gap-2 rounded-lg bg-primary-container px-space-lg py-space-sm text-on-primary shadow-md hover:bg-primary-700">Explore the Collection<span className="material-symbols-outlined text-[18px]">arrow_forward</span></Link>
                            <span className="flex items-center gap-2 rounded-lg border border-surface-container-high bg-background-cream px-space-md py-space-xs text-label-sm text-primary-50"><span className="material-symbols-outlined text-[18px] text-secondary">spa</span>Our ingredients and craft</span>
                        </div>
                    </div>
                    <div className="relative lg:col-span-5">
                        <div className="relative h-[460px] overflow-hidden rounded-2xl border border-surface-container-high bg-background-warm shadow-xl">
                            {storyImages[0]?.thumbnail_url ? <Image src={storyImages[0].thumbnail_url} alt={storyImages[0].name} fill priority unoptimized={!isOptimizableImage(storyImages[0].thumbnail_url)} sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" /> : <span className="material-symbols-outlined flex h-full items-center justify-center text-[72px] text-primary-50">inventory_2</span>}
                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/80 via-primary/20 to-transparent p-space-lg text-on-primary">
                                <span className="text-label-sm uppercase tracking-wider text-tertiary-fixed-dim">Our collection</span>
                                <p className="font-headline-sm text-headline-sm font-semibold">The story behind every wafer</p>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -left-6 hidden max-w-xs items-center gap-space-sm rounded-xl border border-surface-container-high bg-background-cream p-space-md shadow-lg sm:flex">
                            <span className="material-symbols-outlined rounded-full bg-secondary-container p-3 text-secondary">local_florist</span>
                            <span className="text-body-sm text-on-surface-variant">Explore the ingredients on each product page.</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-surface py-space-xl md:py-24">
                <div data-scroll-stagger className="mx-auto grid max-w-7xl items-center gap-space-xl px-gutter-sm md:px-gutter lg:grid-cols-12">
                    <div className="order-2 space-y-space-md lg:order-1 lg:col-span-5">
                        <div className="relative h-72 overflow-hidden rounded-2xl bg-surface-container shadow-md">{storyImages[1]?.thumbnail_url ? <Image src={storyImages[1].thumbnail_url} alt={storyImages[1].name} fill unoptimized={!isOptimizableImage(storyImages[1].thumbnail_url)} sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" /> : <span className="material-symbols-outlined flex h-full items-center justify-center text-[72px] text-primary-50">inventory_2</span>}</div>
                        <div className="grid grid-cols-2 gap-space-md">
                            <div className="rounded-xl border border-surface-container-high bg-background-cream p-space-md shadow-sm"><span className="material-symbols-outlined text-[32px] text-accent-700">menu_book</span><h3 className="mt-2 font-semibold text-primary">Our story</h3><p className="text-body-sm text-on-surface-variant">Read about the brand and its products.</p></div>
                            <div className="rounded-xl border border-surface-container-high bg-background-cream p-space-md shadow-sm"><span className="material-symbols-outlined text-[32px] text-secondary">nutrition</span><h3 className="mt-2 font-semibold text-primary">Product facts</h3><p className="text-body-sm text-on-surface-variant">Check each pack for ingredients and nutrition.</p></div>
                        </div>
                    </div>
                    <div className="order-1 flex flex-col gap-space-md lg:order-2 lg:col-span-7 lg:pl-space-lg">
                        <span className="flex items-center gap-2 text-label-md font-semibold uppercase tracking-wider text-accent-700"><span className="material-symbols-outlined">history_edu</span>Our heritage</span>
                        <h2 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl font-bold text-primary">The story behind WaferKing</h2>
                        {paragraphs.slice(1, 4).length ? paragraphs.slice(1, 4).map((text, index) => <p key={index} className="font-body-md text-body-md leading-relaxed text-on-surface-variant">{text}</p>) : <p className="font-body-md text-body-md text-on-surface-variant">We are preparing more details about our origins and process.</p>}
                        <div className="flex items-start gap-space-md rounded-xl bg-surface-container-high p-space-md"><span className="material-symbols-outlined text-[28px] text-accent-700">info</span><p className="text-body-sm text-on-surface-variant">Product descriptions and pack labels provide the most current ingredient details.</p></div>
                    </div>
                </div>
            </section>

            <section className="border-y border-surface-container-high bg-surface-container-low py-space-xl md:py-24">
                <div className="mx-auto max-w-7xl px-gutter-sm md:px-gutter">
                    <span className="text-label-md font-semibold uppercase tracking-wider text-accent-700">Our approach</span>
                    <h2 data-scroll-reveal className="mt-2 font-headline-xl text-headline-xl-mobile md:text-headline-xl font-bold text-primary">The Clean Craft Philosophy</h2>
                    <p className="mt-3 max-w-2xl text-body-md text-on-surface-variant">Learn about the products, ingredients, and help available from our team.</p>
                    <div data-scroll-stagger className="mt-space-xl grid gap-space-lg md:grid-cols-3">
                        {[
                            { icon: "agriculture", title: "Ingredients", body: "Find the ingredient list on each product page and pack.", href: "/#flavours", link: "Browse products" },
                            { icon: "bakery_dining", title: "The Products", body: "Explore the available wafer flavours and pack options.", href: "/#flavours", link: "Explore flavours" },
                            { icon: "support_agent", title: "Questions", body: "Ask our team about products, orders, and delivery.", href: "/contact", link: "Contact us" },
                        ].map((card, index) => <article key={card.title} className="flex flex-col rounded-2xl border border-surface-container-high bg-background-cream p-space-lg shadow-sm">
                            <span className="material-symbols-outlined mb-space-md flex h-14 w-14 items-center justify-center rounded-xl bg-surface-container text-[28px] text-primary-container">{card.icon}</span>
                            <span className="text-label-sm font-semibold uppercase tracking-wider text-accent-700">Pillar 0{index + 1}</span>
                            <h3 className="my-space-sm font-headline-sm text-headline-sm font-bold text-primary">{card.title}</h3>
                            <p className="text-body-sm leading-relaxed text-on-surface-variant">{card.body}</p>
                            <Link href={card.href} className="mt-auto pt-space-lg text-label-sm font-semibold text-secondary underline">{card.link}</Link>
                        </article>)}
                    </div>
                </div>
            </section>

            <section data-scroll-reveal className="bg-background py-space-xl text-center md:py-20"><div className="mx-auto flex max-w-3xl flex-col items-center gap-space-md px-gutter-sm md:px-gutter"><span className="text-label-sm font-semibold uppercase tracking-widest text-accent-700">Ready to explore?</span><h2 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl font-bold text-primary">Experience the Collection for Yourself</h2><p className="font-body-lg text-body-lg text-on-surface-variant">See current flavours, pack sizes, availability, and prices in the collection.</p><Link href="/#flavours" className="inline-flex items-center gap-2 rounded-full bg-primary-container px-space-xl py-space-md text-on-primary shadow-md hover:bg-primary-700">Explore the Collection<span className="material-symbols-outlined text-[18px]">arrow_forward</span></Link></div></section>
        </div>
    );
}
