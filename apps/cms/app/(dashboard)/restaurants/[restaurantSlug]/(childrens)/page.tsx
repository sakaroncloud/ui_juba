import { RestaurantBody } from '@/features/fooding/restaurants/restaurant-overview/restaurant-body/restaurant-body'
import SingleRestaurantProvider from '@/features/fooding/restaurants/single-restaurant-provider'
import { getIDsFromSlug } from '@repo/ui/lib/utils'
import { notFound } from 'next/navigation'


type Props = {
    params: Promise<{ restaurantSlug: string }>
}

const SingleRestaurantOverviewPage = async ({ params }: Props) => {
    const restaurantSlug = (await params).restaurantSlug

    const { restaurantId, slugTempered } = getIDsFromSlug({
        restaurantSlug
    })

    if (!restaurantId || slugTempered) {
        notFound()
    }
    return (
        <SingleRestaurantProvider restaurantSlug={restaurantSlug}>
            <RestaurantBody restaurantId={restaurantId} />
        </SingleRestaurantProvider>
    )
}

export default SingleRestaurantOverviewPage