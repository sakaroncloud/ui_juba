"use client";
import { Form } from "@repo/ui/components/form";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormField } from "@/components/forms/form-field";
import CustomButton from "@/components/custom-button";
import { signIn } from "@/lib/actions/auth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { loginSchema, TLogin } from "@repo/ui/schemas/auth.schema";

type TModal = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const SignInForm = ({ setOpen }: TModal) => {
  const [errors, setErrors] = useState({});
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",

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

  const onSubmit = async (values: TLogin) => {
    setErrors({});

    const response = await signIn(values);

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
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
        <CustomButton
          className="!mt-6"
          type="submit"
          label="Login"
          pending={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
};

export default SignInForm;
