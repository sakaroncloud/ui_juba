import { getData } from '@/app/data'
import { EditPropertyWrapper } from '@/components/page-components/properties/edit-property-wrapper'
import { API_ROUTES } from '@repo/ui/lib/routes'

import { TPropertyBasicForm } from '@repo/ui/schemas/lodging/property/property-basic.schema'
import { notFound } from 'next/navigation'
import { ResponseWithNoMeta } from '@repo/ui/types/response.type'
import { Property } from '@repo/ui/types/property.types'
import { parsePAmenitiesFromS2C, parsePLocationsFromS2C, parsePRulesFromS2C } from '@/lib/utils/property.utils'
import { parseAddressFromS2C } from '@/lib/utils/address.utils'
type Props = {
    params: Promise<{ propertySlug: string }>
}

const EditPropertyPage = async ({ params }: Props) => {
    const propertySlug = (await params).propertySlug
    const propertyId = propertySlug.split("--")?.[1]

    if (!propertyId) notFound()
    const result = await getData<ResponseWithNoMeta<Property.TProperty>>({
        endPoint: API_ROUTES.lodging.property.endpoint,
        param: propertyId,
        tags: ["property", propertyId]
    });

    if (!result?.data) {
        notFound()
    }

    const generalData: TPropertyBasicForm & { id: string, slug: string } = {
        ...result.data,
        languages: result.data.languages.map((language) => ({
            label: language.charAt(0).toUpperCase() + language.slice(1).toLowerCase(),
            value: language
        })),
    }

    const aminities = parsePAmenitiesFromS2C(result.data?.amenities)
    const rules = parsePRulesFromS2C(result.data?.rules)
    const locations = parsePLocationsFromS2C(result.data?.nearestLocations)

    const address = parseAddressFromS2C(result.data?.address)
    const galleries = result.data.galleries

    return (
        <EditPropertyWrapper address={address} galleries={galleries} generalFormValues={generalData} amenities={aminities} rules={rules} nearestLocations={locations} />
    )
}

export default EditPropertyPage