import type { Request, Response } from "express";
import { z } from "zod";
import { prismaClient } from "../../lib/prismaClient";
import { sanitizedResponse } from "../../util/sanitizeResponse";

const schema = z.object({
	walletAddress: z.string({ required_error: "walletAddress is required" }),
});

export async function SaveWalletAddressController(req: Request, res: Response) {
	if (!req.body) {
		res
			.status(400)
			.json(sanitizedResponse.error({ message: "Request body is required" }));
		return;
	}

	const userId = req.userId;
	if (!userId) {
		res
			.status(401)
			.json(sanitizedResponse.error({ message: "Unauthorized", status: 401 }));
		return;
	}

	const parsed = schema.safeParse(req.body);
	if (!parsed.success) {
		res.status(400).json(
			sanitizedResponse.error({
				message: JSON.stringify(parsed.error.format()),
				status: 400,
			}),
		);
		return;
	}

	const user = await prismaClient.user.findUnique({ where: { id: userId } });
	if (!user) {
		res
			.status(404)
			.json(
				sanitizedResponse.error({ message: "User not found", status: 404 }),
			);
		return;
	}

	try {
		await prismaClient.user.update({
			where: { id: userId },
			data: { walletAddress: parsed.data.walletAddress },
		});

		res
			.status(200)
			.json(sanitizedResponse.success({ message: "Wallet saved" }));
	} catch (err) {
		res
			.status(500)
			.json(
				sanitizedResponse.error({
					message: "Failed to update wallet",
					status: 500,
				}),
			);
	}
}
