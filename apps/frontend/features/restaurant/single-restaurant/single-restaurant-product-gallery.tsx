import FallbackImage from '@/components/fallback-image'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { AspectRatio } from '@repo/ui/components/aspect-ratio'
import { Button } from '@repo/ui/components/button'
import { cn, generateSlug } from '@repo/ui/lib/utils'
import { Restaurant } from '@repo/ui/types/restaurant.types'
import { ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { InView } from "react-intersection-observer";


type Props = {
    data: Restaurant.Menu.TMenusResponse,
    setVisibleMenu: React.Dispatch<React.SetStateAction<string | number>>
}

export const SingleRestaurantProductGallery = ({ data, setVisibleMenu }: Props) => {
    const router = useRouter()
    const [rootMargin, setRootMargin] = useState('');


    // callback called when a section is in view
    const setInView = (inView: boolean, entry: IntersectionObserverEntry) => {
        if (inView) {
            setVisibleMenu(entry.target.getAttribute("id") || "0");
            router.push(`#${entry.target.getAttribute("id")}`, {
                scroll: false,
            })
        }
    };

    useEffect(() => {
        // Ensure that window is defined before accessing it
        if (typeof window !== 'undefined') {
            const calculateRootMargin = () => {
                const viewportHeight = window.innerHeight; // Get the current viewport height
                const bottomMargin = viewportHeight - 60; // Subtract header height
                return `-${60 + 50}px 0px -${bottomMargin}px 0px`; // Use dynamic bottom margin
            };

            setRootMargin(calculateRootMargin());
        }
    }, []); // Empty dependency array to run only once when the component mounts

    useSmoothScroll()
    // Use the custom hook to enable smooth scroll with offset
    return (
        <div className='flex-1 space-y-8'>
            {rootMargin && data.menus.map((menu) => (
                <InView onChange={setInView} key={menu.id} threshold={0} rootMargin={rootMargin}>
                    {({ ref }) => {
                        return (
                            <div
                                key={menu.id} className='space-y-6 '>
                                <div ref={ref} id={`${generateSlug(menu.name)}`} data-id={menu.id} className='text__medium font-semibold uppercase menu__title'

                                >{menu.name}</div>
                                <div className='grid xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-8 items-start'>
                                    {menu.products?.map((product, i) => {
                                        return (
                                            <ProductCard key={product.id} product={product} />
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    }}
                </InView>
            ))}
        </div>
    )
}


export const ProductCard = ({
    product,
}: {

    product: Restaurant.Product.TProduct,
}) => {
    return (
        <div
            className={cn("bg-white group p-2 rounded-xl border hover:scale-95 wie__transition__200 cursor-pointer hover:shadow-wie")}
        >
            <AspectRatio ratio={16 / 12} className="bg-muted shadow relative">
                <FallbackImage
                    alt={product.name}
                    src={product.bannerImage.url}
                    type="rectangle"
                    fill
                    sizes='(max-width: 768px) 100vw, 1200px'
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