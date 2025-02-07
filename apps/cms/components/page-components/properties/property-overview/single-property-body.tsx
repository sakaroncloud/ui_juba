
import { formatDate } from "@repo/ui/lib/utils";
import { RestaurantBodyCard } from "../../restaurants/restaurant-overview/restaurant-body/restaurant-body-card";
import { Calendar, CircleDollarSign, DoorClosed, GalleryHorizontalIcon } from "lucide-react";
import { getData } from "@/app/data";
import { ResponseWithNoMeta } from "@repo/ui/types/response.type";
import { Property } from "@repo/ui/types/property.types";
import { API_ROUTES } from "@repo/ui/lib/routes";

type Props = {
    propertyId: string;
}
export const SinglePropertyBody = async ({ propertyId }: Props) => {
    const result = await getData<ResponseWithNoMeta<Property.TProperty>>({
        endPoint: API_ROUTES.lodging.property.endpoint,
        param: propertyId,
        tags: ["property", propertyId]
    });

    const property = result?.data

    if (!property) return null

    return (
        <div className="flex justify-between gap-4 flex-wrap h-fit">
            <div className="grid grid-cols-3 gap-4 p-6  rounded-lg flex-1">
                <RestaurantBodyCard
                    Icon={Calendar}
                    value={formatDate(property.createdAt)}
                    label={"Registered Since"}
                    iconColor={"text-blue-500"}
                />

                <RestaurantBodyCard
                    Icon={DoorClosed}
                    value={property.totalRooms}
                    label={"Total Rooms"}
                    iconColor={"text-blue-500"}
                    link={`/properties/${property.slug}/rooms`}
                />

                <RestaurantBodyCard
                    Icon={GalleryHorizontalIcon}
                    value={property.totalUploads}
                    label={"Media"}
                    iconColor={"text-blue-500"}
                    link={`/properties/${property.slug}/medias`}
                />

                <RestaurantBodyCard
                    Icon={CircleDollarSign}
                    value={property.defaultCommissionPercentage}
                    label={"Commission Percentage"}
                    iconColor={"text-blue-500"}
                />
            </div>
        </div>
    )
}
