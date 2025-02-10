"use client"
import React from 'react'
import { ProductCard } from './product-card'
import { Restaurant } from '@repo/ui/types/restaurant.types'
import { useFetch } from '@/hooks/useFetch'
import { ResponseWithNoMeta } from '@repo/ui/types/response.type'
import { API_ROUTES } from '@repo/ui/lib/routes'

type Props = {
    products?: Restaurant.Product.TProduct[],
    restaurantId: number | string,
}

const ProductsGrid = ({ products, restaurantId }: Props) => {
    const { data: result } = useFetch<ResponseWithNoMeta<Restaurant.Cart.TCart>>({
        queryKey: API_ROUTES.fooding.cart.queryKey,
        endPoint: API_ROUTES.fooding.cart.endpoint,
    })

    const cartItems = result?.data?.cartItems
    return (
        <div className='grid xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-8 items-start'>
            {products?.map((product) => {
                const cartItem = cartItems?.find(item => item?.product.id === product.id)
                return (
                    <ProductCard key={product.id} product={product} restaurantId={restaurantId} cartItem={cartItem} />
                )
            })}
        </div>
    )
}

export default ProductsGrid