"use client";

import * as React from "react";
import { addDays, format } from "date-fns";

import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/button";
import { Calendar } from "@repo/ui/components/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem } from "@repo/ui/components/form";
import { Label } from "@repo/ui/components/label";
import { DateRange } from "react-day-picker";

type Props = {
  date: DateRange | undefined;
  fieldId: "checkInDate" | "checkOutDate";
  placeholder: string;
  className?: string;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
};

export const DatePickerWithRange = ({
  className,
  date,
  fieldId,
  placeholder,
  setDate,
}: Props) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={fieldId}
      render={({ field }) => (
        <FormItem className="bg-white hover:bg-slate-200 hover:rounded-3xl space-y-0 px-4 py-2 border-r">
          <Label className="text-sm text-gray-800">{placeholder}</Label>
          <div className={cn("grid gap-2", className)}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal bg-transparent hover:bg-transparent border-none shadow-none p-0",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date?.from ? (
                    date.to && (
                      <span className="font-medium">
                        {format(date.from, "LLL dd")}
                      </span>
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
        </FormItem>
      )}
    />
  );
};
