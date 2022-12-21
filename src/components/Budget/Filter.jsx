import React from "react";

const Filter = ({ filter, setFilter }) => {
  return (
    <div className="flex items-center gap-4">
      <label htmlFor="all" className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          id="all"
          checked={filter === ""}
          onChange={() => setFilter("")}
          className="checkbox checkbox-primary checkbox-xs"
        />{" "}
        All
      </label>

      <label
        htmlFor="income"
        className="flex items-center gap-2 cursor-pointer"
      >
        <input
          type="checkbox"
          id="income"
          checked={filter === "income"}
          onChange={() => setFilter("income")}
          className="checkbox checkbox-primary checkbox-xs"
        />{" "}
        Income
      </label>

      <label
        htmlFor="expense"
        className="flex items-center gap-2 cursor-pointer"
      >
        <input
          type="checkbox"
          id="expense"
          checked={filter === "expense"}
          onChange={() => setFilter("expense")}
          className="checkbox checkbox-primary checkbox-xs"
        />{" "}
        Expense
      </label>
    </div>
  );
};

export default Filter;
