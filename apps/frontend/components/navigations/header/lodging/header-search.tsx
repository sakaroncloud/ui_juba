"use client";
import { Form, FormControl, FormField, FormItem } from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar } from "@repo/ui/components/calendar";

export const LodgingHeaderSearch = () => {
  const schema = z.object({
    search: z.string(),
    checkInDate: z.date(),
    checkOutDate: z.date(),
    room: z.string(),
    adults: z.string(),
    children: z.string(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });


  return (
    <div className="flex-1 max-w-fit">
      <Form {...form}>
        <form className="border rounded-3xl flex border-slate-200 gap-x-2 py-1 px-2">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="bg-white hover:bg-slate-200 hover:rounded-3xl space-y-0 px-3 py-2 border-r flex flex-col justify-center">
                <Label className="text-xs text-gray-800">Where</Label>
                <Input
                  {...field}
                  placeholder="Search destinations"
                  className="border-0 h-5  shadow-none placeholder:text-xs focus:ring-0 focus-visible:ring-0 p-0 text-xs text-gray-600"
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="checkInDate"
            render={({ field }) => (
              <FormItem className="bg-white w-40 hover:bg-slate-200 hover:rounded-3xl border-r space-y-0 px-3 py-2  flex flex-col justify-center">
                <Label className="text-xs text-gray-800">Check in</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <div className="cursor-pointer h-5 align-middle flex items-center">
                        {field.value ? (
                          <span className="text-xs text-gray-600">
                            {format(field.value, "LLL dd")}
                          </span>
                        ) : (
                          <span className="align-middle text-xs text-gray-600">
                            Pick a date
                          </span>
                        )}
                      </div>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return (
                          date < today || date > form.getValues("checkOutDate")
                        );
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="checkOutDate"
            render={({ field }) => (
              <FormItem className="bg-white w-40 hover:bg-slate-200 hover:rounded-3xl space-y-0 px-3 py-2 border-r flex flex-col justify-center">
                <Label className="text-xs text-gray-800">Check Out</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <div className="cursor-pointer h-5 align-middle flex items-center">
                        {field.value ? (
                          <span className="text-xs text-gray-600">
                            {format(field.value, "LLL dd")}
                          </span>
                        ) : (
                          <span className="align-middle text-xs text-gray-600">
                            Pick a date
                          </span>
                        )}
                      </div>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return (
                          date < today || date < form.getValues("checkInDate")
                        );
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="checkOutDate"
            render={({ field }) => (
              <FormItem className="bg-white w-40 hover:bg-slate-200 hover:rounded-3xl space-y-0 px-3 py-2  flex flex-col justify-center">
                <Label className="text-xs text-gray-800">Check Out</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <div className="cursor-pointer h-5 align-middle flex items-center">
                        {field.value ? (
                          <span className="text-xs text-gray-600">
                            {format(field.value, "LLL dd")}
                          </span>
                        ) : (
                          <span className="align-middle text-xs text-gray-600">
                            Pick a date
                          </span>
                        )}
                      </div>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return (
                          date < today || date < form.getValues("checkInDate")
                        );
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
