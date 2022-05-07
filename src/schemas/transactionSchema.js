import Joi from "joi";

const transactionSchema = Joi.object({
  amount: Joi.number()
    .precision(2)
    .positive()
    .required("Must be a positive number with two decimal places."),
  description: Joi.string().required("please, add a valid description."),
  type: Joi.string().valid("in", "out").required('Must be "in" or "out".'),
});

export { transactionSchema };
