"use client";
import { Form } from "@repo/ui/components/form";
import { useForm } from "react-hook-form";

import { CustomFormField } from "@/components/forms/form-field";
import CustomButton from "@/components/custom-button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { signUp } from "@/lib/actions/auth";
import toast from "react-hot-toast";
import { TSignUp } from "@repo/ui/schemas/auth.schema";

type TModal = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const SignUpForm = ({ setOpen }: TModal) => {
  const [errors, setErrors] = useState({});
  const form = useForm<TSignUp>({
    defaultValues: {
      email: "",
      password: "",
      phone: "",
      firstName: "",
      lastName: "",
    },
  });

  useEffect(() => {
    if (errors) {
      Object.keys(errors).map((key) => {
        form.setError(key as keyof typeof errors, {
          type: "custom",
          message: errors[key as keyof typeof errors],
        });
      });
    }
  }, [errors]);

  const onSubmit = async (values: TSignUp) => {
    setErrors({});

    const response = await signUp(values);

    if (response?.errors) {
      setErrors(response.errors);
    }
    if (response?.message) {
      toast.error(response?.message);
    }

    if (response?.success) {
      form.reset();
      toast.success(response?.success);
      setOpen(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-2 gap-4">
          <CustomFormField
            apiKey="firstName"
            label="First Name"
            placeholder="First Name"
            tagType="input"
            type="text"
          />
          <CustomFormField
            apiKey="lastName"
            label="Last Name"
            placeholder="Last Name"
            tagType="input"
            type="text"
          />
        </div>
        <CustomFormField
          apiKey="email"
          label="Email"
          placeholder="Email"
          tagType="input"
          type="email"
        />
        <CustomFormField
          apiKey="password"
          label="Password"
          placeholder="Password"
          tagType="input"
          type="password"
        />
        <CustomFormField
          apiKey="phone"
          label="Phone"
          placeholder="Phone"
          tagType="phone"
        />
        <CustomButton
          className="!mt-6"
          size={"lg"}
          type="submit"
          label="Sign Up"
          pending={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
};

export default SignUpForm;
