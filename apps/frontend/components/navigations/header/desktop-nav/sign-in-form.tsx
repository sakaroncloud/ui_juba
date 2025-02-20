"use client";
import { Form } from "@repo/ui/components/form";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormField } from "@/components/forms/form-field";
import CustomButton from "@/components/custom-button";
import { signIn } from "@/lib/actions/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { loginSchema, TLogin } from "@repo/ui/schemas/auth.schema";
import { useModal } from "@/hooks/useModal";
import { useSession } from "@/providers/session-provider";



const SignInForm = () => {
  const { onClose } = useModal();
  const { change, setChange } = useSession();
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
      setChange(!change)
      toast.success(response?.success);
      onClose();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
        <CustomFormField
          fieldId="email"
          label="Email"
          placeholder="Email"
          elementName="input"
          inputType="email"
        />
        <CustomFormField
          fieldId="password"
          label="Password"
          placeholder="Password"
          elementName="input"
          inputType="password"

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
