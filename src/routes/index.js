import { Router } from "express";

import authRouter from "./authRouter.js";
import transactionRouter from "./transactionRouter.js";
import sanitizationMiddleware from "./../middlewares/sanitizationMiddleware.js";

const router = Router();

router.use(sanitizationMiddleware);
router.use(authRouter);
router.use(transactionRouter);

export default router;
