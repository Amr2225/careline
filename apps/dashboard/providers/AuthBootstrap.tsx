"use client"

import { useAuthStore } from "@/store/user.store"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

export default function AuthBootstrap({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const loadUser = useAuthStore((state) => state.loadUser)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    if (typeof window !== "undefined") {
      void loadUser()

      if (isAuthenticated === "unauthenticated") {
        router.push("/")
      }
    }
  }, [isAuthenticated, loadUser, router])

  if (isAuthenticated === "checking") return
  if (isAuthenticated === "unauthenticated") return null

  return children
}
