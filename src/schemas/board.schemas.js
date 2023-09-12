import coreJoi from "joi";
import joiDate from "@joi/date";
import { iconsEnum, backgroundEnum } from "../models/board.model.js";
const joi = coreJoi.extend(joiDate);

export const addBoardSchema = joi.object({
  name: joi.string().required("Name required"),
  icon: joi
    .string()
    .valid(...iconsEnum)
    .required("Icon required"),
  background: joi.string().valid(...backgroundEnum),
});
