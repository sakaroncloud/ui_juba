import Link from "next/link";
import { SignInSheet } from "./sign-in-sheet";
import { Menu } from "lucide-react";
import { FoodNavItems } from "../food-header-nav-items";
import { HotelNavItems } from "../room-header-nav-items";
import { getSession } from "@/lib/actions/session";
import Image from "next/image";

const DesktopNav = async ({ type }: { type: "food" | "room" }) => {
  const aaa = await getSession();

  const Items = type === "food" ? FoodNavItems : HotelNavItems;
  return (
    <nav className="md:flex items-center gap-8 w-fit hidden">
      {Items.map((item, index) => {
        if (item.href) {
          return (
            <Link
              href={item.href}
              key={index}
              className="flex items-center gap-2 hover:text-primary wie__transition__200"
            >
              <item.icon className="size-5" />
              <span>{item.label}</span>
            </Link>
          );
        } else {
          return aaa ? (
            <div key={index} className="flex items-center gap-2">
              <Image
                src={"/icons/avatar.png"}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col text-sm">
                <span className="font-light">Hi! {aaa.user.name}</span>
                <span>My Account</span>
              </div>
            </div>
          ) : (
            <SignInSheet key={index}>
              <div
                key={index}
                className="flex items-center hover:shadow-md gap-2 hover:text-primary wie__transition__200 shadow rounded-3xl border border-gray-200 py-3 px-4"
              >
                <Menu className="size-5" />
                <item.icon className="size-5" />
              </div>
            </SignInSheet>
          );
        }
      })}
    </nav>
  );
};

export default DesktopNav;
