import { getData } from '@/app/data';
import { AccountMainWrapper } from '@/features/account/account-main-wrapper'
import { OverviewCard } from '@/features/account/overview/overview-card'
import { API_ROUTES } from '@repo/ui/lib/routes';
import { ResponseWithNoMeta } from '@repo/ui/types/response.type';
import { User } from '@repo/ui/types/user.types';
import React from 'react'

const AccountPage = async () => {
    const result = await getData<ResponseWithNoMeta<User.TCustomerProfile>>({
        endPoint: API_ROUTES.profile.customer.endpoint,
        tags: ["profile"]
    });

    console.log(result?.data)

    if (!result?.data) return null
    const data = result.data
    return (
        <AccountMainWrapper
            title='Manage your account'
        >
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
                <OverviewCard title='Name' value={data.firstName} modalType='name-change-modal' data={data} />
                <OverviewCard title='Date of Birth' value={data.dob} />
                <OverviewCard title='Email' value={data.user.email} />
                <OverviewCard title='Phone' value={data.phone} />
                <OverviewCard title='Gender' value={data.gender} />
            </div>
        </AccountMainWrapper>
    )
}

export default AccountPage