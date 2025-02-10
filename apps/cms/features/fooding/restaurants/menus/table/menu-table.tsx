import { DataTable } from '@repo/ui/components/table/data-table'
import React from 'react'
import { columns } from './columns'
import { API_ROUTES } from '@repo/ui/lib/routes'

import { Restaurant } from '@repo/ui/types/restaurant.types'

import { notFound } from 'next/navigation';
import { getIDsFromSlug } from '@repo/ui/lib/utils'
import { getData } from '@/app/data'
import { ResponseWithNoMeta } from '@repo/ui/types/response.type'

type Props = {
    restaurantSlug: string
}
export const MenusTable = async ({ restaurantSlug }: Props) => {

    const { restaurantId } = getIDsFromSlug({
        restaurantSlug
    })

    if (!restaurantId) {
        notFound()
    }

    const result = await getData<ResponseWithNoMeta<Restaurant.Menu.TMenusResponse>>({
        endPoint: API_ROUTES.fooding.menu.endpoint + "?restaurantId=" + restaurantId,
        tags: [API_ROUTES.fooding.menu.queryKey, restaurantId]
    });


    if (!result?.data || !result.data.menus || !result.data.restaurant) {
        notFound()
    }

    const menus = result?.data?.menus?.map((menu: Restaurant.Menu.TMenu) => ({
        ...menu,
        restaurant: result.data.restaurant
    }))




    return (
        <DataTable searchKey='name' columns={columns} data={menus || []} showPagination={false} />)
}
