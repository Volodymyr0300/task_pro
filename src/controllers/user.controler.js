import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const { SECRET_KEY } = process.env;

export const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).send("user already exist");
  }
  const hashPassword = await bcryptjs.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({ name: newUser.name, email: newUser.email });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).send("email is wrong");
  }

  const passwordCompare = await bcryptjs.compare(password, user.password);

  if (!passwordCompare) {
    return res.status(401).send("password is wrong");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token, name: user.name });
};

export const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.send("logout success");
};
