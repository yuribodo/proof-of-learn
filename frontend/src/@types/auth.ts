export interface RegisterDTO {
	name: string;
	email: string;
	password: string;
	wallet_address?: string | null;
}

export interface RegisterResponse {
	message: string;
}

export interface LoginDTO {
	email: string;
	password: string;
}

export interface LoginResponse {
	accessToken: string;
}
