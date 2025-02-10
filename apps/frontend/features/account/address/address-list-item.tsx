"use client"

import { TAddress } from "@repo/ui/types/address.types"
import { Badge } from "@repo/ui/components/badge"
import { Button } from "@repo/ui/components/button"
import { BsThreeDots } from "react-icons/bs";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";
import { useModal } from "@/hooks/useModal";

export const AddressListItem = ({ address }: { address: TAddress }) => {
    const { onOpen } = useModal();

    return (
        <div className="p-4 shadow-md bg-white rounded-xl basis-1/4 space-y-1.5">
            <div className="flex items-center justify-between gap-4">
                <div className="space-x-2">
                    <Badge className="text-xs capitalize font-light rounded-xl">{address.label}</Badge>
                    {address.isDefault && (
                        <Badge variant={"outline"} className="text-xs font-light">
                            Default
                        </Badge>
                    )}
                </div>
                <Popover modal={false}>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            size={"sm"}
                            className="size-5 rounded-full border-primary p-1"
                        >
                            <BsThreeDots className="text-primary size-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-fit flex flex-col p-0"
                    >
                        <button
                            onClick={() => {
                                onOpen("address-modal", {
                                    addressId: address.id,
                                    label: address.label,
                                    streetOne: address.streetOne || "",
                                    area: address.area || "",
                                    pincode: address.pincode || "",
                                    buildingName: address.buildingName || "",
                                    landmark: address.landmark || "",
                                    city: address.city.slug,
                                    isDefault: address.isDefault || false
                                })
                            }}
                            className="rounded-sm rounded-b-none text-sm  border-0 border-b pt-1 px-2">
                            Edit
                        </button>
                        <button
                            onClick={() => onOpen("address-delete-modal", {
                                addressId: address.id
                            })}
                            className="rounded-sm rounded-t-none text-sm  border-0 py-1 px-2">
                            Delete
                        </button>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="text-sm capitalize">
                {[
                    address?.streetOne,
                    address?.city?.name,
                    address?.area,
                    address?.buildingName,
                    address?.pincode,
                ]
                    .filter(Boolean)
                    .join(', ')}
            </div>
        </div>
    )
}
