import { getData } from '@/app/data'
import { CuisineForm } from '@/features/fooding/cuisines/cuisine-form'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { API_ROUTES } from '@repo/ui/lib/routes'
import { ResponseWithNoMeta } from '@repo/ui/types/response.type'
import { Restaurant } from '@repo/ui/types/restaurant.types'
import { notFound } from 'next/navigation'

type Props = {
    cuisineSlug: string
}


export const EditCuisineWrapper = async ({ cuisineSlug }: Props) => {

    const result = await getData<ResponseWithNoMeta<Restaurant.Cuisine.TCuisine>>({
        endPoint: API_ROUTES.fooding.cuisine.endpoint,
        param: cuisineSlug,
        tags: ["cuisine", cuisineSlug]
    });

    if (!result?.data) {
        notFound()
    }

    return (

        <CreatePageWrapper title='Edit Cuisine'>
            <CuisineForm
                formValues={
                    {
                        ...result?.data,
                        id: result?.data?.slug,
                        bannerImage: result?.data?.bannerImage?.id
                    }
                }
                defaultImages={result?.data?.bannerImage ? [{ id: result?.data.bannerImage.id, url: result?.data.bannerImage.url }] : []}
            />
        </CreatePageWrapper>
    )
}

