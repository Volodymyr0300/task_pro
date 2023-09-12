import coreJoi from "joi";
import joiDate from "@joi/date";
import { emailRegexp } from "../models/user.model.js";
const joi = coreJoi.extend(joiDate);

export const registerSchema = joi.object({
  name: joi.string().required("Name required"),
  email: joi
    .string()
    .pattern(emailRegexp)
    .required("Email required")
    .messages({ "string.pattern.base": "Email should be valid." }),
  password: joi.string().min(6).required("Password required"),
});

export const loginSchema = joi.object({
  email: joi.string().pattern(emailRegexp).required(),
  password: joi.string().min(6).required(),
});
