import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "/default_profile.jpg",
  },
  isPlaidLinked: {
    type: Boolean,
    default: false,
  },
  plaidAccessToken: {
    type: String,
    default: null,
  },
});

delete mongoose.connection.models["User"];

export default mongoose.model("User", userSchema);
