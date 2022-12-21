import React, { useEffect, useState, useCallback } from "react";
import Label from "./Label";
import Error from "./Error";
import { useFormContext } from "react-hook-form";
import { IoCloudUploadOutline, IoDocumentAttachOutline } from "react-icons/io5";
import { nanoid } from "nanoid";
import { useDropzone } from "react-dropzone";

const File = (props) => {
  const { name, label, register, errors, ...rest } = props;

  const uniqueId = `${name}-${nanoid()}`;

  const [file, setFile] = useState(null);

  const { watch, setValue, setError } = useFormContext();

  // Drag and drop functionality
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setValue(name, acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const watchName = watch(name);

  useEffect(() => {
    if (watch(name) && watch(name).length > 0) {
      setFile(watch(name)[0]);
    } else {
      setFile(null);
    }
  }, [watchName, watch, name]);

  useEffect(() => {
    if (!file) {
      setValue(name, { File: {} });
      setError(name, { message: "" });
    }
  }, [file, name, setValue, setError]);

  const handleCancel = (e) => {
    e.preventDefault();
    setFile(null);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <Label {...{ name: uniqueId, label }} />

      <div className="flex justify-center items-center w-full">
        {file && (
          <div className="flex flex-col justify-center items-center w-full h-64 bg-base-100 rounded-lg border-2 border-primary border-dashed cursor-pointer">
            <div className="flex flex-col items-center gap-2">
              {["image/jpeg", "image/png"].includes(file.type) ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt=""
                  className="h-32 w-32 object-cover rounded-full"
                />
              ) : (
                <IoDocumentAttachOutline className="text-6xl text-center" />
              )}
              <p className="text-sm text-primary font-semibold">{file?.name}</p>
              <button onClick={handleCancel} className="btn btn-xs btn-error">
                Cancel Upload
              </button>
            </div>
          </div>
        )}

        {!file && (
          <label
            htmlFor={uniqueId}
            {...getRootProps()}
            className={`flex flex-col justify-center items-center w-full h-64 bg-base-100 rounded-lg border-2 border-primary border-dashed cursor-pointer ${
              isDragActive && "bg-primary"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <IoCloudUploadOutline className="text-6xl text-center" />
              <p className="text-center">
                <span className="font-semibold">Upload file</span> or drag and
                drop here <br /> Max file size (10MB)
              </p>
            </div>
            <input
              id={uniqueId}
              type="file"
              {...register(name)}
              {...rest}
              {...getInputProps()}
              className="hidden"
            />
          </label>
        )}
      </div>

      <Error error={errors[name]?.message} />
    </div>
  );
};

export default File;
