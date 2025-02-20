import type { Metadata } from "next";

import "@repo/ui/styles/globals.css";



export const metadata: Metadata = {
    title: "Juba Hospitality",
    description: "Generated by create next app",
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-screen flex items-center justify-center bg-slate-50 fixed top-0 inset-x-0 z-50">
            {children}
        </div>
    );
}
