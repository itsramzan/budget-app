import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="col-span-12 h-16 flex items-center px-4 md:px-32">
      <p>
        Copyright ©{" "}
        <Link to="/" className="font-semibold text-primary">
          Budget App
        </Link>
      </p>
    </div>
  );
};

export default Footer;
