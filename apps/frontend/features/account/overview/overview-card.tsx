"use client"

import { ModalType, useModal } from "@/hooks/useModal";



type Props = {
    title: string;
    value?: string | number;
    modalType?: ModalType;
    data?: any;
}

export const OverviewCard = ({ data, title, value, modalType }: Props) => {
    const { onOpen } = useModal();
    return (
        <div className="p-4 shadow-md bg-white rounded-xl basis-1/4 space-y-1.5">
            <div className="flex items-center justify-between gap-4">
                <div className='space-y-1' >
                    <span className='text-sm font-medium'>
                        {title}
                    </span>
                    <p className='text-sm text-muted-foreground'>
                        {value || "N/A"}
                    </p>
                </div>
                <span
                    onClick={() => modalType && onOpen(modalType, data)}
                    className="text-xs text-primary">Change</span>
            </div>

        </div>
    )
}