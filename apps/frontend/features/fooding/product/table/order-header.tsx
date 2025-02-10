"use client"
import { useModal } from "@/hooks/useModal";
import { Order, OrderStatus } from "@repo/ui/types/order.types"

export const OrderHeader = ({ order }: { order: Order.TOrder }) => {
    const { onOpen } = useModal();
    const isCancellable = [OrderStatus.PENDING, OrderStatus.CONFIRMED].includes(order.orderStatus)
    const addressText = [
        order.address?.streetOne,
        order.address?.area,
        order.address?.pincode,
        order.address?.buildingName,
        order.address?.landmark,
        order.address?.city,
        order.user.customerProfile?.phone
    ].filter(Boolean).join(", ")

    return (
        <div className='p-4 rounded-lg  shadow-sm bg-white flex border border-gray-200 items-center gap-3 justify-between'>
            <div>
                <div className='font-semibold'>OrderID: #{order.id} <span className='text-[10px] italic text-primary capitalize'>({order.orderStatus})</span></div>
                <div className='text-xs'>
                    <span>Ordered On: </span>
                    {
                        new Date(order.createdAt).toLocaleString()
                    }
                </div>
                <div className='text-primary text-sm'>
                    {
                        order.restaurant.name
                    }
                </div>
            </div>
            <div className="text-right">

                <div className='text-xs'>
                    <span className='font-semibold'>Total Amount:</span> $
                    {
                        order.totalAmount
                    }
                </div>
                <div className='text-xs'>
                    {
                        addressText
                    }
                </div>
                {
                    isCancellable && (
                        <div
                            onClick={() => onOpen("order-cancel-modal", { orderId: order.id })}
                            className='text-xs text-primary italic cursor-pointer'>
                            Cancel Now
                        </div>
                    )
                }
            </div>
        </div>
    )
}