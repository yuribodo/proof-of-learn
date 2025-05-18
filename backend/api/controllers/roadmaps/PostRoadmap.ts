import type { Request, Response } from "express";
import { z } from "zod";
import { prismaClient } from "../../lib/prismaClient";
import { generateRoadmapContent } from "../../src/services/RoadmapAiService";
import { sanitizedResponse } from "../../util/sanitizeResponse";

const schema = z.object({
	theme: z.enum(["BLOCKCHAIN", "PROGRAMMING", "AI"]),
	learningGoal: z.string({ required_error: "learningGoal is required" }),
	knowledgeLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
	hoursPerDayCommitment: z
		.number({ required_error: "hoursPerDayCommitment is required" })
		.positive(),
	learningStyle: z.enum(["VISUAL", "AUDITORY", "READING_WRITING"]),
});

export type RoadmapInput = z.infer<typeof schema>;

export async function PostRoadmapController(req: Request, res: Response) {
	if (!req.body) {
		res
			.status(400)
			.json(sanitizedResponse.error({ message: "Request body is required" }));
		return;
	}

	const userId = req.userId;
	if (!userId) {
		res
			.status(401)
			.json(sanitizedResponse.error({ message: "Unauthorized", status: 401 }));
		return;
	}

	const parsed = schema.safeParse(req.body);
	if (!parsed.success) {
		res.status(400).json(
			sanitizedResponse.error({
				message: parsed.error.issues,
				status: 400,
			})
		);
		return;
	}

	const user = await prismaClient.user.findUnique({ where: { id: userId } });
	if (!user) {
		res
			.status(404)
			.json(
				sanitizedResponse.error({ message: "User not found", status: 404 })
			);
		return;
	}

	const geminiResponse = await generateRoadmapContent(parsed.data);

	if (geminiResponse.error) {
		const { message, status } = geminiResponse.error;
		res.status(status || 400).json(sanitizedResponse.error({ message }));
		return;
	}

	const { data: aiRoadmap } = geminiResponse;
	if (aiRoadmap) {
		const roadmap = await prismaClient.roadmap.create({
			data: {
				userId,
				theme: aiRoadmap.theme,
				learningGoal: aiRoadmap.learningGoal,
				knowledgeLevel: aiRoadmap.knowledgeLevel,
				hoursPerDayCommitment: aiRoadmap.hoursPerDayCommitment,
				learningStyle: aiRoadmap.learningStyle,
				roadmapTopics: {
					create: aiRoadmap.topics.map((topic) => ({
						topicName: topic.name,
						topicDescription: topic.description,
						topicIndex: topic.index,
						roadmapTopicContents: {
							create: topic.contents.map((content) => ({
								name: content.name,
								description: content.description,
								contentType: content.contentType,
								url: content.url,
							})),
						},
					})),
				},
				RoadmapQuizQuestions: {
					create: aiRoadmap.quizQuestions.map((question) => ({
						text: question.text,
						RoadmapQuizAnswer: {
							create: question.answers.map((answer) => ({
								text: answer.text,
								is_correct: answer.isCorrect,
							})),
						},
					})),
				},
			},
			include: {
				roadmapTopics: {
					include: {
						roadmapTopicContents: true,
					},
				},
				RoadmapQuizQuestions: true,
			},
		});

		res.status(201).json(sanitizedResponse.success(roadmap));
		return;
	}

	res
		.status(400)
		.json(sanitizedResponse.error({ message: "Failed to create roadmap" }));
}
