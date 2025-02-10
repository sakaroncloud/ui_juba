import { getData } from "@/app/data";
import { DashboardProvider } from "@/components/providers/dashboard-wrapper";
import { AccountForm } from "@/features/profiles/common/account-form";
import { ProfileBasicForm } from "@/features/profiles/common/profile-basic-form";
import { CardWrapper } from "@repo/ui/components/card-wrapper";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { ResponseWithNoMeta } from "@repo/ui/types/response.type";
import { Role, User } from "@repo/ui/types/user.types";

type Props = {
  params: Promise<{
    profileId: string;
  }>;
};
const EditRiderPage = async ({ params }: Props) => {
  const { profileId } = await params;

  const result = await getData<ResponseWithNoMeta<User.TProfileWithUser>>({
    endPoint: API_ROUTES.profile.rider.endpoint,
    param: profileId,
    tags: ["profile", profileId],
  });

  if (!result?.data) return null;

  return (
    <DashboardProvider>
      <CardWrapper title={`Account - ${result.data.fullName}`}>
        <ProfileBasicForm profileId={profileId} formValues={result.data} />
      </CardWrapper>

      <AccountForm
        userId={profileId}
        formValues={{
          email: result.data.user.email,
        }}
      />
    </DashboardProvider>
  );
};

export default EditRiderPage;
