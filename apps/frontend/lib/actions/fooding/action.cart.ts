import { API_ROUTES } from "@repo/ui/lib/routes";

import { OrderStatus } from "@repo/ui/types/order.types";
import { PrivateSubmitHandler } from "../global.action";

export async function addToCart(productId: number, restaurantId: number | string) {
    return await PrivateSubmitHandler({
        ENDPOINT: API_ROUTES.fooding.cart.endpoint,
        METHOD: "POST",
        DATA: {
            productId,
            restaurantId
        }
    })
}



export async function updateOrder(orderId: string | number, orderStatus: OrderStatus) {

    return await PrivateSubmitHandler({
        ENDPOINT: API_ROUTES.fooding.order.endpoint + "/" + orderId + "/status",
        METHOD: "PATCH",
        DATA: {
            orderStatus
        }
    })
}

export async function deleteCart() {
    return await PrivateSubmitHandler({
        ENDPOINT: API_ROUTES.fooding.cart.endpoint,
        METHOD: "DELETE",
        DATA: {

        }
    })
}
export async function deleteCartItem(itemId: number) {
    return await PrivateSubmitHandler({
        ENDPOINT: API_ROUTES.fooding.cart.cartItem.endpoint + "/" + itemId,
        METHOD: "DELETE",
        DATA: {

        }
    })
}
export async function checkOut() {
    return await PrivateSubmitHandler({
        ENDPOINT: API_ROUTES.fooding.order.checkout.endpoint,
        METHOD: "POST",
        DATA: {

        }
    })
}

export async function updateCartItem(itemId: number, action: "increase" | "decrease") {
    return await PrivateSubmitHandler({
        ENDPOINT: API_ROUTES.fooding.cart.cartItem.endpoint + "/" + itemId + "/" + action,
        METHOD: "PATCH",
        DATA: {

        }
    })
}