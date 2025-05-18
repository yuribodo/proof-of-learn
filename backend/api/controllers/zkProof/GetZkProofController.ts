import type { Request, Response } from "express";
import { z } from "zod";
import path from "path";
import snarkjs from "snarkjs";
import { sanitizedResponse } from "../../util/sanitizeResponse";
import { prismaClient } from "../../lib/prismaClient";

const paramsSchema = z.object({
  roadmapId: z.string().uuid(),
});

export async function GetZkProofController(req: Request, res: Response) {
  const parseResult = paramsSchema.safeParse(req.params);
  if (!parseResult.success) {
    return res.status(400).json(
      sanitizedResponse.error({
        message: "Invalid parameters",
        status: 400,
      })
    );
  }

  const { roadmapId } = parseResult.data;
  const userId = req.userId;

  const roadmap = await prismaClient.roadmap.findUnique({
    where: { id: roadmapId, userId },
    select: {
      id: true,
      user: {
        select: {
          walletAddress: true,
        },
      },
    },
  });

  if (!roadmap) {
    return res.status(404).json(
      sanitizedResponse.error({
        message: "Roadmap not found",
        status: 404,
      })
    );
  }

  if (!roadmap.user.walletAddress) {
    return res.status(400).json(
      sanitizedResponse.error({
        message: "Wallet address not set. Please connect your wallet.",
        status: 400,
      })
    );
  }

  const roadmapQuizQuestions = await prismaClient.roadmapQuizQuestions.findMany({
    where: { roadmapId },
    select: {
      id: true,
      text: true,
      RoadmapQuizAnswer: { select: { id: true, is_correct: true, text: true } },
      RoadmapQuizUserAnswer: {
        select: {
          roadmapQuizQuestionsId: true,
          roadmapQuizAnswerId: true,
        },
      },
    },
  });

  const userAnswers = roadmapQuizQuestions.flatMap((q) =>
    q.RoadmapQuizUserAnswer.map((a) => ({
      questionId: a.roadmapQuizQuestionsId,
      answerId: a.roadmapQuizAnswerId,
    }))
  );

  const correctAnswers = userAnswers.filter((ans) => {
    const question = roadmapQuizQuestions.find((q) => q.id === ans.questionId);
    const correct = question?.RoadmapQuizAnswer.find((a) => a.is_correct);
    return correct?.id === ans.answerId;
  });

  const totalCorrect = correctAnswers.length;
  const totalQuestions = roadmapQuizQuestions.length;
  const scorePercentage = (totalCorrect / totalQuestions) * 100;

  if (scorePercentage < 90) {
    return res.status(403).json(
      sanitizedResponse.error({
        message: "Score below required threshold (90%)",
        status: 403,
      })
    );
  }

  const input = {
    totalCorrect,
    totalQuestions,
  };

  const { proof } = await snarkjs.groth16.fullProve(
    input,
    path.join(__dirname, "../../../zk/circuit.wasm"),
    path.join(__dirname, "../../../zk/circuit_final.zkey")
  );

  const a = [proof.pi_a[0], proof.pi_a[1]];
  const b = [
    [proof.pi_b[0][1], proof.pi_b[0][0]],
    [proof.pi_b[1][1], proof.pi_b[1][0]],
  ];
  const c = [proof.pi_c[0], proof.pi_c[1]];

  const tokenMetadata = {
    name: "Roadmap Completion NFT",
    description: "Awarded for scoring ≥ 90% on the roadmap quiz.",
    image: "ipfs://QmMockedImageHash/nft.png",
    attributes: [
      { trait_type: "Quiz", value: roadmapId },
      { trait_type: "Passed", value: "Yes" },
    ],
  };

  const base64Json = Buffer.from(JSON.stringify(tokenMetadata)).toString("base64");
  const tokenURI = `data:application/json;base64,${base64Json}`;

  return res.status(200).json(
    sanitizedResponse.success({
      a,
      b,
      c,
      tokenURI,
    })
  );
}

