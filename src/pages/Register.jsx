import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormHeading from "../components/Form/FormHeading";
import FormControl from "../components/Form/FormControl";
import FormLink from "../components/Form/FormLink";
import FormButton from "../components/Form/FormButton";
import { useRegisterMutation } from "../features/auth/authApi";
import { motion } from "framer-motion";

const Register = () => {
  const schema = yup
    .object({
      username: yup
        .string()
        .required("Username required")
        .min(5, "Username minimum length 5")
        .max(15, "Username maximum length 15"),
      email: yup
        .string()
        .required("Email required")
        .email("Invalid email address"),
      password: yup
        .string()
        .required("Password required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    })
    .required();

  const methods = useForm({ resolver: yupResolver(schema) });

  const [register, { isLoading, isSuccess, error }] = useRegisterMutation();

  const onSubmit = (data) => {
    register(data);
  };

  useEffect(() => {
    if (isSuccess) {
      methods.reset();
    }
    if (error?.data?.errors) {
      const errors = error.data.errors;
      for (let error in errors) {
        methods.setError(error, { message: errors[error].msg });
      }
    }
  }, [isSuccess, error, methods]);

  return (
    <div className="h-full flex justify-center items-center">
      <FormProvider {...methods}>
        <motion.form
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full md:w-4/12 p-4 rounded-md border-8 border-primary space-y-4"
        >
          <FormHeading text="Register Form" subText="It's easy & free" />
          <FormControl
            control="input"
            label="Enter your username"
            type="text"
            name="username"
          />
          <FormControl
            control="input"
            label="Enter your email"
            type="email"
            name="email"
          />
          <FormControl
            control="password"
            label="Enter your password"
            name="password"
          />
          <FormLink to="/login" text="Already have an account?" />
          <FormButton text="Register" disabled={isLoading} />
        </motion.form>
      </FormProvider>
    </div>
  );
};

export default Register;
