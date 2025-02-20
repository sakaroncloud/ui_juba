"use client";
import { CustomFormField } from "@/components/form/custom-form-field";
import { Form } from "@repo/ui/components/form";
import { submitProfileBasic } from "@/lib/actions/food/action.user";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Gender, User } from "@repo/ui/types/user.types";
import {
  profileBasicSchema,
  TProfileBasic,
} from "@repo/ui/schemas/auth.schema";
import { handleToast } from "@repo/ui/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import CustomButton from "@/components/form/custom-button";
import { updateSessionWhenProfileModified } from "@/lib/actions/session";
import { useSession } from "@/components/providers/session-context";

type Props = {
  profileId?: string;
  formValues: TProfileBasic & {
    user: Pick<User.TUser, "role">;
  };
};

export const ProfileBasicForm = ({ formValues, profileId }: Props) => {
  const querylient = useQueryClient();
  const { change, setChange } = useSession();
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
  const onSubmit = async (formData: TProfileBasic) => {
    startTransition(async () => {
      const response = await submitProfileBasic({
        formData,
        role: formValues.user.role, // role determine the route - so it is mandatory
        /**
         *  if not provided - only can be used to update their own profile
         *  if provided - then it will be by SUPER_ADMIN using the userId
         */
        param: profileId,
      });
      handleToast(response, async () => {
        if (!profileId) {
          await updateSessionWhenProfileModified();
          setChange(!change);
        }
        querylient.invalidateQueries();
      });
    });
  };

  const isDirty = form.formState.isDirty;
  console.log(isDirty, Date());

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <CustomFormField
          elementName="input"
          fieldId="fullName"
          inputType="text"
          label="Full Name"
        />

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

        <CustomButton
          className="rounded-full  text-white w-fit"
          size={"sm"}
          label={"Update"}
          pending={isPending}
          disabled={!isDirty}
        />
      </form>
    </Form>
  );
};
