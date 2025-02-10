"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { roleChangeSchema, TRoleChange } from "@repo/ui/schemas/auth.schema";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@repo/ui/components/form";
import { handleToast } from "@repo/ui/lib/utils";
import { CardWrapper } from "@repo/ui/components/card-wrapper";
import { CustomFormField } from "@/components/form/custom-form-field";
import CustomButton from "@/components/form/custom-button";
import { updateRole } from "@/lib/actions/food/action.user";
import { ChangeableRole } from "@repo/ui/types/user.types";

type Props = {
  formValues: TRoleChange;
  userId: string;
};

export const RoleForm = ({ formValues, userId }: Props) => {
  const [pending, startTransition] = useTransition();
  const form = useForm<TRoleChange>({
    resolver: zodResolver(roleChangeSchema),
    defaultValues: {
      role: formValues?.role || "",
    },
  });

  const onSubmit = (values: TRoleChange) => {
    startTransition(async () => {
      const response = await updateRole(values, userId);
      handleToast(response, async () => {});
    });
  };

  const isDirty = form.formState.isDirty;

  return (
    <CardWrapper title="Update Role">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CustomFormField
            selectOptions={Object.values(ChangeableRole).map((role) => ({
              value: role,
              label: role,
            }))}
            elementName="select"
            fieldId="role"
            label="Role"
            placeholder="Select a role"
          />
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
