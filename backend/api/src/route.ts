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
/* Get Quizz and Answers of a specific project */
router.get(
	"/roadmaps/:roadmapId/quiz/answers",
	AuthenticationMiddleware,
	GetRoadmapQuizzesController
);
//Update checked of a specific contenct to true
router.patch(
	"/roadmaps/:roadmap_id/contents/:content_id",
	AuthenticationMiddleware,
	UpdateContentCheckedController
);

export { router };
