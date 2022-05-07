import { Router } from "express";

import {
  getTransaction,
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "./../controllers/transactionsController.js";

import { tokenValidationMiddleware } from "./../middlewares/authMiddleware.js";
import { transactionValidationMiddleware } from "./../middlewares/transactionMiddleware.js";

const transactionRouter = Router();

transactionRouter.use(tokenValidationMiddleware);

transactionRouter.get("/transactions/:id", getTransaction);
transactionRouter.get("/transactions", getTransactions);
transactionRouter.post(
  "/transactions",
  transactionValidationMiddleware,
  addTransaction
);
transactionRouter.put(
  "/transactions/:id",
  transactionValidationMiddleware,
  updateTransaction
);
transactionRouter.delete("/transactions/:id", deleteTransaction);

export default transactionRouter;
