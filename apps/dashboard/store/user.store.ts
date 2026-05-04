import { create } from 'zustand'
import { UserWithoutPassword } from '@careline/shared/types/user.type';
import { api } from '@/lib/api';
import { isAxiosError } from 'axios';

type ErrorResponse = {
    statusCode: number;
    message: string;
}

interface AuthStore {
    user: UserWithoutPassword | null;
    isAuthenticated: "checking" | "authenticated" | "unauthenticated";
    isLoading: boolean;
    error: string | null;

    loadUser: () => Promise<void>;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
}

const setLocalStorageUser = (user: UserWithoutPassword) => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem("Careline-user", JSON.stringify(user))
    }
}

const checkLocalStorageUser = () => {
    if (typeof window !== "undefined") {
        const user = window.localStorage.getItem("Careline-user")
        if (!user) {
            return null
        }

        return JSON.parse(user) as UserWithoutPassword | null
    }
    return null
}

export const useAuthStore = create<AuthStore>((set, get) => ({
    user: null,
    isLoading: false,
    isAuthenticated: "checking",
    error: null,

    loadUser: async () => {
        const currentUser = get().user
        if (currentUser) return

        const cachedUser = checkLocalStorageUser()
        if (cachedUser) {
            set({ user: cachedUser, isAuthenticated: "authenticated" })
            return
        }

        set({ isLoading: true })
        try {
            const { data } = await api.get<UserWithoutPassword>("/user/me")
            console.log("DATA: ", data);
            setLocalStorageUser(data)
            set({ user: data, isAuthenticated: "authenticated" })

        } catch (error) {
            set({ user: null, isAuthenticated: "unauthenticated" })
        } finally {
            set({ isLoading: false })
        }
    },
    login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
            const { data } = await api.post<UserWithoutPassword>("/auth/login", {
                email,
                password,
            })
            setLocalStorageUser(data)
            set({ user: data, isAuthenticated: "authenticated" })
            return true
        } catch (error) {
            if (isAxiosError<ErrorResponse>(error) && error.response?.status === 400) {
                set({ error: error.response.data.message })
            }
            return false
        } finally {
            set({ isLoading: false })
        }
    },
    logout: async () => {
        set({ isLoading: true })
        try {
            await api.post("/auth/logout")
            window.localStorage.removeItem("Careline-user")
            set({ user: null, isAuthenticated: "unauthenticated" })
        } catch (error) {
            console.error("Error logging out", error)
        } finally {
            set({ isLoading: false })
        }
    }
}))