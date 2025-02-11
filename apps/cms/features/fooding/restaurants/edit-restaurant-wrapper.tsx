"use client";

import { useState } from "react";
import { ScrollArea, ScrollBar } from "@repo/ui/components/scroll-area";

import { MultiStepTabs } from "@/components/form/multi-step-tabs";
import { notFound } from "next/navigation";
import { RestaurantBasicForm } from "./forms/restaurant-basic-form";
import { RestaurantCuisineForm } from "./forms/restaurant-cuisine-form";
import { RestaurantBrandingForm } from "./forms/restaurant-branding-form";
import { RestaurantGalleryForm } from "./forms/restaurant-gallery-form";
import { RestaurantAddressForm } from "./forms/restaurant-address-form";
import { TRestBasicForm } from "@repo/ui/schemas/fooding/restaurant/restaurant-basic.schema";
import { TAsyncGallery, TDefaultImage } from "@repo/ui/types/upload.type";
import { TAddressForm } from "@repo/ui/schemas/schema.address";
import { TRestCuisineForm } from "@repo/ui/schemas/fooding/restaurant/restaurant-cuisine.schema";
import { cn } from "@repo/ui/lib/utils";
import { CreatePageWrapper } from "@/components/providers/create-page-wrapper";

type Props = {
  generalFormValues: TRestBasicForm & { id: number };
  galleries?: TAsyncGallery;
  address?: TAddressForm;
  cuisines?: TRestCuisineForm;
  brandings?: {
    logo?: TDefaultImage;
    bannerImage?: TDefaultImage;
  };
};

export const EditRestaurantWrapper = ({
  address,
  brandings,
  cuisines,
  galleries,
  generalFormValues,
}: Props) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: "General Info",
      value: "general",
      published: true,
    },
    {
      label: "Cuisines",
      value: "cuisines",
      published:
        (cuisines?.cuisines && cuisines?.cuisines?.length > 0) || false,
    },
    {
      label: "Branding",
      value: "branding",
      published:
        (brandings &&
          brandings?.bannerImage !== null &&
          brandings?.logo !== null) ||
        false,
    },

    {
      label: "Gallery",
      value: "gallery",
      published:
        galleries !== undefined && galleries !== null && galleries?.length > 0,
    },

    {
      label: "Offers",
      value: "offers",
      published: false,
    },

    {
      label: "Address",
      value: "address",
      published: address !== undefined && address !== null,
    },
  ];

  if (!generalFormValues) {
    notFound();
  }

  return (
    <div className="space-y-5">
      <MultiStepTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />
      <ScrollArea className=" h-[calc(100vh-200px)]">
        <ScrollBar />
        <div className={cn("hidden", activeTab == 0 && "block")}>
          <CreatePageWrapper title="General Info">
            <RestaurantBasicForm formValues={generalFormValues} />
          </CreatePageWrapper>
        </div>
        <div className={cn("hidden", activeTab == 1 && "block")}>
          <CreatePageWrapper>
            <RestaurantCuisineForm
              restaurantId={generalFormValues.id}
              formValues={cuisines}
            />
          </CreatePageWrapper>
        </div>
        <div className={cn("hidden", activeTab == 2 && "block")}>
          <CreatePageWrapper>
            <RestaurantBrandingForm
              restaurantId={generalFormValues.id}
              defaultImages={brandings}
            />
          </CreatePageWrapper>
        </div>
        <div className={cn("hidden", activeTab == 3 && "block")}>
          <CreatePageWrapper>
            <RestaurantGalleryForm
              restaurantId={generalFormValues.id}
              defaultImages={galleries}
            />
          </CreatePageWrapper>
        </div>
        <div className={cn("hidden", activeTab == 4 && "block")}></div>

        <div className={cn("hidden", activeTab == 5 && "block")}>
          <CreatePageWrapper title="Address">
            <RestaurantAddressForm
              restaurantId={generalFormValues?.id}
              formValues={address}
            />
          </CreatePageWrapper>
        </div>
      </ScrollArea>
    </div>
  );
};
