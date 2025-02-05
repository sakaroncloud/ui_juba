"use client"
import ProductGrid from '@/features/fooding/product/products-grid'
import { useFetch } from '@/hooks/useFetch'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { API_ROUTES } from '@repo/ui/lib/routes'
import { generateSlug } from '@repo/ui/lib/utils'
import { ResponseWithNoMeta } from '@repo/ui/types/response.type'
import { Restaurant } from '@repo/ui/types/restaurant.types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
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

    // when hash changes, scroll to the corresponding element - with an offset
    useSmoothScroll()
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
                                <ProductGrid products={menu.products} restaurantId={data.restaurant.id} />
                            </div>
                        )
                    }}
                </InView>
            ))}
        </div>
    )
}

