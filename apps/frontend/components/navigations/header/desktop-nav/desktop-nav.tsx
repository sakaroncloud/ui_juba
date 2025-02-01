import Link from "next/link";
import { FoodingNavItems } from "../fooding/nav-items";
import { HotelNavItems } from "../lodging/nav-items";
import { getSession } from "@/lib/actions/session";
import { SignInButton, UserNav } from "../user-nav";

const DesktopNav = async ({ type }: { type: "food" | "room" }) => {
  const session = await getSession();

  const Items = type === "food" ? FoodingNavItems : HotelNavItems;
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
          return session ? (
            <div key={index} className="flex items-center gap-2">
              <UserNav />
            </div>
          ) : (
            <SignInButton key={index} />
          );
        }
      })}
    </nav>
  );
};

export default DesktopNav;
