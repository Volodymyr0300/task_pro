import { Schema, model } from "mongoose";
import { handleValidateError, runUpdateValidators } from "./hooks.js";

export const backgroundEnum = ["mountain"];

export const iconsEnum = [
  "project",
  "star",
  "loading",
  "piece",
  "container",
  "loading",
  "colors",
  "hexagon",
];

const boardSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    icon: { type: String, enum: iconsEnum, required: true },
    background: {
      type: String,
      enum: backgroundEnum,
      default: backgroundEnum[0],
    },

    userId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  },
  { versionKey: false, timestamps: true }
);

boardSchema.post("save", handleValidateError);

boardSchema.pre("findOneAndUpdate", runUpdateValidators);

boardSchema.post("findOneAndUpdate", handleValidateError);

const Board = model("board", boardSchema);
export default Board;
