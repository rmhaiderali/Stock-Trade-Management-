import fs from "fs";
import format from "../utils/formatResponse.js";

export default async function changeName(req, res) {
  const { name, email } = req.body;

  if (req.file) {
    if (req.file.size > 5 * 1024 * 1024) {
      fs.unlinkSync(req.file.path);
      return res.json({
        success: false,
        messages: "File size must be less than 5MB",
      });
    }

    if (!["image/png", "image/jpeg"].includes(req.file.mimetype)) {
      fs.unlinkSync(req.file.path);
      return res.json({
        success: false,
        messages: "Only png and jpg images are allowed",
      });
    }

    const newFileName = Date.now() + "_" + req.file.originalname;

    fs.renameSync(req.file.path, "uploads/" + newFileName);

    req.user.profilePicture = newFileName;
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
