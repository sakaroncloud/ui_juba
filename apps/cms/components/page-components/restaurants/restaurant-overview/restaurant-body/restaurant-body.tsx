import { getData } from "@/app/data";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { ResponseWithNoMeta } from "@repo/ui/types/response.type";
import { Restaurant } from "@repo/ui/types/restaurant.types";
import { RestaurantBodyCard } from "./restaurant-body-card";

import { Calendar, CircleDollarSign, HandPlatter, Images, Utensils } from "lucide-react"
import { formatDate } from "@repo/ui/lib/utils";
import { CardItemProps } from "@/app/(dashboard)/restaurants/utils/utils";


type Props = {
    restaurantId: string;
}

const generateRestaurantCards = (restaurant: Restaurant.TSingleRestaurant) => {


    const cards: Record<string, CardItemProps> = {
        registeredDate: {
            value: formatDate(restaurant.createdAt),
            label: "Registered Since",
            Icon: Calendar,
            iconColor: "text-blue-500",
        },
        totalProducts: {
            value: restaurant.totalProducts || 0,
            label: "Total Products",
            Icon: HandPlatter,
            link: `/restaurants/${restaurant.slug}/products`,
            iconColor: "text-orange-500",
        },
        totalMenus: {
            value: restaurant.totalMenus || 0,
            label: "Total Menus",
            Icon: Utensils,
            link: `/restaurants/${restaurant.slug}/menus`,
            iconColor: "text-green-500",
        },
        totalCuisines: {
            value: restaurant.totalCuisines || 0,
            label: "Total Cuisines",
            Icon: Utensils,
            iconColor: "text-green-500",
        },
        totalUploads: {
            value: restaurant.totalUploads,
            label: "All Medias",
            Icon: Images,
            link: `/restaurants/${restaurant.slug}/medias`,
            iconColor: "text-gren-500",
        },
        defaultCommissionPercentage: {
            value: restaurant.defaultCommissionPercentage,
            label: "Commission Percentage (%)",
            Icon: CircleDollarSign,
            iconColor: "text-purple-500",
        }
    }

    return cards
}

export const RestaurantBody = async ({ restaurantId }: Props) => {

    const result = await getData<ResponseWithNoMeta<Restaurant.TSingleRestaurant>>({
        endPoint: API_ROUTES.restaurant.endpoint,
        param: restaurantId,
        tags: ["restaurant", restaurantId]
    });

    const restaurant = result?.data

    if (!restaurant) return null


    const cards = generateRestaurantCards(restaurant)


    return (
        <div className="flex justify-between gap-4 flex-wrap h-fit">
            <div className="grid grid-cols-3 gap-4 p-6  rounded-lg flex-1">
                {Object.keys(cards).map((key) => {
                    const card = cards[key as keyof typeof cards]; // Explicit type assertion
                    if (card) {
                        return (
                            <RestaurantBodyCard
                                key={key}
                                Icon={card.Icon}
                                value={card.value}
                                label={card.label}
                                iconColor={card.iconColor}
                                link={card.link}
                            />
                        );
                    }
                    return null; // Fallback to satisfy TypeScript
                })}
            </div>
        </div>
    )
}




