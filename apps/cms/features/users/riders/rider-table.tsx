import { DataTable } from "@repo/ui/components/table/data-table";

import { getSession } from "@/lib/actions/session";
import { superAdminStaffColumn } from "./superAdmin.staff.columns";
import { ResponseWithMeta } from "@repo/ui/types/response.type";
import { Role, User } from "@repo/ui/types/user.types";
import { getData } from "@/app/data";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { staffColumn } from "./columns";

export const RiderTable = async () => {
  const session = await getSession();
  const result = await getData<ResponseWithMeta<User.TStaffProfile[]>>({
    endPoint: API_ROUTES.profile.rider.endpoint,
    tags: ["riders"],
  });

  const filteredData = result?.data?.map((rider) => ({
    id: rider.user.id,
    fullName: rider.fullName,
    email: rider.user.email,
    phone: rider.phone,
    role: rider.user.role,
    gender: rider.gender,
    emailVerified: rider.user.emailVerified,
  }));
  return (
    <DataTable
      columns={
        session?.user?.role === Role.SUPER_ADMIN
          ? superAdminStaffColumn
          : staffColumn
      }
      data={filteredData || []}
      searchKey="fullName"
    />
  );
};
