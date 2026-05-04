"use client"
import { useRouter } from "next/navigation"
import { LoginCard } from "@careline/ui/components/login-card"
import { useAuthStore } from "../store/user.store"

export default function LoginForm() {
  const router = useRouter()

  const login = useAuthStore((state) => state.login)
  const isLoading = useAuthStore((state) => state.isLoading)
  const error = useAuthStore((state) => state.error)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const success = await login(email, password)

    if (success) {
      router.push("/dashboard")
    }
  }

  return (
    <LoginCard
      handleLogin={handleLogin}
      isLoading={isLoading}
      errorMessage={error}
    />
  )
}
