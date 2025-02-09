import { getData } from '@/app/data'
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { ProfileBasicForm } from '@/features/profiles/common/profile-basic-form'
import { CardWrapper } from '@repo/ui/components/card-wrapper'
import { API_ROUTES } from '@repo/ui/lib/routes'
import { ResponseWithNoMeta } from '@repo/ui/types/response.type'
import { Role, User } from '@repo/ui/types/user.types'

type Props = {
    params: Promise<{
        profileId: string
    }>
}

const EditCustomerPage = async ({ params }: Props) => {

    const { profileId } = await params

    const result = await getData<ResponseWithNoMeta<User.TCustomerProfile>>({
        endPoint: API_ROUTES.profile.customer.endpoint,
        param: profileId,
        tags: ["profile", profileId]
    });

    if (!result?.data) return null

    return (
        <DashboardProvider >
            <CardWrapper title={`Account - ${result.data.fullName}`}>
                <ProfileBasicForm profileId={profileId} formValues={result.data} role={Role.CUSTOMER} />
            </CardWrapper>
        </DashboardProvider>
    )
}

export default EditCustomerPage