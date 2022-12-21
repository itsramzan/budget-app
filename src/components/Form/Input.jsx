import React from "react";
import Label from "./Label";
import Error from "./Error";
import { nanoid } from "nanoid";

const Input = (props) => {
  const { name, label, type, register, errors, ...rest } = props;

  const uniqueId = `${name}-${nanoid()}`;

  return (
    <div className="w-full flex flex-col gap-2">
      <Label {...{ name: uniqueId, label }} />

      <input
        id={uniqueId}
        type={type}
        spellCheck="false"
        placeholder={label}
        {...register(name)}
        {...rest}
        className="input input-sm input-bordered input-primary w-full"
      />

      <Error error={errors[name]?.message} />
    </div>
  );
};

export default Input;
