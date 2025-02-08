
export enum Role {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    OPERATION_MANAGER = 'OPERATION_MANAGER',
    LISTING_MANAGER = 'LISTING_MANAGER',
    RIDER = 'RIDER',
    RESTAURANT_MANAGER = 'RESTAURANT_MANAGER',
    PROPERTY_MANAGER = 'PROPERTY_MANAGER',
    CUSTOMER = 'CUSTOMER',
}

export enum EDocumentType {
    PASSPORT = "PASSPORT",
    DRIVER_LICENSE = "DRIVER_LICENSE",
    NATIONAL_ID = "NATIONAL_ID",
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

export const GendersOptions = Object.keys(Gender).map((key) => ({
    value: Gender[key as keyof typeof Gender],
    label: key.slice(0, 1).toUpperCase() + key.slice(1)
}))


export namespace User {
    export type TUser = {
        id: string;
        email: string;
        newEmail?: string;
        emailVerified: null | string;
        customerProfile?: TBaseProfile;
        staffProfile?: TBaseProfile;
        riderProfile?: Omit<TRiderProfile, "user">;
        role: Role;
        createdAt: string;
    }

    type TBaseProfile = {
        id: string;
        fullName: string;
        phone?: string;
        dob?: string;
        gender: Gender;
    }

    export type TRiderProfile = TBaseProfile & {
        user: Pick<TUser, "id" | "email" | "role">
    }

    export type TCustomerProfile = TBaseProfile & {
        user: Pick<TUser, "id" | "email" | "role" | "newEmail">
    }

}