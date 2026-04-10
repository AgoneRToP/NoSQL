import Joi from "joi"

export const RegisterSchema = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number().integer().min(16).required(),
    username: Joi.string().min(5).required(),
    password: Joi.string().alphanum().min(6).required(),
    role: Joi.string().valid("USER", "VIEWER").default("USER"),
}).required()