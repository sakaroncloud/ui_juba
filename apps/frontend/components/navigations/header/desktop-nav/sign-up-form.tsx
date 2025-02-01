"use client";
import { Form } from "@repo/ui/components/form";
import { useForm } from "react-hook-form";

import { CustomFormField } from "@/components/forms/form-field";
import CustomButton from "@/components/custom-button";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema, TSignUp } from "@repo/ui/schemas/auth.schema";
import { handleToast } from "@repo/ui/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@/hooks/useModal";


const SignUpForm = () => {
  const { onClose } = useModal();
  const form = useForm<TSignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      phone: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (values: TSignUp) => {
    const response = await signUp(values);
    handleToast(response as any, () => {
      onClose();
    })
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
