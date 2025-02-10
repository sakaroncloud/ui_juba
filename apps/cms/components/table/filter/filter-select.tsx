"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@repo/ui/components/form";
import { useCustomSearchParams } from "@/hooks/useCustomSearchParams";
import { ReactMultiSelect } from "@/components/form/react-select";
import { Label } from "@repo/ui/components/label";

type Props = {
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  placeholder: string;
  fieldId: string;
};

export const FilterSelect = ({
  options,
  placeholder,
  label,
  fieldId,
}: Props) => {
  const form = useForm({});
  const { createQueryString, searchParams, deleteQueryString } =
    useCustomSearchParams();

  return (
    <Form {...form}>
      <form className=" w-full flex flex-col gap-2">
        <Label>{label}</Label>
        <ReactMultiSelect
          isClearable={true}
          options={options}
          fieldId={fieldId}
          placeholder={placeholder}
          className="w-full text-sm h-11"
          defaultValue={
            searchParams.get(fieldId)
              ? {
                  value: searchParams.get(fieldId),
                  label: options.find(
                    (option) => option.value === searchParams.get(fieldId)
                  )?.label,
                }
              : null
          }
          onChange={(option) => {
            if (option && option?.value) {
              createQueryString(fieldId, option.value);
            } else {
              deleteQueryString(fieldId);
            }
          }}
        />
      </form>
    </Form>
  );
};
