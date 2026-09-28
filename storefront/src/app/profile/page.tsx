"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import {
    getUserProfile,
    updateUserProfile,
    changePassword,
    getUserOrders,
    getUserWishlist,
    removeFromWishlist
} from "@/lib/api";
import type { UserProfile, Order, WishlistItem } from "@/types";
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
    ChevronRight
} from "lucide-react";

type Tab = "orders" | "wishlist" | "settings";

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
    const { user, isAuthenticated, fetchProfile } = useAuthStore();

    const [activeTab, setActiveTab] = useState<Tab>("orders");
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

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
        if (new URLSearchParams(window.location.search).get("tab") === "settings") setActiveTab("settings");
        async function init() {
            await fetchProfile();
        }
        init();
    }, [fetchProfile]);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
            return;
        }

        fetchData();
    }, [isAuthenticated, router]);

    async function fetchData() {
        setLoading(true);
        try {
            const [profileData, ordersData, wishlistData] = await Promise.all([
                getUserProfile(),
                getUserOrders(),
                getUserWishlist()
            ]);
            setProfile(profileData);
            setOrders(ordersData);
            setWishlist(wishlistData);
            setSettingsForm({
                name: profileData.name,
                email: profileData.email || "",
                phone: profileData.phone || ""
            });
        } catch (error) {
            console.error("Failed to fetch profile data:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleUpdateProfile(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            const updated = await updateUserProfile({
                name: settingsForm.name,
                phone: settingsForm.phone || undefined
            });
            setProfile({ ...profile!, ...updated });
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
        { id: "orders" as Tab, label: "My Orders", icon: Package, count: orders.length },
        { id: "wishlist" as Tab, label: "Wishlist", icon: Heart, count: wishlist.length },
        { id: "settings" as Tab, label: "Settings", icon: Settings }
    ];

    if (loading) {
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

    return (
        <>
            <div className="min-h-screen pt-24 pb-12 bg-background">
                <div className="container mx-auto px-4">
                    {/* Profile Header */}
                    <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-primary">{profile?.name}</h1>
                                <p className="text-primary/70">{profile?.email}</p>
                            </div>
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
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-3">
                            {/* Orders Tab */}
                            {activeTab === "orders" && (
                                <div className="space-y-4">
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
                                                                {formatINR(item.price + item.tax + item.shipping_cost)}
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
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}

                            {/* Wishlist Tab */}
                            {activeTab === "wishlist" && (
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
                                                            {formatINR(item.product.unit_price)}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <Link
                                                                href={`/product/${item.product.slug}`}
                                                                className="flex items-center gap-1 text-sm bg-primary text-white px-3 py-1 rounded-lg hover:bg-primary/90"
                                                            >
                                                                <ShoppingCart className="w-4 h-4" />
                                                                Add to Cart
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
                                    <AddressManager />
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
