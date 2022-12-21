// Import essential modules
import uploader from "../config/uploader.js";

const avatarUpload = uploader(
  "avatars",
  ["image/jpeg", "image/jpg", "image/png"],
  10000000,
  "Only .jpeg .jpg & .png file are allowed"
);

export default avatarUpload;
