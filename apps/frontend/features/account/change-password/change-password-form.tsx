"use client";
import React, { useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormField } from "@/components/forms/form-field";
import { Form } from "@repo/ui/components/form";
import CustomButton from "@/components/custom-button";
import { changePasswordSchema, TChangePassword } from "@repo/ui/schemas/auth.schema";
import { changePassword } from "@/lib/actions/auth";
import { handleToast } from "@repo/ui/lib/utils";
import { CardWrapper } from "@repo/ui/components/card-wrapper";

export const ChangePasswordForm = () => {
    const [pending, startTransition] = useTransition();
    const form = useForm<TChangePassword>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (values: TChangePassword) => {
        startTransition(async () => {
            const response = await changePassword(values)
            handleToast(response)
        });
    };

    return (
        <CardWrapper title="Change Password">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <CustomFormField
                        elementName="input"
                        label="Current Password"
                        fieldId="oldPassword"
                        inputType="password"
                        placeholder="Enter your current password"

                    />

                    <div className="grid grid-cols-2 gap-4">
                        <CustomFormField
                            elementName="input"
                            label="New Password"
                            fieldId="newPassword"
                            inputType="password"
                            placeholder="Enter your current password"
                        />

                        <CustomFormField
                            elementName="input"
                            label="Confirm Password"
                            fieldId="confirmPassword"
                            inputType="password"
                            placeholder="Enter your current password"
                        />
                    </div>

                    <CustomButton
                        pending={pending}
                        disabled={pending}
                        className="rounded-full  text-white"
                        size={"lg"}
                        label="Change Password"
                        type="submit"
                    />

                </form>
            </Form>
        </CardWrapper>
    );
};