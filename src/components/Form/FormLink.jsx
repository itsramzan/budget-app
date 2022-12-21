import React from "react";
import { Link } from "react-router-dom";

const FormLink = ({ to, text }) => {
  return (
    <div>
      <Link to={to} className="text-sm text-primary font-semibold">{text}</Link>
    </div>
  );
};

export default FormLink;
