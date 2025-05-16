import { Router } from "express";
import { SignInController } from "../controllers/auth/SignInController";
import { SignUpController } from "../controllers/auth/SignUpController";

const router = Router();

router.post("/sign-up", SignUpController);
router.post("/sign-in", SignInController);

export { router };
