"use client";
import { CustomFormField } from "@/components/form/custom-form-field";
import { FormFooter } from "@/components/form/form-field-wrapper";
import { Form } from "@repo/ui/components/form";
import { submitProfileBasic } from "@/lib/actions/food/action.user";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Gender, Role } from "@repo/ui/types/user.types";
import {
  profileBasicSchema,
  TProfileBasic,
} from "@repo/ui/schemas/auth.schema";
import { handleToast } from "@repo/ui/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  profileId: string;
  formValues: TProfileBasic;
  role: Role;
};

export const ProfileBasicForm = ({ formValues, role, profileId }: Props) => {
  const querylient = useQueryClient();
  const form = useForm<TProfileBasic>({
    resolver: zodResolver(profileBasicSchema),
    defaultValues: {
      dob: formValues?.dob || null,
      gender: formValues?.gender || null,
      phone: formValues?.phone || null,
      fullName: formValues?.fullName || "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const onSubmit = async (values: TProfileBasic) => {
    startTransition(async () => {
      const response = await submitProfileBasic(values, role, profileId);
      handleToast(response, async () => {
        querylient.invalidateQueries();
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="w-full grid grid-cols-2 gap-4">
          <CustomFormField
            elementName="input"
            fieldId="fullName"
            inputType="text"
            label="Full Name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CustomFormField
            elementName="input"
            fieldId="phone"
            inputType="phone"
            label="Phone"
          />
          <CustomFormField
            elementName="datepicker"
            fieldId="dob"
            label="Date of Birth"
            placeholder="Select Date of Birth"
            className="flex flex-col"
          />
        </div>

        <div className="w-full max-w-[350px]">
          <CustomFormField
            elementName="select"
            fieldId="gender"
            label="Gender"
            placeholder="Choose"
            className="w-full"
            selectOptions={Object.keys(Gender).map((key) => ({
              value: Gender[key as keyof typeof Gender],
              label: key.slice(0, 1).toUpperCase() + key.slice(1),
            }))}
          />
        </div>

        <FormFooter buttonLabel={"Update"} pending={isPending} />
      </form>
    </Form>
  );
};
