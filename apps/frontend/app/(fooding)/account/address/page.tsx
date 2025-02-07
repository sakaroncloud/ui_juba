import { AccountMainWrapper } from '@/features/account/account-main-wrapper'
import { AddAddressTrigger } from '@/features/account/address/add-address-triggerer'
import { AddressLists } from '@/features/account/address/address-lists'

const AddressPage = async () => {

    return (
        <AccountMainWrapper
            title='Manage your addresses'
        >
            <AddressLists />
        </AccountMainWrapper>
    )
}

export default AddressPage