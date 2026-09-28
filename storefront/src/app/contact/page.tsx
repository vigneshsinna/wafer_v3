"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import { submitContactForm } from "@/lib/api";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const emptyForm = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactPage() {
    const [form, setForm] = useState(emptyForm);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError("");
        try {
            await submitContactForm({ ...form, phone: form.phone || undefined });
            setSubmitted(true);
        } catch {
            setError("Message could not be sent. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-background pt-[72px]">
            <section className="bg-primary py-14 text-background-cream md:py-20">
                <div className="container mx-auto px-4">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-200">We are here to help</p>
                    <h1 className="font-display text-4xl font-bold md:text-5xl">Contact Wafer King</h1>
                    <p className="mt-4 max-w-2xl text-lg text-background-cream/75">Questions about a product or an order? Send us a message and our team will respond.</p>
                </div>
            </section>

            <div className="container mx-auto grid gap-8 px-4 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:py-16">
                <aside className="space-y-8">
                    <div>
                        <h2 className="font-display text-2xl font-bold">Reach us directly</h2>
                        <p className="mt-2 text-primary/70">Wafer King Snacks, Erode, Tamil Nadu.</p>
                    </div>
                    <div className="space-y-5">
                        <div className="flex items-start gap-4"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent-700" aria-hidden="true" /><div><h3 className="font-semibold">Email</h3><a href="mailto:support@waferking.com" className="text-primary/70 underline-offset-4 hover:underline">support@waferking.com</a></div></div>
                        <div className="flex items-start gap-4"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent-700" aria-hidden="true" /><div><h3 className="font-semibold">Phone</h3><a href="tel:+919788090895" className="text-primary/70 underline-offset-4 hover:underline">+91 97880 90895</a></div></div>
                        <div className="flex items-start gap-4"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent-700" aria-hidden="true" /><div><h3 className="font-semibold">Address</h3><p className="text-primary/70">Gain Industrial Centre, No. 257/2-C,<br />Sembampalayam, Nasiyanur Road,<br />Erode 638107, Tamil Nadu, India</p></div></div>
                    </div>
                    <div className="rounded-lg border border-primary/10 bg-background-warm p-5 text-sm text-primary/75">
                        Looking for a quick answer? Browse our <Link href="/faq" className="font-semibold text-primary underline underline-offset-4">FAQ</Link> or <Link href="/track" className="font-semibold text-primary underline underline-offset-4">track your order</Link>.
                    </div>
                </aside>

                <div className="surface-panel p-6 sm:p-8">
                    {submitted ? (
                        <div className="flex min-h-80 flex-col items-center justify-center text-center" role="status">
                            <CheckCircle className="h-12 w-12 text-secondary" aria-hidden="true" />
                            <h2 className="mt-4 font-display text-2xl font-bold">Message sent</h2>
                            <p className="mt-2 max-w-md text-primary/70">Thank you for contacting us. We have received your message.</p>
                            <button type="button" onClick={() => { setForm(emptyForm); setSubmitted(false); }} className="btn-outline mt-6">Send another message</button>
                        </div>
                    ) : (
                        <>
                            <h2 className="font-display text-2xl font-bold">Send a message</h2>
                            <p className="mt-1 text-sm text-primary/60">Fields marked * are required.</p>
                            {error && <p role="alert" className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <Input label="Full name *" name="name" autoComplete="name" required value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} />
                                    <Input label="Email address *" name="email" type="email" autoComplete="email" required value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} />
                                </div>
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <Input label="Phone number" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={event => setForm({ ...form, phone: event.target.value })} />
                                    <div>
                                        <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium">Subject *</label>
                                        <select id="contact-subject" name="subject" required value={form.subject} onChange={event => setForm({ ...form, subject: event.target.value })} className="input-field">
                                            <option value="">Select a subject</option>
                                            {["Order Inquiry", "Product Question", "Feedback", "Complaint", "Business Inquiry", "Other"].map(subject => <option key={subject} value={subject}>{subject}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">Message *</label>
                                    <textarea id="contact-message" name="message" required rows={6} value={form.message} onChange={event => setForm({ ...form, message: event.target.value })} className="input-field resize-y" placeholder="How can we help?" />
                                </div>
                                <Button type="submit" isLoading={loading} disabled={loading}><Send className="h-4 w-4" aria-hidden="true" />Send message</Button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
