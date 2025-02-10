import { getData } from '@/app/data'
import { EditRestaurantWrapper } from '@/features/fooding/restaurants/edit-restaurant-wrapper'
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { parseAddressFromS2C } from '@/lib/utils/address.utils'
import { parseRestBasicFormFromS2C, parseRestCuisineFromS2C } from '@/lib/utils/restaurant.utils'

import { API_ROUTES } from '@repo/ui/lib/routes'

import { getIDsFromSlug } from '@repo/ui/lib/utils'
import { TParams } from '@repo/ui/types/global.type'
import { ResponseWithNoMeta } from '@repo/ui/types/response.type'
import { Restaurant } from '@repo/ui/types/restaurant.types'
import { notFound } from 'next/navigation'




const EditRestaurantPage = async ({ params }: TParams) => {
    const { restaurantSlug } = (await params)

    const { restaurantId, slugTempered } = getIDsFromSlug({
        restaurantSlug
    })

    if (!restaurantId || slugTempered) {
        notFound()
    }

    const result = await getData<ResponseWithNoMeta<Restaurant.TRest>>({
        endPoint: API_ROUTES.fooding.restaurant.endpoint,
        param: restaurantId,
        tags: ["restaurant", restaurantId]
    })

    if (!result?.data) notFound()

    const generalFormValues = parseRestBasicFormFromS2C(result?.data)

    if (!generalFormValues) notFound()

    const cuisines = parseRestCuisineFromS2C(result?.data)
    const brandings = {
        logo: result?.data?.logo,
        bannerImage: result?.data?.bannerImage
    }
    const galleries = result.data?.galleries
    const address = parseAddressFromS2C(result.data?.address)

    return (
        <DashboardProvider>
            <EditRestaurantWrapper generalFormValues={generalFormValues}
                cuisines={cuisines}
                brandings={brandings}
                galleries={galleries}
                address={address}
            />
        </DashboardProvider>
    )
}

export default EditRestaurantPage