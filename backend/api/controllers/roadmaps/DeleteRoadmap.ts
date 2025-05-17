import type { Request, Response } from "express";
import { prismaClient } from "../../lib/prismaClient";
import { sanitizedResponse } from "../../util/sanitizeResponse";

export async function DeleteRoadmap(req: Request, res: Response) {
	const userId = req.userId;
	const { roadmapId } = req.params;

	if (!userId) {
		res
			.status(401)
			.json(sanitizedResponse.error({ message: "Unauthorized", status: 401 }));
		return;
	}

	const roadmap = await prismaClient.roadmap.findUnique({
		where: { id: roadmapId },
	});

	if (!roadmap || roadmap.userId !== userId) {
		res
			.status(404)
			.json(
				sanitizedResponse.error({ message: "Roadmap not found", status: 404 }),
			);
		return;
	}

	await prismaClient.roadmap.delete({
		where: { id: roadmapId },
	});

	res.status(200).json(
		sanitizedResponse.success({
			message: "Roadmap and related data deleted",
		}),
	);
}
