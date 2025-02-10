import { Restaurant } from "@repo/ui/types/restaurant.types"
import { formatDate } from "@repo/ui/lib/utils"
import { Calendar, CircleDollarSign, HandPlatter, Images, LucideIcon, Utensils } from "lucide-react"

export type TCardLabel = {
    label: string;
    link?: string;
}

export type CardItemProps = TCardLabel & {
    value: string | number;
    Icon: LucideIcon;
    iconColor: string;
}

export const generateRestaurantCards = (restaurant: Restaurant.TSingleRestaurant) => {


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