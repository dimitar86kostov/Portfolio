import { object, string } from 'zod'

export const createSessionSchema = object({
    body: object({
        email: string().nonempty('Email is required'),
        password: string().nonempty('Password is required'),
    })
})