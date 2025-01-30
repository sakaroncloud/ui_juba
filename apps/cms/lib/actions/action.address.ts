"use server"

import { addressFormSchema, TAddressForm } from "@repo/ui/schemas/schema.address";
import { SubmitHandler } from "./global.action";


export async function submitAddress(formData: TAddressForm, ENDPOINT: string) {
    const validationFields = addressFormSchema.safeParse(formData)
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }

    return await SubmitHandler({
        ENDPOINT,
        METHOD: "PATCH",
        DATA: validationFields.data,
    })

}

