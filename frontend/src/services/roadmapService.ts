import type { RoadmapFormDTO } from "@/@types/roadmap";
import { api } from "@/lib/api";

export const roadmapService = {
	async createRoadmap(data: RoadmapFormDTO) {
		const response = await api.post("/roadmaps", data);
		return response.data;
	},
};
