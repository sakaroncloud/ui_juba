import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { CuisineForm } from '@/features/fooding/cuisines/cuisine-form'

export default function CreateCuisinePage() {
    return (
        <DashboardProvider >
            <CreatePageWrapper title='Add New Cuisine'>
                <CuisineForm />
            </CreatePageWrapper>
        </DashboardProvider>
    )
}

