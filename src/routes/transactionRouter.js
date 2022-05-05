import { Router } from "express";

import {
  getTransaction,
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionsController.js";

const transactionRouter = Router();

transactionRouter.get("/transactions/:id", getTransaction);
transactionRouter.get("/transactions", getTransactions);
transactionRouter.post("/transactions", addTransaction);
transactionRouter.put("/transactions/:id", updateTransaction);
transactionRouter.delete("/transactions/:id", deleteTransaction);

export default transactionRouter;
