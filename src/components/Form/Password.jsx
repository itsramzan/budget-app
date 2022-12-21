import React, { useState } from "react";
import Label from "./Label";
import Error from "./Error";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { nanoid } from "nanoid";

const Password = (props) => {
  const { name, label, register, errors, ...rest } = props;

  const uniqueId = `${name}-${nanoid()}`;

  const [visibility, setVisibility] = useState(false);

  const handleVisivility = () => {
    setVisibility(!visibility);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <Label {...{ name: uniqueId, label }} />

      <div className="flex items-center gap-2">
        <input
          id={uniqueId}
          type={visibility ? "text" : "password"}
          spellCheck="false"
          placeholder={label}
          {...register(name)}
          {...rest}
          className="input input-sm input-bordered input-primary w-full"
        />
        {visibility ? (
          <IoEyeOutline
            onClick={handleVisivility}
            className="text-xl text-base-100 bg-primary h-8 w-8 p-2 rounded-md cursor-pointer"
          />
        ) : (
          <IoEyeOffOutline
            onClick={handleVisivility}
            className="text-xl text-base-100 bg-primary h-8 w-8 p-2 rounded-md cursor-pointer"
          />
        )}
      </div>

      <Error error={errors[name]?.message} />
    </div>
  );
};

export default Password;
