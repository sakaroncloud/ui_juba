/** Basic shared entity fields */
export type TBase = {
    id: string;
    name: string;
};

/** Extended base entity with a slug */
export type TBaseWithSlug = TBase & {
    slug: string;
};



/** Base entity with an optional description */
export type TBaseWithDescription = TBaseWithSlug & {
    description?: string;
};

export type TInTBaseWithDescription = {
    id: number;
    name: string;
    description: string;
    slug: string;
};

/** Shared image type */
export type TImage = TBase & {
    url: string;
};


export enum EDiscountType {
    PERCENTAGE = "percentage",
    FIXED = "fixed"
}

export enum EWeekDay {
    MONDAY = "monday",
    TUESDAY = "tuesday",
    WEDNESDAY = "wednesday",
    THURSDAY = "thursday",
    FRIDAY = "friday",
    SATURDAY = "saturday",
    SUNDAY = "sunday"
}