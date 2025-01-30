import { getData } from "@/app/data";
import { DataTable } from "@/components/table/data-table";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { Order } from "@repo/ui/types/order.types";
import { ResponseWithMeta } from "@repo/ui/types/response.type";
import { columns } from "./columns";


type Props = {
    showDeleted?: boolean
}

export const OrderTable = async ({ showDeleted }: Props) => {

    const result = await getData<ResponseWithMeta<Order.TOrder[]>>({
        endPoint: API_ROUTES.order.endpoint,
        tags: ["orders"]
    });

    const filteredData = result?.data?.map((order) => ({
        ...order,
        name: order.user.customerProfile?.firstName + " " + order.user.customerProfile?.lastName,
    }))


    return (
        <DataTable columns={columns} data={filteredData || []} showDeleted={showDeleted}
        />
    )

}
