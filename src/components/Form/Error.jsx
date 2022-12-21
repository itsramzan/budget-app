import React from "react";

const Error = ({ error }) => {
  return error && <p className="text-xs text-error font-semibold">{error}</p>;
};

export default Error;
