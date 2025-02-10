import { getData } from '@/app/data'
import { API_ROUTES } from '@repo/ui/lib/routes'
import { TAddress } from '@repo/ui/types/address.types'
import { ResponseWithNoMeta } from '@repo/ui/types/response.type'
import React from 'react'
import { AddressListItem } from './address-list-item'
import { AddAddressTrigger } from './add-address-triggerer'

export const AddressLists = async () => {
    const result = await getData<ResponseWithNoMeta<TAddress[]>>({
        endPoint: API_ROUTES.profile.customer.address.endpoint,
        tags: ["addresses"]
    })
    return (
        <>
            <div className="grid grid-cols-2 gap-4 mb-4">
                {result?.data?.map((address) => (
                    <AddressListItem key={address.id} address={address} />
                ))}
            </div>
            {result?.data && result?.data?.length < 2 && <AddAddressTrigger />}
        </>
    )
}
