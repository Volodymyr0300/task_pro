import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    table: { type: String, required: true },
    priority: {
      type: String,
      enum: ["Low", "Medium", "Without", "High"],
      default: "Without",
    },
    deadLine: { type: Date },
    status: {
      type: String,
      enum: ["To Do", "In progress", "Done"],
      default: "To Do",
    },
    userId: { type: String, required: true, ref: "user" },
  },
  { versionKey: false }
);

export const ToDo = model("todo", todoSchema);
