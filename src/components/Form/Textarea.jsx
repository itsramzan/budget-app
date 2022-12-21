import React from "react";
import Label from "./Label";
import Error from "./Error";
import { nanoid } from "nanoid";

const Textarea = (props) => {
  const { name, label, register, errors, ...rest } = props;

  const uniqueId = `${name}-${nanoid()}`;

  return (
    <div className="w-full flex flex-col gap-2">
      <Label {...{ name: uniqueId, label }} />

      <textarea
        id={uniqueId}
        spellCheck="false"
        placeholder={label}
        {...register(name)}
        {...rest}
        className="textarea textarea-primary w-full"
      ></textarea>

      <Error error={errors[name]?.message} />
    </div>
  );
};

export default Textarea;
