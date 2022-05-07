import { signInSchema } from "./../schemas/authSchema.js";

export default function signinValidationMiddleware(req, res, next) {
  const { error } = signInSchema.validate(req.body, {
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
