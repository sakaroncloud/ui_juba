import { OrderStatus } from "@repo/ui/types/order.types";

const statusClasses: Record<
  OrderStatus,
  { bg: string; text: string; label: string }
> = {
  [OrderStatus.PENDING]: {
    bg: "bg-yellow-100 text-yellow-800 border-yellow-300",
    text: "text-yellow-800",
    label: "Pending",
  },
  [OrderStatus.CONFIRMED]: {
    bg: "bg-blue-100 text-blue-800 border-blue-300",
    text: "text-blue-800",
    label: "Confirmed",
  },
  [OrderStatus.PROCESSING]: {
    bg: "bg-indigo-100 text-indigo-800 border-indigo-300",
    text: "text-indigo-800",
    label: "Processing",
  },
  [OrderStatus.READY]: {
    bg: "bg-purple-100 text-purple-800 border-purple-300",
    text: "text-purple-800",
    label: "Ready",
  },
  [OrderStatus.OUT_FOR_DELIVERY]: {
    bg: "bg-orange-100 text-orange-800 border-orange-300",
    text: "text-orange-800",
    label: "Out for Delivery",
  },
  [OrderStatus.DELIVERED]: {
    bg: "bg-green-100 text-green-800 border-green-300",
    text: "text-green-800",
    label: "Delivered",
  },
  [OrderStatus.CANCELLED]: {
    bg: "bg-red-100 text-red-800 border-red-300",
    text: "text-red-800",
    label: "Cancelled",
  },
};

export const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const { bg, text, label } = statusClasses[status];
  return (
    <span className={`px-3 py-1 text-xs rounded-full border ${bg} ${text}`}>
      {label}
    </span>
  );
};
