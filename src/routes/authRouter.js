import { Router } from "express";

import { signIn, signUp, signOut } from "./../controllers/authController.js";
import { tokenValidationMiddleware } from "./../middlewares/authMiddleware.js";
import signinValidationMiddleware from "./../middlewares/signinValidationMiddleware.js";
import signupValidationMiddleware from "./../middlewares/signupValidationMiddleware.js";

const authRouter = Router();

authRouter.post("/", signinValidationMiddleware, signIn);
authRouter.post("/sign-up", signupValidationMiddleware, signUp);
authRouter.post("/sign-out", tokenValidationMiddleware, signOut);

export default authRouter;
