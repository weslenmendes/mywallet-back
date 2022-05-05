import "dotenv/config";
import express, { json } from "express";
import cors from "cors";

import { connectWithDB } from "./config/db.js";
import { signIn, signUp, signOut } from "./controllers/authController.js";
import {
  getTransaction,
  getTransactions,
  addTransaction,
  updateTransaction,
} from "./controllers/transactionsController.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(json());

app.post("/", signIn);
app.post("/signup", signUp);
app.post("/signout", signOut);

app.get("/transactions/:id", getTransaction);
app.get("/transactions", getTransactions);
app.post("/transactions", addTransaction);
app.put("/transactions/:id", updateTransaction);

await connectWithDB();
app.listen(port, () => {
  console.log(`🚀 Server is running on: http://localhost:${port}/`);
});
