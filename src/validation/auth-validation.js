import Joi from "joi"

const registerValidation = Joi.object({
  username: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().max(100).required()
})

const loginValidation = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().max(100).required()
})

export {
  registerValidation,
  loginValidation
}