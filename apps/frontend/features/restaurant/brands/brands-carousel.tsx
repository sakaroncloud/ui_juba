"use client";
import React from "react";
import { settings } from "./settings";
import { SectionCarousel } from "../../../components/section-carousel";
import { BrandCarouselItem } from "./brand-carousel-item";
import { useFetch } from "@/hooks/useFetch";
import { ResponseWithMeta } from "@repo/ui/types/response.type";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { Restaurant } from "@repo/ui/types/restaurant.types";


type Props = {
  title: string;
  subtitle: string;
  showOnlyVeg?: boolean;
};


export const BrandsCarousel = ({
  title,
  subtitle,
  showOnlyVeg = false,
}: Props) => {
  const { data: restaurants } = useFetch<ResponseWithMeta<Restaurant.TRest[]>>({
    endPoint: API_ROUTES.restaurant.endpoint,
    queryKey: "restaurants",
  });

  return (
    <SectionCarousel
      settings={settings}
      title={title}
      subtitle={subtitle}
      dataLength={restaurants?.data?.length || 0}
    >
      {restaurants?.data?.map((item: Restaurant.TRest) => (
        <BrandCarouselItem key={item.id} item={item} />
      ))}
    </SectionCarousel>
  );
};
