"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@repo/ui/components/dropdown-menu";
import { Button } from "@repo/ui/components/button";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import { BiPurchaseTag } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { logout } from "@/lib/actions/auth";
import { usePathname, useRouter } from "next/navigation";
import { UI_ROUTES } from "@/lib/routes";
import { Menu, User } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import { useSession } from "@/providers/session-provider";
import { cn } from "@repo/ui/lib/utils";

export const UserNav = () => {
    const router = useRouter()
    const pathname = usePathname()
    const { change, setChange } = useSession();
    const signout = async () => {
        await logout()
        setChange(!change)
        router.refresh()
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">shadcn</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            m@example.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className={cn("cursor-pointer", pathname.includes(UI_ROUTES.ACCOUNT) && "text-primary")}
                        onClick={() => router.push(UI_ROUTES.ACCOUNT)}
                    >
                        <CiUser />

                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className={cn("cursor-pointer", pathname.includes(UI_ROUTES.ACCOUNT_ADDRESSES) && "text-primary")}
                        onClick={() => router.push(UI_ROUTES.ACCOUNT_ADDRESSES)}
                    >
                        <IoLocationOutline />
                        <span>Addresses</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => router.push(UI_ROUTES.ACCOUNT_ORDERS)}
                        className={cn("cursor-pointer", pathname == UI_ROUTES.ACCOUNT_ORDERS && "text-primary")}                        >
                        <BiPurchaseTag />
                        <span>Order History</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className={cn("cursor-pointer", pathname.includes(UI_ROUTES.ACCOUNT_SETTINGS) && "text-primary")}
                        onClick={() => router.push(UI_ROUTES.ACCOUNT_SETTINGS)}
                    >
                        <CiSettings />
                        <span> Settings</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => signout()}>
                    <IoIosLogOut />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const SignInButton = () => {
    const { onOpen } = useModal()
    return (
        <div
            onClick={() => onOpen("sign-in-sheet")}
            className="flex cursor-pointer items-center hover:shadow-md gap-2 hover:text-primary wie__transition__200 shadow rounded-3xl border border-gray-200 py-3 px-4"
        >
            <Menu className="size-5" />
            <User className="size-5" />
        </div>
    )
} 