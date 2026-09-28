export interface ApiError {
    code: string;
    status: number;
    field?: string;
    message: string;
}

export interface ApiMeta {
    timestamp: string;
    version: string;
    pagination?: { current_page: number; last_page: number; per_page: number; total: number };
    message?: string;
}

export interface ApiEnvelope<T> {
    success: boolean;
    data: T;
    meta: ApiMeta;
    errors: ApiError[];
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    unit_price: number;
    discount: number;
    discount_type: string | null;
    thumbnail_url: string | null;
    photos: string[];
    rating: number;
    rating_count: number;
    stock_status: "in_stock" | "out_of_stock";
    min_qty: number;
    unit: string | null;
    category: { id: number; name: string; slug: string } | null;
    brand: { id: number; name: string; slug: string } | null;
}

export interface User {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    email_verified: boolean;
    user_type?: string;
    avatar_url?: string | null;
}

export interface UserProfile extends User {
    created_at: string | null;
    updated_at: string | null;
}

// Cart types
export interface CartItem {
    id: number;
    product_id: number;
    product_name: string;
    thumbnail_url: string | null;
    quantity: number;
    price: number;
    tax: number;
    shipping_cost: number;
    discount: number;
    min_qty: number;
    stock_available: number;
    variation: string | null;
}

export interface LocationOption { id: number; name: string }

export interface Address {
    id: number;
    address: string;
    country: string | null;
    country_id: number;
    state: string | null;
    state_id: number;
    city: string | null;
    city_id: number;
    postal_code: string;
    phone: string;
    set_default: boolean;
}

export type AddressInput = Pick<Address, "address" | "country_id" | "state_id" | "city_id" | "postal_code" | "phone">;

export interface CartSummary {
    sub_total: number;
    tax: number;
    shipping_cost: number;
    discount: number;
    grand_total: number;
    total_items: number;
}

export interface CheckoutSummary extends CartSummary { address_id: number }

export interface Cart {
    items: CartItem[];
    summary: CartSummary;
    item_count: number;
}

// Order types
export interface OrderItem {
    id: number;
    product_id: number;
    product_name: string | null;
    price: number;
    tax: number;
    shipping_cost: number;
    quantity: number;
    delivery_status: string;
}

export interface TrackingResponse {
    code: string;
    delivery_status: string;
    created_at: string;
}

// Order with full details (for profile)
export interface Order {
    id: number;
    code: string;
    payment_status: string;
    delivery_status: string;
    grand_total: number;
    created_at: string;
    updated_at?: string;
    items: OrderItem[];
}

// Review types
export interface Review {
    id: number;
    product_id: number;
    product_name?: string | null;
    user_name: string;
    rating: number;
    comment: string;
    is_verified_purchase: boolean;
    is_approved: boolean;
    created_at: string;
}

export interface ReviewStats {
    average_rating: number;
    total_reviews: number;
    rating_distribution: Record<number, number>;
}

// Wishlist types
export interface WishlistItem {
    id: number;
    product: Product;
    created_at: string;
}

