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
  plaidAccessToken: {
    type: String,
  },
  isPlaidLinked: {
    type: Boolean,
    default: false,
  },
});

delete mongoose.connection.models["User"];

export default mongoose.model("User", userSchema);
