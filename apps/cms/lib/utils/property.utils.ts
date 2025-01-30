import { propertyAmenitiesS2CSchema, TPropertyAmenitiesClientForm } from "@repo/ui/schemas/lodging/property/property-amenities.schema"
import { propertyLocationsServerSchema, TPropertyLocationsForm } from "@repo/ui/schemas/lodging/property/property-locations.schema"
import { propertyRulesS2CSchema, TPropertyRulesClientForm } from "@repo/ui/schemas/lodging/property/property-rules.schema"
import { propertyGalleryS2CSchema, TPropertyGalleryClientForm } from "@repo/ui/schemas/lodging/property/property.gallery.schema"
import { roomAmenitiesS2CSchema, TRoomAmenitiesClientForm } from "@repo/ui/schemas/lodging/room/room-amenities.schema"
import { roomBasicFormSchema, TRoomBasicForm } from "@repo/ui/schemas/lodging/room/room-basic.schema"
import { roomRulesS2CSchema, TRoomRulesClientForm } from "@repo/ui/schemas/lodging/room/room-rules.schema"



/**
 *  
 * @param amenitiesFromServer 
 * 
 * @returns TPropertyAmenitiesClientForm | null
 */
export const parsePAmenitiesFromS2C = (amenitiesFromServer: any): TPropertyAmenitiesClientForm | undefined => {
    const validatedFields = propertyAmenitiesS2CSchema.safeParse(amenitiesFromServer)
    if (validatedFields.success) {
        const data = validatedFields.data
        return data
    }
    return undefined
}

/**
 *  
 * @param rulesFromServer 
 * 
 * @returns TPropertyRulesClientForm | null
 */
export const parsePRulesFromS2C = (rulesFromServer: any): TPropertyRulesClientForm | undefined => {
    const validatedFields = propertyRulesS2CSchema.safeParse(rulesFromServer)
    if (validatedFields.success) {
        const data = validatedFields.data
        return data
    }
    return undefined
}


export const parsePLocationsFromS2C = (locationsFromServer: any): TPropertyLocationsForm | undefined => {
    const validatedFields = propertyLocationsServerSchema.safeParse(locationsFromServer)
    if (validatedFields.success) {
        return {
            places: validatedFields.data
        }
    }
    return undefined
}


export const parseRoomGeneralInfoFromS2C = (roomFromServer: any): TRoomBasicForm | undefined => {
    const validatedFields = roomBasicFormSchema.safeParse(roomFromServer)
    if (validatedFields.success) {
        return validatedFields.data
    }

    return undefined
}

export const parseRoomAmenitiesFromS2C = (roomFromServer?: any): TRoomAmenitiesClientForm | undefined => {
    const validatedFields = roomAmenitiesS2CSchema.safeParse(roomFromServer)
    if (validatedFields.success) {
        return validatedFields.data
    }
    return undefined
}

export const parseRoomRulesFromS2C = (roomFromServer?: any): TRoomRulesClientForm | undefined => {
    const validatedFields = roomRulesS2CSchema.safeParse(roomFromServer)
    if (validatedFields.success) {
        return validatedFields.data
    }
    return undefined
}

export const parsePropertyGalleryFromS2C = (gallery: any): TPropertyGalleryClientForm | undefined => {
    const validatedFields = propertyGalleryS2CSchema.safeParse({
        galleryIds: gallery
    })

    if (validatedFields.success) {
        return validatedFields.data
    }
    return undefined
}