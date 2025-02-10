
import { API_ROUTES } from '@repo/ui/lib/routes'

import { getData } from '@/app/data';
import { ResponseWithNoMeta } from '@repo/ui/types/response.type';
import { Property } from '@repo/ui/types/property.types';

type Props = {
    propertySlug: string;
}
export const RoomsTable = async ({ propertySlug }: Props) => {

    const propertyId = propertySlug.split("--")?.[1]

    const result = await getData<ResponseWithNoMeta<Property.TRoom[]>>({
        endPoint: API_ROUTES.lodging.room.endpoint + "?propertyId=" + propertyId,
        tags: [API_ROUTES.lodging.room.queryKey, propertySlug]
    });

    if (!result?.data) return null

    const filteredData = result.data.map((room) => {
        return {
            ...room,
            property: {
                id: propertyId,
                slug: propertySlug
            }
        }
    })


    return (
        null
        // <DataTable searchKey='name' columns={columns} data={filteredData || []} showPagination={false} />
    )
}
