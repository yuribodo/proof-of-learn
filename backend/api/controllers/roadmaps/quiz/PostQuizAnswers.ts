import { Request, Response } from "express";
import { z } from "zod";
import { prismaClient } from "../../../lib/prismaClient";
import { sanitizedResponse } from "../../../util/sanitizeResponse";

const schema = z.object({
	answers: z
		.array(
			z.object({
				questionId: z.string().uuid(),
				answerId: z.string().uuid(),
			})
		)
		.min(1, "At least one answer is required"),
});

export async function PostQuizAnswersController(req: Request, res: Response) {
	const { userId } = req;
	const { roadmapId } = req.params;

	if (!userId) {
		res
			.status(401)
			.json(sanitizedResponse.error({ message: "Unauthorized", status: 401 }));
		return;
	}

	const parsedSchema = schema.safeParse(req.body);
	if (!parsedSchema.success) {
		res.status(400).json(
			sanitizedResponse.error({
				message: parsedSchema.error.issues,
				status: 400,
			})
		);
		return;
	}

	const { answers } = parsedSchema.data;

	const roadmap = await prismaClient.roadmap.findUnique({
		where: { id: roadmapId, userId },
		select: {
			id: true,
			theme: true,
			RoadmapQuizQuestions: {
				select: { id: true },
			},
		},
	});

	if (!roadmap) {
		res
			.status(404)
			.json(
				sanitizedResponse.error({ message: "Roadmap not found", status: 404 })
			);
		return;
	}

	const userAlreadyAnswered =
		await prismaClient.roadmapQuizUserAnswer.findFirst({
			where: {
				userId,
				roadmapQuizQuestions: {
					roadmapId,
				},
			},
		});

	if (userAlreadyAnswered) {
		res.status(400).json(
			sanitizedResponse.error({
				message: "You already answered this roadmap quiz",
				status: 400,
			})
		);
		return;
	}

	// validate if all questions were answered
	if (answers.length < roadmap.RoadmapQuizQuestions.length) {
		// we could validate each questionId and answerId, but it will be more expensive
		res.status(400).json(
			sanitizedResponse.error({
				message: "You need to answer all roadmap quiz questions",
				status: 400,
			})
		);
		return;
	}

	const dataToCreate = answers.map((answer) => ({
		userId,
		roadmapQuizQuestionsId: answer.questionId,
		roadmapQuizAnswerId: answer.answerId,
	}));

	await prismaClient.roadmapQuizUserAnswer.createMany({ data: dataToCreate });

	res.status(201).json(
		sanitizedResponse.success({
			message: "Answers saved",
		})
	);
}
