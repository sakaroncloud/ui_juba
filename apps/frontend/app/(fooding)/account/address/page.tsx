import { AccountMainWrapper } from '@/features/account/account-main-wrapper'
import { AddressLists } from '@/features/account/address/address-lists'

const AddressPage = async () => {

    return (
        <AccountMainWrapper
            title='Manage your Address'
        >
            <AddressLists />
        </AccountMainWrapper>
    )
}

export default AddressPage