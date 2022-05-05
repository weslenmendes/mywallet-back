import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { db } from "../config/db.js";

import { signInSchema, signUpSchema } from "../models/authSchema.js";

export async function signIn(req, res) {
  const { error } = signInSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const allMessagesOfError = error.details.map(({ message }) => message);
    return res.status(422).send(allMessagesOfError);
  }

  try {
    const { email, password } = req.body;
    const user = await db.collection("users").findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const { token } = await db
        .collection("sessions")
        .findOne({ userId: user._id });

      if (token) return res.send({ token, name: user.name });

      const newToken = uuidv4();
      await db
        .collection("sessions")
        .insertOne({ token: newToken, userId: user._id });

      res.send({ token: newToken, name: user.name });
    } else {
      res.status(401).send("Invalid email or password.");
    }
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
}

export async function signUp(req, res) {
  const { error } = signUpSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const allMessagesOfError = error.details.map(({ message }) => message);
    return res.status(422).send(allMessagesOfError);
  }

  try {
    const { name, email, password } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    const userExists = await db.collection("users").findOne({ email });

    if (userExists) {
      return res.status(422).send("This email is already being used.");
    }

    await db
      .collection("users")
      .insertOne({ name, email, password: encryptedPassword });

    res.sendStatus(201);
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
}

export async function signOut(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();

  if (!token) return res.status(401).send("Unauthorized");

  try {
    await db.collection("sessions").deleteOne({ token });
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
}
