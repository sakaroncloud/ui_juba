import { CityTable } from '@/components/page-components/cities/city-table/city-table'
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { TableWrapperWithFilter } from '@repo/ui/components/table/table-wrapper-with-filter'
import { AddItemButton } from '@/components/uploads/add-item-button'
import React from 'react'
import { TableSearchForm } from '@/components/table/table-search-form'

const CitiesPage = () => {



    return (
        <DashboardProvider >
            <TableWrapperWithFilter title="Cities" headerActions={
                <div className="flex gap-6 items-center">
                    <TableSearchForm placeholder="Enter Location" />
                    <AddItemButton label="Add New" path={`/cities/add`} />
                </div>
            } >
                <CityTable />
            </TableWrapperWithFilter>
        </DashboardProvider>
    )
}

export default CitiesPage