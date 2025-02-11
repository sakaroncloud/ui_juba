import {
  CustomFormField,
  DynamicTagField,
} from "@/components/form/custom-form-field";
import { FormFooter } from "@/components/form/form-field-wrapper";
import { Form } from "@repo/ui/components/form";
import { submitPropertyRules } from "@/lib/actions/lodging/action.property";
import {
  propertyRulesClientSchema,
  propertyRulesDefaultValues,
  TPropertyRulesClientForm,
} from "@repo/ui/schemas/lodging/property/property-rules.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { handleToast } from "@repo/ui/lib/utils";

type Props = {
  formValues?: TPropertyRulesClientForm | null;
  id: string;
};

export const PropertyRuleForm = ({ id, formValues }: Props) => {
  const form = useForm<TPropertyRulesClientForm>({
    resolver: zodResolver(propertyRulesClientSchema),
    defaultValues: formValues
      ? {
          ...formValues,
        }
      : propertyRulesDefaultValues,
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: TPropertyRulesClientForm) => {
    startTransition(async () => {
      const response = await submitPropertyRules(values, id);
      handleToast(response);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        {/*frontDesk  */}
        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="petsAllowed.status"
            label="Pets Allowed"
            placeholder="Check if petsAllowed is allowed"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="petsAllowed.description"
            className="w-full"
            label="Write short note"
          />
        </div>

        {/*smoking  */}
        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="smokingAllowed.status"
            label="Smoking Allowed"
            placeholder="Check if smoking is allowed"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="smokingAllowed.description"
            className="w-full"
            label="Write short note"
          />
        </div>

        {/*unmarried couple  */}
        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="unmarriedCoupleAllowed.status"
            label="Unmarried Couple"
            placeholder="Check if unmarried couple is available"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="unmarriedCoupleAllowed.description"
            className="w-full"
            label="Write short note"
          />
        </div>

        {/*outsideFood  */}
        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="outsideFoodAllowed.status"
            label="Outside Food"
            placeholder="Check if outside food is allowed"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="outsideFoodAllowed.description"
            className="w-full"
            label="Write short note"
          />
        </div>

        {/*lateNightRestriction  */}
        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="lateNightRestriction.status"
            label="Late Night Restrictions"
            placeholder="Check if there are late night restrictions"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="lateNightRestriction.description"
            className="w-full"
            label="Write short note"
          />
        </div>

        <DynamicTagField
          fieldId="others"
          defaultTags={formValues?.others || propertyRulesDefaultValues?.others}
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
