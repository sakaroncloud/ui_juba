import { DataTable } from "@repo/ui/components/table/data-table";

import { getSession } from "@/lib/actions/session";
import { superAdminStaffColumn } from "./superAdmin.staff.columns";
import { ResponseWithMeta } from "@repo/ui/types/response.type";
import { Role, User } from "@repo/ui/types/user.types";
import { getData } from "@/app/data";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { staffColumn } from "./columns";

export const CustomerTable = async () => {
  const session = await getSession();
  const result = await getData<ResponseWithMeta<User.TStaffProfile[]>>({
    endPoint: API_ROUTES.profile.customer.endpoint,
    tags: ["customers"],
  });

  const filteredData = result?.data?.map((staff) => ({
    id: staff.user.id,
    fullName: staff.fullName,
    email: staff.user.email,
    phone: staff.phone,
    role: staff.user.role,
    gender: staff.gender,
    emailVerified: staff.user.emailVerified,
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
