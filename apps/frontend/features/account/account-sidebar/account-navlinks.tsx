"use client"
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine, RiShoppingCartLine } from "react-icons/ri";
import { IoBagCheckOutline } from "react-icons/io5";
import { RiMapPinLine } from "react-icons/ri";
import { TbLayoutDashboardFilled } from "react-icons/tb"

const sharedLinks = [
    {
        name: "Overview",
        href: "/account",
        icon: TbLayoutDashboardFilled,
    },
    {
        name: "Order History",
        href: "/account/orders",
        icon: IoBagCheckOutline,
    },


    {
        name: "Change Password",
        href: "/account/change-password",
        icon: RiLockPasswordLine,
    },
]

export const foodingAccountLinks = [
    ...sharedLinks,

    {
        name: "Address",
        href: "/account/address",
        icon: RiMapPinLine,
    },
]

export const lodgingAccountLinks = [
    ...sharedLinks,

] 