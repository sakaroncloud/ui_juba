"use client";
import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { FormControl, FormField, FormItem, FormMessage } from "@repo/ui/components/form";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";


type Props = {
  apiKey: string;
  label?: string;
  placeholder?: string;
  description?: string;
  tagType: "input" | "select" | "phone";
  type?: "text" | "password" | "email";

  children?: React.ReactNode;
};

type TRenderElement = {
  field: ControllerRenderProps<FieldValues, string>;
} & Props;

const RenderElement = ({
  placeholder,
  tagType,
  children,
  field,
  type,
}: TRenderElement) => {
  switch (tagType) {
    case "input":
      return (
        <FormControl>
          <Input
            {...field}
            placeholder={placeholder || ""}
            type={type || "text"}
            className=" flex-1 bg-white   w-full focus-visible:ring-offset-0  outline-none ring-0  focus-visible:ring-0"
          />
        </FormControl>
      );

    case "phone":
      return (
        <FormControl>
          <div className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
            <PhoneInput
              {...field}
              defaultCountry="KE"
              className={"input-phone-number"}
              placeholder="Enter phone number"
              onChange={field.onChange}
            />
          </div>
        </FormControl>
      );

    case "select":
      return <>{children}</>;
  }
};

export const CustomFormField = ({ ...props }: Props) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={props.apiKey}
      render={({ field }) => (
        <FormItem>
          {props.label && <Label>{props.label}</Label>}
          <RenderElement field={field} {...props} />
          <FormMessage className="" />
        </FormItem>
      )}
    />
  );
};

export default FormField;
