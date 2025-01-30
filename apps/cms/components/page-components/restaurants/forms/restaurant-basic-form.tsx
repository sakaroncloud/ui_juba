"use client"
import { CustomFormField } from "@/components/form/custom-form-field"
import { FormFieldWrapper, FormFooter } from "@/components/form/form-field-wrapper"
import { Form } from "@repo/ui/components/form"
import { submitRestaurantBasic } from "@/lib/actions/food/action.restaurant"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { handleToast } from "@repo/ui/lib/utils"
import { restaurantBasicDefaultValues, restaurantBasicFormSchema, TRestBasicForm, weekDaysOptions } from "@repo/ui/schemas/fooding/restaurant/restaurant-basic.schema"

type Props = {
    formValues?: TRestBasicForm & { id: number };
}

export const RestaurantBasicForm = ({ formValues }: Props) => {
    const router = useRouter()
    const form = useForm<TRestBasicForm>({
        resolver: zodResolver(restaurantBasicFormSchema),
        defaultValues: formValues ? {
            ...formValues,
        } : restaurantBasicDefaultValues
    })

    const [isPending, startTransition] = useTransition();
    const queryClient = useQueryClient()
    const onSubmit = (values: TRestBasicForm) => {
        startTransition(async () => {
            const response = await submitRestaurantBasic(values, formValues?.id);
            handleToast(response, () => {
                if (formValues) {
                    queryClient.invalidateQueries()
                }
                if (!formValues) {
                    router.push("/restaurants")
                    queryClient.invalidateQueries()
                }
            })
        })
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <FormFieldWrapper
                    description="Add your cuisine details here"
                    label="Restaurant Details"
                    className="flex flex-col gap-6"
                >
                    <CustomFormField
                        elementName="input"
                        fieldId="name"
                        label="Restaurant Name"
                        inputType="text"
                        placeholder="Enter Restaurant Name"
                        className="w-full"
                    />
                    <CustomFormField
                        elementName="textarea"
                        fieldId="description"
                        label="Description"
                        placeholder="Describe a little about your cuisine"
                        className="w-full"
                    />

                    <CustomFormField
                        elementName="input"
                        fieldId="defaultCommissionPercentage"
                        label="Commission Percentage"
                        inputType="number"
                        placeholder="Enter Commission Percentage"
                        className="w-full"
                    />

                    <CustomFormField
                        elementName="checkbox"
                        fieldId="isPureVeg"
                        label="Do this restaurant serve pure vegetarian food ?"
                        placeholder="Please make sure while enabling this, non-veg cannot be added in Pure Veg Restaurant"
                        className="w-full"
                    />
                </FormFieldWrapper>

                <FormFieldWrapper
                    label="Availability"
                    description="Fill the details about your service availability"
                >

                    <div className="grid grid-cols-2 gap-6">
                        <CustomFormField
                            elementName="checkbox"
                            fieldId="isEnabled"
                            label="Is restaurant service open ?"
                            placeholder="Only enabled restaurant can be served"
                            className="w-full"
                        />
                        <CustomFormField
                            elementName="multiselect"
                            fieldId="dayOfWeek"
                            label="Day of week"
                            placeholder="Select days where service is not available"
                            className="w-full"
                            isMulti={true}
                            selectOptions={
                                weekDaysOptions
                            }
                        />

                        <CustomFormField
                            elementName="timepicker"
                            fieldId="openingTime"
                            label="Opening Time"
                            placeholder="Select time when service is available"
                            className="flex flex-col"

                        />
                        <CustomFormField
                            elementName="timepicker"
                            fieldId="closingTime"
                            label="Closing Time"
                            placeholder="Select time when service is unavailable"
                            className="flex flex-col"

                        />
                    </div>
                </FormFieldWrapper>

                <FormFieldWrapper
                    description="Enter the phone, email, and address"
                    label="Contact Details"
                >
                    <div className="grid grid-cols-2 gap-6 w-full">
                        <CustomFormField
                            elementName="input"
                            fieldId="email"
                            label="Email"
                            inputType="email"
                            placeholder="Enter Email"
                            className="w-full"
                        />

                        <CustomFormField
                            elementName="input"
                            fieldId="phone"
                            label="Phone Number"
                            inputType="phone"
                            className="w-full"
                        />
                    </div>
                </FormFieldWrapper>


                <FormFooter
                    buttonLabel={formValues ? "Update" : "Add New"}
                    pending={isPending}
                    goBack={{
                        path: `/restaurants`
                    }}
                />
            </form>
        </Form>
    )
}
