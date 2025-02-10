import React from "react";
import DarkLogo from "@/public/logo.png";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@repo/ui/lib/utils";

type Props = {
  className?: string;
  type: "dark" | "light";
};

const SiteLogo = ({ type, className }: Props) => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <Image
        alt="Logo"
        src={type === "dark" ? DarkLogo : DarkLogo}
        width={600}
        height={600}
        quality={100}
        className={cn("md:h-10 w-auto h-8", className)}
      />
    </Link>
  );
};

export default SiteLogo;
