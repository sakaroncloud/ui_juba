import { DataTable } from '@repo/ui/components/table/data-table'
import React from 'react'
import { columns } from '../restaurant-table/columns'
import { API_ROUTES } from '@repo/ui/lib/routes'

import { Restaurant } from '@repo/ui/types/restaurant.types'
import { getData } from '@/app/data'
import { ResponseWithMeta } from '@repo/ui/types/response.type'


export const RestaurantTable = async () => {

    const result = await getData<ResponseWithMeta<Restaurant.TRest[]>>({
        endPoint: API_ROUTES.fooding.restaurant.endpoint,
        tags: ["restaurant"]
    });


    return (
        <DataTable columns={columns} data={result?.data || []} />)
}
