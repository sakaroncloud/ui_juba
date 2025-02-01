"use client";
import { SignInSheet } from "@/components/navigations/header/desktop-nav/sign-in-sheet";
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
        </>
    );
};