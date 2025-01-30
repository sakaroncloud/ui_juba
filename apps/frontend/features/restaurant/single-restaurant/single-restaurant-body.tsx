import { Restaurant } from '@repo/ui/types/restaurant.types'
import React from 'react'
import { SingleRestaurantMenuSidebar } from './single-restaurant-menu-sidebar'
import { SingleRestaurantProductGallery } from './single-restaurant-product-gallery'
type Props = {
  data: Restaurant.Menu.TMenusResponse
}

export const SingleRestaurantBody = ({ data }: Props) => {

  return (
    <section className="bg-white">
      <div className="container py-6 flex justify-between  flex-wrap lg:flex-row flex-col gap-10 relative">
        <SingleRestaurantMenuSidebar menus={data.menus} />
        <SingleRestaurantProductGallery data={data} />
      </div>
    </section>
  )
}
