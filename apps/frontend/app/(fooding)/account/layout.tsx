import { foodingAccountLinks } from '@/features/shared/account-navlinks'
import { AccountSidebar } from '@/features/shared/account-sidebar'
import React from 'react'
type Props = {
    children: React.ReactNode
}

const FoodingAccountLayout = ({ children }: Props) => {
    return (
        <div className="w-full bg-slate-50">
            <div className="container flex flex-wrap py-4 gap-4 ">
                <div className="lg:basis-[300px] shrink-0 shadow-md">
                    <AccountSidebar navLinks={foodingAccountLinks} />
                </div>
                <div className="flex-1">{children}</div>
            </div>
        </div>
    )
}

export default FoodingAccountLayout