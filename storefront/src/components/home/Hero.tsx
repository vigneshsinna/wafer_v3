import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Package } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-primary pt-28 text-background-cream md:pt-36">
            <div className="absolute inset-0 opacity-[0.07]" aria-hidden="true" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            <div className="container relative mx-auto grid items-center gap-10 px-4 pb-16 md:grid-cols-[1.05fr_0.95fr] md:gap-14 md:pb-24">
                <div className="max-w-2xl">
                    <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-accent-200">Made in Erode, Tamil Nadu</p>
                    <h1 className="font-display text-5xl font-bold leading-[1.07] tracking-tight sm:text-6xl lg:text-7xl">
                        Black rice wafers with a story in every bite.
                    </h1>
                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-background-cream/75">
                        Discover four distinctive wafers inspired by familiar Indian ingredients: Hibiscus, Avarampoo, Vallarai and Makhana.
                    </p>
                    <div className="mt-9 flex flex-wrap gap-3">
                        <a href="#products" className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-semibold text-primary transition-colors hover:bg-accent-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                            Explore the collection <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                        <Link href="/about" className="inline-flex items-center rounded-md border border-background-cream/40 px-6 py-3 font-semibold text-background-cream transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                            Our story
                        </Link>
                    </div>
                    <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/20 pt-5 text-sm text-background-cream/70">
                        <span className="flex items-center gap-2"><Package className="h-4 w-4 text-accent-200" aria-hidden="true" /> 55 g packs</span>
                        <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent-200" aria-hidden="true" /> Crafted in India</span>
                    </div>
                </div>
                <div className="relative mx-auto w-full max-w-[560px]">
                    <div className="overflow-hidden rounded-lg border border-white/10 bg-background-cream p-3 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-5">
                        <Image src="/images/hibiscus-wafer.png" width={1024} height={1024} priority alt="Hibiscus black rice wafer pack with wafers" className="aspect-square w-full rounded-md object-cover" />
                    </div>
                    <div className="absolute -bottom-5 -left-3 rounded-md border border-white/15 bg-primary-600 px-4 py-3 text-sm font-medium text-background-cream shadow-warm sm:-left-7">
                        Four flavours. One black rice base.
                    </div>
                </div>
            </div>
        </section>
    );
}
