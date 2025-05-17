import { Request, Response } from "express";
import { z } from "zod";
import { prismaClient } from "../../../lib/prismaClient";
import { sanitizedResponse } from "../../../util/sanitizeResponse";

const ParamsSchema = z.object({
	roadmapId: z.string().uuid({ message: "Invalid roadmapId" }),
});

export async function GetRoadmapQuizzesController(req: Request, res: Response) {
	const userId = req.userId;
	if (!userId) {
		res
			.status(401)
			.json(sanitizedResponse.error({ message: "Unauthorized", status: 401 }));
		return;
	}

	const parsed = ParamsSchema.safeParse(req.params);
	if (!parsed.success) {
		res.status(400).json(
			sanitizedResponse.error({
				message: parsed.error.issues,
				status: 400,
			})
		);
		return;
	}

	const { roadmapId } = parsed.data;

	const roadmap = await prismaClient.roadmap.findFirst({
		where: { id: roadmapId, userId },
	});

	if (!roadmap) {
		res
			.status(404)
			.json(
				sanitizedResponse.error({ message: "Roadmap not found", status: 404 })
			);
		return;
	}

	const quizzes = await prismaClient.roadmapQuizQuestions.findMany({
		where: { roadmapId },
		select: {
			id: true,
			roadmapId: true,
			text: true,
			RoadmapQuizAnswer: {
				select: {
					id: true,
					text: true,
				},
			},
		},
	});

	const result = quizzes.map((q) => ({
		id: q.id,
		roadmapId: q.roadmapId,
		text: q.text,
		answers: q.RoadmapQuizAnswer.map((a) => ({
			id: a.id,
			text: a.text,
		})),
	}));

	res.status(200).json(sanitizedResponse.success(result));
}
