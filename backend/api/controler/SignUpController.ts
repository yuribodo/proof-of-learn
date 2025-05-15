import { z } from "zod";
import { prismaClient } from "../lib/prismaClient";

import bcrypt from "bcryptjs";
import { Request, Response } from "express";

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

	const { name, email, wallet_adress, password, category_id, state } = data;

	const emailAlreadyExists = await prismaClient.users.findUnique({
		where: { email },
	});

	if (emailAlreadyExists) {
		res.status(409).json({ error: `Email "${email}" is already registered.` });
		return;
	}

	const categoryExists = await prismaClient.categories.findUnique({
		where: { id: category_id },
	});

	if (!categoryExists) {
		res
			.status(400)
			.json({ error: `Category with ID "${category_id}" not found.` });
		return;
	}

	const SALT = 8;
	const passwordHash = await bcrypt.hash(password, SALT);

	await prismaClient.users.create({
		data: {
			name,
			email,
			passwordHash,
			wallet_adress,
			state,
			categoryId: category_id,
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
	wallet_adress: z
		.string({})
		.min(3, {
			message: 'The "Wallet Address" field must have at least 3 characters',
		}),
	state: z
		.string({
			required_error: 'The "state" field is required',
		})
		.min(2, {
			message: 'The "state" field must have at least 2 characters',
		}),
	category_id: z
		.string({
			required_error: 'The "category" field is required',
		})
		.uuid({
			message: 'The "category" field must be a valid UUID',
		}),
});

