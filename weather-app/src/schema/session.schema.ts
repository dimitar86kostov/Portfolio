import { z } from "zod";

export const createSessionSchema = z.object({
    body: z.object({
        email: z.string().min(1, "Email is required"),
        password: z.string().min(1, "Password is required"),
    })
})

// Type for controller
export type createSessionInput = z.infer<typeof createSessionSchema>['body'];