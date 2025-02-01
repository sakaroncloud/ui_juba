import { TAddress } from "@repo/ui/types/address.types";
import { EDiscountType, EWeekDay, TBaseWithDescription, TImage, TInTBaseWithDescription } from "@repo/ui/types/shared.types";
import { TAsyncGallery } from "@repo/ui/types/upload.type";

export namespace Restaurant {


    // Sub-Namespace for products
    export namespace Product {
        /** Defines a product entity in the restaurant */
        export type TProduct = {
            id: number;
            name: string;
            slug: string;
            description: string;
            price: number;
            preparationTime: number;
            bannerImage: TImage;
            menus?: Pick<Menu.TMenu, "id" | "name">[];
        };

        export type TProductsResponse = {
            products: TProduct[]
            restaurant: Pick<TRest, "id" | "slug" | "name">
        }
    }
    // Sub-NameSpace for Menus
    export namespace Menu {
        /** Defines a cuisine entity */
        export type TMenu = TInTBaseWithDescription & {
            products?: Omit<Product.TProduct, "menus">[];
            totalProducts?: number;
        };
        export type TMenusResponse = {
            menus: TMenu[]
            restaurant: Pick<TRest, "id" | "slug" | "name" | "isPureVeg">
        }
    }

    export namespace Cuisine {
        export type TCuisine = TBaseWithDescription & {
            description: string;
            bannerImage: TImage;
            restaurants: TRest[];
        };

        export type TSingleCuisinePage = {
            cuisine: TCuisine;
            restaurants: TRest[];
        }
    }


    // Global Offer Definition
    /** Represents a global discount or offer */
    export type TGlobalOffer = {
        heading: string;
        subHeading: string;
        actualValue: number;
        type: EDiscountType;
        maxUpTo: number;
    };

    // Main Restaurant Type
    /** Defines the main restaurant entity */
    export type TSingleRestaurant = TBaseWithDescription & {
        hasGlobalOffer?: TGlobalOffer;
        description: string;
        email?: string;
        phone: string;
        isPureVeg: boolean;
        isEnabled: boolean;
        logo: TImage;
        bannerImage: TImage;
        defaultCommissionPercentage: number; // admin-only field
        averagePreparationTime: number;
        address?: TAddress;
        dayOfWeek: EWeekDay[];
        openingTime: string;
        closingTime: string;
        cuisines?: Omit<Cuisine.TCuisine, "bannerImage" | "restaurants" | "slug">[];
        createdAt: string;
        totalProducts: number;
        totalMenus: number;
        totalCuisines: number;
        totalUploads: number;
        galleries?: TAsyncGallery;

    };

    export type TRest = Omit<TSingleRestaurant, | "totalProducts" | "totalMenus" | "totalCuisines" | "totalUploads"> & {

    }
}