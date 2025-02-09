"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { profileBasicSchema, TProfileBasic } from "@repo/ui/schemas/auth.schema";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@repo/ui/components/form";
import { CustomFormField } from "@/components/forms/form-field";
import CustomButton from "@/components/custom-button";
import { GendersOptions } from "@repo/ui/types/user.types";
import { updateProfile } from "@/lib/actions/auth";
import { handleToast } from "@repo/ui/lib/utils";
import { updateSessionWhenProfileModified } from "@/lib/actions/session";
import { CardWrapper } from "@repo/ui/components/card-wrapper";


type Props = {
    formValues: TProfileBasic;
};

export const AccountInformationForm = ({
    formValues,
}: Props) => {
    const [pending, startTransition] = useTransition();
    const form = useForm<TProfileBasic>({
        resolver: zodResolver(profileBasicSchema),
        defaultValues: {
            fullName: formValues?.fullName || "",
            phone: formValues?.phone,
            dob: formValues?.dob,
            gender: formValues?.gender || undefined,
        },
    });

    const onSubmit = (values: TProfileBasic) => {
        startTransition(async () => {
            const response = await updateProfile(values)
            handleToast(response, async () => {
                await updateSessionWhenProfileModified()
            })
        });
    };
    return (
        <CardWrapper title="Account Information">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-2">
                        <CustomFormField
                            elementName="input"
                            label="Full Name"
                            inputType='text'
                            fieldId="fullName"
                            placeholder="Enter your name"
                        />
                        <CustomFormField
                            elementName="input"
                            label="Phone Number"
                            fieldId="phone"
                            placeholder="Enter your phone"
                            inputType="phone"
                        />
                        <CustomFormField
                            elementName="datepicker"
                            label="Date of Birth"
                            fieldId="dob"
                            placeholder="Pick your date of birth"
                            className="flex flex-col"
                        />

                        <CustomFormField
                            elementName="select"
                            label="Gender"
                            fieldId="gender"
                            placeholder="Choose your gender"
                            selectOptions={GendersOptions}
                        />
                    </div>
                    <CustomButton
                        className="rounded-full  text-white ml-auto"
                        size={"sm"}
                        label={"Update"}
                        pending={pending}
                    />
                </form>
            </Form>
        </CardWrapper>
    );
};