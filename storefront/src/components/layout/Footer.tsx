import Link from "next/link";
import { Crown, Mail, Phone, MapPin, Shield, FileText } from "lucide-react";
import type { StoreSettings } from "@/lib/storeContent";

export default function Footer({ settings }: { settings: StoreSettings | null }) {
    return (
        <footer className="border-t border-white/10 bg-primary-700 text-background-cream">
            <div className="container mx-auto px-4 py-14">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center">
                                {settings?.store_logo ? <img src={settings.store_logo} alt="" className="h-9 w-9 object-contain" /> : <Crown className="w-6 h-6 text-primary" />}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display font-bold text-xl">{settings?.store_name || "Wafer King"}</span>
                                <span className="text-[10px] text-white/60 -mt-1 tracking-wider uppercase">
                                    {settings?.store_motto || "Black rice wafers"}
                                </span>
                            </div>
                        </div>
                        <p className="text-background-cream/70 text-sm leading-relaxed">
                            Black rice wafers with Hibiscus, Avarampoo, Vallarai and Makhana. Made in Erode, Tamil Nadu.
                        </p>
                    </div>

                    {/* Legal */}
                    <div>
                        <h2 className="font-display font-bold text-lg mb-6 text-accent flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Legal
                        </h2>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/legal/privacy-policy" className="text-white/70 hover:text-accent transition-colors text-sm">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/terms-of-service" className="text-white/70 hover:text-accent transition-colors text-sm">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/refund-policy" className="text-white/70 hover:text-accent transition-colors text-sm">
                                    Refund Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/return-policy" className="text-white/70 hover:text-accent transition-colors text-sm">
                                    Return Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/shipping-policy" className="text-white/70 hover:text-accent transition-colors text-sm">
                                    Shipping Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h2 className="font-display font-bold text-lg mb-6 text-accent">
                            Quick Links
                        </h2>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-white/70 hover:text-accent transition-colors text-sm">
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-white/70 hover:text-accent transition-colors text-sm">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-white/70 hover:text-accent transition-colors text-sm">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-white/70 hover:text-accent transition-colors text-sm">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/track" className="text-white/70 hover:text-accent transition-colors text-sm">
                                    Track Order
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h2 className="font-display font-bold text-lg mb-6 text-accent">
                            Contact Us
                        </h2>
                        <ul className="space-y-4 text-white/70">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <span className="text-sm">
                                    <strong>WAFER KING SNACKS</strong><br />
                                    Gain Industrial Centre, No: 257/2-C,<br />
                                    Sembampalayam, Nasiyanur Road,<br />
                                    Erode - 638107, Tamilnadu, India
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Shield className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm">
                                    <strong>GST No:</strong> 33GROPK4273E1ZM
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 flex-shrink-0" />
                                <a href="tel:+919788090895" className="text-sm hover:text-accent transition-colors">
                                    +91 9788090895
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 flex-shrink-0" />
                                <a href="mailto:support@waferking.com" className="text-sm hover:text-accent transition-colors">
                                    support@waferking.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/50 text-sm">
                    <p>&copy; {new Date().getFullYear()} {settings?.store_name || "Wafer King"}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
