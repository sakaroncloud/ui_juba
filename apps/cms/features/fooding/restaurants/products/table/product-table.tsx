
import { DataTable } from '@repo/ui/components/table/data-table'
import React from 'react'
import { columns } from './columns'
import { API_ROUTES } from '@repo/ui/lib/routes'

import { Restaurant } from '@repo/ui/types/restaurant.types'
import { getData } from '@/app/data'
import { getIDsFromSlug } from '@repo/ui/lib/utils'
import { ResponseWithNoMeta } from '@repo/ui/types/response.type'


type Props = {
    restaurantSlug: string;
}
export const ProductsTable = async ({ restaurantSlug }: Props) => {
    const { restaurantId } = getIDsFromSlug({
        restaurantSlug
    })

    if (!restaurantId) return null

    const result = await getData<ResponseWithNoMeta<Restaurant.Product.TProductsResponse>>({
        endPoint: API_ROUTES.fooding.product.endpoint + "?restaurantId=" + restaurantId,
        tags: [API_ROUTES.fooding.product.queryKey, restaurantId]
    });

    if (!result?.data || !result.data.products || !result.data.restaurant) return null

    const products = result?.data?.products?.map((product: Restaurant.Product.TProduct) => ({
        ...product,
        restaurant: result.data.restaurant,
    }))

    return (
        <DataTable searchKey='name' columns={columns} data={products || []} showPagination={true} />)
}
