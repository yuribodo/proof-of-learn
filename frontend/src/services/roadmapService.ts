import type { RoadmapFormDTO } from "@/@types/roadmap";
import { api } from "@/lib/api";

export const roadmapService = {
	async createRoadmap(data: RoadmapFormDTO) {
		const response = await api.post("/roadmaps", data);
		return response.data;
	},
	async getAllRoadmaps() {
		const response = await api.get('/roadmaps');
		return response.data.data;
	},
	async getRoadmapById(roadmapId: string) {
		const response = await api.get(`/roadmaps/${roadmapId}`);
		return response.data.data;
	},
	async updateContentChecked(roadmapId: string, contentId: string, checked: boolean) {
		const response = await api.patch(`/roadmaps/${roadmapId}/contents/${contentId}`, { checked });
		return response.data.data;
	},
	async getQuiz(roadmapId: string) {
		const response = await api.get(`/roadmaps/${roadmapId}/quiz`);
		return response.data.data;
	},
	async submitQuiz(roadmapId: string, answers: { questionId: string; answerId: string }[]) {
		const response = await api.post(`/roadmaps/${roadmapId}/quiz/answers`, { answers });
		return response.data.data;
	},
	async getQuizScore(roadmapId: string) {
		const response = await api.get(`/roadmaps/${roadmapId}/quiz/score`);
		return response.data.data;
	},
};
