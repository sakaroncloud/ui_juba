"use server"

import { SubmitHandler } from "../global.action";
import { propertyBasicFormSchema, TPropertyBasicForm } from "@repo/ui/schemas/lodging/property/property-basic.schema";
import dayjs from "dayjs";
import { propertyAmenitiesC2SSchema, TPropertyAmenitiesClientForm } from "@repo/ui/schemas/lodging/property/property-amenities.schema";
import { propertyRulesC2SSchema, TPropertyRulesClientForm } from "@repo/ui/schemas/lodging/property/property-rules.schema";
import { propertyLocationsSchema, TPropertyLocationsForm } from "@repo/ui/schemas/lodging/property/property-locations.schema";
import { propertyGallerySchema, TPropertyGalleryClientForm } from "@repo/ui/schemas/lodging/property/property.gallery.schema";
import { roomGallerySchema, TRoomGalleryClientForm } from "@repo/ui/schemas/lodging/room/room.gallery.schema";
import { API_ROUTES } from "@repo/ui/lib/routes";


export async function submitProperty(formData: TPropertyBasicForm, param?: string) {
    const validationFields = propertyBasicFormSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }

    const formattedValues = {
        ...validationFields.data,
        languages: validationFields.data?.languages?.map((language) => language.value),
    }

    formattedValues.checkInStartTime = dayjs(`1970-01-01T${formattedValues.checkInStartTime}`).format("HH:mm");
    formattedValues.checkInEndTime = dayjs(`1970-01-01T${formattedValues.checkInEndTime}`).format("HH:mm");
    formattedValues.checkOutTime = dayjs(`1970-01-01T${formattedValues.checkOutTime}`).format("HH:mm");

    return await SubmitHandler({
        ENDPOINT: API_ROUTES.property.endpoint,
        METHOD: param ? "PATCH" : "POST",
        DATA: formattedValues,
        PARAM: param
    })
}

/**
 * 
 * @param formData | TPropertyAmenitiesClientForm
 * @param param 
 * @returns 
 */
export async function submitPropertyAmenities(formData: TPropertyAmenitiesClientForm, param: string) {
    const validationFields = propertyAmenitiesC2SSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }

    return await SubmitHandler({
        ENDPOINT: API_ROUTES.property.endpoint + "/" + param + "/amenities",
        METHOD: "PATCH",
        DATA: validationFields.data,
    })

}

export async function submitPropertyRules(formData: TPropertyRulesClientForm, param: string) {
    const validationFields = propertyRulesC2SSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }
    return await SubmitHandler({
        ENDPOINT: API_ROUTES.property.endpoint + "/" + param + "/rules",
        METHOD: "PATCH",
        DATA: validationFields.data,
    })

}

export async function submitPropertyLocations(formData: TPropertyLocationsForm, param: string) {
    const validationFields = propertyLocationsSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }
    return await SubmitHandler({
        ENDPOINT: API_ROUTES.property.endpoint + "/" + param + "/nearest-locations",
        METHOD: "PATCH",
        DATA: validationFields.data,
    })

}


export async function submitPropertyGallery(formData: TPropertyGalleryClientForm, param: string | number) {

    const validationFields = propertyGallerySchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }

    return await SubmitHandler({
        ENDPOINT: API_ROUTES.property.endpoint + "/" + param + "/gallery",
        METHOD: "PATCH",
        DATA: validationFields.data,
    })
}


export async function submitRoomGallery(formData: TRoomGalleryClientForm, param: string | number) {

    const validationFields = roomGallerySchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }


    return await SubmitHandler({
        ENDPOINT: API_ROUTES.room.endpoint + "/" + param + "/gallery",
        METHOD: "PATCH",
        DATA: validationFields.data,
    })
}
