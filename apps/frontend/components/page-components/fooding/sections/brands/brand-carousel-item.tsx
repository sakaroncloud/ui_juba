"use client";

import FallbackImage from "@/components/fallback-image";
import { BACKEND_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";

type TRestaurant = {
  id: string;
  slug: string;

  name: string;
  featuredImage: {
    url: string;
  };
};

type Props = {
  item: TRestaurant;
};

export const BrandCarouselItem = ({ item }: Props) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/restaurant/${item.slug}`)}
      key={item.id}
      className="pr-4"
    >
      <div className=" flex items-center relative flex-col justify-center p-6 rounded-xl  hover:scale-95 wie__transition__200  group   cursor-pointer ">
        <FallbackImage
          src={item.featuredImage.url}
          type="square"
          alt={item.name}
          width={100}
          height={100}
          className="rounded-md object-contain h-[80px] w-auto mb-2"
        />
        <div className="text-center">{item.name}</div>
        <div className="h-1/3 w-[1px] bg-slate-200 absolute right-0"></div>
      </div>
    </div>
  );
};
