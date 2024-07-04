import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import format from "../utils/formatResponse.js";

export default async function (req, res, next) {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json(format(false, "Authentication required"));

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decoded.id);

  if (!user) return res.status(404).json(format(false, "User not found"));

  req.user = user;

  next();
}
