import { EditCityWrapper } from "@/features/cities/edit-city-wrapper"
import { TParams } from "@repo/ui/types/global.type"

const EditCityPage = async ({ params }: TParams) => {
    const param = await params
    return (
        <EditCityWrapper slug={param.citySlug} />
    )
}
export default EditCityPage