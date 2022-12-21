import React from "react";

const Item = ({ Icon, text, value }) => {
  return (
    <div className="space-y-2 bg-base-300 p-4 rounded-md">
      <div className="flex items-center gap-2">
        <Icon className="text-primary" />
        <p className="text-primary font-semibold">{text}</p>
      </div>
      <p className="capitalize">
        {value ? value : "Not available"}
      </p>
    </div>
  );
};

export default Item;
