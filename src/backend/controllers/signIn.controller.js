import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import format from "../utils/formatResponse.js";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export default async function signIn(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json(format(false, "All fields are required"));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json(format(false, "Invalid email or password"));
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json(format(false, "Invalid email or password"));
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
    expiresIn: "12h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000 * 12, // 12 hours
  });

  return res
    .status(200)
    .json(
      format(true, "User signed in successfully", {
        name: user.name,
        email: user.email,
      })
    );
}
