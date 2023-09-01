import coreJoi from "joi";
import joiDate from "@joi/date";
import { emailRegexp } from "../schema/user.schema.js";
const joi = coreJoi.extend(joiDate);

export const userSchema = joi.object({
  name: joi.string().required("Name required"),
  email: joi
    .string()
    .pattern(emailRegexp)
    .required("Email required")
    .messages({ "string.pattern.base": "Email should be valid." }),
  password: joi.string().required("Password required"),
  token: joi.string(),
});

export const loginSchema = joi.object({
  email: joi.string().pattern(emailRegexp).required(),
  password: joi.string().min(6).required(),
});
