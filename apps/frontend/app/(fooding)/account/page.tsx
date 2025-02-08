import { getData } from '@/app/data';
import { AccountInformationForm } from '@/features/account/overview/profile-form';
import { API_ROUTES } from '@repo/ui/lib/routes';
import { ResponseWithNoMeta } from '@repo/ui/types/response.type';
import { User } from '@repo/ui/types/user.types';

const AccountPage = async () => {
    const result = await getData<ResponseWithNoMeta<User.TCustomerProfile>>({
        endPoint: API_ROUTES.profile.customer.endpoint,
        tags: ["profile"]
    });

    if (!result?.data) return null
    const data = result.data
    return (
        <AccountInformationForm formValues={data} />
    )
}

export default AccountPage