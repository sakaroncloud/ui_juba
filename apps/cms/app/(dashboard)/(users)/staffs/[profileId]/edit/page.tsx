import { getData } from "@/app/data";
import { DashboardProvider } from "@/components/providers/dashboard-wrapper";
import { AccountForm } from "@/features/profiles/common/account-form";
import { ProfileBasicForm } from "@/features/profiles/common/profile-basic-form";
import { RoleForm } from "@/features/profiles/common/role-form";
import { CardWrapper } from "@repo/ui/components/card-wrapper";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { ResponseWithNoMeta } from "@repo/ui/types/response.type";
import { ChangeableRole, Role, User } from "@repo/ui/types/user.types";

type Props = {
  params: Promise<{
    profileId: string;
  }>;
};

const EditStaffPage = async ({ params }: Props) => {
  const { profileId } = await params;

  const result = await getData<ResponseWithNoMeta<User.TStaffProfile>>({
    endPoint: API_ROUTES.profile.staff.endpoint,
    param: profileId,
    tags: ["profile", profileId],
  });

  if (!result?.data) return null;

  return (
    <DashboardProvider>
      <CardWrapper title={`Account - ${result.data.fullName}`}>
        <ProfileBasicForm profileId={profileId} formValues={result.data} />
      </CardWrapper>
      <div className="grid grid-cols-2 gap-4">
        <AccountForm
          userId={profileId}
          formValues={{
            email: result.data.user.email,
          }}
        />
        {result.data.user.role !== Role.SUPER_ADMIN && (
          <RoleForm
            userId={profileId}
            formValues={{
              role: `${result.data.user.role}` as ChangeableRole,
            }}
          />
        )}
      </div>
    </DashboardProvider>
  );
};

export default EditStaffPage;
