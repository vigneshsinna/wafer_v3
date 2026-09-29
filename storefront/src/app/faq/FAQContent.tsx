"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PublicPage } from "@/lib/api";

export default function FAQContent({ page }: { page: PublicPage | null }) {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("all");
    const [open, setOpen] = useState<string | null>(null);

    const sections = page?.faq_sections || [];
    const total = sections.reduce((count, section) => count + section.questions.length, 0);
    const filtered = useMemo(() => sections
        .filter(section => category === "all" || section.title === category)
        .map(section => ({ ...section, questions: section.questions.filter(item => `${item.question} ${item.answer}`.toLowerCase().includes(query.toLowerCase())) }))
        .filter(section => section.questions.length > 0), [sections, category, query]);

    return <div className="min-h-screen bg-background pt-20">
        <section className="bg-surface-container-low py-space-xl text-center lg:py-20">
            <div className="mx-auto max-w-4xl px-gutter-sm md:px-gutter">
                <p className="font-label-sm uppercase tracking-widest text-accent-700">Help Centre</p>
                <h1 className="mt-3 font-headline-xl text-primary">Frequently Asked Questions</h1>
                <p className="mt-4 text-on-surface-variant">Find answers about ingredients, nutrition, orders and delivery.</p>
                <label className="mx-auto mt-space-lg flex max-w-xl items-center gap-3 rounded-full border border-surface-container-high bg-background-cream px-5 py-3 text-left">
                    <span className="material-symbols-outlined text-on-surface-variant">search</span>
                    <span className="sr-only">Search questions</span>
                    <input type="text" role="searchbox" className="min-w-0 flex-1 bg-transparent outline-none" placeholder="Search for answers" value={query} onChange={event => setQuery(event.target.value)} />
                    {query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><span className="material-symbols-outlined">close</span></button>}
                </label>
            </div>
        </section>
        <nav aria-label="FAQ categories" className="sticky top-20 z-10 border-b border-surface-container-high bg-background-cream/95 py-4 backdrop-blur">
            <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-gutter-sm md:px-gutter">
                <button type="button" aria-pressed={category === "all"} onClick={() => setCategory("all")} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${category === "all" ? "bg-primary-container text-on-primary" : "bg-surface-container-low text-primary"}`}>All Questions ({total})</button>
                {sections.map((section, index) => <button key={section.title} type="button" aria-pressed={category === section.title} onClick={() => setCategory(section.title)} className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${category === section.title ? "bg-primary-container text-on-primary" : "bg-surface-container-low text-primary"}`}><span className="material-symbols-outlined text-base">{["grass", "favorite", "local_shipping", "inventory_2"][index] || "help"}</span>{section.title} ({section.questions.length})</button>)}
            </div>
        </nav>
        <div className="mx-auto max-w-4xl space-y-space-xl px-gutter-sm py-space-xl md:px-gutter">
            {!page && <p role="alert" className="rounded-lg bg-error-container p-4 text-on-error-container">Could not load questions.</p>}
            {page && filtered.length === 0 && <p className="rounded-xl bg-background-cream p-space-lg text-on-surface-variant">No questions found. <button type="button" className="font-semibold text-accent-700 underline" onClick={() => { setQuery(""); setCategory("all"); }}>Clear filters</button></p>}
            {filtered.map((section, sectionIndex) => <section key={section.title}>
                <div className="mb-space-md flex items-center gap-3"><span className="material-symbols-outlined rounded-full bg-secondary-container p-3 text-secondary">{["grass", "favorite", "local_shipping", "inventory_2"][sections.findIndex(item => item.title === section.title)] || "help"}</span><h2 className="font-headline-md text-primary">{section.title}</h2></div>
                <div className="space-y-space-sm">
                    {section.questions.map((item, index) => {
                        const id = `${section.title}-${index}`;
                        const expanded = open === id;
                        return <div key={id} className="overflow-hidden rounded-xl border border-surface-container-high bg-background-cream">
                            <h3><button type="button" aria-expanded={expanded} aria-controls={`answer-${sectionIndex}-${index}`} onClick={() => setOpen(expanded ? null : id)} className="flex w-full items-center justify-between gap-3 p-space-md text-left font-semibold text-primary hover:bg-surface-container-low"><span>{item.question}</span><span className="material-symbols-outlined">{expanded ? "expand_less" : "expand_more"}</span></button></h3>
                            {expanded && <p id={`answer-${sectionIndex}-${index}`} className="whitespace-pre-line border-t border-surface-container px-space-md py-space-md text-on-surface-variant">{item.answer}</p>}
                        </div>;
                    })}
                </div>
            </section>)}
        </div>
        <section className="bg-primary-container py-space-xl text-center text-on-primary">
            <h2 className="font-headline-lg">Didn't find your answer? Connect with our Erode Concierge directly.</h2>
            <Link href="/contact" className="mt-5 inline-flex items-center gap-2 rounded-full bg-tertiary-fixed px-6 py-3 font-semibold text-on-tertiary-fixed">Contact Our Team<span className="material-symbols-outlined">arrow_forward</span></Link>
        </section>
    </div>;
}
