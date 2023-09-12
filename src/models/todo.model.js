import { Schema, model } from "mongoose";
import { handleValidateError, runUpdateValidators } from "./hooks.js";

export const priorityEnum = ["Without", "Low", "Medium", "High"];
export const statusEnum = ["To Do", "In progress", "Done"];

export const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    board: { type: Schema.Types.ObjectId, ref: "board", required: true },
    priority: {
      type: String,
      enum: priorityEnum,
      default: priorityEnum[0],
    },
    deadLine: { type: Date },
    status: {
      type: String,
      enum: statusEnum,
      default: statusEnum[0],
    },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  },
  { versionKey: false, timestamps: true }
);

todoSchema.post("save", handleValidateError);

todoSchema.pre("findOneAndUpdate", runUpdateValidators);

todoSchema.post("findOneAndUpdate", handleValidateError);

const ToDo = model("todo", todoSchema);
export default ToDo;
