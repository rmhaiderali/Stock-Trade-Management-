import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import format from "../utils/formatResponse.js";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export default async function validateUser(req, res) {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json(format([false, "Authentication required"]));

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const userId = decoded.id;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json(format([false, "User not found"]));

    return res.json(
      format([
        true,
        "User is signed in",
        { name: user.name, email: user.email },
      ])
    );
  } catch (error) {
    return res.status(401).json(format([false, "Invalid token"]));
  }
}
