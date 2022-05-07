import { Router } from "express";

import { signIn, signUp, signOut } from "../controllers/authController.js";
import { tokenValidationMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/", signIn);
authRouter.post("/sign-up", signUp);
authRouter.post("/sign-out", tokenValidationMiddleware, signOut);

export default authRouter;
