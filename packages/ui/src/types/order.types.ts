import { Restaurant } from "@repo/ui/types/restaurant.types";
import { User } from "@repo/ui/types/user.types";

export const OrderStatusDisplay = {
    PENDING: 'Pending',
    CONFIRMED: 'Confirmed',
    PROCESSING: 'Processing',
    READY: 'Ready',
    OUT_FOR_DELIVERY: 'Out for Delivery',
    DELIVERED: 'Delivered',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
};


export enum PaymentStatus {
    PAID = 'PAID',
    PENDING = 'PENDING',
}

export enum OrderStatus {
    PENDING = 'PENDING', // Order is created but not yet confirmed
    CONFIRMED = 'CONFIRMED', // Order is confirmed and ready to be processed
    PROCESSING = 'PROCESSING', // Order is preparing in restaurant
    READY = 'READY', // Ready for delivery
    OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
}

export const OrderByDateGroup = {
    TODAY: 'Today',
    YESTERDAY: 'Yesterday',
    LAST_7_DAYS: 'Last 7 days orders',
    LAST_15_DAYS: 'Last 14 days orders',
    LAST_30_DAYS: 'Last 30 days orders',
}


export namespace Order {
    export type TOrder = {
        id: number;
        createdAt: string;
        updatedAt: string;
        deletedAt?: string;
        orderStatus: OrderStatus // Add other possible statuses as needed
        cancelledReason?: string;
        cancelledAt?: string;
        paymentStatus: PaymentStatus;
        isOverDue: boolean;
        totalAmount: number;
        totalCommission: number;
        user: User.TUser;
        rider?: User.TRiderProfile
        orderItems: TOrderItem[];
        totalItems: number;
        estimateTime: number;
        restaurant: Pick<Restaurant.TRest, "id" | "name" | "phone" | "email" | "address">;
        address: {
            area: string;
            city: string;
            pincode?: string;
            buildingName?: string;
            landmark?: string;
            streetOne?: string;
        }
    };

    export type TOrderItem = {
        id: number;
        preparationTime: number,
        name: string,
        quantity: number,
        totalAmount: number,
        price: number,
        note: string | null,
        commissionPercentage: number,
        totalCommission: number,
        product?: Pick<Restaurant.Product.TProduct, "id" | "name" | "slug" | "price" | "preparationTime" | "bannerImage">
    }
}