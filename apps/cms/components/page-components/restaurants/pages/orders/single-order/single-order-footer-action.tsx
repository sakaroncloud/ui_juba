"use client"
import { CustomFormField } from '@/components/form/custom-form-field'
import { CustomFormModal } from '@/components/form/custom-form-modal'
import SubmitButton from '@/components/form/submit-button'
import { Form } from '@repo/ui/components/form'
import { cancelOrder, updateOrder } from '@/lib/actions/food/action.order'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { Order, OrderStatus } from '@repo/ui/types/order.types'
import { orderCancelSchema, TOrderCancelSchema } from '@repo/ui/schemas/fooding/restaurant/restaurant.order.schema'
import { handleToast } from '@repo/ui/lib/utils'

export const SingleOrderFooterAction = ({ order }: { order: Order.TOrder }) => {

  return (
    <div className='flex gap-6'>
      {order.orderStatus !== OrderStatus.CANCELLED && order.orderStatus !== OrderStatus.DELIVERED && <OrderCancelForm orderId={order.id} />}
      {
        order.orderStatus === OrderStatus.PENDING && (
          <ConfirmForm orderId={order.id} />
        )
      }
    </div>
  )
}

const OrderCancelForm = ({ orderId }: { orderId: number }) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = React.useState(false);
  const form = useForm<TOrderCancelSchema>({
    resolver: zodResolver(orderCancelSchema),
    defaultValues: {
      cancelReason: ""
    }
  })

  const onSubmit = (values: TOrderCancelSchema) => {
    startTransition(async () => {
      const response = await cancelOrder(orderId, values)
      handleToast(response, () => setOpen(false))
    })
  }

  return (
    <CustomFormModal
      customButton={<SubmitButton type="submit" label="Cancel Order" pending={false} variant={"outline"} className='border-primary border text-primary hover:bg-red-500 hover:text-white' size={"lg"} />
      }
      title='Cancel Order'
      description='Are you sure you want to cancel this order?'
      open={open}
      setOpen={setOpen}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <CustomFormField
            elementName='input'
            fieldId='cancelReason'
            label='Cancel Reason'
            placeholder='Enter Cancel Reason'
            className='w-full'
          />
          <SubmitButton type="submit" label="Confirm" pending={isPending} />
        </form>
      </Form>
    </CustomFormModal>

  )
}

const ConfirmForm = ({ orderId }: { orderId: number }) => {
  const [isPending, startTransition] = useTransition();
  const onSubmit = () => {
    startTransition(async () => {
      const response = await updateOrder(orderId, OrderStatus.CONFIRMED)
      handleToast(response)
    })
  }
  return (
    <SubmitButton
      onClick={onSubmit}
      type="submit" label="Accept Order" pending={isPending} className='' size={"lg"} />
  )
}