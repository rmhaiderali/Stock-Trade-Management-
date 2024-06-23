import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import format from "../utils/formatResponse.js";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export default async function changeName(req, res) {
  const { token } = req.cookies;
  const { newName } = req.body;

  if (!token)
    return res.status(401).json(format(false, "Authentication required"));

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const userId = decoded.id;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json(format(false, "User not found"));

    user.name = newName;
    await user.save();

    return res.json(format(true, "Name updated successfully"));
  } catch (error) {
    return res.status(401).json(format(false, "Invalid token"));
  }
}
