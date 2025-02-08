"use client"
import React, { useTransition } from 'react'
import { CustomFormModal } from '../form/custom-form-modal'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomFormField } from '../form/custom-form-field'
import SubmitButton from '../form/submit-button'
import { submitUser } from '@/lib/actions/food/action.user'
import { Form } from '@repo/ui/components/form'
import { Role } from '@repo/ui/types/user.types'
import { handleToast } from '@repo/ui/lib/utils'
import { newUserSchema, TNewUser, } from '@repo/ui/schemas/auth.schema'

type props = {
    formValues?: TNewUser
    userId?: string
    customButton: React.ReactNode
}

export const UserFormModal = ({ formValues, userId, customButton }: props) => {
    const [open, setOpen] = React.useState(false);
    const [isPending, startTransition] = useTransition();
    const form = useForm<TNewUser>({
        resolver: zodResolver(newUserSchema),
        defaultValues: formValues || {
            email: "",
            // fullName: "",
            role: Role.CUSTOMER
        }
    })

    const onSubmit = async (values: TNewUser) => {
        startTransition(async () => {
            const response = await submitUser(values, userId);
            handleToast(response, () => setOpen(false))
        })
    }
    return (
        <CustomFormModal
            customButton={customButton}
            open={open}
            setOpen={setOpen}
            title={formValues ? "Edit User" : "Add New User"}
            description={formValues ? "Edit user details" : "Add a new user to your account."}
        >
            <Form {...form}>

                <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <CustomFormField
                            elementName='input'
                            fieldId='email'
                            inputType='email'
                            label='Email'
                        />
                        <CustomFormField
                            elementName='input'
                            fieldId='phone'
                            inputType='phone'
                            label='Phone'
                        />
                        <CustomFormField
                            selectOptions={Object.values(Role).map(role => ({ value: role, label: role }))}
                            elementName='select'
                            fieldId='role'
                            label='Role'
                        />
                    </div>
                    <SubmitButton
                        label={formValues ? "Update" : "Submit"}
                        pending={isPending}
                    />

                </form>
            </Form>
        </CustomFormModal>
    )
}
