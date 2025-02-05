import FallbackImage from "@/components/fallback-image"
import { AspectRatio } from "@repo/ui/components/aspect-ratio"
import { cn } from "@repo/ui/lib/utils"
import { Restaurant } from "@repo/ui/types/restaurant.types"
import AddToCartButton from "./add-to-cart-btn"

export const ProductCard = ({
    product,
    restaurantId,
    cartItem,
}: {
    product: Restaurant.Product.TProduct,
    restaurantId: number | string,
    cartItem?: Restaurant.Cart.TCartItem
}) => {

    return (
        <div
            className={cn("bg-white group p-2 rounded-xl border hover:scale-95 wie__transition__200 cursor-pointer hover:shadow-wie")}
        >
            <AspectRatio ratio={16 / 12} className="bg-muted shadow relative">
                <FallbackImage
                    alt={product.name}
                    src={product.bannerImage.url}
                    type="rectangle"
                    fill
                    sizes='(max-width: 768px) 100vw, 1200px'
                    className="h-full w-full rounded-xl object-cover"
                />
                <div className="absolute bottom-0 text-lg font-semibold flex flex-col justify-end inset-x-0 bg-gray-200/10 px-4 py-3    h-full w-full rounded-xl">

                </div>
            </AspectRatio>
            <div className="p-2 space-y-2">
                <div className="font-medium text-sm">{product.name}</div>
                <div className="font-light text-sm text-gray-500 line-clamp-1">{product.description}</div>
                <div className='flex items-center justify-between gap-x-2 !mt-8'>
                    <div className='font-medium '>
                        $ {product.price}
                    </div>
                    <AddToCartButton productId={product.id} restaurantId={restaurantId} cartItem={cartItem} />
                </div>
            </div>
        </div>
    )
}