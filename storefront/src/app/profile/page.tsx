"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import {
    updateUserProfile,
    changePassword,
    getUserOrders,
    getUserWishlist,
    removeFromWishlist
} from "@/lib/api";
import type { Order, WishlistItem, Address } from "@/types";
import { formatINR } from "@/lib/money";
import AddressManager from "@/components/profile/AddressManager";
import {
    User,
    Package,
    Heart,
    Settings,
    Loader2,
    Eye,
    Trash2,
    ShoppingCart,
    ChevronRight,
    LogOut
} from "lucide-react";

type Tab = "addresses" | "orders" | "payment" | "wishlist" | "settings";

const STATUS_COLORS: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    picked_up: "bg-indigo-100 text-indigo-800",
    on_the_way: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800"
};

export default function ProfilePage() {
    const router = useRouter();
    const { token, user: profile, logout } = useAuthStore();
    const handleSignOut = () => {
        void logout();
        router.replace("/");
    };
    const [hydrated, setHydrated] = useState(false);

    const [activeTab, setActiveTab] = useState<Tab>("addresses");
    const [loadError, setLoadError] = useState("");
    const [orders, setOrders] = useState<Order[]>([]);
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [ordersLoaded, setOrdersLoaded] = useState(false);
    const [wishlistLoaded, setWishlistLoaded] = useState(false);
    const [tabLoading, setTabLoading] = useState<Tab | null>(null);

    // Settings form
    const [settingsForm, setSettingsForm] = useState({
        name: "",
        email: "",
        phone: ""
    });
    const [passwordForm, setPasswordForm] = useState({
        current_password: "",
        new_password: "",
        confirm_password: ""
    });
    const [saving, setSaving] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        const tab = new URLSearchParams(window.location.search).get("tab");
        if (tab === "settings" || tab === "orders" || tab === "addresses") setActiveTab(tab);
        setHydrated(useAuthStore.persist.hasHydrated());
        return useAuthStore.persist.onFinishHydration(() => setHydrated(true));
    }, []);

    useEffect(() => {
        if (!hydrated) return;
        if (!token) {
            router.push("/login");
            return;
        }

    }, [hydrated, token, router]);

    useEffect(() => {
        if (profile) setSettingsForm({ name: profile.name, email: profile.email || "", phone: profile.phone || "" });
    }, [profile]);

    useEffect(() => {
        if (!profile || !token) return;
        if (activeTab === "orders" && !ordersLoaded) {
            setOrdersLoaded(true);
            setTabLoading("orders");
            void getUserOrders().then(setOrders).catch(error => setLoadError(error instanceof Error ? error.message : "Could not load orders."))
                .finally(() => setTabLoading(current => current === "orders" ? null : current));
        }
        if (activeTab === "wishlist" && !wishlistLoaded) {
            setWishlistLoaded(true);
            setTabLoading("wishlist");
            void getUserWishlist().then(setWishlist).catch(error => setLoadError(error instanceof Error ? error.message : "Could not load wishlist."))
                .finally(() => setTabLoading(current => current === "wishlist" ? null : current));
        }
    }, [activeTab, profile, token, ordersLoaded, wishlistLoaded]);

    async function handleUpdateProfile(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            const updated = await updateUserProfile({
                name: settingsForm.name,
                phone: settingsForm.phone || undefined
            });
            useAuthStore.setState(state => ({ user: state.user ? { ...state.user, ...updated } : updated }));
            setMessage({ type: "success", text: "Profile updated successfully!" });
        } catch (error) {
            setMessage({ type: "error", text: "Failed to update profile" });
        } finally {
            setSaving(false);
        }
    }

    async function handleChangePassword(e: React.FormEvent) {
        e.preventDefault();

        if (passwordForm.new_password !== passwordForm.confirm_password) {
            setMessage({ type: "error", text: "Passwords do not match" });
            return;
        }

        setChangingPassword(true);
        setMessage(null);

        try {
            await changePassword(passwordForm.current_password, passwordForm.new_password);
            setPasswordForm({
                current_password: "",
                new_password: "",
                confirm_password: ""
            });
            setMessage({ type: "success", text: "Password changed successfully!" });
        } catch (error) {
            setMessage({ type: "error", text: "Failed to change password. Check your current password." });
        } finally {
            setChangingPassword(false);
        }
    }

    async function handleRemoveFromWishlist(slug: string) {
        try {
            await removeFromWishlist(slug);
            setWishlist(wishlist.filter(item => item.product.slug !== slug));
        } catch (error) {
            console.error("Failed to remove from wishlist:", error);
        }
    }

    const tabs = [
        { id: "addresses" as Tab, label: "Address Book & Logistics", icon: Package, count: addresses.length },
        { id: "orders" as Tab, label: "Order History", icon: Package, count: orders.length },
        { id: "payment" as Tab, label: "Saved Payment Methods", icon: Settings },
        { id: "wishlist" as Tab, label: "Wishlist", icon: Heart, count: wishlist.length },
        { id: "settings" as Tab, label: "Account Settings & Security", icon: Settings }
    ];

    if (!hydrated) {
        return (
            <>
                    <div className="min-h-screen pt-24 pb-12 bg-background">
                    <div className="container mx-auto px-4 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                </div>
                </>
        );
    }

    if (!profile) return <div className="min-h-screen bg-background px-4 pt-36 text-center"><h1 className="font-headline-lg text-primary">Account unavailable</h1><p role="alert" className="mt-3 text-on-surface-variant">{loadError || "Sign in to view your account."}</p><Link href="/login" className="mt-5 inline-block font-semibold text-accent-700 underline">Sign in</Link></div>;

    return (
        <>
            <div className="min-h-screen pt-24 pb-12 bg-background">
                <div className="container mx-auto px-4">
                    {/* Profile Header */}
                    <div className="rounded-2xl bg-primary-container p-space-lg text-on-primary shadow-warm mb-6 lg:p-space-xl">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-tertiary-fixed rounded-full flex items-center justify-center shrink-0">
                                    <User className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-tertiary-fixed">Your Artisan Pantry</p>
                                    <h1 className="font-headline-lg">{profile?.name}</h1>
                                    <p className="text-on-primary/75">{profile?.email || profile?.phone}</p>
                                </div>
                            </div>
                            <button type="button" onClick={handleSignOut} className="self-start sm:self-center px-4 py-2 rounded-full border border-on-primary/30 text-on-primary hover:bg-on-primary/10 transition-colors text-sm font-semibold flex items-center gap-2">
                                <LogOut className="w-4 h-4" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                        <div className="mt-space-lg rounded-xl bg-on-primary/10 p-space-md">
                            <h2 className="font-headline-sm">Small-batch pantry perks</h2>
                            <p className="mt-1 text-sm text-on-primary/75">Recurring delivery plans are not available yet.</p>
                            <div className="mt-3 flex flex-wrap gap-3"><button type="button" disabled className="rounded-full bg-tertiary-fixed px-4 py-2 text-sm font-semibold text-primary opacity-50">Manage Cadence</button><Link href="/faq" className="rounded-full border border-on-primary/50 px-4 py-2 text-sm font-semibold">Pantry Perks FAQ</Link></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center justify-between px-6 py-4 transition-colors ${activeTab === tab.id
                                            ? "bg-primary text-white"
                                            : "hover:bg-background text-primary/80"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <tab.icon className="w-5 h-5" />
                                            <span className="font-medium">{tab.label}</span>
                                        </div>
                                        {tab.count !== undefined && tab.count > 0 && (
                                            <span className={`text-sm px-2 py-0.5 rounded-full ${activeTab === tab.id
                                                ? "bg-white/20"
                                                : "bg-background-warm"
                                                }`}>
                                                {tab.count}
                                            </span>
                                        )}
                                    </button>
                                ))}
                                <div className="p-3 border-t border-surface-container-high/60 mt-auto bg-surface-container-lowest">
                                    <button
                                        type="button"
                                        onClick={handleSignOut}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-error hover:bg-error-container/20 transition-colors text-left"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-3">
                            {activeTab === "addresses" && <AddressManager onChange={setAddresses} />}
                            {activeTab === "payment" && <div className="rounded-xl bg-background-cream p-space-lg shadow-sm"><h2 className="font-headline-md text-primary">Saved Payment Methods</h2><p className="mt-3 text-on-surface-variant">Saved cards are not available. Choose a payment method securely at checkout.</p><Link href="/checkout" className="mt-4 inline-block font-semibold text-accent-700 underline">Go to checkout</Link></div>}
                            {/* Orders Tab */}
                            {loadError && <p role="alert" className="mb-4 text-error">{loadError}</p>}
                            {tabLoading === activeTab && <p role="status">Loading {activeTab}…</p>}
                            {activeTab === "orders" && tabLoading !== "orders" && (
                                <div className="space-y-4">
                                    <h2 className="font-headline-md text-primary">Recent Orders</h2>
                                    {orders.length === 0 ? (
                                        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                                            <Package className="w-12 h-12 text-primary/30 mx-auto mb-4" />
                                            <p className="text-primary/60 mb-4">No orders yet</p>
                                            <Link
                                                href="/"
                                                className="inline-flex items-center gap-2 text-primary hover:underline"
                                            >
                                                Start Shopping
                                                <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    ) : (
                                        orders.map((order) => (
                                            <div key={order.id} className="bg-white rounded-xl p-6 shadow-sm">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                                    <div>
                                                        <p className="font-mono text-sm text-primary/60">
                                                            Order #{order.code}
                                                        </p>
                                                        <p className="text-sm text-primary/60">
                                                            {new Date(order.created_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[order.delivery_status] || "bg-background-warm text-primary/90"}`}>
                                                        {order.delivery_status.replaceAll("_", " ")}
                                                    </span>
                                                </div>
                                                <div className="space-y-2 mb-4">
                                                    {order.items.slice(0, 2).map((item, i) => (
                                                        <div key={i} className="flex justify-between text-sm">
                                                            <span className="text-primary/70">
                                                                {item.product_name} × {item.quantity}
                                                            </span>
                                                            <span className="font-medium">
                                                                {formatINR((item.price + item.tax + item.shipping_cost) * item.quantity)}
                                                            </span>
                                                        </div>
                                                    ))}
                                                    {order.items.length > 2 && (
                                                        <p className="text-sm text-primary/60">
                                                            +{order.items.length - 2} more items
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex items-center justify-between pt-4 border-t">
                                                    <p className="font-bold">
                                                        Total: {formatINR(order.grand_total)}
                                                    </p>
                                                    <Link
                                                        href={`/track/${encodeURIComponent(order.code)}`}
                                                        className="flex items-center gap-2 text-primary hover:underline"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        Track Order
                                                    </Link>
                                                </div>
                                                <div className="mt-4 flex flex-wrap gap-3 border-t pt-4 text-sm"><button type="button" disabled title="Reorder is not available" className="rounded-lg border px-3 py-2 opacity-50">Reorder</button><button type="button" disabled title="PDF invoice is not available" className="rounded-lg border px-3 py-2 opacity-50">Invoice</button><Link href="/contact" className="rounded-lg border px-3 py-2">Ask about this order</Link></div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}

                            {/* Wishlist Tab */}
                            {activeTab === "wishlist" && tabLoading !== "wishlist" && (
                                <div>
                                    {wishlist.length === 0 ? (
                                        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                                            <Heart className="w-12 h-12 text-primary/30 mx-auto mb-4" />
                                            <p className="text-primary/60 mb-4">Your wishlist is empty</p>
                                            <Link
                                                href="/"
                                                className="inline-flex items-center gap-2 text-primary hover:underline"
                                            >
                                                Discover Products
                                                <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {wishlist.map((item) => (
                                                <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm flex gap-4">
                                                    <div className="w-20 h-20 bg-background-warm rounded-lg flex items-center justify-center flex-shrink-0">
                                                        {item.product.thumbnail_url ? (
                                                            <img
                                                                src={item.product.thumbnail_url}
                                                                alt={item.product.name}
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                        ) : (
                                                            <Package className="w-8 h-8 text-primary/30" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <Link
                                                            href={`/product/${item.product.slug}`}
                                                            className="font-medium text-primary hover:text-primary"
                                                        >
                                                            {item.product.name}
                                                        </Link>
                                                        <p className="text-lg font-bold text-primary">
                                                            {formatINR(item.product.sale_price)}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <Link
                                                                href={`/product/${item.product.slug}`}
                                                                className="flex items-center gap-1 text-sm bg-primary text-white px-3 py-1 rounded-lg hover:bg-primary/90"
                                                            >
                                                                <ShoppingCart className="w-4 h-4" />
                                                                View Product
                                                            </Link>
                                                            <button
                                                                onClick={() => handleRemoveFromWishlist(item.product.slug)}
                                                                className="p-1 text-primary/50 hover:text-red-500"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Settings Tab */}
                            {activeTab === "settings" && (
                                <div className="space-y-6">
                                    {message && (
                                        <div className={`p-4 rounded-lg ${message.type === "success"
                                            ? "bg-green-50 text-green-700 border border-green-200"
                                            : "bg-red-50 text-red-700 border border-red-200"
                                            }`}>
                                            {message.text}
                                        </div>
                                    )}

                                    {/* Profile Settings */}
                                    <div className="bg-white rounded-xl p-6 shadow-sm">
                                        <h2 className="text-lg font-bold text-primary mb-4">Profile Information</h2>
                                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-primary/80 mb-1">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={settingsForm.name}
                                                    onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                                                    className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-primary/80 mb-1">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={settingsForm.email}
                                                    disabled
                                                    className="w-full px-4 py-2 border border-primary/30 rounded-lg bg-background text-primary/60"
                                                />
                                                <p className="text-xs text-primary/60 mt-1">Email cannot be changed</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-primary/80 mb-1">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={settingsForm.phone}
                                                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                                                    className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={saving}
                                                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
                                            >
                                                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                                Save Changes
                                            </button>
                                        </form>
                                    </div>

                                    {/* Password Change */}
                                    {profile && (
                                        <div className="bg-white rounded-xl p-6 shadow-sm">
                                            <h2 className="text-lg font-bold text-primary mb-4">Change Password</h2>
                                            <form onSubmit={handleChangePassword} className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-primary/80 mb-1">
                                                        Current Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        value={passwordForm.current_password}
                                                        onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
                                                        className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-primary/80 mb-1">
                                                        New Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        value={passwordForm.new_password}
                                                        onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                                                        className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-primary/80 mb-1">
                                                        Confirm New Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        value={passwordForm.confirm_password}
                                                        onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })}
                                                        className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    disabled={changingPassword}
                                                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
                                                >
                                                    {changingPassword && <Loader2 className="w-4 h-4 animate-spin" />}
                                                    Change Password
                                                </button>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
