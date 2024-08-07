import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import format from "../utils/formatResponse.js";

export default async function signUp(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json(format(false, "All fields are required"));
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json(format(false, "Email already in use"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashedPassword });

  await newUser.save();

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 8.64e7 * 30, // 30 days
  });

  const resUser = newUser.toObject();
  delete resUser.password;
  delete resUser.plaidAccessToken;

  return res.json(format(true, "User created successfully", resUser));
}
