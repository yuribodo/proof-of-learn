import type { Request, Response } from "express";
import { prismaClient } from "../../../lib/prismaClient";
import { sanitizedResponse } from "../../../util/sanitizeResponse";

export async function GetQuizScoreController(req: Request, res: Response) {
	const { userId } = req;
	const { roadmapId } = req.params;

	const roadmap = await prismaClient.roadmap.findUnique({
		where: { id: roadmapId, userId },
		select: { id: true },
	});

	if (!roadmap) {
		res.status(404).json(
			sanitizedResponse.error({
				message: "Roadmap not found",
				status: 404,
			}),
		);
		return;
	}

	const roadmapQuizQuestions = await prismaClient.roadmapQuizQuestions.findMany(
		{
			where: { roadmapId },
			select: {
				id: true,
				text: true,
				RoadmapQuizAnswer: true,
				RoadmapQuizUserAnswer: true,
			},
		},
	);

	const userAnswers = roadmapQuizQuestions.flatMap((questions) =>
		questions.RoadmapQuizUserAnswer.map((question) => ({
			questionId: question.roadmapQuizQuestionsId,
			answerId: question.roadmapQuizAnswerId,
		})),
	);

	const rightAnswers = roadmapQuizQuestions.map((question) => {
		return {
			questionId: question.id,
			alternatives: question.RoadmapQuizAnswer.map((answer) => ({
				answerId: answer.id,
				isCorrect: answer.is_correct,
				question: question.text,
				answer: answer.text,
			})),
		};
	});

	const correctAnswers = userAnswers
		.filter((answer) => {
			const currentQuestion = rightAnswers.find(
				(item) => item.questionId === answer.questionId,
			);

			const correctCurrentAnswer = currentQuestion?.alternatives.find(
				(item) => item.isCorrect,
			);
			return correctCurrentAnswer?.answerId === answer.answerId;
		})
		.map((answer) => {
			const currentQuestion = rightAnswers.find(
				(item) => item.questionId === answer.questionId,
			);

			const correctAlternative = currentQuestion?.alternatives.find(
				(item) => item.answerId === answer.answerId,
			);

			return {
				questionId: answer.questionId,
				answerId: answer.answerId,
				question: correctAlternative?.question,
				answer: correctAlternative?.answer,
			};
		});

	const wrongAnswers = userAnswers
		.filter(
			(answer) =>
				!correctAnswers.some(
					(correctAnswer) =>
						correctAnswer.questionId === answer.questionId &&
						correctAnswer.answerId === answer.answerId,
				),
		)
		.map((answer) => {
			const currentQuestion = rightAnswers.find(
				(item) => item.questionId === answer.questionId,
			);

			const wrongAlternative = currentQuestion?.alternatives.find(
				(item) => item.answerId === answer.answerId,
			);

			return {
				questionId: answer.questionId,
				answerId: answer.answerId,
				question: wrongAlternative?.question,
				answer: wrongAlternative?.answer,
			};
		});

	const totalQuestions = roadmapQuizQuestions.length;
	const totalCorrect = correctAnswers.length;
	const totalWrong = wrongAnswers.length;
	const scorePercentage = (totalCorrect / totalQuestions) * 100;

	const objectToReturn = {
		totalQuestions,
		totalCorrect,
		totalWrong,
		scorePercentage,
		correctAnswers,
		wrongAnswers,
	};

	res.status(200).json(sanitizedResponse.success(objectToReturn));
}
