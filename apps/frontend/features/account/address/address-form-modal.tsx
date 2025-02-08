"use client"
import React, { useTransition } from 'react'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFetch } from '@/hooks/useFetch';
import { API_ROUTES } from '@repo/ui/lib/routes'

import { Form } from '@repo/ui/components/form';
import { addressDefaultValues, addressFormSchema, TAddressForm } from '@repo/ui/schemas/schema.address';
import { ResponseWithNoMeta } from '@repo/ui/types/response.type';
import { TCity } from '@repo/ui/types/address.types';
import { handleToast } from '@repo/ui/lib/utils';
import { CustomFormField } from '@/components/forms/form-field';
import { useModal } from '@/hooks/useModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@repo/ui/components/dialog';
import { Separator } from '@repo/ui/components/separator';
import CustomButton from '@/components/custom-button';
import { submitAddress } from '@/lib/actions/address/action.address';
import { useQueryClient } from '@tanstack/react-query';


export const AddressFormModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const { data: cities } = useFetch<ResponseWithNoMeta<TCity[]>>({
        endPoint: API_ROUTES.city.endpoint,
        queryKey: API_ROUTES.city.queryKey,
    });

    const queryClient = useQueryClient()

    const form = useForm<TAddressForm>({
        resolver: zodResolver(addressFormSchema),
        defaultValues: data || addressDefaultValues
    })


    const [isPending, startTransition] = useTransition();
    const handleClose = () => {
        form.reset()
        onClose()
    }
    const onSubmit = (values: TAddressForm) => {
        startTransition(async () => {
            const response = await submitAddress(values, data?.addressId);
            handleToast(response, () => {
                queryClient.invalidateQueries()
                handleClose()
            })
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose} >
            <DialogContent className={"px-0 py-0"}>
                <DialogHeader>
                    <DialogTitle className='sr-only'>
                        Address Form Modal
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className='space-y-3' onSubmit={form.handleSubmit(onSubmit)}>
                        <h3 className="text__mnedium font-semibold capitalize px-4">Address</h3>
                        <Separator />
                        <div className="px-4 grid grid-cols-2 gap-3">
                            <CustomFormField
                                elementName='input'
                                fieldId='label'
                                label='Label'
                                inputType='text'
                                placeholder='Home/Office'
                                className='w-full'
                            />
                            <CustomFormField
                                elementName='input'
                                fieldId='streetOne'
                                label='Street One'
                                inputType='text'
                                placeholder='Enter Street One'
                                className='w-full'
                            />
                            <CustomFormField
                                elementName='input'
                                fieldId='area'
                                label='Area'
                                inputType='text'
                                placeholder='Enter Area'
                                className='w-full'
                            />
                            <CustomFormField
                                elementName='input'
                                fieldId='pincode'
                                label='Pincode'
                                inputType='text'
                                placeholder='Enter Pincode'
                                className='w-full'
                            />
                            <CustomFormField
                                elementName='input'
                                fieldId='buildingName'
                                label='Building Name'
                                inputType='text'
                                placeholder='Enter Building Name'
                                className='w-full'
                            />
                            <CustomFormField
                                elementName='input'
                                fieldId='landmark'
                                label='Nearest Landmark'
                                inputType='text'
                                placeholder='Nearest Landmark'
                                className='w-full'
                            />
                            <CustomFormField
                                elementName='select'
                                fieldId='city'
                                label='City'
                                placeholder='Select City'
                                className='w-full'
                                selectOptions={cities?.data?.map((city) => ({ value: city.slug, label: city.name })) || []}
                            />
                        </div>
                        {((data && !data.isDefault) || !data) &&

                            <div className='px-4'>
                                <CustomFormField
                                    elementName='checkbox'
                                    fieldId='isDefault'
                                    label='Set this as default address ?'
                                    className='w-full shadow-none border-0 px-0'
                                />
                            </div>
                        }
                        <div className="px-4 pb-4">
                            <CustomButton
                                className="rounded-full  text-white"
                                size={"lg"}
                                label={data?.addressId ? "Update" : "Add Address"}
                                pending={isPending}
                            />
                        </div>
                    </form>
                </Form >
            </DialogContent>
        </Dialog>
    )
}
