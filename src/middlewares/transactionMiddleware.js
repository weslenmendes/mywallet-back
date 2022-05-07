import { transactionSchema } from "../models/transactionSchema.js";

export function transactionValidationMiddleware(req, res, next) {
  const { error } = transactionSchema.validate(req.body, {
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
