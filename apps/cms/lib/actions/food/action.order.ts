import { API_ROUTES } from "@repo/ui/lib/routes";
import { SubmitHandler } from "../global.action";
import { OrderStatus } from "@repo/ui/types/order.types";
import { assignRiderSchema, orderCancelSchema, TAssignRiderSchema, TOrderCancelSchema } from "@repo/ui/schemas/fooding/restaurant/restaurant.order.schema";

export async function cancelOrder(orderId: string | number, formData: TOrderCancelSchema) {
    const validationFields = orderCancelSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }
    return await SubmitHandler({
        ENDPOINT: API_ROUTES.fooding.order.endpoint + "/" + orderId + "/cancel",
        METHOD: "PATCH",
        DATA: validationFields.data
    })
}

export async function updateOrder(orderId: string | number, orderStatus: OrderStatus) {
    console.log(orderStatus, "orderStatus")
    return await SubmitHandler({
        ENDPOINT: API_ROUTES.fooding.order.endpoint + "/" + orderId + "/status",
        METHOD: "PATCH",
        DATA: {
            orderStatus
        }
    })
}

export async function assignRider(orderId: string | number, formData: TAssignRiderSchema) {
    const validationFields = assignRiderSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }
    return await SubmitHandler({
        ENDPOINT: API_ROUTES.fooding.order.endpoint + "/" + orderId + "/assign-rider",
        METHOD: "PATCH",
        DATA: validationFields.data
    })
}