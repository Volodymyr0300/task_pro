import { Schema, model } from "mongoose";
import { handleValidateError, runUpdateValidators } from "./hooks.js";

export const emailRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: emailRegexp },
    password: { type: String, required: true },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleValidateError);

userSchema.pre("findOneAndUpdate", runUpdateValidators);

userSchema.post("findOneAndUpdate", handleValidateError);

const User = model("user", userSchema);
export default User;
