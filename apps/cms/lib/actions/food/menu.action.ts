"use server"

import { menuFormSchema, TMenuForm } from "@repo/ui/schemas/fooding/schema.menu";
import { SubmitHandler } from "../global.action";
import { API_ROUTES } from "@repo/ui/lib/routes";


export async function submitMenu(formData: TMenuForm, param?: string | number) {

    const validationFields = menuFormSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }



    return await SubmitHandler({
        ENDPOINT: API_ROUTES.fooding.menu.endpoint,
        METHOD: param ? "PATCH" : "POST",
        DATA: validationFields.data,
        PARAM: param
    })

}

