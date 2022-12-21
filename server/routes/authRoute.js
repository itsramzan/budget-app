// Import essential modules
import express from "express";

// Import from registerValidator
import {
  registerValidation,
  handleRegisterValidation,
} from "../middlewares/auth/registerValidator.js";

// Import from loginValidator
import {
  loginValidation,
  handleLoginValidation,
} from "../middlewares/auth/loginValidator.js";

// Import from authController
import { register, login, refresh } from "../controllers/authController.js";

// Initialize router
const router = express.Router();

// Register user
router.post(
  "/register",
  registerValidation,
  handleRegisterValidation,
  register
);

// Login user
router.post("/login", loginValidation, handleLoginValidation, login);

// Refresh token
router.post("/refresh", refresh);

// Export router
export default router;
