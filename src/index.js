import "dotenv/config";
import express, { json } from "express";
import cors from "cors";

import { connectWithDB } from "./config/db.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(json());

await connectWithDB();
app.listen(port, () => {
  console.log(`🚀 Server is running on: http://localhost:${port}/`);
});
