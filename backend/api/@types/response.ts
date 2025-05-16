export type Response<T> = {
	data: T | null;
	error: { message: string; status?: number } | null;
};
