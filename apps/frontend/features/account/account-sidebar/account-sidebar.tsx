"use client"

import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons/lib";

type Props = {
    navLinks: {
        name: string;
        href: string;
        icon: IconType
    }[],
    children: React.ReactNode
}

export const AccountSidebar = ({ children, navLinks }: Props) => {
    const pathname = usePathname()
    return (
        <aside className="w-full pt-4 rounded-xl">
            {children}
            <div className="pt-3 font-normal  flex flex-col pb-3">
                {navLinks?.map((link, index) => {
                    const Icon = link.icon;
                    return (
                        <Link
                            key={index}
                            href={link.href}
                            className={cn("px-4 py-3 hover:bg-slate-50 transition-all duration-300 hover:text-primary flex items-center gap-x-3 text-gray-800", pathname == link.href && "bg-slate-50 text-primary")}
                        >
                            <Icon className="size-5" /> {link.name}
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
};