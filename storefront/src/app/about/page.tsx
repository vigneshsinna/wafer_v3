import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Package, Sprout } from "lucide-react";
import { getStorePage } from "@/lib/storeContent";

const ingredients = [
    { name: "Hibiscus", note: "A floral note and a bold colour." },
    { name: "Avarampoo", note: "A familiar flower with a gentle flavour." },
    { name: "Vallarai", note: "A leafy ingredient from South Indian kitchens." },
    { name: "Makhana", note: "A light, satisfying crunch." },
];

export default async function AboutPage() {
    const page = await getStorePage("about");
    return (
        <div className="bg-background pt-[72px]">
            <section className="bg-primary py-16 text-background-cream md:py-24">
                <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2 md:gap-16">
                    <div>
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent-200">Our story</p>
                        <h1 className="font-display text-5xl font-bold leading-tight md:text-6xl">{page?.content ? page.title : "Wafer King, made in Erode."}</h1>
                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-background-cream/75">
                            {page?.content || "We bring black rice and ingredients familiar to Indian kitchens together in a range of crisp, flavourful wafers."}
                        </p>
                        <Link href="/#products" className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-semibold text-primary hover:bg-accent-200">
                            Shop the collection <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                    <div className="overflow-hidden rounded-lg border border-white/15 bg-background-cream p-3">
                        <Image src="/images/makhana-wafer.png" width={1024} height={1024} priority alt="Makhana black rice wafer pack" className="aspect-square w-full rounded-md object-cover" />
                    </div>
                </div>
            </section>

            <section className="container mx-auto grid gap-8 px-4 py-16 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:py-24">
                <div>
                    <p className="eyebrow">From our kitchen</p>
                    <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">A little tradition. A lot of crunch.</h2>
                </div>
                <div className="space-y-5 text-lg leading-relaxed text-primary/75">
                    <p>Wafer King Snacks is based in Erode, Tamil Nadu. Our range pairs black rice wafers with distinctive botanical and pantry ingredients.</p>
                    <p>Each flavour has its own character. Explore the collection and check each product page for its pack details and ingredients.</p>
                    <div className="flex flex-wrap gap-3 pt-3 text-sm font-medium text-primary">
                        <span className="inline-flex items-center gap-2 rounded-md border border-primary/15 bg-white px-4 py-2"><MapPin className="h-4 w-4 text-accent-700" /> Erode, India</span>
                        <span className="inline-flex items-center gap-2 rounded-md border border-primary/15 bg-white px-4 py-2"><Package className="h-4 w-4 text-accent-700" /> 55 g packs</span>
                    </div>
                </div>
            </section>

            <section className="bg-background-warm py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <p className="eyebrow">The collection</p>
                    <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Four ways to find your favourite.</h2>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {ingredients.map((item, index) => (
                            <div key={item.name} className="surface-panel p-6">
                                <Sprout className="mb-8 h-6 w-6 text-accent-700" aria-hidden="true" />
                                <p className="text-xs font-bold uppercase tracking-widest text-primary/50">0{index + 1}</p>
                                <h3 className="mt-2 font-display text-2xl font-bold">{item.name}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-primary/70">{item.note}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
