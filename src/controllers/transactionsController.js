import dayjs from "dayjs";
import { ObjectId } from "mongodb";

import { db } from "../config/db.js";

export async function getTransactions(req, res) {
  try {
    const { _id } = res.locals.user;

    const transactions = await db
      .collection("transactions")
      .find({ userId: new ObjectId(_id) })
      .toArray();

    res.send(transactions);
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
}

export async function getTransaction(req, res) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return res.status(422).send("This id is invalid.");

  try {
    const { _id } = res.locals.user;

    const transaction = await db.collection("transactions").findOne({
      $and: [{ _id: new ObjectId(id) }, { userId: new ObjectId(_id) }],
    });

    if (!transaction) return res.status(404).send("Transaction not found.");

    res.send(transaction);
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
}

export async function addTransaction(req, res) {
  try {
    const { _id } = res.locals.user;
    const body = {
      ...req.body,
      amount: parseFloat(req.body.amount.toFixed(2)),
    };

    await db.collection("transactions").insertOne({
      ...body,
      userId: new ObjectId(_id),
      date: dayjs().format("DD/MM"),
    });
    res.send("Transaction created.");
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
}

export async function updateTransaction(req, res) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return res.status(422).send("This id is invalid.");

  try {
    const { _id } = res.locals.user;

    const transaction = await db.collection("transactions").findOne({
      $and: [{ _id: new ObjectId(id) }, { userId: new ObjectId(_id) }],
    });

    if (!transaction) return res.status(404).send("Transaction not found.");

    const body = {
      ...req.body,
      amount: parseFloat(req.body.amount.toFixed(2)),
    };

    await db.collection("transactions").updateOne(
      {
        $and: [{ _id: new ObjectId(id) }, { userId: new ObjectId(_id) }],
      },
      { $set: { ...body } }
    );
    res.send("Transaction updated.");
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
}

export async function deleteTransaction(req, res) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return res.status(422).send("This id is invalid.");

  try {
    const { _id } = res.locals.user;

    const transaction = await db.collection("transactions").findOne({
      $and: [{ _id: new ObjectId(id) }, { userId: new ObjectId(_id) }],
    });

    if (!transaction) return res.status(404).send("Transaction not found.");

    await db.collection("transactions").deleteOne({
      $and: [{ _id: new ObjectId(id) }, { userId: new ObjectId(_id) }],
    });
    res.send("Transaction deleted.");
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
}
