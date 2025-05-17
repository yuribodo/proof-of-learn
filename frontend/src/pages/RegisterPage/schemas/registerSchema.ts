import { z } from "zod";

export const registerSchema = z.object({
	name: z.string().min(1, "Name is required").min(3, {
		message: 'The "name" field must have at least 3 characters',
	}),
	email: z.string().min(1, "Email is required").email("Invalid Email Format"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(6, 'The "password" field must have at least 6 characters'),
	wallet_address: z
		.string()
		.min(1, 'The "Wallet Address" is required')
		.min(3, 'The "Wallet Address" field must have at least 3 characters')
		.nullable(),
});
