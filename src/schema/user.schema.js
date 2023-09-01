import { Schema, model } from "mongoose";

export const emailRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: emailRegexp },
    password: { type: String, required: true },
    token: String,
  },
  { versionKey: false }
);

export const User = model("user", userSchema);
