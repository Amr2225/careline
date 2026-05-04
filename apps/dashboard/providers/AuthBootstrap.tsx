"use client"

import { useAuthStore } from "@/store/user.store"
import React, { useEffect } from "react"

export default function AuthBootstrap({
  children,
}: {
  children: React.ReactNode
}) {
  const loadUser = useAuthStore((state) => state.loadUser)

  useEffect(() => {
    if (typeof window !== "undefined") {
      void loadUser()
    }
  }, [])

  return children
}
