import format from "../utils/formatResponse.js";

export default async function changeName(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json(format(false, "Name field is required"));
  }

  req.user.name = name;

  await req.user.save();

  return res.json(format(true, "Name updated successfully"));
}
