import { db } from "./../config/db.js";

export async function tokenValidationMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();

  if (!token) return res.status(401).send("Unauthorized");

  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) return res.status(404).send("This session does not exists.");

    const user = await db.collection("users").findOne({ _id: session.userId });
    if (!user) return res.status(404).send("This user does not exists.");

    delete user.password;

    res.locals.user = user;

    next();
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
}
