import LoginForm from "@/components/login-form"
import { useAuthStore } from "@/store/user.store"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router"

export default function LoginPage() {
  const navigate = useNavigate()
  const loadUser = useAuthStore((state) => state.loadUser)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    void loadUser()
    if (isAuthenticated === "authenticated") {
      navigate("/portal")
    }
  }, [loadUser, isAuthenticated, navigate])

  if (isAuthenticated === "checking")
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )

  if (isAuthenticated === "authenticated") return <Navigate to="/portal" />

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </div>
  )
}
