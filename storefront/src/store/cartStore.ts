import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Cart, CartItem, Product } from "@/types";
import * as api from "@/lib/api";

interface GuestItem {
    product_id: number;
    product_slug: string;
    product_name: string;
    thumbnail_url: string | null;
    quantity: number;
    display_unit_price: number;
    min_qty: number;
}

const emptyCart: Cart = {
    items: [],
    summary: { sub_total: 0, tax: 0, shipping_cost: 0, discount: 0, grand_total: 0, total_items: 0 },
    item_count: 0,
};

function guestCart(items: GuestItem[]): Cart {
    const cartItems: CartItem[] = items.map(item => ({
        id: item.product_id,
        product_id: item.product_id,
        product_name: item.product_name,
        thumbnail_url: item.thumbnail_url,
        quantity: item.quantity,
        price: item.display_unit_price,
        tax: 0,
        shipping_cost: 0,
        discount: 0,
        min_qty: item.min_qty,
        stock_available: 0,
        variation: null,
    }));
    const subtotal = items.reduce((sum, item) => sum + item.display_unit_price * item.quantity, 0);
    return {
        items: cartItems,
        summary: { ...emptyCart.summary, sub_total: subtotal, grand_total: subtotal, total_items: items.length },
        item_count: items.reduce((sum, item) => sum + item.quantity, 0),
    };
}

interface CartState {
    cart: Cart;
    guestItems: GuestItem[];
    isLoading: boolean;
    isOpen: boolean;
    error: string | null;
    fetchCart: () => Promise<void>;
    addItem: (productId: number, quantity?: number, product?: Product) => Promise<void>;
    updateItem: (cartItemId: number, quantity: number) => Promise<void>;
    removeItem: (cartItemId: number) => Promise<void>;
    clearCart: () => Promise<void>;
    mergeGuestCart: () => Promise<void>;
    resetToGuestCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: emptyCart,
            guestItems: [],
            isLoading: false,
            isOpen: false,
            error: null,
            fetchCart: async () => {
                if (!api.storedToken()) {
                    set({ cart: guestCart(get().guestItems), isLoading: false });
                    return;
                }
                set({ isLoading: true, error: null });
                try {
                    set({ cart: await api.getCart(), isLoading: false });
                } catch (error) {
                    set({ cart: guestCart(get().guestItems), error: error instanceof Error ? error.message : "Could not load cart", isLoading: false });
                }
            },
            addItem: async (productId, quantity = 1, product) => {
                set({ isOpen: true, error: null });
                if (!api.storedToken()) {
                    if (!product || product.stock_status !== "in_stock") {
                        set({ error: "Product is unavailable." });
                        return;
                    }
                    const existing = get().guestItems.find(item => item.product_id === productId);
                    const items = existing
                        ? get().guestItems.map(item => item.product_id === productId ? { ...item, quantity: item.quantity + quantity } : item)
                        : [...get().guestItems, {
                            product_id: productId,
                            product_slug: product.slug,
                            product_name: product.name,
                            thumbnail_url: product.thumbnail_url,
                            quantity,
                            display_unit_price: product.sale_price,
                            min_qty: product.min_qty,
                        }];
                    set({ guestItems: items, cart: guestCart(items) });
                    return;
                }
                try {
                    await api.addToCart(productId, quantity);
                    await get().fetchCart();
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : "Could not add item" });
                }
            },
            updateItem: async (id, quantity) => {
                if (!api.storedToken()) {
                    const item = get().guestItems.find(item => item.product_id === id);
                    if (!item || quantity < item.min_qty) return;
                    const items = get().guestItems.map(item => item.product_id === id ? { ...item, quantity } : item);
                    set({ guestItems: items, cart: guestCart(items) });
                    return;
                }
                try {
                    await api.updateCartItem(id, quantity);
                    await get().fetchCart();
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : "Could not update item" });
                }
            },
            removeItem: async (id) => {
                if (!api.storedToken()) {
                    const items = get().guestItems.filter(item => item.product_id !== id);
                    set({ guestItems: items, cart: guestCart(items) });
                    return;
                }
                try {
                    await api.removeFromCart(id);
                    await get().fetchCart();
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : "Could not remove item" });
                }
            },
            clearCart: async () => {
                if (!api.storedToken()) {
                    set({ guestItems: [], cart: emptyCart });
                    return;
                }
                try {
                    await api.clearCart();
                    await get().fetchCart();
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : "Could not clear cart" });
                }
            },
            mergeGuestCart: async () => {
                if (!api.storedToken()) return;
                const failed: string[] = [];
                for (const item of get().guestItems) {
                    try {
                        await api.addToCart(item.product_id, item.quantity);
                        set({ guestItems: get().guestItems.filter(guest => guest.product_id !== item.product_id) });
                    } catch (error) {
                        failed.push(`${item.product_name}: ${error instanceof Error ? error.message : "unavailable"}`);
                    }
                }
                await get().fetchCart();
                if (failed.length) set({ error: `Could not merge ${failed.join("; ")}`, isOpen: true });
            },
            resetToGuestCart: () => set({ cart: guestCart(get().guestItems) }),
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
            toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
        }),
        {
            name: "guest-cart",
            partialize: state => ({ guestItems: state.guestItems }),
            onRehydrateStorage: () => state => { if (state) void state.fetchCart(); },
        }
    )
);
