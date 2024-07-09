import format from "../utils/formatResponse.js";

export default async function changeName(req, res) {
  const { name, email } = req.body;

  if (req.file) {
    // max 5MB
    if (req.file.size > 5 * 1024 * 1024)
      return res
        .status(400)
        .json(format(false, "Profile picture size should be less than 5MB"));

    const base64Image = req.file.buffer.toString("base64");

    const mimeType = req.file.mimetype;

    req.user.profilePicture = `data:${mimeType};base64,${base64Image}`;
  }

  if (name) {
    req.user.name = name;
  }

  if (email) {
    if (!email.match(/.+@.+\..+/))
      return res.status(400).json(format(false, "Provided email is not valid"));
    req.user.email = email;
  }

  await req.user.save();

  const resUser = req.user.toObject();
  delete resUser.password;
  delete resUser.plaidAccessToken;

  return res.json(format(true, "Profile updated successfully", resUser));
}
