"use client"
import { useModal } from '@/hooks/useModal';
import { addToCart } from '@/lib/actions/fooding/action.cart';
import { useSession } from '@/providers/session-provider';
import { Button } from '@repo/ui/components/button'
import { cn, handleToast } from '@repo/ui/lib/utils';
import { Restaurant } from '@repo/ui/types/restaurant.types';
import { useQueryClient } from '@tanstack/react-query';
import { ShoppingBag } from 'lucide-react'
import { useTransition } from 'react';
import { FaSpinner } from 'react-icons/fa6';
import { CartIncrementButton } from '../carts/cart-increment-button';
type Props = {
    productId: number;
    restaurantId: number | string;
    cartItem?: Restaurant.Cart.TCartItem
}

const AddToCartButton = ({ cartItem, productId, restaurantId }: Props) => {
    const { session } = useSession()
    const { isOpen, onOpen } = useModal()
    const [isPending, startTransition] = useTransition();
    const queryClient = useQueryClient()

    const onSubmit = async () => {
        if (!session) {
            onOpen("sign-in-sheet")
            return
        }
        startTransition(async () => {
            const response = await addToCart(productId, restaurantId)
            if (response.status == 409) {
                onOpen("cart-delete-modal")
            }
            handleToast(response)
            queryClient.invalidateQueries()
        })
    }
    if (cartItem) {
        return (
            <CartIncrementButton quantity={cartItem.quantity} itemId={cartItem.id} />
        )
    }
    return (
        <Button
            disabled={isPending}
            onClick={onSubmit}
            variant={'outline'} className='text-sm text-primary border-primary rounded-xl py-5 px-3 hover:bg-primary hover:text-white wie__transition__200'>
            <ShoppingBag className={cn("", isPending && "hidden")} />
            <FaSpinner className={cn("hidden", isPending && "inline-block animate-spin")} />
            <span>Add to Cart</span>
        </Button>
    )
}

export default AddToCartButton