// Import essential modules
import express from "express";

// Import checkAuth middleware
import checkAuth from "../middlewares/checkAuth.js";

// Import avatarUploader
import upload from "../utils/avatarUpload.js";

// Import from detailsValidator
import {
  detailsValidation,
  handleDetailsValidation,
} from "../middlewares/user/detailsValidator.js";

// Import from userController
import {
  profile,
  avatarUpload,
  updateDetails,
} from "../controllers/userController.js";

// Initialize router
const router = express.Router();

// Use checkAuth middleware
router.use(checkAuth);

// User profile
router.get("/profile", profile);

// Avatar upload
router.patch("/avatarUpload", upload.single("avatar"), avatarUpload);

// Update details
router.patch(
  "/updateDetails",
  detailsValidation,
  handleDetailsValidation,
  updateDetails
);

// Export router
export default router;
