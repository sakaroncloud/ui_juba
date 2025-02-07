"use server"

import { API_ROUTES } from "@repo/ui/lib/routes";
import { SubmitHandler } from "../global.action";
import { cuisineFormSchema, TCuisineForm } from "@repo/ui/schemas/fooding/schema.cuisine";

export async function submitCusine(formData: TCuisineForm, param?: string) {


    const validationFields = cuisineFormSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Submission failed",
            errors: validationFields.error.flatten().fieldErrors,
        };
    }

    return await SubmitHandler({
        ENDPOINT: API_ROUTES.fooding.cuisine.endpoint,
        METHOD: param ? "PATCH" : "POST",
        DATA: validationFields.data,
        PARAM: param
    })

}

