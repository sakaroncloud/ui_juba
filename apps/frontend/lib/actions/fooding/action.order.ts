import { API_ROUTES } from "@repo/ui/lib/routes";
import { OrderStatus } from "@repo/ui/types/order.types";
import { orderCancelSchema, TOrderCancelSchema } from "@repo/ui/schemas/fooding/restaurant/restaurant.order.schema";
import { PrivateSubmitHandler } from "../global.action";

export async function cancelOrder(orderId: string | number, formData: TOrderCancelSchema) {
    const validationFields = orderCancelSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }
    return await PrivateSubmitHandler({
        ENDPOINT: API_ROUTES.order.endpoint + "/" + orderId + "/cancel",
        METHOD: "PATCH",
        DATA: validationFields.data
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

