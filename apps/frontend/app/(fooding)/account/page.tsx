import { getData } from '@/app/data';
import { ChangeEmailForm } from '@/features/account/overview/change-email-form';
import { AccountInformationForm } from '@/features/account/overview/profile-form';
import { API_ROUTES } from '@repo/ui/lib/routes';
import { TProfile } from '@repo/ui/types/auth.response.type';
import { ResponseWithNoMeta } from '@repo/ui/types/response.type';

const AccountPage = async () => {
    const result = await getData<ResponseWithNoMeta<TProfile>>({
        endPoint: API_ROUTES.auth.profile.endpoint,
        tags: ["profile"]
    });

    if (!result?.data) return null
    const data = result.data


    return (
        <div className='space-y-4'>
            <AccountInformationForm formValues={data.profile} />
            <ChangeEmailForm formValues={{
                email: data.email
            }}
                newEmail={data?.newEmail}
            />
        </div>
    )
}

export default AccountPage