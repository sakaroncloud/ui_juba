"use client";
import FallbackImage from "@/components/fallback-image";
import { useFetch } from "@/hooks/useFetch";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { ResponseWithNoMeta } from "@repo/ui/types/response.type";
import { Restaurant } from "@repo/ui/types/restaurant.types";

type Props = {
  slug: string;
};

export const CuisineHeader = ({ slug }: Props) => {
  const { data: result } = useFetch<ResponseWithNoMeta<Restaurant.Cuisine.TCuisine>>({
    endPoint: API_ROUTES.cuisine.endpoint,
    param: slug,
    queryKey: `singleCuisineHeader${slug}`,
  });



  const imageUrl = result?.data.bannerImage.url;
  const name = result?.data.name;
  const description = result?.data.description;

  return (
    <div className="h-[200px] bg-gradient-to-t from-slate-100">
      <div className="container h-full flex items-center">
        <div className="flex items-center justify-between my-auto h-fit w-full">
          <div>
            {
              result && (
                <div className="left flex items-center gap-4 w-fit">
                  {imageUrl && (
                    <div>
                      <FallbackImage
                        src={imageUrl}
                        height={100}
                        type="square"
                        width={100}
                        alt="Logo"
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h1 className="text__xl font-semibold capitalize">{name}</h1>
                    <p className="text__subtitle  text-gray-600">{description}</p>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};
