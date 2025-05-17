import { Request, Response } from "express";
import { z } from "zod";
import { sanitizedResponse } from "../../util/sanitizeResponse";
import { prismaClient } from "../../lib/prismaClient";



const schema = z.object({
  theme: z.enum(["BLOCKCHAIN", "PROGRAMMING", "AI"]),
  learningGoal: z.string({ required_error: "learningGoal is required" }),
  knowledgeLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  hoursPerDayCommitment: z
    .number({ required_error: "hoursPerDayCommitment is required" })
    .positive(),
  learningStyle: z.enum(["VISUAL", "AUDITORY", "READING_WRITING"]),
});

export async function PostRoadmapController(req: Request, res: Response) {
  if (!req.body) {
    res
      .status(400)
      .json(sanitizedResponse.error({ message: "Request body is required" }));
    return;
  }

  const userId = req.userId;
  if (!userId) {
    res
      .status(401)
      .json(sanitizedResponse.error({ message: "Unauthorized", status: 401 }));
    return;
  }

  
const parsed = schema.safeParse(req.body);
if (!parsed.success) {
  res.status(400).json(
    sanitizedResponse.error({
      message: JSON.stringify(parsed.error.format()),
      status: 400,
    })
  );
  return;
}


  const user = await prismaClient.user.findUnique({ where: { id: userId } });
  if (!user) {
    res
      .status(404)
      .json(sanitizedResponse.error({ message: "User not found", status: 404 }));
    return;
  }

  const roadmap = await prismaClient.roadmap.create({
    data: {
      userId,
      theme: parsed.data.theme,
      learningGoal: parsed.data.learningGoal,
      knowledgeLevel: parsed.data.knowledgeLevel,
      hoursPerDayCommitment: parsed.data.hoursPerDayCommitment,
      learningStyle: parsed.data.learningStyle,
    },
  });

  res.status(201).json(sanitizedResponse.success(roadmap));
}
