"use client";
import React, { useTransition } from "react";
import { CustomFormModal } from "../form/custom-form-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormField } from "../form/custom-form-field";
import SubmitButton from "../form/submit-button";
import { Form } from "@repo/ui/components/form";
import { Gender, StaffWithNoSuperAdminRole } from "@repo/ui/types/user.types";
import { addStaffSchema, TAddStaffSchema } from "@repo/ui/schemas/auth.schema";
import { submitStaff } from "@/lib/actions/food/action.user";
import { handleToast } from "@repo/ui/lib/utils";

type props = {
  customButton: React.ReactNode;
};

export const AddStaffFormModal = ({ customButton }: props) => {
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<TAddStaffSchema>({
    resolver: zodResolver(addStaffSchema),
    defaultValues: {
      email: "",
      dob: null,
      gender: undefined,
      fullName: "",
      phone: null,
    },
  });

  const onSubmit = async (values: TAddStaffSchema) => {
    startTransition(async () => {
      const response = await submitStaff(values);
      handleToast(response, () => setOpen(false));
    });
  };

  return (
    <CustomFormModal
      customButton={customButton}
      open={open}
      setOpen={setOpen}
      title="Add User"
      description={"Add a new user to your account."}
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <CustomFormField
              elementName="input"
              fieldId="fullName"
              inputType="text"
              placeholder="Full name"
              label="Full Name"
            />

            <CustomFormField
              elementName="input"
              fieldId="email"
              inputType="email"
              placeholder="Email"
              label="Email"
            />

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

            <CustomFormField
              selectOptions={Object.values(StaffWithNoSuperAdminRole).map(
                (role) => ({
                  value: role,
                  label: role,
                })
              )}
              elementName="select"
              fieldId="role"
              label="Role"
              placeholder="Select a role"
            />

            <CustomFormField
              elementName="select"
              fieldId="gender"
              label="Gender"
              placeholder="Select Gender"
              className="w-full"
              selectOptions={Object.keys(Gender).map((key) => ({
                value: Gender[key as keyof typeof Gender],
                label: key.slice(0, 1).toUpperCase() + key.slice(1),
              }))}
            />
          </div>
          <SubmitButton label={"Submit"} pending={isPending} />
        </form>
      </Form>
    </CustomFormModal>
  );
};
