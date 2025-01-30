import { DataTable } from "@/components/table/data-table";

import { columns } from "./columns";
import { getSession } from "@/lib/actions/session";
import { superAdminStaffColumn } from "./superAdmin.staff.columns";
import { ResponseWithMeta } from "@repo/ui/types/response.type";
import { Role, User } from "@repo/ui/types/user.types";
import { getData } from "@/app/data";
import { API_ROUTES } from "@repo/ui/lib/routes";


export const StaffTable = async () => {

    const session = await getSession()
    const result = await getData<ResponseWithMeta<User.TUser[]>>({
        endPoint: API_ROUTES.user.endpoint + "?staffOnly=true",
        tags: ["users"]
    });


    return (
        <DataTable columns={session?.user?.role === Role.SUPER_ADMIN ? superAdminStaffColumn : columns} data={result?.data || []}
            searchKey="firstName"
        />
    )
}
