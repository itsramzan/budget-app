import React from "react";

const Label = ({ name, label }) => {
  return (
    <label htmlFor={name} className="text-sm font-semibold">
      {label}
    </label>
  );
};

export default Label;
