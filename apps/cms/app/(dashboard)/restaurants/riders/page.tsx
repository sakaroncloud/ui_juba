import { StaffTable } from "@/components/page-components/users/staffs/staff-table"
import { DashboardProvider } from "@/components/providers/dashboard-wrapper"
import { TableWrapperWithFilter } from "@repo/ui/components/table/table-wrapper-with-filter"
import { Skeleton } from "@repo/ui/components/skeleton"
import { AddItemButton, ShowTrashOrViewButton } from "@/components/uploads/add-item-button"

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const RidersPage = async ({ searchParams }: Props) => {
    const params = await searchParams
    return (
        <DashboardProvider >
            <TableWrapperWithFilter title={params.deleted === "true" ? "Riders (Trash)" : "Riders"} headerActions={
                <div className="flex gap-4 items-center flex-1 justify-end">
                    {/* <TableSearchForm placeholder="Search by name/email/phone" /> */}
                    <AddItemButton label="Add New" path={`/restaurants/riders/add`} />
                    <ShowTrashOrViewButton path={`/restaurants/riders`} showDeleted={params?.deleted === "true"} />
                </div>
            } >
                <div className="bg-white rounded-xl p-6">
                    <h2 className="text-xl">Development in progress</h2>
                </div>
            </TableWrapperWithFilter>
        </DashboardProvider>
    )
}

export default RidersPage