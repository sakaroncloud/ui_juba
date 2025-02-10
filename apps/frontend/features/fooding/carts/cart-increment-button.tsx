import CustomButton from "@/components/custom-button";
import { updateCartItem } from "@/lib/actions/fooding/action.cart";
import { handleToast } from "@repo/ui/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";

type TActionButtonProps = {
    quantity: number;
    itemId: number;
}
export const CartIncrementButton = ({ itemId, quantity }: TActionButtonProps) => {
    const [pending, startTransition] = useTransition()
    const queryClient = useQueryClient()
    const handleChange = (action: "increase" | "decrease") => {
        const changeQuantity = async () => {
            startTransition(async () => {
                const res = await updateCartItem(itemId, action)
                handleToast(res, () => {
                    queryClient.invalidateQueries()
                })
            })
        }
        changeQuantity()
    }
    return (
        <div className="flex items-center gap-2">
            <CustomButton
                variant={"outline"}
                disabled={quantity === 1 || pending}
                onClick={() => handleChange("decrease")}
                size={"icon"}
                className="rounded-lg size-7"
                label="-"
                pending={false}
            >
            </CustomButton>
            <span className="text-sm">{quantity}</span>
            <CustomButton
                disabled={pending}
                label="+"
                variant={"outline"}
                size={"icon"}
                className="rounded-lg size-7"
                pending={false}
                onClick={() => handleChange("increase")}
            />
        </div>
    )
}
