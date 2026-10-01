import {
    Product,
    Cart,
    CartItem,
    TrackingResponse,
    User,
    UserProfile,
    Order,
    Review,
    ReviewStats,
    WishlistItem,
    ApiEnvelope,
    Address,
    AddressInput,
    LocationOption,
    CheckoutSummary,
} from "@/types";

function getApiUrl(): string {
    return (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v3").replace(/\/$/, "");
}

export function storedToken(): string | null {
    if (typeof window === "undefined") return null;
    try {
        return JSON.parse(localStorage.getItem("auth-storage") || "null")?.state?.token || null;
    } catch {
        return null;
    }
}

export async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const headers = new Headers(options.headers);
    if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
    const token = storedToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);

    const response = await fetch(`${getApiUrl()}${endpoint}`, {
        ...options,
        headers,
    });
    const envelope: ApiEnvelope<T> | null = await response.json().catch(() => null);
    if (response.status === 401 && token && typeof window !== "undefined" && storedToken() === token) {
        localStorage.removeItem("auth-storage");
        window.dispatchEvent(new Event("waferking:unauthorized"));
    }
    if (!response.ok || !envelope?.success) {
        throw new Error(envelope?.errors?.[0]?.message || `API request failed (${response.status})`);
    }
    return envelope.data;
}

// Products API
export async function getProducts(params?: {
    search?: string;
    min_price?: number;
    max_price?: number;
    sort_by?: string;
}): Promise<Product[]> {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set("name", params.search);
    if (params?.min_price !== undefined) searchParams.set("min_price", params.min_price.toString());
    if (params?.max_price !== undefined) searchParams.set("max_price", params.max_price.toString());
    if (params?.sort_by) searchParams.set("sort", params.sort_by);
    
    const query = searchParams.toString();
    return fetchApi<Product[]>(`/products${query ? `?${query}` : ""}`, typeof window === "undefined" ? { next: { revalidate: 60 } } as RequestInit : {});
}

export async function getProduct(slug: string): Promise<Product> {
    return fetchApi<Product>(`/products/${encodeURIComponent(slug)}`, typeof window === "undefined" ? { next: { revalidate: 60 } } as RequestInit : {});
}

export async function getRelatedProducts(slug: string): Promise<Product[]> {
    return fetchApi<Product[]>(`/products/${encodeURIComponent(slug)}/related`, typeof window === "undefined" ? { next: { revalidate: 60 } } as RequestInit : {});
}

// Cart API
export async function getCart(): Promise<Cart> {
    const data = await fetchApi<{ items: CartItem[]; summary: Cart["summary"] }>("/cart");
    return { ...data, item_count: data.items.reduce((sum, item) => sum + item.quantity, 0) };
}

export async function addToCart(
    productId: number,
    quantity: number = 1
): Promise<CartItem> {
    return fetchApi<CartItem>("/cart/items", {
        method: "POST",
        body: JSON.stringify({ product_id: productId, quantity, variant: null }),
    });
}

export async function updateCartItem(
    cartItemId: number,
    quantity: number
): Promise<CartItem> {
    return fetchApi<CartItem>(`/cart/items/${cartItemId}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity }),
    });
}

export async function removeFromCart(cartItemId: number): Promise<null> {
    return fetchApi<null>(`/cart/items/${cartItemId}`, {
        method: "DELETE",
    });
}

export async function clearCart(): Promise<null> {
    return fetchApi<null>("/cart", {
        method: "DELETE",
    });
}

// Tracking API
export async function trackOrder(orderId: string): Promise<TrackingResponse> {
    return fetchApi<TrackingResponse>(`/track/${encodeURIComponent(orderId)}`);
}

interface AuthResponse { access_token: string; token_type: string; user: User }

export async function register(userData: {
    name: string;
    email: string;
    phone?: string;
    password: string;
    password_confirmation: string;
}): Promise<AuthResponse> {
    return fetchApi<AuthResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name: userData.name, email_or_phone: userData.email, phone: userData.phone || undefined, password: userData.password, password_confirmation: userData.password_confirmation, register_by: "email" }),
    });
}

export async function login(identifier: string, password: string): Promise<AuthResponse> {
    return fetchApi<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: identifier, password, login_by: identifier.includes("@") ? "email" : "phone" }),
    });
}

export async function logout(token: string): Promise<void> {
    try {
        await fetch(`${getApiUrl()}/auth/logout`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
            keepalive: true,
        });
    } catch (e) {
        console.warn("Server logout request ignored:", e);
    }
}

export async function forgotPassword(email: string): Promise<null> {
    return fetchApi<null>("/auth/password/forgot", {
        method: "POST",
        body: JSON.stringify({ email }),
    });
}

export async function resetPassword(email: string, token: string, password: string): Promise<null> {
    return fetchApi<null>("/auth/password/reset", {
        method: "POST",
        body: JSON.stringify({ email, token, password, password_confirmation: password }),
    });
}

export async function getProfile(): Promise<User> {
    return fetchApi<User>("/auth/user");
}

// Profile API
export async function getUserProfile(): Promise<UserProfile> {
    return fetchApi<UserProfile>("/user/profile");
}

export async function updateUserProfile(data: { name?: string; phone?: string }): Promise<User> {
    return fetchApi<User>("/user/profile", {
        method: "PATCH",
        body: JSON.stringify(data),
    });
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean }> {
    return fetchApi<{ success: boolean }>("/user/password", {
        method: "POST",
        body: JSON.stringify({ current_password: currentPassword, password: newPassword, password_confirmation: newPassword }),
    });
}

export const getCountries = () => fetchApi<LocationOption[]>("/locations/countries");
export const getStates = (countryId: number) => fetchApi<LocationOption[]>(`/locations/countries/${countryId}/states`);
export const getCities = (stateId: number) => fetchApi<LocationOption[]>(`/locations/states/${stateId}/cities`);
export const getAddresses = () => fetchApi<Address[]>("/user/addresses");
export const saveAddress = (data: AddressInput, id?: number) => fetchApi<Address>(
    id ? `/user/addresses/${id}` : "/user/addresses",
    { method: id ? "PATCH" : "POST", body: JSON.stringify(data) }
);
export const deleteAddress = (id: number) => fetchApi<null>(`/user/addresses/${id}`, { method: "DELETE" });
export const getCheckoutSummary = (addressId: number, carrierId?: number) => fetchApi<CheckoutSummary>("/checkout/summary", {
    method: "POST", body: JSON.stringify({ address_id: addressId, carrier_id: carrierId }),
});
export const getPaymentConfig = () => fetchApi<{ available: boolean; method: string }>("/checkout/payment-config");
export interface PublicPage { slug: string; title: string; content: string; faq_sections?: { title: string; questions: { question: string; answer: string }[] }[] | null }
export const getPublicPage = (slug: string) => fetchApi<PublicPage>(`/pages/${encodeURIComponent(slug)}`);
export const startRazorpayPayment = (addressId: number, carrierId?: number) => fetchApi<{
    attempt_id: number; razorpay_order_id: string; key: string; amount: number; currency: string;
    name: string; email: string; phone: string;
}>("/checkout/razorpay/start", { method: "POST", body: JSON.stringify({ address_id: addressId, carrier_id: carrierId }) });
export const confirmRazorpayPayment = (data: {
    razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string;
}) => fetchApi<{ order_code: string }>("/checkout/razorpay/confirm", { method: "POST", body: JSON.stringify(data) });

export async function getUserOrders(): Promise<Order[]> {
    return fetchApi<Order[]>("/orders");
}

export async function getMyOrderDetail(code: string): Promise<Order> {
    return fetchApi<Order>(`/orders/${encodeURIComponent(code)}`);
}

// Wishlist API
export async function getUserWishlist(): Promise<WishlistItem[]> {
    return fetchApi<WishlistItem[]>("/user/wishlist");
}

export async function addToWishlist(slug: string): Promise<WishlistItem> {
    return fetchApi<WishlistItem>(`/user/wishlist/${encodeURIComponent(slug)}`, {
        method: "POST",
    });
}

export async function removeFromWishlist(slug: string): Promise<null> {
    return fetchApi<null>(`/user/wishlist/${encodeURIComponent(slug)}`, {
        method: "DELETE",
    });
}

// Reviews API
export async function getProductReviews(slug: string, page: number = 1): Promise<Review[]> {
    return fetchApi<Review[]>(`/products/${encodeURIComponent(slug)}/reviews?page=${page}`);
}

export async function getReviewStats(slug: string): Promise<ReviewStats> {
    return fetchApi<ReviewStats>(`/products/${encodeURIComponent(slug)}/reviews/summary`);
}

export async function createReview(slug: string, data: {
    rating: number;
    comment: string;
}): Promise<{ id: number }> {
    return fetchApi<{ id: number }>(`/products/${encodeURIComponent(slug)}/reviews`, {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function getMyReviews(): Promise<Review[]> {
    return fetchApi<Review[]>("/user/reviews");
}

// Contact API
export async function submitContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}): Promise<null> {
    return fetchApi<null>("/contact", {
        method: "POST",
        body: JSON.stringify(data),
    });
}
