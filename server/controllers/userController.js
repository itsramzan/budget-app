// Import User model
import User from "../models/userModel.js";

// User profile
export const profile = async (req, res, next) => {
  try {
    const result = await User.findById(
      { _id: req.payload._id },
      "-password"
    ).populate("budgets");

    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

// Avatar upload
export const avatarUpload = async (req, res, next) => {
  try {
    const avatarUrl = req?.file?.path;

    if (!avatarUrl)
      return res.status(400).json({
        message: "Upload failed!",
      });

    const result = await User.findOneAndUpdate(
      { _id: req.payload._id },
      { $set: { avatarUrl } },
      { new: true, projection: "-password" }
    ).populate("budgets");

    res.status(201).json({
      message: "Avatar upload successfull!",
      result,
    });
  } catch (err) {
    next(err);
  }
};

// Update details
export const updateDetails = async (req, res, next) => {
  try {
    const { bio, dateOfBirth, gender, address, mobile } = req.body;

    const data = { bio, dateOfBirth, gender, address, mobile };

    const result = await User.findOneAndUpdate(
      { _id: req.payload._id },
      { $set: data },
      { new: true, projection: "-password" }
    ).populate("budgets");

    res.status(201).json({ message: "Details update successfull!", result });
  } catch (err) {
    next(err);
  }
};
