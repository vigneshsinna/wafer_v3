"use client";

import { useState } from "react";
import Link from "next/link";
import { submitContactForm } from "@/lib/api";
import type { StoreSettings } from "@/lib/storeContent";

const topics = [
    { title: "Order & Shipping Status", detail: "Order status and delivery questions", icon: "local_shipping" },
    { title: "Quality & Freshness", detail: "Product and pack questions", icon: "verified" },
    { title: "Wholesale & Retail", detail: "Cafes, organic pantries, bulk orders", icon: "storefront" },
    { title: "Botanical Ingredients", detail: "Avarampoo, Hibiscus, Herbals", icon: "eco" },
];

const emptyForm = { name: "", email: "", phone: "", subject: "", orderId: "", message: "" };

export default function ContactContent({ settings }: { settings: StoreSettings | null }) {
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    async function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!form.subject) { setError("Choose a topic of inquiry."); return; }
        setSubmitting(true);
        setError("");
        try {
            await submitContactForm({
                name: form.name,
                email: form.email,
                phone: form.phone || undefined,
                subject: form.subject,
                message: form.orderId ? `Order ID: ${form.orderId}\n\n${form.message}` : form.message,
            });
            setSent(true);
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : "Message could not be sent.");
        } finally {
            setSubmitting(false);
        }
    }

    return <div className="bg-background pt-20">
        <section className="bg-surface-container-low py-14 lg:py-20">
            <div className="mx-auto max-w-7xl px-gutter-sm md:px-gutter">
                <p className="font-label-sm uppercase tracking-widest text-accent-700">Customer Support</p>
                <h1 className="mt-3 max-w-4xl font-headline-xl text-headline-xl-mobile md:text-headline-xl font-extrabold text-primary">Connect with Our Erode Kitchen &amp; Concierge</h1>
                <p className="mt-5 max-w-2xl font-body-lg text-on-surface-variant">Ask about an order, our ingredients, or working with WaferKing.</p>
            </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-space-xl px-gutter-sm py-space-xl md:px-gutter lg:grid-cols-12 lg:py-20">
            <aside className="space-y-space-lg lg:col-span-4">
                <div className="rounded-xl bg-background-cream p-space-lg shadow-sm">
                    <span className="material-symbols-outlined text-3xl text-accent-700">mail</span>
                    <h3 className="mt-2 font-headline-sm text-primary">Email Dispatch Desk</h3>
                    {settings?.contact_email ? <a className="mt-2 block break-all text-on-surface-variant underline" href={`mailto:${settings.contact_email}`}>{settings.contact_email}</a> : <p className="mt-2 text-on-surface-variant">Use the form to contact us.</p>}
                </div>
                {settings?.contact_phone && <div className="rounded-xl bg-background-cream p-space-lg shadow-sm">
                    <span className="material-symbols-outlined text-3xl text-accent-700">call</span>
                    <h3 className="mt-2 font-headline-sm text-primary">Speak With Our Team</h3>
                    <a className="mt-2 block text-on-surface-variant underline" href={`tel:${settings.contact_phone}`}>{settings.contact_phone}</a>
                </div>}
                {settings?.contact_address && <div className="rounded-xl bg-background-cream p-space-lg shadow-sm">
                    <span className="material-symbols-outlined text-3xl text-accent-700">location_on</span>
                    <h3 className="mt-2 font-headline-sm text-primary">Artisan Kitchen Facility</h3>
                    <p className="mt-2 whitespace-pre-line text-on-surface-variant">{settings.contact_address}</p>
                </div>}
            </aside>

            <div className="rounded-2xl bg-background-cream p-space-lg shadow-warm lg:col-span-8 lg:p-space-xl">
                {sent ? <div role="status" className="py-16 text-center">
                    <span className="material-symbols-outlined text-5xl text-secondary">check_circle</span>
                    <h2 className="mt-3 font-headline-lg text-primary">Message received</h2>
                    <p className="mt-2 text-on-surface-variant">Our team will review your inquiry.</p>
                    <button type="button" className="mt-6 rounded-full bg-primary-container px-6 py-3 text-on-primary" onClick={() => { setForm(emptyForm); setSent(false); }}>Send another inquiry</button>
                </div> : <>
                    <p className="font-label-sm uppercase tracking-widest text-accent-700">Direct to our team</p>
                    <h2 className="mt-2 font-headline-lg text-primary">Send an Inquiry to Our Bakers</h2>
                    {error && <p role="alert" className="mt-5 rounded-lg bg-error-container p-3 text-on-error-container">{error}</p>}
                    <form onSubmit={submit} className="mt-space-lg space-y-space-lg">
                        <fieldset>
                            <legend className="font-label-lg font-semibold text-primary">Select Topic of Inquiry *</legend>
                            <div className="mt-space-sm grid gap-space-sm sm:grid-cols-2">
                                {topics.map(topic => <button key={topic.title} type="button" aria-pressed={form.subject === topic.title}
                                    onClick={() => setForm({ ...form, subject: topic.title })}
                                    className={`flex items-start gap-space-sm rounded-lg border p-space-md text-left transition-colors ${form.subject === topic.title ? "border-primary-container bg-primary-container text-on-primary" : "border-surface-container-high bg-surface-container-low text-primary hover:border-primary"}`}>
                                    <span className="material-symbols-outlined">{topic.icon}</span>
                                    <span><strong className="block text-sm">{topic.title}</strong><span className="text-xs opacity-75">{topic.detail}</span></span>
                                </button>)}
                            </div>
                        </fieldset>
                        <div className="grid gap-space-md sm:grid-cols-2">
                            <label className="block text-sm font-semibold text-primary">Full Name *<input required autoComplete="name" maxLength={255} className="input-field mt-2" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
                            <label className="block text-sm font-semibold text-primary">Phone Number<input type="tel" autoComplete="tel" maxLength={30} className="input-field mt-2" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></label>
                            <label className="block text-sm font-semibold text-primary">Email Address *<input type="email" required autoComplete="email" maxLength={255} className="input-field mt-2" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
                            <label className="block text-sm font-semibold text-primary">Order Consignment ID<input maxLength={100} className="input-field mt-2" value={form.orderId} onChange={e => setForm({ ...form, orderId: e.target.value })} /></label>
                        </div>
                        <label className="block text-sm font-semibold text-primary">Your Message *<textarea required minLength={10} maxLength={5000} rows={6} className="input-field mt-2 resize-y" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} /></label>
                        <button disabled={submitting} className="inline-flex items-center gap-2 rounded-full bg-primary-container px-space-xl py-space-sm font-semibold text-on-primary disabled:opacity-50">{submitting ? "Sending…" : "Send Message to Concierge"}<span className="material-symbols-outlined">arrow_forward</span></button>
                    </form>
                </>}
            </div>
        </section>

        <section className="bg-surface-container-low py-space-xl">
            <div className="mx-auto grid max-w-7xl gap-space-xl px-gutter-sm md:px-gutter lg:grid-cols-2">
                <div>
                    <h2 className="font-headline-lg text-primary">Our Heritage Milling Grounds</h2>
                    {settings?.contact_address && <p className="mt-3 whitespace-pre-line text-on-surface-variant">{settings.contact_address}</p>}
                    {settings?.contact_address && <a className="mt-4 inline-block font-semibold text-accent-700 underline" target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.contact_address)}`}>View directions</a>}
                </div>
                <div className="rounded-xl bg-background-cream p-space-lg">
                    <h2 className="font-headline-lg text-primary">Frequently Asked Concierge Questions</h2>
                    <p className="mt-3 text-on-surface-variant">Find answers about freshness, deliveries and visiting us.</p>
                    <Link href="/faq" className="mt-4 inline-flex items-center gap-2 font-semibold text-accent-700">Browse all questions <span className="material-symbols-outlined">arrow_forward</span></Link>
                </div>
            </div>
        </section>
    </div>;
}
