import { UserFormModal } from "@/components/modals/user-form-modal"
import { StaffTable } from "@/components/page-components/users/staffs/staff-table"
import { DashboardProvider } from "@/components/providers/dashboard-wrapper"
import { TableWrapperWithFilter } from "@/components/table/table-wrapper-with-filter"
import { AddItemButton } from "@/components/uploads/add-item-button"

const StaffsPage = () => {
    return (
        <DashboardProvider >
            <TableWrapperWithFilter title={"Staffs"} headerActions={
                <div className="flex gap-4 items-center flex-1 justify-end">
                    <UserFormModal customButton={<AddItemButton label="Add New" />} />
                </div>
            } >
                <StaffTable
                />
            </TableWrapperWithFilter>
        </DashboardProvider>
    )
}

export default StaffsPage