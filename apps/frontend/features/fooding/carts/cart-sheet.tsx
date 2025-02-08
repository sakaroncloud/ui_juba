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
import React, { useEffect, useTransition } from "react";
import { checkOut, deleteCart, deleteCartItem } from "@/lib/actions/fooding/action.cart";
import { cn, handleToast } from "@repo/ui/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import EmptyCart from "@/public/icons/empty-cart.png"
import Image from "next/image";
import CustomButton from "@/components/custom-button";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { CartIncrementButton } from "./cart-increment-button";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TAddress } from "@repo/ui/types/address.types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export const CartSheet = () => {
  const router = useRouter()
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "cart-sheet";
  const [selectedAddressId, setSelectedAddressId] = React.useState<string | null>(null);

  const { data: result } = useFetch<ResponseWithNoMeta<Restaurant.Cart.TCart>>({
    queryKey: API_ROUTES.fooding.cart.queryKey,
    endPoint: API_ROUTES.fooding.cart.endpoint,
  })

  const { data: address } = useFetch<ResponseWithNoMeta<TAddress[]>>({
    queryKey: API_ROUTES.profile.customer.address.queryKey,
    endPoint: API_ROUTES.profile.customer.address.endpoint,
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

  const defaultAddress = address?.data.find(address => address.isDefault)

  useEffect(() => {
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id)
    }
  }, [defaultAddress])

  return (
    <Sheet open={isModalOpen} onOpenChange={onClose} modal={false} >
      <SheetContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="p-0 flex flex-col gap-0">
        <SheetHeader className="p-4">
          <SheetTitle className="p-0 text-base space-y-1">
            <div>My Cart</div>

            {
              address?.data.map((address) => {
                const addressText = [
                  address?.streetOne,
                  address?.area,
                  address?.pincode,
                  address?.buildingName,
                  address?.landmark,
                  address?.city.name
                ].filter(Boolean).join(", ")
                return (
                  <div key={address.id} onClick={() => {
                    setSelectedAddressId(address.id)
                  }} className={cn("text-xs px-3 py-1 cursor-pointer  transition-all  bg-slate-100 font-light text-gray-800 rounded-xl inline-flex gap-x-1 items-center", selectedAddressId === address.id && "bg-emerald-200/60")}>
                    <FaMapMarkerAlt className="text-primary size-3" />

                    {addressText}</div>
                )
              })
            }

          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 py-0">
          <div className="">
            <Separator className="bg-slate-100 h-0.5 w-full" />
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

                {selectedAddressId && (
                  <CartSheetFooter totalQuantity={data.totalQuantity} totalAmount={data.totalAmount} defaultAddressId={selectedAddressId} />
                )}
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

const CartSheetFooter = ({ totalAmount, totalQuantity, defaultAddressId }: { totalAmount: number, totalQuantity: number, defaultAddressId: string }) => {

  const [pending, startTransition] = useTransition()
  const queryClient = useQueryClient()
  const onCheckOut = async () => {
    startTransition(async () => {
      if (defaultAddressId) {
        const res = await checkOut(defaultAddressId)
        handleToast(res, () => {
          queryClient.invalidateQueries()
        })
      }
      else {
        toast.error("Please add an address to checkout")
      }

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