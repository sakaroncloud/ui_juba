"use server"

import { cityFormSchema, TCityForm } from "@repo/ui/schemas/schema.address";
import { SubmitHandler } from "./global.action";
import { API_ROUTES } from "@repo/ui/lib/routes";

export async function submitCity(formData: TCityForm, param?: string) {
    const validationFields = cityFormSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Submission failed",
            errors: validationFields.error.flatten().fieldErrors,
        };
    }

    const formattedData = {
        name: validationFields.data.name,
        pincodes: validationFields.data.pincodes?.map((pincode) => pincode.text) || []
    }

    return await SubmitHandler({
        ENDPOINT: API_ROUTES.city.endpoint,
        METHOD: param ? "PATCH" : "POST",
        DATA: formattedData,
        PARAM: param
    })

}

