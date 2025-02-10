import { TBaseWithSlug } from "@repo/ui/types/shared.types";

export type TCity = TBaseWithSlug & {
    pincodes: string[];
    totalAddresses: number;
};

export type TAddress = {
    id: string,
    streetOne: string;
    area: string;
    mapLink?: string;
    buildingName?: string;
    landmark?: string;
    floor?: string;
    city: TCity;
    isDefault: boolean;
    label: string;
    pincode: string;
};
