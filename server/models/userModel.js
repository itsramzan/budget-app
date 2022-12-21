// Import essential modules
import mongoose from "mongoose";

// Initiate userSchema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    bio: {
      type: String,
      default: null,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      default: null,
      trim: true,
    },
    address: {
      type: String,
      default: null,
      trim: true,
    },
    mobile: {
      type: String,
      default: null,
      trim: true,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    budgets: [
      {
        type: mongoose.Types.ObjectId,
        ref: "budget",
      },
    ],
  },
  { timestamps: true }
);

// Initiate User model
const User = mongoose.model("user", userSchema);

// Export User Model
export default User;
