"use client"
import { Restaurant } from '@repo/ui/types/restaurant.types'
import React, { useEffect, useRef, useState } from 'react'
import { SingleRestaurantMenuSidebar } from './single-restaurant-menu-sidebar'
import { ProductCard, SingleRestaurantProductGallery, } from './single-restaurant-product-gallery'

type Props = {
  data: Restaurant.Menu.TMenusResponse
}
type MenuRefs = {
  [key: string]: React.RefObject<HTMLDivElement | null>; // Allow the ref to be null initially
};
export const SingleRestaurantBody = ({ data }: Props) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const headerHeight = (document.getElementById("site-header")?.clientHeight || 60); // Get the height of the header
    const calculateRootMargin = () => {
      const viewportHeight = window.innerHeight; // Get the current viewport height
      const bottomMargin = viewportHeight - headerHeight; // Subtract header height
      return `-${headerHeight + 40}px 0px -${bottomMargin - 40}px 0px`; // Use dynamic bottom margin
    };
    const observer = new IntersectionObserver(
      (entries) => {
        let activeItem: string | null = null; // Track the active menu item


        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeItem = entry.target.getAttribute("data-id")
          }
        });


        if (activeItem) {
          setActiveMenu(activeItem);
        }
      },
      {
        root: null, // Viewport is the root
        rootMargin: calculateRootMargin(), // Set dynamic bottom margin
        threshold: 0, // Trigger as soon as any pixel enters
      }
    );

    const items = document.querySelectorAll<HTMLElement>(".menu__title");
    items.forEach((item) => observer.observe(item));





    return () => {

      observer.disconnect(); // Disconnect observer on unmount
    };
  }, []);

  const active = activeMenu ? data.menus.find((menu) => menu.id == Number(activeMenu)) : null;
  console.log(active)
  return (
    <section className="bg-white"  >
      <div className="container lg:py-6 py-4  flex justify-between  flex-wrap lg:flex-row flex-col gap-10 relative">
        {/* <SingleRestaurantMenuSidebar menus={data.menus} /> */}
        {/* <SingleRestaurantProductGallery
          data={data}

        /> */}



      </div>
    </section>
  )
}
