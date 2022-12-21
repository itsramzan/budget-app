// Import essential modules
import { check, validationResult } from "express-validator";

// Import user model
import User from "../../models/userModel.js";

// Details validation middleware
export const detailsValidation = [
  check("bio", "Bio required")
    .not()
    .isEmpty()
    .isLength({ max: 50 })
    .withMessage("Bio can't be longer than 50 character"),
  check("dateOfBirth", "Date of Birth required").not().isEmpty(),
  check("gender", "Gender required")
    .not()
    .isEmpty()
    .isIn(["male", "female"])
    .withMessage("Not a valid gender type"),
  check("address", "Address required")
    .not()
    .isEmpty()
    .isLength({ max: 100 })
    .withMessage("Address can't be longer than 100 character"),
  check("mobile", "Mobile number required")
    .not()
    .isEmpty()
    .isMobilePhone("bn-BD")
    .withMessage("Not a valid mobile number"),
];

// Handle details validation middleware
export const handleDetailsValidation = async (req, res, next) => {
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
