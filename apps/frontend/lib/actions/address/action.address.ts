import { addressFormSchema, TAddressForm } from "@repo/ui/schemas/schema.address";
import { PrivateSubmitHandler } from "../global.action";
import { API_ROUTES } from "@repo/ui/lib/routes";

export async function submitAddress(formData: TAddressForm, param?: string) {
    const validationFields = addressFormSchema.safeParse(formData);
    if (!validationFields.success) {
        return {
            message: "Data tempered",
        };
    }
    return await PrivateSubmitHandler({
        ENDPOINT: API_ROUTES.profile.customer.address.endpoint,
        METHOD: param ? "PATCH" : "POST",
        DATA: validationFields.data,
        PARAM: param
    })
}