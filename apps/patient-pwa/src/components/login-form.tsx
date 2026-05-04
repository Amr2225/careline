import { useAuthStore } from "@/store/user.store"
import { LoginCard } from "@careline/ui/components/login-card"
import { useNavigate } from "react-router"

export default function LoginForm() {
  const navigate = useNavigate()

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
      navigate("/portal")
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
