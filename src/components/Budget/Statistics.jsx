import React from "react";
import { useProfileQuery } from "../../features/user/userApi";
import budgetsStat from "../../utils/budgetsStat";
import Chart from "./Chart";
import StatisticsItem from "./StatisticsItem";

const Statistics = () => {
  const { isFetching, data, isError } = useProfileQuery();

  // Decide what to render
  let content = null;

  if (isFetching) content = <p>Loading...</p>;
  if (!isFetching && isError) content = <p>Something went wrong</p>;
  if (!isFetching && !isError && data?.result?.budgets?.length === 0)
    content = <p>No budgets found</p>;
  if (!isFetching && !isError && data?.result?.budgets?.length > 0) {
    const budgets = data.result.budgets;
    const { totalIncome, totalExpense, totalSaving } = budgetsStat(budgets);

    content = (
      <>
        <Chart {...{ totalIncome, totalExpense, totalSaving }} />
        <div className="flex flex-wrap items-start gap-4">
          <StatisticsItem
            title="Income"
            amount={totalIncome}
            className="bg-success"
          />
          <StatisticsItem
            title="Expense"
            amount={totalExpense}
            className="bg-error"
          />
          <StatisticsItem
            title="Saving"
            amount={totalSaving}
            className="bg-info"
          />
        </div>
      </>
    );
  }

  return (
    <div className="col-span-12 md:col-span-4 bg-base-300 p-4 rounded-md space-y-4">
      {content}
    </div>
  );
};

export default Statistics;
