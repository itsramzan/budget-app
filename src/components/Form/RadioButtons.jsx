import React from "react";
import Label from "./Label";
import Error from "./Error";
import { nanoid } from "nanoid";

const RadioButtons = (props) => {
  const { name, label, options, register, errors, ...rest } = props;

  return (
    <div className="w-full flex flex-col gap-2">
      <Label {...{ name, label }} />

      <div className="flex items-center gap-4">
        {options.map((option) => {
          const uniqueId = `${option}-${nanoid()}`;

          return (
            <div key={option} className="flex items-center gap-2">
              <input
                id={uniqueId}
                type="radio"
                {...register(name)}
                {...rest}
                value={option}
                className="radio radio-xs radio-primary"
              />
              <label htmlFor={uniqueId} className="text-sm cursor-pointer">
                {option}
              </label>
            </div>
          );
        })}
      </div>

      <Error error={errors[name]?.message} />
    </div>
  );
};

export default RadioButtons;
