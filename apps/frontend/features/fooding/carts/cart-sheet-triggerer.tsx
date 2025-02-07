"use client"
import { useFetch } from '@/hooks/useFetch'
import { useModal } from '@/hooks/useModal'
import { API_ROUTES } from '@repo/ui/lib/routes'
import { ResponseWithNoMeta } from '@repo/ui/types/response.type'
import { Restaurant } from '@repo/ui/types/restaurant.types'
import { ShoppingCart } from 'lucide-react'
import React from 'react'

export const CartSheetTriggerer = () => {
    const { onOpen } = useModal()
    const { data } = useFetch<ResponseWithNoMeta<Restaurant.Cart.TCart>>({
        queryKey: API_ROUTES.fooding.cart.queryKey,
        endPoint: API_ROUTES.fooding.cart.endpoint,
    })
    const totalItems = data?.data?.totalQuantity || 0

    return (
        <div
            onClick={() => onOpen("cart-sheet")}
            className="relative size-10 cursor-pointer hover:text-primary wie__transition__200 rounded-full flex items-center justify-center bg-slate-50 hover:bg-slate-100">
            <ShoppingCart className="size-5" />

            {totalItems > 0 && <span className="absolute top-0 right-0 inline-flex items-center justify-center size-5  text-xs text-white bg-primary rounded-full p-1 font-light">
                {totalItems}
            </span>}
        </div>
    )
}
