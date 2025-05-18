import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().min(1, "Email is required").email("Invalid Email Format"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(6, 'The "password" field must have at least 6 characters'),
});
