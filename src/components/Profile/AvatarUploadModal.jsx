import React, { useRef, useEffect } from "react";
import { IoCloudUpload } from "react-icons/io5";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormHeading from "../../components/Form/FormHeading";
import FormControl from "../../components/Form/FormControl";
import FormButton from "../../components/Form/FormButton";
import { useAvatarUploadMutation } from "../../features/user/userApi";

const AvatarUploadModal = () => {
  const ref = useRef(null);

  const closeModal = () => {
    ref.current.click();
  };

  const schema = yup
    .object({
      avatar: yup
        .mixed()
        .test("required", "You need to provide a file", (file) => {
          if (file.length > 0) return true;
          return false;
        })
        .test("fileSize", "The file is to large", (file) => {
          return file.length > 0 && file[0].size <= 10000000; // 10MB
        })
        .test("fileType", "File only contain image", (file) => {
          return (
            file.length > 0 &&
            ["image/jpeg", "image/png"].includes(file[0].type)
          );
        }),
    })
    .required();

  const methods = useForm({ resolver: yupResolver(schema) });

  const [avatarUpload, { isLoading, isSuccess, error }] =
    useAvatarUploadMutation();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    avatarUpload(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      methods.setValue("avatar", { File: {} });
      closeModal();
    }
    if (error?.data) {
      methods.setError("avatar", { message: error.data.message });
    }
    if (error?.data?.errors) {
      const errors = error.data.errors;
      for (let error in errors) {
        methods.setError(error, { message: errors[error].msg });
      }
    }
  }, [isSuccess, error,methods]);

  return (
    <div>
      <label
        ref={ref}
        htmlFor="avatar-upload-modal"
        className="absolute bottom-0 right-6 h-6 w-6 p-1 text-primary bg-base-100 ring-4 ring-primary rounded-full cursor-pointer"
      >
        <IoCloudUpload />
      </label>

      <input
        type="checkbox"
        id="avatar-upload-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-12/12 md:w-5/12 max-w-5xl">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <FormHeading text="Upload Avatar" subText="It's easy & free" />

              <FormControl
                control="file"
                label="Select your file"
                name="avatar"
              />

              <FormButton text="Upload" disabled={isLoading} />
            </form>
          </FormProvider>

          <div className="modal-action">
            <label
              htmlFor="avatar-upload-modal"
              className="btn btn-sm btn-error"
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarUploadModal;
