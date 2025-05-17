import { Router } from "express";
import { SignInController } from "../controllers/auth/SignInController";
import { SignUpController } from "../controllers/auth/SignUpController";
import { GetAllUserRoadmapsController } from "../controllers/roadmaps/GetAllUserRoadmapsController";
import { GetRoadmapByIdController } from "../controllers/roadmaps/GetRoadmapByIdController";
import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import { PostRoadmapController } from "../controllers/roadmaps/PostRoadmap";
import { DeleteRoadmap } from "../controllers/roadmaps/DeleteRoadmap";


const router = Router();

router.post("/sign-up", SignUpController);
router.post("/sign-in", SignInController);

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


export { router };
