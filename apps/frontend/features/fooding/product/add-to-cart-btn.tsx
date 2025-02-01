"use client"
import { useModal } from '@/hooks/useModal';
import { addToCart } from '@/lib/actions/fooding/action.cart';
import { useSession } from '@/providers/session-provider';
import { Button } from '@repo/ui/components/button'
import { cn, handleToast } from '@repo/ui/lib/utils';
import { ShoppingBag } from 'lucide-react'
import { useTransition } from 'react';
import { FaSpinner } from 'react-icons/fa6';
type Props = {
    productId: number;
    restaurantId: number | string;
}

const AddToCartButton = ({ productId, restaurantId }: Props) => {
    const { session } = useSession()
    const { onOpen } = useModal()
    const [isPending, startTransition] = useTransition();

    const onSubmit = async () => {
        if (!session) {
            onOpen("sign-in-sheet")
            return
        }
        startTransition(async () => {
            const response = await addToCart(productId, restaurantId)
            handleToast(response)
        })
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