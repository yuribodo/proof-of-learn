import type {
	LoginDTO,
	LoginResponse,
	MeResponse,
	RegisterDTO,
	RegisterResponse,
} from "@/@types/auth";
import { api } from "@/lib/api";

export const authService = {
	async register(data: RegisterDTO): Promise<RegisterResponse> {
		const response = await api.post("/sign-up", data);
		return response.data;
	},

	async login(data: LoginDTO): Promise<LoginResponse> {
		const response = await api.post("/sign-in", data);
		return response.data;
	},

	async me(): Promise<MeResponse> {
		const response = await api.get("/authenticated/GetMe");
		return response.data;
	},
};
