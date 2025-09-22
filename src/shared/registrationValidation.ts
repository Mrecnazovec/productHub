import { z } from 'zod'

export const registerSchema = z.object({
	email: z.string().email('Invalid email address'),
	name: z.string().min(2, 'Name must be at least 2 characters'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type RegisterForm = z.infer<typeof registerSchema>
