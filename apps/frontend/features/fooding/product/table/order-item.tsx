import FallbackImage from "@/components/fallback-image"
import { Order } from "@repo/ui/types/order.types"

type OrderItemProps = {
    item: Order.TOrderItem
}
export const OrderItem = ({ item }: OrderItemProps) => {
    return (
        <div className='bg-white shadow-sm rounded-lg p-2  flex items-center gap-4'>
            <div className='w-fit flex items-center justify-between gap-4'>
                <div className='border rounded-lg border-gray-200 border-primary size-20 flex items-center justify-center'>
                    <FallbackImage src={item.product?.bannerImage?.url || "/"} alt={item.product?.name || ""} width={60} height={60}
                        type='square'
                    />
                </div>
                <div>
                    <p>{item.name}</p>
                    <p className='font-semibold text-sm'>${item.price}</p>
                </div>
            </div>
            <div className='ml-auto'>
                <div className='text-xs'>
                    <span className='font-semibold'>QTY: </span>
                    {
                        item.quantity
                    }
                </div>
                <div className='text-xs'>
                    <span className='font-semibold'>Amount:</span> $
                    {
                        item.totalAmount
                    }
                </div>

            </div>
        </div>
    )
}