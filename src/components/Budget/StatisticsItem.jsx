import React from "react";

const StatisticsItem = ({ title, amount, className }) => {
  return (
    <div className={`${className} p-2 rounded-md space-y-1 flex-grow`}>
      <p className="text-base-300 font-semibold">{title}</p>
      <p className="text-base-300 font-semibold">{amount}</p>
    </div>
  );
};

export default StatisticsItem;
