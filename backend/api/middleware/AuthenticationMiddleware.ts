import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function AuthenticationMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (!req.headers.authorization) {
		res.status(401).send({ message: "Unauthorized" });
		return;
	}

	const token = req.headers.authorization.split(" ")[1];

	if (!token) {
		res.status(401).send({ message: "Unauthorized" });
		return;
	}

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

		req["userId"] = payload.id;
		next();
	} catch {
		res.status(401).send({ message: "Unauthorized" });
		return;
	}
}
