import "dotenv/config";
import express, { json } from "express";
import cors from "cors";

import { connectWithDB } from "./config/db.js";
import { signIn, signUp } from "./controllers/authController.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(json());

app.post("/sign-in", signIn);
app.post("/sign-up", signUp);

await connectWithDB();
app.listen(port, () => {
  console.log(`🚀 Server is running on: http://localhost:${port}/`);
});
