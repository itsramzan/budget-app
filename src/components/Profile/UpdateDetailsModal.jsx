import React, { useRef, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from "moment/moment";
import { IoPencilSharp } from "react-icons/io5";
import FormHeading from "../../components/Form/FormHeading";
import FormControl from "../../components/Form/FormControl";
import FormButton from "../../components/Form/FormButton";
import { useUpdateDetailsMutation } from "../../features/user/userApi";

const UpdateDetailsModal = ({ data }) => {
  const ref = useRef(null);

  const closeModal = () => {
    ref.current.click();
  };

  const schema = yup
    .object({
      bio: yup.string().required("Bio required"),
      mobile: yup
        .string()
        .matches(/^(?:(?:\+|00)88|01)?\d{11}$/g, "Phone number is not valid")
        .required("Mobile number required")
        .nullable(),
      dateOfBirth: yup
        .date()
        .typeError("Invalid date")
        .test(
          "Is date greater",
          "DOB can't be greater than today's date",
          (value) => {
            if (!value) return true;
            return moment().diff(value) > 0;
          }
        ),
      gender: yup.string().required("Gender required").nullable(),
      address: yup.string().required("Address required").nullable(),
    })
    .required();

  const methods = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const { bio, mobile, dateOfBirth, gender, address } = data;
    const fields = { bio, mobile, dateOfBirth, gender, address };

    for (let field in fields) {
      if (field === "dateOfBirth") {
        methods.setValue(field, moment(fields[field]).format("YYYY-MM-DD"));
      } else {
        methods.setValue(field, fields[field]);
      }
    }
  }, [data, methods]);

  const [updateDetails, { isLoading, isSuccess, error }] =
    useUpdateDetailsMutation();

  const onSubmit = (data) => {
    updateDetails(data);
  };

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
    if (error?.data?.errors) {
      const errors = error.data.errors;
      for (let error in errors) {
        methods.setError(error, { message: errors[error].msg });
      }
    }
  }, [isSuccess, error, methods]);

  return (
    <div>
      <label
        ref={ref}
        htmlFor="update-details-modal"
        className="btn btn-sm btn-primary"
      >
        <IoPencilSharp />
      </label>

      <input
        type="checkbox"
        id="update-details-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-12/12 md:w-6/12 max-w-5xl">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <FormHeading text="Update Form" subText="It's easy & free" />
              <div className="flex flex-col md:flex-row gap-4">
                <FormControl
                  control="input"
                  label="Enter your bio"
                  type="text"
                  name="bio"
                />
                <FormControl
                  control="input"
                  label="Enter your mobile number"
                  type="text"
                  name="mobile"
                />
              </div>
              <FormControl
                control="input"
                label="Enter your date of birth"
                type="date"
                name="dateOfBirth"
              />
              <FormControl
                control="radio"
                label="Select your gender"
                name="gender"
                options={["male", "female"]}
              />
              <FormControl
                control="textarea"
                label="Enter your address"
                name="address"
              />
              <FormButton text="Update" disabled={isLoading} />
            </form>
          </FormProvider>

          <div className="modal-action">
            <label
              htmlFor="update-details-modal"
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

export default UpdateDetailsModal;
