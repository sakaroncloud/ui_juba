"use client"
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@repo/ui/components/form';
import { CustomFormField } from '@/components/form/custom-form-field';
import { useRouter } from 'next/navigation';
import { submitMenu } from '@/lib/actions/food/menu.action';
import { FormFieldWrapper, FormFooter } from '@/components/form/form-field-wrapper';
import { menuDefaultValues, menuFormSchema, TMenuForm } from '@repo/ui/schemas/fooding/schema.menu';
import { handleToast } from '@repo/ui/lib/utils';
import { getIDsFromSlug } from '@repo/ui/lib/utils';

type Props = {
    formValues?: TMenuForm;
    menuId?: string | number;
    restaurantSlug: string;
}

export const MenuForm = ({ formValues, restaurantSlug, menuId }: Props) => {
    const { restaurantId } = getIDsFromSlug({
        restaurantSlug
    })
    const form = useForm<TMenuForm>({
        resolver: zodResolver(menuFormSchema),
        defaultValues: formValues || {
            ...menuDefaultValues,
            restaurantId: parseInt(`${restaurantId}`)
        }
    })

    const [isPending, startTransition] = useTransition();
    const router = useRouter()
    const onSubmit = (values: TMenuForm) => {
        startTransition(async () => {
            const response = await submitMenu(values, menuId);
            handleToast(response, () => {
                if (!formValues) {
                    router.push(`/restaurants/${restaurantSlug}/menus`)
                    form.reset()
                }
            })
        })
    }
    return (
        <Form {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldWrapper
                    description="Add your Menus details here"
                    label="Menu Details"
                    className="flex flex-col gap-6"
                >

                    <CustomFormField
                        elementName='input'
                        fieldId='name'
                        label='Name'
                        inputType='text'
                        placeholder='Enter Menu name'
                        className='w-full'
                    />

                    <CustomFormField
                        elementName='textarea'
                        fieldId='description'
                        label='Menu Description'
                        placeholder='Please enter description'
                        className='w-full'
                    />
                </FormFieldWrapper>
                <FormFooter
                    buttonLabel={formValues ? "Update" : "Add New"}
                    pending={isPending}
                />
            </form>
        </Form>
    )
}
