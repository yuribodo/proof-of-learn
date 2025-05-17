import { Request, Response } from "express";
import { sanitizedResponse } from "../../util/sanitizeResponse";
import { prismaClient } from "../../lib/prismaClient";

export async function GetAuthenticatedUserController(req: Request, res: Response) {
	const userId = req.userId;

	if (!userId) {
		res.status(401).json(sanitizedResponse.error({ message: "Unauthorized", status: 401 }));
		return;
	}

	const user = await prismaClient.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			email: true,
			name: true,
			walletAddress: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	if (!user) {
		res.status(404).json(sanitizedResponse.error({ message: "User not found", status: 404 }));
		return;
	}

	res.status(200).json(sanitizedResponse.success(user));
}

