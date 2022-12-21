import React from "react";
import AddBudgetModal from "../components/Budget/AddBudgetModal";
import List from "../components/Budget/List";
import Statistics from "../components/Budget/Statistics";

const Budget = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl text-primary font-semibold">
          Budgets List & Statistics
        </h3>
        <AddBudgetModal />
      </div>

      <div className="grid grid-cols-12 gap-4 items-start">
        <Statistics />
        <List />
      </div>
    </div>
  );
};

export default Budget;
