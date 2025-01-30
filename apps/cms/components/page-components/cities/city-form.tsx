"use client"
import { CustomFormField, DynamicTagField, } from "@/components/form/custom-form-field"
import { FormFieldWrapper, FormFooter } from "@/components/form/form-field-wrapper"
import { Form, } from "@repo/ui/components/form"
import { submitCity } from "@/lib/actions/action.city"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useTransition } from "react"
import { useForm } from "react-hook-form"
import { cityFormSchema, TCityForm, } from "@repo/ui/schemas/schema.address"
import { handleToast } from "@repo/ui/lib/utils"

type Props = {
  formValues?: TCityForm & { slug: string };
}

export const CityForm = ({ formValues }: Props) => {
  const form = useForm<TCityForm>({
    resolver: zodResolver(cityFormSchema),
    defaultValues: formValues || {
      name: "",
      pincodes: [{
        id: "",
        text: ""
      }]
    }
  })

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: TCityForm) => {
    startTransition(async () => {
      const response = await submitCity(values, formValues?.slug);
      handleToast(response)
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FormFieldWrapper
          description="Add your city details here"
          label="City Details"
          className="flex flex-col gap-6"
        >
          <CustomFormField
            elementName="input"
            fieldId="name"
            label="City Name"
            inputType="text"
            placeholder="Enter City Name"
            className="w-full"
          />
          <DynamicTagField
            fieldId="pincodes"
            label="Pincodes (Press Enter to add)"
            placeholder="Enter Pincodes"
            defaultTags={formValues?.pincodes}
          />
        </FormFieldWrapper>
        <FormFooter
          buttonLabel={formValues ? "Update" : "Add New"}
          pending={isPending}
          goBack={{
            path: "/cities"
          }}
        />
      </form>
    </Form>
  )
}
