import Joi from "joi";

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^\S{6,20}$/)
    .required(),
});

const signUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^\S{6,20}$/)
    .required(),
});

export { signInSchema, signUpSchema };
