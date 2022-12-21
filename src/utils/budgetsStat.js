const budgetsStat = (budgets) => {
  const [totalIncome, totalExpense, totalSaving] = budgets.reduce(
    (acc, cur) => {
      if (cur.type === "income") {
        let income = acc[0] + cur.amount;
        let expense = acc[1];
        let saving = income - expense;
        return [income, expense, saving];
      }
      if (cur.type === "expense") {
        let income = acc[0];
        let expense = acc[1] + cur.amount;
        let saving = income - expense;
        return [income, expense, saving];
      }
      return null;
    },
    [0, 0, 0]
  );

  return { totalIncome, totalExpense, totalSaving };
};

export default budgetsStat;
