"use client";
import React from "react";
import { settings } from "./settings";
import { SectionCarousel } from "../section-carousel/section-carousel";
import { BrandCarouselItem } from "./brand-carousel-item";
import { useFetch } from "@/hooks/useFetch";
import { ResponseWithMeta } from "@repo/ui/types/response.type";
import { API_ROUTES } from "@repo/ui/lib/routes";


type Props = {
  title: string;
  subtitle: string;
  showOnlyVeg?: boolean;
};

type TRestaurant = {
  id: string;
  slug: string;
  name: string;
  isPureVeg: boolean;
  featuredImage: {
    url: string;
  };
};

export const BrandsCarousel = ({
  title,
  subtitle,
  showOnlyVeg = false,
}: Props) => {
  const query = `?selectFields=id,name,${showOnlyVeg ? "isPureVeg," : ""}slug,description&selectRelations=logo,featuredImage,address`;
  console.log(query);
  const { data: restaurants } = useFetch<ResponseWithMeta<TRestaurant[]>>({
    endPoint: API_ROUTES.restaurant + query,
    queryKey: `restaurants${showOnlyVeg ? "veg" : ""}`,
  });

  return (
    <SectionCarousel
      settings={settings}
      title={title}
      subtitle={subtitle}
      dataLength={restaurants?.data?.length || 0}
    >
      {restaurants?.data?.map((item: TRestaurant) => (
        <BrandCarouselItem key={item.id} item={item} />
      ))}
    </SectionCarousel>
  );
};
