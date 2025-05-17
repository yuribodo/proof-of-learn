import { Router } from "express";
import { SignInController } from "../controllers/auth/SignInController";
import { SignUpController } from "../controllers/auth/SignUpController";
import { DeleteRoadmap } from "../controllers/roadmaps/DeleteRoadmap";
import { GetAllUserRoadmapsController } from "../controllers/roadmaps/GetAllUserRoadmaps";
import { GetRoadmapByIdController } from "../controllers/roadmaps/GetRoadmapById";
import { PostRoadmapController } from "../controllers/roadmaps/PostRoadmap";
import { GetRoadmapQuizzesController } from "../controllers/roadmaps/quiz/GetQuizAndAnswerFromRoadmap";
import { PostQuizAnswersController } from "../controllers/roadmaps/quiz/PostQuizAnswers";
import { GetTopicByIdController } from "../controllers/roadmaps/topics/GetTopicById";
import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import { UpdateContentCheckedController } from "../controllers/roadmaps/topics/UpdateContentChecked";

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
router.post("/roadmaps", AuthenticationMiddleware, PostRoadmapController);
router.delete("/roadmaps/:roadmapId", AuthenticationMiddleware, DeleteRoadmap);

// roadmap topic
router.get(
	"/roadmaps/:roadmapId/topics/:topicId",
	AuthenticationMiddleware,
	GetTopicByIdController
);

// roadmap quiz
router.get(
	"/roadmaps/:roadmapId/quiz",
	AuthenticationMiddleware,
	GetRoadmapQuizzesController
);
router.post(
	"/roadmaps/:roadmapId/quiz/answers",
	AuthenticationMiddleware,
	PostQuizAnswersController
);

//Update checked of a specific contenct to true
router.patch(
	"/roadmaps/:roadmapId/contents/:contentId",
	AuthenticationMiddleware,
	UpdateContentCheckedController
);

export { router };
