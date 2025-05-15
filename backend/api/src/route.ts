import { Router } from "express";
import { SignUpController } from "../controler/SignUpController";
import { SignInController } from "../controler/SignInController";

const router = Router();


router.post("/sign-up", SignUpController);
router.post("/sign-in", SignInController);


export { router };
