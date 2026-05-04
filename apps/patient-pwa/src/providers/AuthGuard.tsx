import { useAuthStore } from "@/store/user.store"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useNavigate } from "react-router"

export default function AuthGuard<P extends object>(
  Component: React.ComponentType<P>
) {
  return function AuthenticatedComponent(props: P) {
    const navigate = useNavigate()
    const loadUser = useAuthStore((state) => state.loadUser)
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    useEffect(() => {
      void loadUser()

      if (isAuthenticated === "unauthenticated") {
        navigate("/")
      }
    }, [loadUser, isAuthenticated, navigate])

    if (isAuthenticated === "checking")
      return (
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      )

    if (isAuthenticated === "unauthenticated") return null

    return <Component {...props} />
  }
}
