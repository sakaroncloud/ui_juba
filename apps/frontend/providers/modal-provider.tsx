"use client";
import { SignInSheet } from "@/components/navigations/header/desktop-nav/sign-in-sheet";
import { AddressDeleteModal } from "@/features/account/address/address-delete-modal";
import { AddressFormModal } from "@/features/account/address/address-form-modal";
import { CartDeleteModal } from "@/features/fooding/carts/cart-delete-modal";
import { CartSheet } from "@/features/fooding/carts/cart-sheet";
import { OrderCancelModal } from "@/features/fooding/orders/order-cancel-modal";
import { useModal } from "@/hooks/useModal";
import { useEffect, useState } from "react";


export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { isOpen, onClose, type, data } = useModal();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    switch (type) {
        case "address-modal":
            return <AddressFormModal />
        case "cart-sheet":
            return <CartSheet />
        case "sign-in-sheet":
            return <SignInSheet />
        case "cart-delete-modal":
            return <CartDeleteModal />
        case "order-cancel-modal":
            return <OrderCancelModal />
        case "address-delete-modal":
            return <AddressDeleteModal />

        default:
            return null
    }


};