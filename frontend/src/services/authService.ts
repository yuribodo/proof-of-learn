import type { ApiResponse } from "@/@types/apiResponse";
import type {
	LoginDTO,
	LoginResponse,
	MeResponse,
	RegisterDTO,
	RegisterResponse,
	User,
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
		const response = await api.get<ApiResponse<User>>("/me");
		const { data, error } = response.data;
		return {
			user: data,
			error,
		};
	},
};
