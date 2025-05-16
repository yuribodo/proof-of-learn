import { Roadmap } from "@prisma/client";
import { Request, Response } from "express";
import { ApiResponse } from "../../@types/response";
import { prismaClient } from "../../lib/prismaClient";

export async function GetAllUserRoadmapsController(
	req: Request,
	res: Response
) {
	const { userId } = req;

	if (!userId) {
		const unauthorizedResponse: ApiResponse<null> = {
			data: null,
			error: { message: "Unauthorized", status: 401 },
		};

		res.status(401).send(unauthorizedResponse);
		return;
	}

	try {
		const roadmaps = await prismaClient.roadmap.findMany({
			where: {
				userId,
			},
		});

		const response: ApiResponse<Roadmap[]> = {
			data: roadmaps,
			error: null,
		};

		res.status(200).json(response);
	} catch {
		const response: ApiResponse<Roadmap[]> = {
			data: null,
			error: { message: "Internal server error", status: 500 },
		};

		res.status(500).json(response);
	}
}
