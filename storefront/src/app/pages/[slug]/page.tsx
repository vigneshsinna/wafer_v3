import { notFound } from "next/navigation";
import { getStorePage } from "@/lib/storeContent";

export default async function StorePage({ params }: { params: { slug: string } }) {
    const page = await getStorePage(params.slug);
    if (!page?.content) notFound();
    return <div className="min-h-screen bg-background px-4 pb-20 pt-32">
        <article className="surface-panel mx-auto max-w-4xl p-8 md:p-12">
            <h1 className="mb-8 font-display text-4xl font-bold text-primary">{page.title}</h1>
            <div className="whitespace-pre-line leading-relaxed text-primary/80">{page.content}</div>
        </article>
    </div>;
}
