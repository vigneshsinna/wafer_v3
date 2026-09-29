import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";
import * as api from "@/lib/api";
import { useCartStore } from "@/store/cartStore";

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (data: { name: string; email: string; phone?: string; password: string; password_confirmation: string }) => Promise<void>;
    logout: () => Promise<void>;
    fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const result = await api.login(email, password);
                    set({ token: result.access_token, user: result.user, isAuthenticated: true, isLoading: false });
                    void useCartStore.getState().mergeGuestCart();
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : "Login failed", isLoading: false });
                    throw error;
                }
            },
            register: async (data) => {
                set({ isLoading: true, error: null });
                try {
                    const result = await api.register(data);
                    set({ token: result.access_token, user: result.user, isAuthenticated: true, isLoading: false });
                    void useCartStore.getState().mergeGuestCart();
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : "Registration failed", isLoading: false });
                    throw error;
                }
            },
            logout: async () => {
                const token = get().token;
                set({ token: null, user: null, isAuthenticated: false, isLoading: false, error: null });
                if (typeof window !== "undefined") localStorage.removeItem("auth-storage");
                useCartStore.getState().resetToGuestCart();
                if (token) void api.logout(token);
            },
            fetchProfile: async () => {
                const token = get().token;
                if (!token) return;
                try {
                    const user = await api.getProfile();
                    if (get().token !== token) return;
                    set({ user, isAuthenticated: true, isLoading: false });
                } catch {
                    if (get().token !== token) return;
                    set({ token: null, user: null, isAuthenticated: false, isLoading: false });
                    useCartStore.getState().resetToGuestCart();
                }
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
            onRehydrateStorage: () => (state) => { if (state?.token) void state.fetchProfile(); },
        }
    )
);

if (typeof window !== "undefined") {
    window.addEventListener("waferking:unauthorized", () => {
        useAuthStore.setState({ token: null, user: null, isAuthenticated: false });
        useCartStore.getState().resetToGuestCart();
    });
}
