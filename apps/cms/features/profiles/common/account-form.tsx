"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, TEmail } from "@repo/ui/schemas/auth.schema";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@repo/ui/components/form";
import { handleToast } from "@repo/ui/lib/utils";
import { CardWrapper } from "@repo/ui/components/card-wrapper";
import { CustomFormField } from "@/components/form/custom-form-field";
import CustomButton from "@/components/form/custom-button";
import { updateEmail } from "@/lib/actions/food/action.user";

type Props = {
  formValues: TEmail;
  userId?: string;
};

export const AccountForm = ({ formValues, userId }: Props) => {
  const [pending, startTransition] = useTransition();
  const form = useForm<TEmail>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: formValues?.email || "",
    },
  });

  const onSubmit = (values: TEmail) => {
    startTransition(async () => {
      const response = await updateEmail(values, userId);
      handleToast(response, async () => {});
    });
  };

  const isDirty = form.formState.isDirty;

  return (
    <CardWrapper title="Update Email">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1">
            <CustomFormField
              elementName="input"
              label="Email"
              inputType="text"
              fieldId="email"
              placeholder="Enter your email"
            />
          </div>
          <CustomButton
            className="rounded-full  text-white"
            size={"sm"}
            label={"Update"}
            pending={pending}
            disabled={!isDirty}
          />
        </form>
      </Form>
    </CardWrapper>
  );
};
