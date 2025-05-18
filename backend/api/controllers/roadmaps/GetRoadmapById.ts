import type { Request, Response } from "express";
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
			}),
		);
		return;
	}

	if (!roadmapId) {
		res.status(400).json(
			sanitizedResponse.error({
				message: "Roadmap ID is required",
				status: 400,
			}),
		);
		return;
	}

	const roadmap = await prismaClient.roadmap.findFirst({
		where: {
			id: roadmapId,
			userId,
		},
		include: {
			roadmapTopics: {
				orderBy: { topicIndex: 'asc' },
				include: { roadmapTopicContents: true },
			},
		},
	});

	if (!roadmap) {
		res.status(404).json(
			sanitizedResponse.error({ message: 'Roadmap not found', status: 404 }),
		);
		return;
	}

	res.status(200).json(sanitizedResponse.success(roadmap));
	return;
}
