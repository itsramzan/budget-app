import React from "react";

const FormButton = ({ text, ...rest }) => {
  return (
    <button type="submit" {...rest} className="w-full btn btn-sm bg-primary">
      {text}
    </button>
  );
};

export default FormButton;
