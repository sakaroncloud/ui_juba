"use client";
import { SignInSheet } from "@/components/navigations/header/desktop-nav/sign-in-sheet";
import { AddressFormModal } from "@/features/account/address/address-form-modal";
import { CartDeleteModal } from "@/features/fooding/carts/cart-delete-modal";
import { CartSheet } from "@/features/fooding/carts/cart-sheet";
import { OrderCancelModal } from "@/features/fooding/orders/order-cancel-modal";
import { useEffect, useState } from "react";


export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <SignInSheet />
            <CartSheet />
            <CartDeleteModal />
            <OrderCancelModal />
            <AddressFormModal />
        </>
    );
};