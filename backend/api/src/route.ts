import { Router } from "express";
import { SignInController } from "../controllers/auth/SignInController";
import { SignUpController } from "../controllers/auth/SignUpController";
import { GetAllUserRoadmapsController } from "../controllers/roadmaps/GetAllUserRoadmaps";
import { GetRoadmapByIdController } from "../controllers/roadmaps/GetRoadmapById";
import { GetTopicByIdController } from "../controllers/roadmaps/topics/GetTopicById";
import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import { PostRoadmapController } from "../controllers/roadmaps/PostRoadmap";


const router = Router();

// auth
router.post("/sign-up", SignUpController);
router.post("/sign-in", SignInController);

// roadmap
router.get("/roadmaps", AuthenticationMiddleware, GetAllUserRoadmapsController);
router.get(
	"/roadmaps/:roadmapId",
	AuthenticationMiddleware,
	GetRoadmapByIdController
);
router.post(
  "/roadmaps",
  AuthenticationMiddleware,
  PostRoadmapController
);


// roadmap topic
router.get(
	"/roadmaps/:roadmapId/topics/:topicId",
	AuthenticationMiddleware,
	GetTopicByIdController
);

export { router };
