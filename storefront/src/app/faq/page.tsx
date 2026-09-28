"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Package, Truck, CreditCard, RefreshCw, HelpCircle } from "lucide-react";
import Link from "next/link";
import { getPublicPage } from "@/lib/api";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQCategory {
    icon: typeof Package;
    title: string;
    description: string;
    faqs: FAQItem[];
}

const faqData: FAQCategory[] = [
    {
        icon: Package,
        title: "Orders & Products",
        description: "Questions about placing orders and our products",
        faqs: [
            {
                question: "How do I place an order?",
                answer: "Browse our products and add items to your cart. At checkout, choose a delivery address and follow the available payment options. If checkout is unavailable, contact support."
            },
            {
                question: "What is the minimum order quantity?",
                answer: "There is no minimum order quantity. You can order as few or as many items as you'd like. However, we recommend ordering multiple items to maximize shipping value."
            },
            {
                question: "Are your wafers vegetarian?",
                answer: "Yes, all our wafers are 100% vegetarian. We do not use any animal-derived ingredients in our products. Some products may contain dairy (milk, cream) - please check individual product descriptions for allergen information."
            },
            {
                question: "How long do the wafers stay fresh?",
                answer: "Our wafers have a shelf life of 3-6 months from the date of manufacture when stored properly. We recommend storing them in a cool, dry place away from direct sunlight. Always check the best-before date on the packaging."
            },
            {
                question: "Can I customize my order?",
                answer: "We currently offer our standard product range. For bulk or corporate enquiries, please contact us at support@waferking.com."
            }
        ]
    },
    {
        icon: Truck,
        title: "Shipping & Delivery",
        description: "Information about shipping and delivery times",
        faqs: [
            {
                question: "What are the shipping charges?",
                answer: "Shipping charges below the free-shipping threshold are calculated at checkout. Shipping is free on orders of ₹499 or more within Tamil Nadu and ₹699 or more elsewhere in India."
            },
            {
                question: "How long does delivery take?",
                answer: "We typically dispatch orders within 1-2 business days. Delivery times depend on your location: Metro cities (2-4 days), Other cities (4-7 days), Remote areas (7-10 days). You can track your order using the tracking link sent via email."
            },
            {
                question: "Do you deliver to all areas in India?",
                answer: "Yes, we deliver across India through our trusted courier partners. However, delivery to some remote areas might take longer. You can check serviceability by entering your PIN code at checkout."
            },
            {
                question: "Can I track my order?",
                answer: "Use our Track Order page with your order ID. If you need help with a shipment, contact support."
            },
            {
                question: "What if my order is delayed?",
                answer: "We strive to deliver all orders on time. If your order is delayed beyond the expected delivery date, please contact our support team with your order ID. We'll investigate and provide updates on your shipment."
            }
        ]
    },
    {
        icon: CreditCard,
        title: "Payment",
        description: "Payment methods and security",
        faqs: [
            {
                question: "What payment methods do you accept?",
                answer: "Online payment checkout is being configured. No payment can be taken through this site yet."
            },
            {
                question: "Is my payment information secure?",
                answer: "Please do not enter card or UPI details in our contact form. Online payment checkout is not active yet."
            },
            {
                question: "Will I get an invoice for my order?",
                answer: "For an existing order, contact support with your order ID to request an invoice."
            },
            {
                question: "Can I pay on delivery (COD)?",
                answer: "Cash on delivery is not available through this site. Contact support for current ordering options."
            }
        ]
    },
    {
        icon: RefreshCw,
        title: "Returns & Refunds",
        description: "Our return and refund policies",
        faqs: [
            {
                question: "What is your return policy?",
                answer: "Due to the perishable nature of our products, we have a limited return policy. Returns are accepted only if the product is damaged during transit or if you received the wrong item. Please notify us within 48 hours of delivery."
            },
            {
                question: "How do I report a damaged product?",
                answer: "If you receive a damaged product, please take photos of the damaged items and packaging, then contact us within 48 hours at support@waferking.com with your order ID and photos. We'll review your request for a replacement or refund."
            },
            {
                question: "How long does a refund take?",
                answer: "Once your return/refund request is approved, refunds are processed within 5-7 business days. The amount will be credited to your original payment method. Bank processing times may add 2-3 additional days."
            },
            {
                question: "Can I cancel my order?",
                answer: "Orders can be cancelled before they are shipped. Once shipped, cancellation is not possible. To cancel an order, please contact us immediately with your order ID. Refunds for cancelled orders are processed within 5-7 business days."
            }
        ]
    }
];

export default function FAQPage() {
    const [managedPage, setManagedPage] = useState<{ title: string; content: string } | null>(null);
    useEffect(() => { void getPublicPage("faq").then(setManagedPage).catch(() => {}); }, []);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());

    const toggleQuestion = (id: string) => {
        const newOpenQuestions = new Set(openQuestions);
        if (newOpenQuestions.has(id)) {
            newOpenQuestions.delete(id);
        } else {
            newOpenQuestions.add(id);
        }
        setOpenQuestions(newOpenQuestions);
    };

    const filteredData = faqData
        .map(category => ({
            ...category,
            faqs: category.faqs.filter(
                faq =>
                    searchQuery === "" ||
                    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }))
        .filter(
            category =>
                (activeCategory === "all" || category.title === activeCategory) &&
                (searchQuery === "" || category.faqs.length > 0)
        );

    if (managedPage?.content) return <div className="min-h-screen bg-background px-4 pb-20 pt-32">
        <div className="surface-panel mx-auto max-w-4xl p-8 md:p-12">
            <h1 className="mb-8 font-display text-4xl font-bold text-primary">{managedPage.title}</h1>
            <div className="whitespace-pre-line leading-relaxed text-primary/80">{managedPage.content}</div>
            <Link href="/contact" className="mt-8 inline-block text-primary underline">Contact us</Link>
        </div>
    </div>;

    return (
        <>
            <div className="min-h-screen pt-[72px] bg-background">
                {/* Hero Section */}
                <section className="bg-primary py-16 text-background-cream md:py-20">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center max-w-3xl mx-auto"
                        >
                            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-200">Help centre</p>
                            <h1 className="font-display text-4xl md:text-5xl font-bold mb-5">
                                Frequently asked questions
                            </h1>
                            <p className="text-lg text-background-cream/75 mb-8">
                                Find quick answers to common questions about our products, orders, 
                                shipping, and more.
                            </p>

                            {/* Search */}
                            <div className="relative max-w-xl mx-auto">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" aria-hidden="true" />
                                <input
                                    type="search"
                                    aria-label="Search frequently asked questions"
                                    placeholder="Search for answers..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="input-field pl-12 py-4"
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Category Pills */}
                <section aria-label="FAQ categories" className="sticky top-[72px] z-10 border-b border-primary/10 bg-background-cream/95 py-4 backdrop-blur-md">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap justify-center gap-3">
                            <button type="button"
                                onClick={() => setActiveCategory("all")}
                                aria-pressed={activeCategory === "all"}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    activeCategory === "all"
                                        ? "bg-primary text-white"
                                        : "bg-background-warm text-primary/80 hover:bg-primary/15"
                                }`}
                            >
                                All Topics
                            </button>
                            {faqData.map((category) => (
                                <button type="button"
                                    key={category.title}
                                    onClick={() => setActiveCategory(category.title)}
                                    aria-pressed={activeCategory === category.title}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                                        activeCategory === category.title
                                            ? "bg-primary text-white"
                                            : "bg-background-warm text-primary/80 hover:bg-primary/15"
                                    }`}
                                >
                                    <category.icon className="w-4 h-4" />
                                    {category.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Content */}
                <section className="py-12">
                    <div className="container mx-auto px-4 max-w-4xl">
                        {filteredData.length === 0 ? (
                            <div className="text-center py-12">
                                <HelpCircle className="w-12 h-12 text-primary/30 mx-auto mb-4" />
                                <p className="text-primary/60 mb-4">No questions found matching your search.</p>
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setActiveCategory("all");
                                    }}
                                    className="text-primary hover:underline"
                                >
                                    Clear filters
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {filteredData.map((category) => (
                                    <motion.div
                                        key={category.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                                <category.icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold text-primary">{category.title}</h2>
                                                <p className="text-sm text-primary/60">{category.description}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {category.faqs.map((faq, index) => {
                                                const questionId = `${category.title}-${index}`;
                                                const isOpen = openQuestions.has(questionId);

                                                return (
                                                    <div
                                                        key={index}
                                                        className="surface-panel overflow-hidden"
                                                    >
                                                        <button type="button"
                                                            onClick={() => toggleQuestion(questionId)}
                                                            aria-expanded={isOpen}
                                                            aria-controls={`answer-${questionId}`}
                                                            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-background transition-colors"
                                                        >
                                                            <span className="font-medium text-primary pr-4">
                                                                {faq.question}
                                                            </span>
                                                            <ChevronDown
                                                                className={`w-5 h-5 text-primary/50 flex-shrink-0 transition-transform ${
                                                                    isOpen ? "rotate-180" : ""
                                                                }`}
                                                            />
                                                        </button>
                                                        <AnimatePresence>
                                                            {isOpen && (
                                                                <motion.div
                                                                    id={`answer-${questionId}`}
                                                                    initial={{ height: 0 }}
                                                                    animate={{ height: "auto" }}
                                                                    exit={{ height: 0 }}
                                                                    transition={{ duration: 0.2 }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="px-6 pb-4 text-primary/70">
                                                                        {faq.answer}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Still Need Help */}
                <section className="py-12 bg-white border-t border-primary/15">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center max-w-xl mx-auto"
                        >
                            <h2 className="text-2xl font-bold text-primary mb-4">
                                Still have questions?
                            </h2>
                            <p className="text-primary/70 mb-6">
                                Can't find the answer you're looking for? Our support team is here to help.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                Contact Support
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
}
