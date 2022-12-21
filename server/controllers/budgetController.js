// Import essential models
import User from "../models/userModel.js";
import Budget from "../models/budgetModel.js";

// Add budget
export const addBudget = async (req, res, next) => {
  try {
    const { title, type, amount } = req.body || {};
    const data = { title, type, amount };
    const { _id } = req.payload;
    const finalData = { ...data, user: _id };

    const newBudget = new Budget(finalData);
    const budget = await newBudget.save();

    const result = await budget.populate("user", "_id username email");

    await User.updateOne({ _id }, { $push: { budgets: result._id } });

    res.status(200).json({ message: "Budget successfully added", result });
  } catch (err) {
    next(err);
  }
};

// Get all budgets
export const getBudgets = async (req, res, next) => {
  try {
    const { page: pageStr, search, filter } = req.query || {};

    const page = parseInt(pageStr) || 1;
    const limit = parseInt(process.env.BUDGET_LIMIT);

    const findObj = {
      user: req.payload._id,
    };

    if (search) findObj.title = { $regex: search, $options: "i" };
    if (filter) findObj.type = filter;

    const results = await Budget.find(findObj)
      .populate("user", "_id username email")
      .skip(page * limit - limit)
      .limit(limit)
      .sort({ createdAt: "desc" });

    const items = await Budget.find(findObj).count();
    const pages = Math.ceil(items / limit);

    res.status(200).json({
      results,
      currentPage: page,
      totalPage: pages,
      totalItem: items,
    });
  } catch (err) {
    next(err);
  }
};

// Update budget
export const updateBudget = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await Budget.findOneAndUpdate(
      { _id: req.params.id, user: req.payload._id },
      { $set: data },
      { new: true }
    ).populate("user", "_id username email");

    res.status(201).json({ message: "Budget successfully updated", result });
  } catch (err) {
    next(err);
  }
};

// Delete budget
export const deleteBudget = async (req, res, next) => {
  try {
    const result = await Budget.findOneAndDelete({
      _id: req.params.id,
      user: req.payload._id,
    });

    if (result) {
      await User.updateOne(
        { _id: req.payload._id },
        { $pull: { budgets: result._id } }
      );

      res.status(201).json({ message: "Budget successfully deleted", result });
    } else {
      res.status(404).json({ message: "No budget found for delete" });
    }
  } catch (err) {
    next(err);
  }
};
