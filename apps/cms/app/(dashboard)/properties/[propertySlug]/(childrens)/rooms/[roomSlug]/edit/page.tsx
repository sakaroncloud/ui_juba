import { getData } from '@/app/data'
import { EditRoomWrapper } from '@/features/lodging/pages/rooms/edit-room-wrapper'
import { parseRoomAmenitiesFromS2C, parseRoomGeneralInfoFromS2C, parseRoomRulesFromS2C } from '@/lib/utils/property.utils'
import { API_ROUTES } from '@repo/ui/lib/routes'

import { getIDsFromSlug } from '@repo/ui/lib/utils'
import { Property } from '@repo/ui/types/property.types'
import { ResponseWithNoMeta } from '@repo/ui/types/response.type'
import { notFound } from 'next/navigation'
type Props = {
    params: Promise<{ propertySlug: string, roomSlug: string, }>
}
const RoomEditPage = async ({ params }: Props) => {
    const { propertySlug, roomSlug } = await params

    const { propertyId, roomId, slugTempered } = getIDsFromSlug({
        propertySlug,
        roomSlug,
    })

    if (slugTempered || propertyId === undefined || roomId === undefined) notFound()

    const result = await getData<ResponseWithNoMeta<Property.TRoom>>({
        endPoint: API_ROUTES.lodging.room.endpoint,
        query: {
            key: "propertyId",
            value: propertyId
        },
        param: roomId,
        tags: ["room", roomId]
    })

    if (!result?.data) notFound()

    const generalInfo = parseRoomGeneralInfoFromS2C({
        ...result.data,
        propertyId: +propertyId
    })

    if (!generalInfo) notFound()


    const amenities = parseRoomAmenitiesFromS2C({
        ...result.data?.amenities,
        propertyId: +propertyId
    })

    const rules = parseRoomRulesFromS2C({
        ...result.data?.rules,
        propertyId: +propertyId
    })

    const galleries = result.data?.galleries

    return (
        <EditRoomWrapper generalFormValues={generalInfo} roomId={roomId} roomAmenities={amenities} rules={rules}
            galleries={galleries}
        />
    )
}

export default RoomEditPage