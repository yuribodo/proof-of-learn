import { Router } from "express";
import { SignInController } from "../controllers/auth/SignInController";
import { SignUpController } from "../controllers/auth/SignUpController";
import { GetAllUserRoadmapsController } from "../controllers/roadmaps/GetAllUserRoadmaps";
import { GetRoadmapByIdController } from "../controllers/roadmaps/GetRoadmapById";
import { GetTopicByIdController } from "../controllers/roadmaps/topics/GetTopicById";
import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import { PostRoadmapController } from "../controllers/roadmaps/PostRoadmap";
import { DeleteRoadmap } from "../controllers/roadmaps/DeleteRoadmap";
import { GetRoadmapQuizzesController } from "../controllers/roadmaps/quiz/GetQuizAndAnswerFromRoadmap";


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
router.delete(
	"/roadmaps/:roadmapId",
	AuthenticationMiddleware,
	DeleteRoadmap
);


// roadmap topic
router.get(
	"/roadmaps/:roadmapId/topics/:topicId",
	AuthenticationMiddleware,
	GetTopicByIdController
);
router.get(
	"/roadmaps/:roadmapId/quiz/answers",
	AuthenticationMiddleware,
	GetRoadmapQuizzesController
);

export { router };
