import { z } from "zod";

export const orderCancelSchema = z.object({
    cancelReason: z.string().min(3)
})

export type TOrderCancelSchema = z.infer<typeof orderCancelSchema>;

export const assignRiderSchema = z.object({
    riderId: z.string().uuid({
        message: "Please select a rider"
    }),
})

export type TAssignRiderSchema = z.infer<typeof assignRiderSchema>;