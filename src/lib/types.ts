import { z } from "zod"

export const signInSchema = z
.object({
    username: z.string(),
    password: z.string().min(5, "Password must be at least 5 characters"),
})

export type SignInSchemaProps = z.infer<typeof signInSchema>;