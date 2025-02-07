"use client"
import { useModal } from "@/hooks/useModal";
import { Plus } from "lucide-react";
import React from "react";

export const AddAddressTrigger = () => {
    const { onOpen } = useModal();

    return (
        <div
            onClick={() => onOpen("address-modal")}
            className="p-6 rounded-xl max-w-[250px] cursor-pointer bg-primary/10 hover:bg-primary/20 transition-all duration-300 text-primary flex items-center justify-center gap-x-3">
            <div className="size-6 p-1 rounded-full bg-primary flex items-center justify-center">
                <Plus className="text-white size-4" />
            </div>
            <span className="text-sm font-medium capitalize">Add New Address</span>
        </div>
    );
};