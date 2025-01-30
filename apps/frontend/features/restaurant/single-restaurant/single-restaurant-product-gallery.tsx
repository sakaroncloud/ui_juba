import FallbackImage from '@/components/fallback-image'
import { AspectRatio } from '@repo/ui/components/aspect-ratio'
import { Button } from '@repo/ui/components/button'
import { Restaurant } from '@repo/ui/types/restaurant.types'
import { ShoppingBag } from 'lucide-react'
import React from 'react'
type Props = {
    data: Restaurant.Menu.TMenusResponse
}

export const SingleRestaurantProductGallery = ({ data }: Props) => {
    return (
        <div className='flex-1 space-y-8'>
            {data.menus.map((menu, i) => {
                return (
                    <div key={menu.id} className='space-y-6'>
                        <div className='text__large font-semibold uppercase'>{menu.name}</div>
                        <div className='grid xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-8 items-start'>
                            {menu.products?.map((product, i) => {
                                return (
                                    <ProductCard key={product.id} product={product} />
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}


export const ProductCard = ({
    product
}: {
    product: Restaurant.Product.TProduct
}) => {
    return (
        <div
            className="bg-white group p-2 rounded-xl border hover:scale-95 wie__transition__200 cursor-pointer hover:shadow-wie"
        >
            <AspectRatio ratio={16 / 12} className="bg-muted shadow">
                <FallbackImage
                    alt={product.name}
                    src={product.bannerImage.url}
                    type="rectangle"
                    fill
                    className="h-full w-full rounded-xl object-cover"
                />
                <div className="absolute bottom-0 text-lg font-semibold flex flex-col justify-end inset-x-0 bg-gray-200/10 px-4 py-3    h-full w-full rounded-xl">

                </div>
            </AspectRatio>
            <div className="p-2 space-y-2">
                <div className="font-medium text-sm">{product.name}</div>
                <div className="font-light text-sm text-gray-500 line-clamp-1">{product.description}</div>
                <div className='flex items-center justify-between gap-x-2 !mt-8'>
                    <div className='font-medium '>
                        $ {product.price}
                    </div>
                    <Button variant={'outline'} className='text-sm text-primary border-primary rounded-xl py-5 px-3 hover:bg-primary hover:text-white wie__transition__200'>
                        <ShoppingBag />
                        <span>Add to Cart</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}