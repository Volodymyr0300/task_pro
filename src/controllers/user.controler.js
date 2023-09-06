import { User } from "../schema/user.schema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const { SECRET_KEY } = process.env;

export const register = async (req, res) => {
  let { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(404).send("user already exist");
  }
  const hashPassword = await bcryptjs.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).send(newUser);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).send("email or password is wrong");
  }

  const passwordCompare = await bcryptjs.compare(password, user.password);

  if (!passwordCompare) {
    res.status(401).send("email or password isn't valid");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token });
};

export const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });

  res.send("logout success");
};
