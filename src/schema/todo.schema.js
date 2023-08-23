import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    priority: {
      type: String,
      enum: ["Low", "Medium", "Without", "High"],
      default: "Without",
    },
    deadLine: { type: Date, required: true },
    status: {
      type: String,
      enum: ["To Do", "In progress", "Done"],
      default: "To Do",
      required: true,
    },
  },
  { versionKey: false }
);

export const ToDo = model("todo", todoSchema);
