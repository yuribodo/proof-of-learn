import { Request, Response } from "express";
import { z } from "zod";
import { prismaClient } from "../../../lib/prismaClient";
import { sanitizedResponse } from "../../../util/sanitizeResponse";

const ParamsSchema = z.object({
	roadmapId: z.string().uuid({ message: "Invalid roadmap_id" }),
	contentId: z.string().uuid({ message: "Invalid content_id" }),
});

const BodySchema = z.object({
	checked: z.boolean(),
});

export async function UpdateContentCheckedController(
	req: Request,
	res: Response
) {
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
				// TODO: return zod issues
				message: JSON.stringify(parsedParams.error.format()),
				status: 400,
			})
		);
		return;
	}

	const parsedBody = BodySchema.safeParse(req.body);
	if (!parsedBody.success) {
		res.status(400).json(
			sanitizedResponse.error({
				// TODO: return zod issues
				message: JSON.stringify(parsedBody.error.format()),
				status: 400,
			})
		);
		return;
	}

	const { roadmapId, contentId } = parsedParams.data;
	const { checked } = parsedBody.data;

	const roadmap = await prismaClient.roadmap.findFirst({
		where: {
			id: roadmapId,
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
			id: contentId,
			roadmapTopic: {
				roadmapId: roadmapId,
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
		where: { id: contentId },
		data: { checked },
	});

	const responseText = checked
		? "Content marked as checked"
		: "Content marked as unchecked";

	res.status(200).json(sanitizedResponse.success({ message: responseText }));
}
