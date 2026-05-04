import { useNavigate } from "react-router"
import Spinner from "@/components/spinner"
import { useAuthStore } from "@/store/user.store"
import { Button } from "@careline/ui/components/button"

export default function ProfilePage() {
  const navigate = useNavigate()

  const logout = useAuthStore((state) => state.logout)
  const isLoading = useAuthStore((state) => state.isLoading)

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  return (
    <Button onClick={handleLogout} disabled={isLoading}>
      {isLoading ? <Spinner /> : "Lougout"}
    </Button>
  )
}
