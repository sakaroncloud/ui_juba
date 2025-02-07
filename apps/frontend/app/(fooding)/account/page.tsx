import { AccountMainWrapper } from '@/features/account/account-main-wrapper'
import { AddAddressTrigger } from '@/features/account/address/add-address-triggerer'
import React from 'react'

const AccountPage = () => {
    return (
        <AccountMainWrapper
            title='Manage your account'
        >
            <AddAddressTrigger />
        </AccountMainWrapper>
    )
}

export default AccountPage