import { getData } from "@/app/data";
import { CreatePageWrapper } from "@/components/providers/create-page-wrapper";
import { DashboardProvider } from "@/components/providers/dashboard-wrapper";
import { AccountForm } from "@/features/profiles/common/account-form";
import { ProfileBasicForm } from "@/features/profiles/common/profile-basic-form";
import { getSession } from "@/lib/actions/session";
import { CardWrapper } from "@repo/ui/components/card-wrapper";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { ResponseWithNoMeta } from "@repo/ui/types/response.type";
import { Role, User } from "@repo/ui/types/user.types";

const ProfileEditPage = async () => {
  const session = await getSession();
  if (!session || !session?.user?.role) return <div>Access Denied</div>;

  let endPoint = API_ROUTES.profile.endpoint;

  switch (session.user.role) {
    case Role.CUSTOMER:
      endPoint += "/customers/me";
      break;
    case Role.RIDER:
      endPoint += "/riders/me";
      break;
    case Role.SUPER_ADMIN:
    case Role.ADMIN:
    case Role.OPERATION_MANAGER:
    case Role.LISTING_MANAGER:
      endPoint += "/staffs/me";
      break;
  }

  const result = await getData<ResponseWithNoMeta<User.TProfileWithUser>>({
    endPoint: endPoint,
    tags: [session.user.role, session.user.id],
  });

  if (!result?.data) return null;

  return (
    <DashboardProvider>
      <CardWrapper title={`Account - ${result.data.fullName}`}>
        <ProfileBasicForm formValues={result.data} />
      </CardWrapper>

      <AccountForm
        formValues={{
          email: result.data.user.email,
        }}
      />
    </DashboardProvider>
  );
};

export default ProfileEditPage;
