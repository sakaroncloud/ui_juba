import { UI_ROUTES } from "@/lib/routes";
import { Hotel, ShoppingCart, User } from "lucide-react";

export const FoodingNavItems = [
  {
    label: "Hotel Booking",
    icon: Hotel,
    href: "/rooms",
  },
  {
    icon: ShoppingCart,
    href: UI_ROUTES.ACCOUNT_CART,
  },
  {
    label: "Sign In",
    icon: User,
  },
];
