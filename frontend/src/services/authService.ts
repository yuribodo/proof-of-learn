import type {
	LoginDTO,
	LoginResponse,
	RegisterDTO,
	RegisterResponse,
} from "@/@types/auth";
import { api } from "@/lib/api";

export const authService = {
	async register(data: RegisterDTO): Promise<RegisterResponse> {
		const response = await api.post("/sign-up", data);
		console.log(response.data);
		return response.data;
	},

	async login(data: LoginDTO): Promise<LoginResponse> {
		const response = await api.post("/sign-in", data);
		console.log(response.data);
		return response.data;
	},
};
