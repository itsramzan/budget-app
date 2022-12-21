import React from "react";
import { useFormContext } from "react-hook-form";
import Input from "./Input";
import Password from "./Password";
import Textarea from "./Textarea";
import Select from "./Select";
import RadioButtons from "./RadioButtons";
import CheckboxGroup from "./CheckboxGroup";
import File from "./File";

const FormControl = (props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { control, ...rest } = { ...props, register, errors };

  switch (control) {
    case "input":
      return <Input {...rest} />;

    case "password":
      return <Password {...rest} />;

    case "textarea":
      return <Textarea {...rest} />;

    case "select":
      return <Select {...rest} />;

    case "radio":
      return <RadioButtons {...rest} />;

    case "checkbox":
      return <CheckboxGroup {...rest} />;

    case "file":
      return <File {...rest} />;

    default:
      return null;
  }
};

export default FormControl;
