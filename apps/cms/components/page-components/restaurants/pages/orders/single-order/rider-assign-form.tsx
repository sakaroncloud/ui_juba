"use client"
import { CustomFormField } from '@/components/form/custom-form-field';
import SubmitButton from '@/components/form/submit-button';
import { Form } from '@repo/ui/components/form';
import { useFetch } from '@/hooks/useFetch';
import { assignRider } from '@/lib/actions/food/action.order';
import { API_ROUTES } from '@repo/ui/lib/routes'

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { ResponseWithNoMeta } from '@repo/ui/types/response.type';
import { User } from '@repo/ui/types/user.types';
import { handleToast } from '@repo/ui/lib/utils';
import { assignRiderSchema, TAssignRiderSchema } from '@repo/ui/schemas/fooding/restaurant/restaurant.order.schema';

type Props = {
  defaultRiderId?: string
  orderId: number,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const RiderAssignForm = ({ orderId, setOpen, defaultRiderId }: Props) => {
  const [isPending, startTransition] = useTransition();

  const { data: riders } = useFetch<ResponseWithNoMeta<User.TRiderProfile[]>>({
    endPoint: API_ROUTES.profile.rider.endpoint,
    queryKey: API_ROUTES.profile.rider.queryKey,
  });


  const form = useForm<TAssignRiderSchema>({
    resolver: zodResolver(assignRiderSchema),
    defaultValues: {
      riderId: defaultRiderId || ""
    }
  })



  const onSubmit = async (values: TAssignRiderSchema) => {
    startTransition(async () => {
      const response = await assignRider(orderId, values);
      handleToast(response, () => {
        setOpen(false)
      })
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <CustomFormField
          elementName="select"
          fieldId="riderId"
          label="Rider"
          placeholder="Select Rider"
          className="w-full"
          isMulti={true}
          selectOptions={
            riders?.data?.map((rider) => ({ value: rider.id, label: `${rider.firstName}` })) || []
          }
        />
        <SubmitButton
          label='Assign'
          pending={isPending}
          type="submit"
          className="w-full"
        />
      </form>
    </Form>
  )
}
