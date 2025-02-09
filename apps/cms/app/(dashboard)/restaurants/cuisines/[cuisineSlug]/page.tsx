import { EditCuisineWrapper } from "@/features/fooding/cuisines/edit-cuisine-wrapper"
import { DashboardProvider } from "@/components/providers/dashboard-wrapper"
import { TParams } from "@repo/ui/types/global.type"



const EditCuisinePage = async ({ params }: TParams) => {
    const cuisineSlug = (await params).cuisineSlug

    return (
        <DashboardProvider>
            <EditCuisineWrapper cuisineSlug={cuisineSlug} />
        </DashboardProvider>
    )
}

export default EditCuisinePage