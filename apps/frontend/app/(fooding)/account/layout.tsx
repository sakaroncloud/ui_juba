import { foodingAccountLinks } from '@/features/account/account-sidebar/account-navlinks'
import { AccountProfileCard } from '@/features/account/account-sidebar/account-profile-card'
import { AccountSidebar } from '@/features/account/account-sidebar/account-sidebar'
import React from 'react'
type Props = {
    children: React.ReactNode
}

const FoodingAccountLayout = ({ children }: Props) => {
    return (
        <div className="w-full bg-slate-50">
            <div className="container flex flex-wrap py-4 gap-4 ">
                <div className="lg:basis-[300px] shrink-0 shadow-md bg-white ">
                    <AccountSidebar navLinks={foodingAccountLinks} >
                        <AccountProfileCard />
                    </AccountSidebar>
                </div>
                <div className="flex-1">{children}</div>
            </div>
        </div>
    )
}

export default FoodingAccountLayout