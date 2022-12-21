// Import essential modules
import express from "express";

// Import checkAuth middleware
import checkAuth from "../middlewares/checkAuth.js";

// Import from urlValidator
import {
  budgetValidation,
  handleBudgetValidation,
} from "../middlewares/budget/budgetValidator.js";

// Import from urlController
import {
  addBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
} from "../controllers/budgetController.js";

// Initialize router
const router = express.Router();

// Use checkAuth middleware
router.use(checkAuth);

// Add budget
router.post("/add", budgetValidation, handleBudgetValidation, addBudget);

// Get all budgets
router.get("/", getBudgets);

// Update budget
router.patch("/:id", budgetValidation, handleBudgetValidation, updateBudget);

// Delete budget
router.delete("/:id", deleteBudget);

// Export router
export default router;
