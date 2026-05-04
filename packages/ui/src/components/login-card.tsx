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

import { Loader2 } from "lucide-react"
import { AlertCircleIcon } from "lucide-react"

interface LoginFormProps {
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  className?: string
  errorMessage: string | null
  props?: React.ComponentProps<"div">
}

export function LoginCard({
  className,
  handleLogin,
  isLoading,
  errorMessage,
  ...props
}: LoginFormProps) {
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
          {errorMessage && <ErrorMessage error={errorMessage} />}
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
