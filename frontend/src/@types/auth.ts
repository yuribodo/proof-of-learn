import type { ZodIssue } from "zod";

export interface User {
	id: string;
	name: string;
	email: string;
	wallet_address: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface MeResponse {
	user: User | null;
	error: { message: string | ZodIssue[]; status?: number } | null;
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
