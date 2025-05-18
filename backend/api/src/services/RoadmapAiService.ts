import { GoogleGenerativeAI } from "@google/generative-ai";
import {
	KnowledgeLevel,
	LearningStyle,
	Theme,
	TopicContentType,
} from "@prisma/client";
import { z } from "zod";
import { RoadmapInput } from "../../controllers/roadmaps/PostRoadmap";
import { sanitizedResponse } from "../../util/sanitizeResponse";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function generateRoadmapContent(input: RoadmapInput) {
	const prompt = buildPrompt(input);

	try {
		const result = await model.generateContent(prompt);
		const response = result.response;
		const text = response
			.text()
			.replace(/```json|```/g, "")
			.trim();

		const parsedResponse = JSON.parse(text);

		const validatedResponse = outputSchema.safeParse(parsedResponse);

		if (!validatedResponse.success) {
			return sanitizedResponse.error({
				message: validatedResponse.error.issues,
				status: 400,
			});
		}

		return sanitizedResponse.success(validatedResponse.data);
	} catch (error) {
		console.error("Error generating roadmap content:", error);
		return sanitizedResponse.error({
			message: "Error generating roadmap content",
			status: 500,
		});
	}
}

function buildPrompt(input: RoadmapInput): string {
	return `
	You are a learning roadmap expert. Based on the roadmap input fields and provided context, perform a deep search to gather relevant information and generate a structured JSON roadmap with the format:
		{
			theme: "BLOCKCHAIN" | "PROGRAMMING" | "AI";
			learningGoal: string;
			knowledgeLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
			hoursPerDayCommitment: number;
			learningStyle: "VISUAL" | "AUDITORY" | "READING_WRITING";
			topics: Array<{
				name: string;
				description: string;
				index: number;
				contents: Array<{
					name: string;
					description: string;
					contentType: "TEXT" | "VIDEO";
					url: string;
				}>;
			}>;
			quizQuestions: Array<{
				text: string;
				answers: Array<{
					text: string;
					isCorrect: boolean;
				}>;
			}>;
		}

	Roadmap Inputs: Theme: ${input.theme}, Learning Goal: ${input.learningGoal}, Knowledge Level: ${input.knowledgeLevel}, Hours Per Day: ${input.hoursPerDayCommitment}, Learning Style: ${input.learningStyle}.

	Perform a deep search to find relevant learning materials and structure them into a roadmap. Ensure the JSON is valid, tasks are actionable. Align tasks with the learning style (e.g., videos for VISUAL, texts for READING_WRITING). Match the theme, learning goal, and knowledge level. Always returns only the JSON object.

	Example Output:
		{
			"theme": "BLOCKCHAIN",
			"learningGoal": "Learn blockchain fundamentals and smart contract development",
			"knowledgeLevel": "BEGINNER",
			"hoursPerDayCommitment": 2,
			"learningStyle": "VISUAL",
			"topics": [
				{
					"name": "Blockchain Basics",
					"description": "Understanding the fundamental concepts of blockchain technology",
					"index": 0,
					"contents": [
						{
							"name": "What is Blockchain Technology?",
							"description": "A comprehensive video introduction to blockchain fundamentals",
							"contentType": "VIDEO",
							"url": "https://www.youtube.com/watch?v=SSo_EIwHSd4"
						},
						{
							"name": "How Blockchain Works",
							"description": "Detailed article explaining blockchain mechanics",
							"contentType": "TEXT",
							"url": "https://www.investopedia.com/terms/b/blockchain.asp"
						}
					]
				},
				{
					"name": "Cryptography Fundamentals",
					"description": "Essential cryptographic concepts used in blockchain",
					"index": 1,
					"contents": [
						{
							"name": "Cryptography in Blockchain",
							"description": "Visual explanation of cryptographic principles",
							"contentType": "VIDEO",
							"url": "https://www.youtube.com/watch?v=6zabK9mwC8c"
						},
						{
							"name": "Public Key Cryptography",
							"description": "Interactive tutorial on public-private key pairs",
							"contentType": "TEXT",
							"url": "https://www.cloudflare.com/learning/ssl/how-does-public-key-encryption-work/"
						}
					]
				}
			],
			"quizQuestions": [
				{
					"text": "What is the main purpose of blockchain technology?",
					"answers": [
						{
							"text": "A decentralized and immutable ledger for recording transactions",
							"isCorrect": true
						},
						{
							"text": "A centralized database managed by a single authority",
							"isCorrect": false
						},
						{
							"text": "A social media platform",
							"isCorrect": false
						}
					]
				}
			]
		}

	Guidelines:
		1. Create 4-6 topics that progress logically from basic to advanced concepts
		2. Each topic should have at least 3 learning resources (contents), including youtube public videos and texts
		3. If youtube videos are included, make sure they still available to watch
		4. Create 5 quizQuestions per roadmap (questions related to all topics, because there is only one quiz per roadmap)
		5. Ensure quiz questions test understanding of key concepts
		6. Provide real, accessible URLs for learning resources
		7. Structure content based on the user's learning style
		8. Consider the user's time commitment when planning content
		9. Ensure content difficulty matches the user's knowledge level

	Please ensure the response is valid JSON and follows the exact format specified.
`;
}

const outputSchema = z.object({
	theme: z.nativeEnum(Theme),
	learningGoal: z.string(),
	knowledgeLevel: z.nativeEnum(KnowledgeLevel),
	hoursPerDayCommitment: z.number(),
	learningStyle: z.nativeEnum(LearningStyle),
	topics: z.array(
		z.object({
			name: z.string(),
			description: z.string(),
			index: z.number(),
			contents: z.array(
				z.object({
					name: z.string(),
					description: z.string(),
					contentType: z.nativeEnum(TopicContentType),
					url: z.string(),
				})
			),
		})
	),
	quizQuestions: z.array(
		z.object({
			text: z.string(),
			answers: z.array(z.object({ text: z.string(), isCorrect: z.boolean() })),
		})
	),
});
