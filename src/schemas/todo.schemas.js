import coreJoi from "joi";
import joiDate from "@joi/date";
import { priorityEnum, statusEnum } from "../models/todo.model.js";
const joi = coreJoi.extend(joiDate);

export const addTodoSchema = joi.object({
  title: joi.string().required("Title required"),
  content: joi.string().required("Content required"),
  board: joi.string().required("Board id required"),
  priority: joi.string().valid(...priorityEnum),
  deadLine: joi.date(),
  status: joi.string().valid(...statusEnum),
});
