import { signUpSchema } from "../schemas/authSchema.js";

export default function signupValidationMiddleware(req, res, next) {
  const { error } = signUpSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const allMessagesOfError = error.details
      .map(({ message }) => message)
      .join(", ");
    return res.status(422).send(allMessagesOfError);
  }

  next();
}
