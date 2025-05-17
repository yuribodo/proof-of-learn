import type { Request, Response } from "express";
import { prismaClient } from "../../lib/prismaClient";
import { sanitizedResponse } from "../../util/sanitizeResponse";

export async function GetAllUserRoadmapsController(
	req: Request,
	res: Response,
) {
	const { userId } = req;

	if (!userId) {
		res.status(401).send(
			sanitizedResponse.error({
				message: "Unauthorized",
				status: 401,
			}),
		);
		return;
	}

	try {
		const roadmaps = await prismaClient.roadmap.findMany({
			where: {
				userId,
			},
		});

		res.status(200).json(sanitizedResponse.success(roadmaps));
	} catch {
		res.status(500).json(
			sanitizedResponse.error({
				message: "Internal server error",
				status: 500,
			}),
		);
	}
}
