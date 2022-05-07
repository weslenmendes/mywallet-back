import Joi from "joi";

const regexPassword = new RegExp("^[0-9a-zA-Z$*&@#.]{8,30}$");

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const signUpSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(regexPassword).required(),
});

export { signInSchema, signUpSchema };
