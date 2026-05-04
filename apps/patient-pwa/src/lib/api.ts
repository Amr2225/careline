import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios"
const loginRoute = "/"

const ALLOWED_METHODS = ["post", "patch", "put", "delete"];

interface RetryConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

const refreshClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

export const getCsrfToken = (): string => {
    const regex = /csrfToken=([^;]+)/;
    const csrfToken = regex.exec(document.cookie);
    return csrfToken?.[1] ?? "";
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (ALLOWED_METHODS.includes(config.method as string)) {
        const csrfToken = getCsrfToken();

        config.headers.set("X-CSRF-Token", csrfToken);
        return config;
    }

    return config
}, (error: AxiosError) => {
    return Promise.reject(error);
})

refreshClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (ALLOWED_METHODS.includes(config.method as string)) {
        const csrfToken = getCsrfToken();

        config.headers.set("X-CSRF-Token", csrfToken);
        return config;
    }

    return config
}, (error: AxiosError) => {
    console.log("ERRORRORORORj");
    return Promise.reject(error);
})

api.interceptors.response.use((response) => response, async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig | undefined;
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            await refreshClient.post("/auth/refresh");
            return api(originalRequest);
        } catch (refreshError) {
            const currentPath = window.location.pathname;
            if (currentPath !== loginRoute) window.location.href = "/";

            return Promise.reject(refreshError);
        }
    }

    return Promise.reject(error);
})
