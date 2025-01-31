"use client"
import { Restaurant } from '@repo/ui/types/restaurant.types'
import React, { useEffect, useRef, useState } from 'react'
import { SingleRestaurantMenuSidebar } from './single-restaurant-menu-sidebar'
import { ProductCard, SingleRestaurantProductGallery, } from './single-restaurant-product-gallery'
import { useInView } from "react-intersection-observer";


type Props = {
  data: Restaurant.Menu.TMenusResponse
}
type MenuRefs = {
  [key: string]: React.RefObject<HTMLDivElement | null>; // Allow the ref to be null initially
};
export const SingleRestaurantBody = ({ data }: Props) => {
  const [visibleMenu, setVisibleMenu] = useState(data.menus[0]?.id || "0");
  return (
    <section className="bg-white"  >
      <div className="container lg:py-6 py-4  flex justify-between  flex-wrap lg:flex-row flex-col gap-10 relative">
        <SingleRestaurantMenuSidebar menus={data.menus} visibleMenu={visibleMenu} />
        <SingleRestaurantProductGallery
          data={data}
          setVisibleMenu={setVisibleMenu}

        />
      </div>
    </section>
  )
}
