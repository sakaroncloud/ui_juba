import { DataTable } from '@/components/table/data-table'
import React from 'react'
import { columns } from './columns'
import { ResponseWithMeta } from '@repo/ui/types/response.type'

import { API_ROUTES } from '@repo/ui/lib/routes'

import { Restaurant } from '@repo/ui/types/restaurant.types'
import { getData } from '@/app/data'


type Props = {
    showDeleted?: boolean
}

export const RestaurantTable = async ({ showDeleted }: Props) => {

    const result = await getData<ResponseWithMeta<Restaurant.TRest[]>>({
        endPoint: API_ROUTES.restaurant.endpoint + "?deleted=" + showDeleted,
        tags: ["restaurant"]
    });


    const filteredData = result?.data?.map((restaurant) => ({
        ...restaurant,
        isDeleted: showDeleted,
    }))



    return (
        <DataTable columns={columns} data={filteredData || []} showDeleted={showDeleted}
            searchKey='name'
        />)
}
