export type RoadmapFormDTO = {
	theme: Theme;
	learningGoal: string;
	knowledgeLevel: KnowledgeLevel;
	timeCommitment: number;
	learningStyle: LearningStyle;
};

export type RoadmapFormStateDTO = {
	theme: Theme | null;
	learningGoal: string | null;
	knowledgeLevel: KnowledgeLevel | null;
	timeCommitment: number | null;
	learningStyle: LearningStyle | null;
};

export const LearningStyles = {
	VISUAL: "VISUAL",
	AUDITORY: "AUDITORY",
	READING_WRITING: "READING_WRITING",
} as const;

export type LearningStyle =
	(typeof LearningStyles)[keyof typeof LearningStyles];

export const LearningStyleLabels: Record<LearningStyle, string> = {
	VISUAL: "Visual",
	AUDITORY: "Auditory",
	READING_WRITING: "Reading & Writing",
};

export const KnowledgeLevels = {
	BEGINNER: "BEGINNER",
	INTERMEDIATE: "INTERMEDIATE",
	ADVANCED: "ADVANCED",
} as const;

export type KnowledgeLevel =
	(typeof KnowledgeLevels)[keyof typeof KnowledgeLevels];

export const KnowledgeLevelLabels: Record<KnowledgeLevel, string> = {
	BEGINNER: "Beginner",
	INTERMEDIATE: "Intermediate",
	ADVANCED: "Advanced",
};

export const Themes = {
	BLOCKCHAIN: "BLOCKCHAIN",
	PROGRAMMING: "PROGRAMMING",
	AI: "AI",
} as const;

export type Theme = (typeof Themes)[keyof typeof Themes];

export const ThemeLabels: Record<Theme, string> = {
	BLOCKCHAIN: "Blockchain",
	PROGRAMMING: "Programming",
	AI: "AI",
};
