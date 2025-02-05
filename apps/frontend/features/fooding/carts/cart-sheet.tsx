"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/components/sheet";
import { useModal } from "@/hooks/useModal";
import { useFetch } from "@/hooks/useFetch";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { Restaurant } from "@repo/ui/types/restaurant.types";
import { ResponseWithNoMeta } from "@repo/ui/types/response.type";
import { Separator } from "@repo/ui/components/separator";
import FallbackImage from "@/components/fallback-image";
import { Button } from "@repo/ui/components/button";
import { Trash2, X } from "lucide-react";
import { useTransition } from "react";
import { checkOut, deleteCart, deleteCartItem } from "@/lib/actions/fooding/action.cart";
import { handleToast } from "@repo/ui/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import EmptyCart from "@/public/icons/empty-cart.png"
import Image from "next/image";
import CustomButton from "@/components/custom-button";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { CartIncrementButton } from "./cart-increment-button";

export const CartSheet = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "cart-sheet";

  const { data: result } = useFetch<ResponseWithNoMeta<Restaurant.Cart.TCart>>({
    queryKey: API_ROUTES.cart.queryKey,
    endPoint: API_ROUTES.cart.endpoint,
  })

  const data = result?.data

  const [pending, startTransition] = useTransition()
  const queryClient = useQueryClient()

  const onDelete = async () => {
    startTransition(async () => {
      const res = await deleteCart()
      handleToast(res, () => {
        queryClient.invalidateQueries()
      })
    })
  }

  return (
    <Sheet open={isModalOpen} onOpenChange={onClose} modal={false} >

      <SheetContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="p-0 flex flex-col">
        <SheetHeader className="p-4">
          <SheetTitle className="">My Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1">
          <div className="">
            <Separator className="bg-slate-100 h-1 w-full" />
            {!data && <EmptyCartImage />}
            {data && (
              <div className="p-4">
                {/* restaTaurant Name */}
                <div className="flex items-center gap-2 justify-between">
                  <div className="font-semibold text-sm">{data?.restaurant.name}</div>
                  <Button
                    onClick={onDelete}
                    variant={"ghost"} className="rounded-lg">
                    <Trash2 />
                  </Button>
                </div>

                {/* Cart Items */}
                <div className="">
                  {data?.cartItems?.map((item) => (
                    <CartItem key={item.id} restaurantName={data.restaurant.name} item={item} />
                  ))}
                </div>

                <CartSheetFooter totalQuantity={data.totalQuantity} totalAmount={data.totalAmount} />
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};




const CartItem = ({ restaurantName, item }: { restaurantName: string, item: Restaurant.Cart.TCartItem }) => {
  const queryClient = useQueryClient()
  const deleteItem = async () => {
    const res = await deleteCartItem(item.id)
    handleToast(res, () => {
      queryClient.invalidateQueries()
    })
  }

  return (
    <div className="flex items-center gap-4 border-b-2 py-3 border-slate-100">
      <FallbackImage type="square" src={item.product.bannerImage.url || ""}
        errorClassName="h-10 w-10 text-[10px] text-primary"
        alt={restaurantName} width={60} height={60} className="rounded-lg" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2 justify-between">
          <p className="text-sm text-wrap">{item.product.name}</p>
          <X onClick={deleteItem} className="size-4 text-primary cursor-pointer" />
        </div>
        <div className="flex items-center gap-2 justify-between">
          <p className="text-sm text-primary font-semibold">${item.price}</p>

          <CartIncrementButton
            quantity={item.quantity}
            itemId={item.id}
          />
        </div>
      </div>
    </div>
  )
}

const EmptyCartImage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <Image src={EmptyCart} alt="Empty Cart" className="size-36" />
      <p className="font-light">There are no items in this cart</p>
    </div>
  )
}

const CartSheetFooter = ({ totalAmount, totalQuantity }: { totalAmount: number, totalQuantity: number }) => {

  const [pending, startTransition] = useTransition()
  const queryClient = useQueryClient()
  const onCheckOut = async () => {
    startTransition(async () => {
      const res = await checkOut()
      handleToast(res, () => {
        queryClient.invalidateQueries()
      })
    })
  }

  return (
    <div className=" flex py-4 items-center justify-between bg-white">
      <div>
        <p className="text-sm font-semibold">Subtotal</p>
        <p className="text-sm text-primary font-semibold">${totalAmount}</p>
      </div>
      <CustomButton
        onClick={onCheckOut}
        label={`Checkout (${totalQuantity})`}
        variant="default"
        pending={pending}
      />
    </div>
  )
}