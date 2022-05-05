import { Router } from "express";

import { signIn, signUp, signOut } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/", signIn);
authRouter.post("/signup", signUp);
authRouter.post("/signout", signOut);

export default authRouter;
