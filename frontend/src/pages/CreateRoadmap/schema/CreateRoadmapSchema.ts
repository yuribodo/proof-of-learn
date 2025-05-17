import {
	KnowledgeLevels,
	LearningStyles,
	Themes,
	type KnowledgeLevel,
	type LearningStyle,
	type Theme,
} from "@/@types/roadmap";
import { z } from "zod";

export const coreStepSchema = z.object({
	theme: z.enum(Object.values(Themes) as [Theme, ...Theme[]]),
	learningGoal: z.string().min(1, "Learning goal is required!"),
});

export const expertiseStepSchema = z.object({
	knowledgeLevel: z.enum(
		Object.values(KnowledgeLevels) as [KnowledgeLevel, ...KnowledgeLevel[]],
	),
	timeCommitment: z
		.number()
		.min(1, "Time Commitment is too low")
		.max(24, "Time Commitment is too high"),
});

export const preferencesStepSchema = z.object({
	learningStyle: z.enum(
		Object.values(LearningStyles) as [LearningStyle, ...LearningStyle[]],
	),
});
