import { roomBasicFormSchema, TRoomBasicForm } from "@repo/ui/schemas/lodging/room/room-basic.schema";
import { SubmitHandler } from "../global.action";
import { roomAmenitiesC2SSchema, TRoomAmenitiesClientForm } from "@repo/ui/schemas/lodging/room/room-amenities.schema";
import { roomRulesC2SSchema, TRoomRulesClientForm } from "@repo/ui/schemas/lodging/room/room-rules.schema";
import { API_ROUTES } from "@repo/ui/lib/routes";

export async function submitRoom(formData: TRoomBasicForm, param?: string) {
    const validationFields = roomBasicFormSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }

    return await SubmitHandler({
        ENDPOINT: API_ROUTES.lodging.room.endpoint,
        METHOD: param ? "PATCH" : "POST",
        DATA: validationFields.data,
        PARAM: param
    })
}

export async function updateRoomAmenities(formData: TRoomAmenitiesClientForm, param: string | number) {
    const validationFields = roomAmenitiesC2SSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }


    return await SubmitHandler({
        ENDPOINT: API_ROUTES.lodging.room.endpoint + "/" + param + "/amenities",
        METHOD: "PATCH",
        DATA: validationFields.data,
    })
}

export async function updateRoomRules(formData: TRoomRulesClientForm, param: string | number) {
    const validationFields = roomRulesC2SSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }

    return await SubmitHandler({
        ENDPOINT: API_ROUTES.lodging.room.endpoint + "/" + param + "/rules",
        METHOD: "PATCH",
        DATA: validationFields.data,
    })
}