export interface User {
	id: string;
	name: string;
	email: string;
	wallet_address: string | null;
}

export interface MeResponse {
	id: string;
	email: string;
	name: string;
	walletAddress: string | null;
	createdAt: string;
	updatedAt: string;
}

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
