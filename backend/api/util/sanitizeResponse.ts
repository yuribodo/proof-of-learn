import { ZodIssue } from "zod";

export type ApiResponse<T> = {
	data: T | null;
	error: { message: string | ZodIssue[]; status?: number } | null;
};

function success<T>(data: T): ApiResponse<T> {
	return {
		data,
		error: null,
	};
}

function error(input: ApiResponse<null>["error"]): ApiResponse<null> {
	return {
		data: null,
		error: input,
	};
}

export const sanitizedResponse = Object.freeze({
	success,
	error,
});
