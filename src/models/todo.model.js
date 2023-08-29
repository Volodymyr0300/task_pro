import coreJoi from "joi";
import joiDate from "@joi/date";
const joi = coreJoi.extend(joiDate);

export const todoSchema = joi.object({
  title: joi.string().required("Title required"),
  content: joi.string().required("Content required"),
  priority: joi.string().valid("Low", "Medium", "Without", "High"),
  deadLine: joi.date(),
  status: joi.string().valid("To Do", "In progress", "Done"),
});
