import { Request, Response } from "express";
import { z } from "zod";
import { sanitizedResponse } from "../../../util/sanitizeResponse";
import { prismaClient } from "../../../lib/prismaClient";


const ParamsSchema = z.object({
	roadmap_id: z.string().uuid({ message: "Invalid roadmap_id" }),
	content_id: z.string().uuid({ message: "Invalid content_id" }),
});

export async function UpdateContentCheckedController(req: Request, res: Response) {
	const userId = req.userId;
	if (!userId) {
		res.status(401).json(
			sanitizedResponse.error({
				message: "Unauthorized",
				status: 401,
			})
		);
		return;
	}

	const parsedParams = ParamsSchema.safeParse(req.params);
	if (!parsedParams.success) {
		res.status(400).json(
			sanitizedResponse.error({
				message: JSON.stringify(parsedParams.error.format()),
				status: 400,
			})
		);
		return;
	}

	const { roadmap_id, content_id } = parsedParams.data;

	const roadmap = await prismaClient.roadmap.findFirst({
		where: {
			id: roadmap_id,
			userId,
		},
	});

	if (!roadmap) {
		res.status(404).json(
			sanitizedResponse.error({
				message: "Roadmap not found",
				status: 404,
			})
		);
		return;
	}

	const content = await prismaClient.roadmapTopicContent.findFirst({
		where: {
			id: content_id,
			roadmapTopic: {
				roadmapId: roadmap_id,
			},
		},
	});

	if (!content) {
		res.status(404).json(
			sanitizedResponse.error({
				message: "Content not found",
				status: 404,
			})
		);
		return;
	}

	await prismaClient.roadmapTopicContent.update({
		where: { id: content_id },
		data: { checked: true },
	});

	res.status(200).json(
		sanitizedResponse.success({ message: "Content marked as checked" })
	);
}
