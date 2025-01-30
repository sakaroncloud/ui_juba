import { getData } from '@/app/data'
import { CustomerProfileForm } from '@/components/page-components/profile/form/customer-profile-form'
import { ProfileBasicForm } from '@/components/page-components/profile/form/profile-basic-form'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { getSession } from '@/lib/actions/session'
import { API_ROUTES } from '@repo/ui/lib/routes'
import { ResponseWithNoMeta } from '@repo/ui/types/response.type'
import { Role, User } from '@repo/ui/types/user.types'


const ProfileEditPage = async () => {
    const session = await getSession()
    if (!session) return <div>Access Denied</div>

    const result = await getData<ResponseWithNoMeta<User.TUser>>({
        endPoint: API_ROUTES.user.endpoint + "/profile",
        tags: ["users", session.user.id]
    });


    const UserProfileForm = () => {
        switch (session.user.role as Role) {
            case "CUSTOMER":
                return <CustomerProfileForm />
            case "RIDER":
                return <ProfileBasicForm formValues={result?.data?.riderProfile} role={Role.RIDER} />
            case "SUPER_ADMIN":
            case "ADMIN":
            case "OPERATION_MANAGER":
            case "LISTING_MANAGER":
                return <ProfileBasicForm formValues={result?.data?.staffProfile} role={Role.LISTING_MANAGER} />
            default:
                return <div>Access Denied</div>
        }
    }
    return (
        <CreatePageWrapper title='Edit Profile'>
            <UserProfileForm />
        </CreatePageWrapper>
    )
}

export default ProfileEditPage