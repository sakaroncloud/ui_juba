import { getData } from "@/app/data";
import { DataTable } from "@repo/ui/components/table/data-table";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { Order } from "@repo/ui/types/order.types";
import { ResponseWithMeta } from "@repo/ui/types/response.type";
import { columns } from "./columns";


type Props = {
    showDeleted?: boolean
}

export const OrderTable = async ({ showDeleted }: Props) => {

    const result = await getData<ResponseWithMeta<Order.TOrder[]>>({
        endPoint: API_ROUTES.fooding.order.endpoint,
        tags: ["orders"]
    });


    const filteredData = result?.data?.map((order) => ({
        ...order,
        fullName: order.user.customerProfile?.fullName
    }))

    console.log(filteredData)
    return (
        <DataTable columns={columns} data={filteredData || []} showDeleted={showDeleted}
        />
    )

}
