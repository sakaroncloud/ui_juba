
import FallbackImage from "@/components/fallback-image";
import { getSession } from "@/lib/actions/session";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons/lib";

type Props = {
    navLinks: {
        name: string;
        href: string;
        icon: IconType
    }[]
}

export const AccountSidebar = async ({ navLinks }: Props) => {
    const session = await getSession();
    if (!session) return null

    return (
        <aside className="w-full pt-4 bg-white rounded-xl">
            <div className="flex items-center  flex-col justify-center gap-y-2 p-3">
                <FallbackImage
                    src={"/assets/icons/user.png"}
                    type="square"
                    width={80}
                    height={80}
                    alt={"user"}
                    errorClassName="size-20 border-slate-100 border rounded-full uppercase text-sm text-slate-200"
                    errorMessage="Image"
                />
                <div className="text-center">
                    <div className="font-medium text-lg">{session.user.name}</div>
                    <div className="capitalize text-sm">({session.user.email})</div>
                </div>
            </div>

            <div className="pt-3 font-normal  flex flex-col pb-3">
                {navLinks?.map((link, index) => {
                    const Icon = link.icon;
                    return (
                        <Link
                            key={index}
                            href={link.href}
                            className="px-4 py-3 hover:bg-slate-50 transition-all duration-300 hover:text-primary flex items-center gap-x-3 text-gray-800"
                        >
                            <Icon className="size-5" /> {link.name}
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
};