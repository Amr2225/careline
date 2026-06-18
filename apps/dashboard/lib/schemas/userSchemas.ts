import { z } from "zod"

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .regex(/\d/, "Include at least one digit.")

const baseUserSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: z.email("Enter a valid email").trim(),
  roles: z.array(z.string()),
  isActive: z.boolean(),
})

export const createUserSchema = baseUserSchema.extend({
  password: passwordSchema,
})

export const editUserSchema = baseUserSchema.extend({
  password: z.union([z.literal(""), passwordSchema]),
})

export type UserFormValues = z.infer<typeof createUserSchema>

export const roleFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "At least 2 characters.")
    .max(40, "Keep it under 40 characters."),
  description: z.string().trim().min(1, "Describe what this role can do."),
  permissions: z.array(z.string()),
})

export type RoleFormValues = z.infer<typeof roleFormSchema>
