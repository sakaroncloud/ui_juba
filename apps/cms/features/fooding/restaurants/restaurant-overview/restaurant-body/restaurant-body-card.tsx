import { CardItemProps } from "@/app/(dashboard)/restaurants/utils/utils";
import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";

export const RestaurantBodyCard = ({ value, label, Icon, iconColor, link }: CardItemProps) => {

    const cardContent = (
        <div className="bg-gray-100 rounded-xl p-4 border border-gray-300 shadow-sm">
            <span className="text-lg text-gray-700">{value}</span>
            <div className="flex items-center gap-2 justify-between">
                <div className="font-medium">{label}</div>
                <div>
                    <Icon className={cn("size-8", iconColor)} />
                </div>
            </div>
        </div>
    )
    return link ? (
        <Link href={link} passHref legacyBehavior>
            <a>{cardContent}</a>
        </Link>
    ) : cardContent
}