import { DataTable } from '@repo/ui/components/table/data-table'
import React from 'react'
import { columns } from './columns';
import { API_ROUTES } from '@repo/ui/lib/routes';
import { getData } from '@/app/data';
import { ResponseWithNoMeta } from '@repo/ui/types/response.type';
import { TCity } from '@repo/ui/types/address.types';


export const CityTable = async () => {
    const result = await getData<ResponseWithNoMeta<TCity[]>>({
        endPoint: API_ROUTES.city.endpoint,
        tags: ["city"]
    })


    return (
        <DataTable columns={columns} data={result?.data || []} />)
}
