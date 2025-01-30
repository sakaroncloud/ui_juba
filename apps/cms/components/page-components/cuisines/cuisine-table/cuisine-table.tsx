"use client"
import { DataTable } from '@/components/table/data-table'
import React from 'react'
import { columns } from './columns'
import { useFetch } from '@/hooks/useFetch'
import { ResponseWithMeta } from '@repo/ui/types/response.type'
import { Restaurant } from '@repo/ui/types/restaurant.types'
import { API_ROUTES } from '@repo/ui/lib/routes'

export const CuisineTable = () => {
    const { data: result } = useFetch<ResponseWithMeta<Restaurant.Cuisine.TCuisine[]>>({
        endPoint: API_ROUTES.cuisine.endpoint,
        queryKey: API_ROUTES.cuisine.queryKey,
    });
    return (
        <DataTable columns={columns} data={result?.data || []}
            searchKey='name'
        />)
}
