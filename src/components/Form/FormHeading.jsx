import React from "react";

const FormHeading = ({ text, subText }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl text-primary font-bold">{text}</h2>
      <p className="text-sm">{subText}</p>
    </div>
  );
};

export default FormHeading;
