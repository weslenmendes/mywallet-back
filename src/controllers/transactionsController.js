import { ObjectId } from "mongodb";
import { db } from "../config/db.js";

async function isActiveSession(token) {
  const session = await db.collection("sessions").findOne({ token });

  if (!session) return false;

  const user = await db.collection("users").findOne({ _id: session.userId });

  if (!user) return false;

  return session;
}

export async function getTransactions(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();

  if (!token) return res.status(401).send("Unauthorized");

  try {
    const session = await isActiveSession(token);
    if (!session) return res.status(401).send("Unauthorized");

    const transactions = await db
      .collection("transactions")
      .find({ userId: new ObjectId(session.userId) })
      .toArray();

    res.send(transactions);
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
}

export async function getTransaction(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();

  if (!token) return res.status(401).send("Unauthorized");

  try {
    const session = await isActiveSession(token);
    if (!session) return res.status(401).send("Unauthorized");

    const { id } = req.params;

    const transaction = await db.collection("transactions").findOne({
      $and: [
        { _id: new ObjectId(id) },
        { userId: new ObjectId(session.userId) },
      ],
    });

    if (!transaction) return res.status(404).send("Transaction not found");

    res.send(transaction);
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
}
