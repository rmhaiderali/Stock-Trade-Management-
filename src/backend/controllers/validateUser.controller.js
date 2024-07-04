import format from "../utils/formatResponse.js";

export default async function validateUser(req, res) {
  const resUser = req.user.toObject();
  delete resUser.password;
  delete resUser.plaidAccessToken;

  return res.json(format(true, "User is signed in", resUser));
}
