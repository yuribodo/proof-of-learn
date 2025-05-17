import type { ZodIssue } from "zod";

export type ApiResponse<T> = {
	data: T | null;
	error: { message: string | ZodIssue[]; status?: number } | null;
};
