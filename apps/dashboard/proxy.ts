import { NextRequest, NextResponse } from "next/server"

const protectedRoutes = ["/dashboard"]
const publicRoutes = ["/"]

export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname

    const accessToken = request.cookies.get("accessToken")?.value
    const refreshToken = request.cookies.get("refreshToken")?.value
    // const csrfToken = request.cookies.get("csrfToken")?.value
    const isAuthenticated = Boolean(accessToken || refreshToken)

    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))

    const isPublicRoute = publicRoutes.includes(path)

    if (isProtectedRoute && !isAuthenticated) return NextResponse.redirect(new URL("/", request.url))
    if (isPublicRoute && isAuthenticated) return NextResponse.redirect(new URL("/dashboard", request.url))

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}