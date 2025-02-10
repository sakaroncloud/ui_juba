import Link from "next/link";

import { getSession } from "@/lib/actions/session";
import { SignInButton, UserNav } from "../user-nav";
import { Hotel } from "lucide-react";
import { CartSheetTriggerer } from "@/features/fooding/carts/cart-sheet-triggerer";

const DesktopNav = async ({ type }: { type: "food" | "room" }) => {
  const session = await getSession();

  return (
    <nav className="md:flex items-center gap-8 w-fit hidden">

      <Link
        href={"/"}

        className="flex items-center gap-2 hover:text-primary wie__transition__200"
      >
        <Hotel className="size-5" />
        <span>Hotel Booking</span>
      </Link>

      <CartSheetTriggerer />

      {
        session ? (
          <div className="flex items-center gap-2">
            <UserNav />
          </div>
        ) : (
          <SignInButton />
        )
      }

    </nav>
  );
};

export default DesktopNav;
