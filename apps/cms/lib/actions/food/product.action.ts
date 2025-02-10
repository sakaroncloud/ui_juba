"use server"

import { productC2SSchema, TProductForm } from "@repo/ui/schemas/fooding/schema.product";
import { SubmitHandler } from "../global.action";
import { API_ROUTES } from "@repo/ui/lib/routes";


export async function submitProduct(formData: TProductForm, param?: string | number) {
    const validationFields = productC2SSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }


    return await SubmitHandler({
        ENDPOINT: API_ROUTES.fooding.product.endpoint,
        METHOD: param ? "PATCH" : "POST",
        DATA: validationFields.data,
        PARAM: param,
    })

}

