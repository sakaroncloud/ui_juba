import { API_ROUTES } from "@repo/ui/lib/routes";

import { OrderStatus } from "@repo/ui/types/order.types";
import { PrivateSubmitHandler } from "../global.action";

export async function addToCart(productId: number, restaurantId: number | string) {

    return await PrivateSubmitHandler({
        ENDPOINT: API_ROUTES.cart.endpoint,
        METHOD: "POST",
        DATA: {
            productId,
            restaurantId
        }
    })
}



export async function updateOrder(orderId: string | number, orderStatus: OrderStatus) {

    return await PrivateSubmitHandler({
        ENDPOINT: API_ROUTES.order.endpoint + "/" + orderId + "/status",
        METHOD: "PATCH",
        DATA: {
            orderStatus
        }
    })
}

