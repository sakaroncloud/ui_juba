"use client";

import * as React from "react";
import {
  Bike,
  DollarSign,
  Hotel,
  Images,
  LayoutDashboard,
  MapPin,
  Rocket,
  Settings,
  ShieldCheck,
  Store,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@repo/ui/components/sidebar";
import { NavServices } from "./nav-services";
import { PiBowlFood } from "react-icons/pi";
import Logo from "@/public/white-logo-icon.png";
import { SidebarLogoArea } from "./sidebar-logo-area";
import { ScrollArea } from "@repo/ui/components/scroll-area";

// This is sample data.
const data = {
  user: {
    name: "Juba Hospitality",
    email: "contact@jubahospitality.com",
    avatar: "/avatars/shadcn.jpg",
  },
  services: [
    {
      name: "Food Dashboard",
      logo: Logo,
      plan: "Food Delivery",
      icon: Store,
    },
    {
      name: "Lodging Dashboard",
      logo: Logo,
      plan: "Room Booking",
      icon: Hotel,
    },
  ],

  overview: [
    {
      name: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
  ],

  fooding: [
    {
      name: "Restaurants",
      url: "/restaurants",
      icon: Store,
      items: [
        {
          name: "All restaurants",
          url: "/restaurants",
        },
        {
          name: "Add New",
          url: "/restaurants/add",
        },
      ],
    },

    {
      name: "Cuisines (Category)",
      url: "/restaurants/cuisines",
      icon: PiBowlFood,
      items: [
        {
          name: "All cuisines",
          url: "/restaurants/cuisines",
        },
        {
          name: "Add New",
          url: "/restaurants/cuisines/add",
        },
      ],
    },

    {
      name: "Orders & Transactions",
      url: "/restaurants/orders",
      icon: DollarSign,
      items: [
        {
          name: "All orders",
          url: "/restaurants/orders",
        },
        {
          name: "Transactions",
          url: "/restaurants/transactions",
        },
      ],
    },

    {
      name: "Gallery",
      url: "/restaurants/gallery",
      icon: Images,
    },
  ],

  lodging: [
    {
      name: "Properties",
      url: "/properties",
      icon: Hotel,
      items: [
        {
          name: "All Properties",
          url: "/properties",
        },
        {
          name: "Add New",
          url: "/properties/add",
        },
      ],
    },

    {
      name: "Bookings & Transactions",
      url: "/properties/bookings",
      icon: DollarSign,
      items: [
        {
          name: "All Bookings",
          url: "/properties/bookings",
        },
        {
          name: "Transactions",
          url: "/properties/transactions",
        },
      ],
    },

    {
      name: "Gallery",
      url: "/properties/gallery",
      icon: Images,
    },
  ],

  settings: [
    {
      name: "General Settings",
      url: "/settings",
      icon: Settings,
    },

    {
      name: "SEO",
      url: "/settings",
      icon: Rocket,
    },
  ],

  misc: [
    {
      name: "Cities",
      url: "/cities",
      icon: MapPin,
      items: [
        {
          name: "All Cities",
          url: "/cities",
        },
        {
          name: "Add New",
          url: "/cities/add",
        },
      ],
    },
  ],
  users: [
    {
      name: "Staffs",
      url: "/staffs",
      icon: ShieldCheck,
    },

    {
      name: "Riders",
      url: "/riders",
      icon: Bike,
    },

    {
      name: "Customers",
      url: "/customers",
      icon: Users,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-white">
        <SidebarLogoArea />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <ScrollArea>
          <NavServices title={"Overview"} services={data.overview} />
          <NavServices
            title={"Restaurant Management"}
            services={data.fooding}
          />

          <NavServices title={"Lodging"} services={data.lodging} />
          <NavServices title={"Miscellaneous"} services={data.misc} />
          <NavServices title={"Users Management"} services={data.users} />

          <NavServices title={"Settings"} services={data.settings} />
        </ScrollArea>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
