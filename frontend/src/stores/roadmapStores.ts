import type { RoadmapFormStateDTO } from "@/@types/roadmap";
import { create } from "zustand";

interface RoadmapFormState {
	roadmapForm: RoadmapFormStateDTO;
	setRoadmapForm: (data: Partial<RoadmapFormStateDTO>) => void;
}

export const useRoadmapForm = create<RoadmapFormState>()((set) => ({
	roadmapForm: {
		theme: null,
		learningGoal: null,
		knowledgeLevel: null,
		timeCommitment: null,
		learningStyle: null,
	},
	setRoadmapForm: (data) => {
		set((state) => ({
			roadmapForm: {
				...state.roadmapForm,
				...data,
			},
		}));
	},
}));
