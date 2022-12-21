// Import essential modules
import mongoose from "mongoose";

// Initiate budgetSchema
const budgetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

// Initiate Budget model
const Budget = mongoose.model("budget", budgetSchema);

// Export Budget model
export default Budget;
