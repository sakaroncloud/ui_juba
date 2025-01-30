import CustomerProfileContainer from '@/components/page-components/profile/container/customer-profile-container'
import RiderProfileContainer from '@/components/page-components/profile/container/rider-profile-container'
import StaffProfileContainer from '@/components/page-components/profile/container/staff-profile-container'
import { getSession } from '@/lib/actions/session'
import { Role } from '@repo/ui/types/user.types'
import React from 'react'

const ProfilePage = async () => {
    const session = await getSession()
    if (!session) return <div>ProfilePage</div>
    switch (session.user.role as Role) {
        case "CUSTOMER":
            return <CustomerProfileContainer />
        case "RIDER":
            return <RiderProfileContainer />
        case "SUPER_ADMIN":
        case "ADMIN":
        case "OPERATION_MANAGER":
        case "LISTING_MANAGER":
            return <StaffProfileContainer />
        default:
            return <div>ProfilePage</div>
    }
}

export default ProfilePage