import Joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { db } from "../config/db.js";

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const signUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

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

      if (token) return res.send(token);

      const newToken = uuidv4();
      await db
        .collection("sessions")
        .insertOne({ token: newToken, userId: user._id });

      res.send(newToken);
    } else {
      res.status(404).send("User not found!");
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
