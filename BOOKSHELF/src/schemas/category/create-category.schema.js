import Joi from "joi";
import { isObjectIdOrHexString } from "mongoose";

const validateObjectId = (value, helpers) => {
  if (!isObjectIdOrHexString(value)) {
    return helpers.message({
      custom: "Field must be valid ObjectId",
    });
  }
  return value;
};

export const CreateCategorySchema = Joi.object({
  name: Joi.string().min(4).required(),
  books: Joi.array().items(Joi.string().custom(validateObjectId)),
}).required();
