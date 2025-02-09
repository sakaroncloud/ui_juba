import { RestaurantBasicForm } from '@/features/fooding/restaurants/forms/restaurant-basic-form'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'

const AddNewRestaurantPage = () => {
    return (
        <DashboardProvider>
            <CreatePageWrapper title='Add New Restaurant'>
                {/* <RestaurantForm /> */}
                <RestaurantBasicForm />
            </CreatePageWrapper>
        </DashboardProvider>
    )
}

export default AddNewRestaurantPage