// Import essential modules
import { check, oneOf, validationResult } from "express-validator";

// Budget validation middleware
export const budgetValidation = [
  check("title", "Budget title required").not().isEmpty(),
  check("type", "Budget type required").not().isEmpty(),
  oneOf(
    [check("type").equals("income"), check("type").equals("expense")],
    "Invalid budget type"
  ),
  check("amount", "Budget amount required")
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage("Amount must be valid number"),
];

// Handle budget validation middleware
export const handleBudgetValidation = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.entries(mappedErrors).length === 0) {
      next();
    } else {
      res.status(400).json({ errors: mappedErrors });
    }
  } catch (err) {
    next(err);
  }
};
