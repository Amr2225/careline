import "server-only"
import { cookies } from "next/headers"
import type { AxiosRequestConfig } from "axios"

export async function withServerCookies(): Promise<AxiosRequestConfig> {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; ")

    return {
        headers: {
            Cookie: cookieHeader,
        },
    }
}
