
import { TableWrapperWithFilter } from '@repo/ui/components/table/table-wrapper-with-filter'
import { DropzoneAndMediaWrapper } from '@/components/uploads/dropzone-media-wrapper/dropzone-media-wrapper'
import { DropzoneTriggerer } from '@/components/uploads/dropzone-triggerer'
import { API_ROUTES } from '@repo/ui/lib/routes'
import { getIDsFromSlug } from '@repo/ui/lib/utils'
import { TParams } from '@repo/ui/types/global.type'
import { TableSearchForm } from '@/components/table/table-search-form'

const PropertyMediaPage = async ({ params }: TParams) => {
    const { propertySlug } = await params
    const { propertyId } = getIDsFromSlug({ propertySlug })
    return (
        <TableWrapperWithFilter title="Uploads" headerActions={
            <div className="flex gap-6 items-center">
                <TableSearchForm placeholder="Search Image" />
                <DropzoneTriggerer />
            </div>
        } >
            <DropzoneAndMediaWrapper uploadEndPoint={API_ROUTES.lodging.uploads.singlePropertyImage.endpoint + "/" + propertyId}
                fetchEndPoint={API_ROUTES.lodging.uploads.singlePropertyImage.endpoint + "/" + propertyId}
                multiple={true}
            />
        </TableWrapperWithFilter>
    )
}

export default PropertyMediaPage