import { DataTable } from "@repo/ui/components/table/data-table";

import { columns } from "./columns";
import { getData } from "@/app/data";
import { ResponseWithMeta } from "@repo/ui/types/response.type";
import { User } from "@repo/ui/types/user.types";
import { API_ROUTES } from "@repo/ui/lib/routes";



export const CustomerTable = async () => {

    const result = await getData<ResponseWithMeta<User.TUser[]>>({
        endPoint: API_ROUTES.user.endpoint + "?role=CUSTOMER",
        tags: ["customers"]
    });

    return (
        <DataTable columns={columns} data={result?.data || []}
            searchKey="firstName"
        />)
}
