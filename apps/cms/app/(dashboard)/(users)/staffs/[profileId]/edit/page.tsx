import { getData } from "@/app/data";
import { DashboardProvider } from "@/components/providers/dashboard-wrapper";
import { ChangeEmailForm } from "@/features/profiles/common/change-email-form";
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
        {/* Any Staff Role can be assigned to a role*/}
        <ProfileBasicForm
          profileId={profileId}
          formValues={result.data}
          role={Role.ADMIN}
        />
      </CardWrapper>
      <ChangeEmailForm
        userId={profileId}
        formValues={{
          email: result.data.user.email,
        }}
      />
    </DashboardProvider>
  );
};

export default EditStaffPage;
