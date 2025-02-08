"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, TEmail, } from "@repo/ui/schemas/auth.schema";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { AccountFormWrapper } from "../account-form-wrapper";
import { Form } from "@repo/ui/components/form";
import { CustomFormField } from "@/components/forms/form-field";
import CustomButton from "@/components/custom-button";
import { updateEmail } from "@/lib/actions/auth";
import { handleToast } from "@repo/ui/lib/utils";
import { updateSessionWhenProfileModified } from "@/lib/actions/session";


type Props = {
    formValues: TEmail;
    newEmail?: string;
    unverifiedEmail?: string;
};

export const ChangeEmailForm = ({
    formValues,
    newEmail,
}: Props) => {
    const [pending, startTransition] = useTransition();
    const form = useForm<TEmail>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: formValues?.email || "",
        },
    });

    const onSubmit = (values: TEmail) => {
        console.log(values)
        startTransition(async () => {
            const response = await updateEmail(values)
            handleToast(response, async () => {
                await updateSessionWhenProfileModified()
            })
        });
    };
    return (
        <AccountFormWrapper title="Update Your Email">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-1">
                        <CustomFormField
                            elementName="input"
                            label="Email"
                            inputType='text'
                            fieldId="email"
                            placeholder="Enter your email"
                        />
                        {newEmail && (
                            <p className="text-xs ">
                                Check your email for a verification <span className="text-primary">{newEmail}</span>
                            </p>
                        )}
                    </div>
                    <CustomButton
                        className="rounded-full  text-white"
                        size={"sm"}
                        label={"Update"}
                        pending={pending}
                    />
                </form>
            </Form>
        </AccountFormWrapper>
    );
};