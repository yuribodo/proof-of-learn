import { Request, Response } from "express";
import { prismaClient } from "../../../lib/prismaClient";
import { sanitizedResponse } from "../../../util/sanitizeResponse";

export async function GetTopicByIdController(req: Request, res: Response) {
	const { userId } = req;
	const { roadmapId, topicId } = req.params;

	if (!userId) {
		res.status(401).json(
			sanitizedResponse.error({
				message: "Unauthorized",
				status: 401,
			})
		);
		return;
	}

	const roadmapPromise = prismaClient.roadmap.findUnique({
		where: { id: roadmapId, userId },
	});

	const topicContentPromise = prismaClient.roadmapTopic.findUnique({
		where: {
			id: topicId,
			roadmapId,
		},
		select: {
			id: true,
			topicName: true,
			topicDescription: true,
			roadmapTopicContents: {
				omit: { roadmapTopicId: true },
			},
		},
	});

	const [roadmap, roadmapTopicContent] = await Promise.all([
		roadmapPromise,
		topicContentPromise,
	]);

	const formattedObject = {
		roadmapName: roadmap?.theme,
		roadmapId,
		topicId,
		topicName: roadmapTopicContent?.topicName,
		topicDescription: roadmapTopicContent?.topicDescription,
		contents: roadmapTopicContent?.roadmapTopicContents ?? [],
	};

	res.status(200).json(sanitizedResponse.success(formattedObject));
	return;
}
