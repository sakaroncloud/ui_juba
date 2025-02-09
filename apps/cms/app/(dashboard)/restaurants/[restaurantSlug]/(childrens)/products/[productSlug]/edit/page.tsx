import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import React from 'react'
import { getData } from '@/app/data'
import { notFound } from 'next/navigation'
import { getIDsFromSlug } from '@repo/ui/lib/utils'
import { ProductForm } from '@/features/fooding/restaurants/products/product-form'
import { Restaurant } from '@repo/ui/types/restaurant.types'
import { API_ROUTES } from '@repo/ui/lib/routes'
import { ResponseWithNoMeta } from '@repo/ui/types/response.type'
import { parseProductFromS2C } from '@/lib/utils/restaurant.utils'

type Props = {
    params: Promise<{ restaurantSlug: string, productSlug: string }>
}

const EditProductPage = async ({ params }: Props) => {
    const { restaurantSlug, productSlug } = await params

    const { restaurantId, productId, slugTempered } = getIDsFromSlug({
        restaurantSlug,
        productSlug
    })

    if (!restaurantId || slugTempered || !productId) {
        notFound()
    }


    const result = await getData<ResponseWithNoMeta<Restaurant.Product.TProduct>>({
        endPoint: API_ROUTES.fooding.product.endpoint,
        query: {
            key: "restaurantId",
            value: restaurantId
        },
        param: productId,
        tags: ["product", productId]
    })



    if (!result?.data) {
        notFound()
    }
    const product = parseProductFromS2C(result.data, +restaurantId)


    return (
        <CreatePageWrapper title='Edit Product'>
            <ProductForm
                formValues={product}
                productId={productId}
                restaurantSlug={restaurantSlug}
                defaultImages={result?.data?.bannerImage ? [{ id: result?.data.bannerImage.id, url: result?.data.bannerImage.url }] : []}
            />
        </CreatePageWrapper>
    )
}

export default EditProductPage