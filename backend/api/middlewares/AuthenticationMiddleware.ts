import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { ApiResponse } from "../util/sanitizeResponse";

export async function AuthenticationMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const unauthorizedResponse: ApiResponse<null> = {
		data: null,
		error: { message: "Unauthorized", status: 401 },
	};

	if (!req.headers.authorization) {
		res.status(401).send(unauthorizedResponse);
		return;
	}

	const token = req.headers.authorization.split(" ")[1];

	if (!token) {
		res.status(401).send(unauthorizedResponse);
		return;
	}

	try {
		const payload = jwt.verify(
			token,
			process.env.JWT_SECRET as string,
		) as jwt.JwtPayload;

		req.userId = payload.id;
		next();
	} catch {
		res.status(401).send(unauthorizedResponse);
		return;
	}
}
