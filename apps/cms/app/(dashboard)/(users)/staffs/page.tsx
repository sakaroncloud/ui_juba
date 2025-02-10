import { StaffTable } from "@/features/users/staffs/staff-table";
import { DashboardProvider } from "@/components/providers/dashboard-wrapper";
import { TableWrapperWithFilter } from "@repo/ui/components/table/table-wrapper-with-filter";
import { AddItemButton } from "@/components/uploads/add-item-button";
import { AddStaffFormModal } from "@/components/modals/add-staff-form-modal";

const StaffsPage = () => {
  return (
    <DashboardProvider>
      <TableWrapperWithFilter
        title={"Staffs"}
        headerActions={
          <div className="flex gap-4 items-center flex-1 justify-end">
            <AddStaffFormModal
              customButton={<AddItemButton label="Add New" />}
            />
          </div>
        }
      >
        <StaffTable />
      </TableWrapperWithFilter>
    </DashboardProvider>
  );
};

export default StaffsPage;
