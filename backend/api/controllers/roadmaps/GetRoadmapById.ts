import { Request, Response } from "express";
import { prismaClient } from "../../lib/prismaClient";
import { sanitizedResponse } from "../../util/sanitizeResponse";

export async function GetRoadmapByIdController(req: Request, res: Response) {
	const { userId } = req;
	const { roadmapId } = req.params;

	if (!userId) {
		res.status(401).json(
			sanitizedResponse.error({
				message: "Unauthorized",
				status: 401,
			})
		);
		return;
	}

	if (!roadmapId) {
		res.status(400).json(
			sanitizedResponse.error({
				message: "Roadmap ID is required",
				status: 400,
			})
		);
		return;
	}

	const roadmap = await prismaClient.roadmap.findUnique({
		where: {
			id: roadmapId,
			userId,
		},
		include: {
			roadmapTopics: true,
		},
	});

	res.status(200).json(sanitizedResponse.success(roadmap));
	return;
}
