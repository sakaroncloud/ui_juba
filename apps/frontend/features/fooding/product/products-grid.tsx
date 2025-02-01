import React from 'react'
import { ProductCard } from './product-card'
import { Restaurant } from '@repo/ui/types/restaurant.types'

const ProductsGrid = ({ products, restaurantId }: { products?: Restaurant.Product.TProduct[], restaurantId: number | string }) => {
    return (
        <div className='grid xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-8 items-start'>
            {products?.map((product, i) => {
                return (
                    <ProductCard key={product.id} product={product} restaurantId={restaurantId} />
                )
            })}
        </div>
    )
}

export default ProductsGrid