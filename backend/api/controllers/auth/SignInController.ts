import type { Request, Response } from "express";
import { z } from "zod";
import { prismaClient } from "../../lib/prismaClient";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function SignInController(req: Request, res: Response) {
	if (!req?.body) {
		res.status(400).json({ error: "The request body cannot be empty." });
		return;
	}

	const { body } = req;

	const { data, error } = schema.safeParse(body);

	if (error) {
		res.status(400).json({ error: error.issues });
		return;
	}

	const { email, password } = data;

	const emailExists = await prismaClient.user.findUnique({ where: { email } });
	if (!emailExists) {
		res.status(401).json({ error: "Invalid credentials." });
		return;
	}

	const passwordMatch = await bcrypt.compare(
		password,
		emailExists.passwordHash,
	);
	if (!passwordMatch) {
		res.status(401).json({ error: "Invalid credentials." });
		return;
	}

	const accessToken = jwt.sign(
		{ id: emailExists.id },
		process.env.JWT_SECRET as string,
		{
			expiresIn: "7d",
		},
	);

	res.status(200).json({ accessToken });
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
});
