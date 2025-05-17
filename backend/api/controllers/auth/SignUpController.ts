import { z } from "zod";
import { prismaClient } from "../../lib/prismaClient";

import bcrypt from "bcryptjs";
import type { Request, Response } from "express";

export async function SignUpController(req: Request, res: Response) {
	if (!req?.body) {
		res.status(400).json({ error: "The request body cannot be empty" });
		return;
	}

	const { body } = req;

	const { data, error } = schema.safeParse(body);

	if (error) {
		res.status(400).json({ error: error.issues });
		return;
	}

	const { name, email, wallet_address, password } = data;

	const emailAlreadyExists = await prismaClient.user.findUnique({
		where: { email },
	});

	if (emailAlreadyExists) {
		res.status(409).json({ error: `Email "${email}" is already registered.` });
		return;
	}

	const SALT = 8;
	const passwordHash = await bcrypt.hash(password, SALT);

	await prismaClient.user.create({
		data: {
			name,
			email,
			passwordHash,
			walletAddress: wallet_address,
		},
	});

	res.status(201).json({ message: "User created successfully." });
	return;
}

const schema = z.object({
	email: z
		.string({
			required_error: 'The "email" field is required',
		})
		.email({
			message: 'The "email" field must be a valid email address',
		}),
	password: z
		.string({
			required_error: 'The "password" field is required',
		})
		.min(6, {
			message: 'The "password" field must have at least 6 characters',
		}),
	name: z
		.string({
			required_error: 'The "name" field is required',
		})
		.min(3, {
			message: 'The "name" field must have at least 3 characters',
		}),
	wallet_address: z
		.string()
		.optional(),
});
