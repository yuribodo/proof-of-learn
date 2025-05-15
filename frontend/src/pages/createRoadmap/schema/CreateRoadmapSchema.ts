import { z } from "zod";

export const coreStepSchema = z.object({
	theme: z.string().min(1, "Theme is required!"),
	learningGoal: z.string().min(1, "Learning goal is required!"),
});

export const expertiseStepSchema = z.object({
	knowledgeLevel: z.string().min(1, "Knowlege Level is Required"),
	timeCommitment: z.string(),
});

export const preferencesStepSchema = z.object({
	learningStyle: z.string().min(1, "Learning Style is Required"),
});
