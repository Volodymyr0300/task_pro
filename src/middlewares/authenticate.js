import jwt from "jsonwebtoken";
import { User } from "../schema/user.schema.js";
import "dotenv/config";

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");
};
