"use client"
import { cn } from "@careline/ui/lib/utils"
import { Button } from "@careline/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@careline/ui/components/card"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@careline/ui/components/alert"

import { Field, FieldGroup, FieldLabel } from "@careline/ui/components/field"
import { Input } from "@careline/ui/components/input"
import { useAuthStore } from "@/store/user.store"

import { Loader2 } from "lucide-react"
import { AlertCircleIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
    <div className={cn("w-full max-w-lg", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <ErrorMessage error={error} />}
          <form onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type="password" name="password" required />
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <Alert
      variant="destructive"
      className="mb-3 border-destructive/50 bg-destructive/5"
    >
      <AlertCircleIcon />
      <AlertTitle>Login Failed</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  )
}
