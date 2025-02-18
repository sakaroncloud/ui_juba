import {
  CustomFormField,
  DynamicTagField,
} from "@/components/form/custom-form-field";
import { FormFooter } from "@/components/form/form-field-wrapper";
import { Form } from "@repo/ui/components/form";
import { updateRoomRules } from "@/lib/actions/lodging/action.room";
import {
  roomRulesClientSchema,
  roomRulesDefaultValues,
  TRoomRulesClientForm,
} from "@repo/ui/schemas/lodging/room/room-rules.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { handleToast } from "@repo/ui/lib/utils";

type Props = {
  formValues?: TRoomRulesClientForm | null;
  roomId: string | number;
  propertyId: number;
};

export const RoomRuleForm = ({ formValues, roomId, propertyId }: Props) => {
  const form = useForm<TRoomRulesClientForm>({
    resolver: zodResolver(roomRulesClientSchema),
    defaultValues: formValues
      ? {
          ...formValues,
        }
      : {
          ...roomRulesDefaultValues,
          propertyId: propertyId,
        },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: TRoomRulesClientForm) => {
    startTransition(async () => {
      const response = await updateRoomRules(values, roomId);
      handleToast(response);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        {/*wifi  */}
        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="allowSmoking.status"
            label="Smoking Inside Room"
            placeholder="DO smoking inside the room is allowed?"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="allowSmoking.description"
            className="w-full"
            label="Write short note"
          />
        </div>
        <DynamicTagField
          fieldId="others"
          defaultTags={formValues?.others || roomRulesDefaultValues.others}
          placeholder="Hey, what else you want to add?"
          label="Others (Hit Enter to add)"
          className="w-full"
        />

        <FormFooter
          buttonLabel={formValues ? "Update" : "Add New"}
          pending={isPending}
          goBack={{
            path: `/properties`,
          }}
        />
      </form>
    </Form>
  );
};
