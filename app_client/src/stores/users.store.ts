import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar_url: string;
  role: {
    role_name: "member" | "admin" | "manager";
  };
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,
  setUser: (user) => set({ user, isLoading: false, error: null }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error, isLoading: false }),
  clearUser: () => set({ user: null, isLoading: false, error: null }),
}));
