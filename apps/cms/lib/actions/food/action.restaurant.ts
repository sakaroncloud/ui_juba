"use server"

import { API_ROUTES } from "@repo/ui/lib/routes";
import { restaurantBasicFormSchema, TRestBasicForm } from "@repo/ui/schemas/fooding/restaurant/restaurant-basic.schema";
import { SubmitHandler } from "../global.action";
import { restaurantCuisineC2SSchema, TRestCuisineForm } from "@repo/ui/schemas/fooding/restaurant/restaurant-cuisine.schema";
import { restBrandingFormSchema, TRestBrandingForm } from "@repo/ui/schemas/fooding/restaurant/restaurant-branding.schema";
import { restaurantGallerySchema, TRestaurantGalleryClientForm } from "@repo/ui/schemas/fooding/restaurant/restaurant.gallery.schema";


export async function submitRestaurantBasic(formData: TRestBasicForm, param?: string | number) {
    const validationFields = restaurantBasicFormSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }
    const formattedValues = {
        ...validationFields.data,
        dayOfWeek: validationFields.data?.dayOfWeek?.map((day) => day.value),
    }
    return await SubmitHandler({
        ENDPOINT: API_ROUTES.fooding.restaurant.endpoint,
        METHOD: param ? "PATCH" : "POST",
        DATA: formattedValues,
        PARAM: param
    })
}


export async function submitRestaurant(formData: TRestBasicForm, param?: string) {
    const validationFields = restaurantBasicFormSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }

    const formattedValues = {
        ...validationFields.data,
        dayOfWeek: validationFields.data?.dayOfWeek?.map((day) => day.value),
    }


    return await SubmitHandler({
        ENDPOINT: API_ROUTES.fooding.restaurant.endpoint,
        METHOD: param ? "PATCH" : "POST",
        DATA: formattedValues,
        PARAM: param
    })

}


/**
 * Restaurant Cuisine
 */

export async function submitRestaurantCuisine(formData: TRestCuisineForm, param: string | number) {
    const validationFields = restaurantCuisineC2SSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }


    return await SubmitHandler({
        ENDPOINT: API_ROUTES.fooding.restaurant.endpoint + "/" + param + "/cuisines",
        METHOD: "PATCH",
        DATA: validationFields.data,
    })
}


/**
 * Restaurant Branding
 */


export async function updateRestaurantBrandings(formData: TRestBrandingForm, param: string | number) {
    const validationFields = restBrandingFormSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }



    return await SubmitHandler({
        ENDPOINT: API_ROUTES.fooding.restaurant.endpoint + "/" + param + "/brandings",
        METHOD: "PATCH",
        DATA: validationFields.data,
    })
}


export async function submitRestaurantGallery(formData: TRestaurantGalleryClientForm, param: string | number) {

    const validationFields = restaurantGallerySchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }

    return await SubmitHandler({
        ENDPOINT: API_ROUTES.fooding.restaurant.endpoint + "/" + param + "/gallery",
        METHOD: "PATCH",
        DATA: validationFields.data,
    })
}


