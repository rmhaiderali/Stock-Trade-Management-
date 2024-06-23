import format from "../utils/formatResponse.js";

export default function signOut(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.json(format(true, "User logged out successfully"));
}
