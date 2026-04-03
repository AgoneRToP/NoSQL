import Joi from "joi";
import { isObjectIdOrHexString } from "mongoose";

const validateObjectId = (value, helpers) => {
  if (!isObjectIdOrHexString(value)) {
    return helpers.message({
      custom: "Field must be valid ObjectId.",
    });
  }
  return value;
};

export const CreateBookSchema = Joi.object({
  title: Joi.string().min(6).required(),
  description: Joi.string().min(10).required(),
  author: Joi.string().min(4).required(),
  price: Joi.number().min(10000).max(200000),
  total_pages: Joi.number().min(10).max(1000).required(),
  quantity: Joi.number().min(1).max(500),
  rating: Joi.number().min(1).max(5).messages({
    "number.min": "Rating eng kamida 1 bo'lishi kerak",
    "number.max": "Rating ko'pi bilan 5 bo'lishi mumkin",
    "any.required": "Rating field qiymati berilishi shart",
  }),
  category: Joi.string().custom(validateObjectId).required(),
}).required();
