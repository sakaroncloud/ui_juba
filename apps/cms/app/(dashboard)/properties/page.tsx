import { PropertyTable } from '@/features/lodging/property-table/property-table'
import { TableWrapperWithFilter } from '@repo/ui/components/table/table-wrapper-with-filter'
import { AddItemButton, ShowTrashOrViewButton } from '@/components/uploads/add-item-button'
import { TableSearchForm } from '@/components/table/table-search-form'
type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
const AllPropertiesPage = async ({ searchParams }: Props) => {
    const params = await searchParams

    return (
        <TableWrapperWithFilter title={params.deleted === "true" ? "Properties (Trash)" : "Properties"} headerActions={
            <div className="flex gap-4 items-center">
                <TableSearchForm placeholder="Enter Property" />
                <AddItemButton label="Add New" path={`/properties/add`} />
                <ShowTrashOrViewButton path={`/properties`} showDeleted={params?.deleted === "true"} />
            </div>
        } >
            <PropertyTable />
        </TableWrapperWithFilter>
    )
}

export default AllPropertiesPage