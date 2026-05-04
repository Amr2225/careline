"use client"
import React from "react"
import { useAuthStore } from "@/store/user.store"

export default function UserPage() {
  const user = useAuthStore((state) => state.user)

  if (!user) return null

  return <div>{JSON.stringify(user, null, 2)}</div>
}
