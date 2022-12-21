import React, { useRef, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoAddSharp } from "react-icons/io5";
import FormHeading from "../Form/FormHeading";
import FormControl from "../Form/FormControl";
import FormButton from "../Form/FormButton";
import { useAddBudgetMutation } from "../../features/budget/budgetApi";

const AddBudgetModal = () => {
  const ref = useRef(null);

  const closeModal = () => {
    ref.current.click();
  };

  const schema = yup
    .object({
      title: yup.string().required("Budget title required"),
      type: yup.string().required("Budget type required").nullable(),
      amount: yup
        .number()
        .required("Budget amount required")
        .typeError("Budget amount must be a number"),
    })
    .required();

  const methods = useForm({ resolver: yupResolver(schema) });

  const [addBudget, { isLoading, isSuccess, error }] = useAddBudgetMutation();

  const onSubmit = (data) => {
    addBudget(data);
  };

  useEffect(() => {
    if (isSuccess) {
      methods.reset();
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
        htmlFor="add-budget-modal"
        className="btn btn-sm btn-primary"
      >
        <IoAddSharp />
      </label>

      <input type="checkbox" id="add-budget-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-12/12 md:w-4/12 max-w-5xl">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <FormHeading text="Add Budget Form" subText="It's easy & free" />

              <FormControl
                control="input"
                label="Enter budget title"
                type="text"
                name="title"
              />
              <FormControl
                control="radio"
                label="Select budget type"
                name="type"
                options={["income", "expense"]}
              />
              <FormControl
                control="input"
                label="Enter budget amount"
                type="number"
                name="amount"
              />
              <FormButton text="Add Budget" disabled={isLoading} />
            </form>
          </FormProvider>

          <div className="modal-action">
            <label htmlFor="add-budget-modal" className="btn btn-sm btn-error">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBudgetModal;
