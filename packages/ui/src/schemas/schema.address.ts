import { z } from "zod";

const citySchema = z.string({
    required_error: "Please select city"
})

export const addressFormSchema = z.object({
    streetOne: z.string().min(2, {
        message: "Please enter at least 2 characters"
    }),
    area: z.string().min(2, {
        message: "Please enter at least 2 characters"
    }),
    mapLink: z.string().optional().nullable(),
    pincode: z.string().optional().nullable(),

    isDefault: z.boolean().optional().default(false).nullable(),
    label: z.string().optional().default("default").nullable(),
    landmark: z.string().optional().nullable(),

    buildingName: z.string().optional().nullable(),
    floor: z.string().min(1, {
        message: "Please enter at least 1 characters"
    }).or(z.string().nullable().optional()),
    city: citySchema
})



export type TAddressForm = z.infer<typeof addressFormSchema>

export const addressDefaultValues: Partial<TAddressForm> = {
    streetOne: "",
    area: "",
    mapLink: "",
    buildingName: "",
    floor: "",
    city: "",
    label: "",
    landmark: "",
    pincode: ""
}


export const cityFormSchema = z.object({
    name: z.string().min(2, {
        message: "Please enter at least 2 characters"
    }),

    pincodes: z.array(z.object({
        id: z.string(),
        text: z.string(),
    })).optional()
})

export type TCityForm = z.infer<typeof cityFormSchema>