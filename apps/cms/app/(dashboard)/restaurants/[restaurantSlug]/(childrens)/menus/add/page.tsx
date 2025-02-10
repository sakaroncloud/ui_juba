import { MenuForm } from '@/features/fooding/restaurants/menus/menu-form'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'
import { TParams } from '@repo/ui/types/global.type'
import { getIDsFromSlug } from '@repo/ui/lib/utils'
import { notFound } from 'next/navigation'



const AddMenuPage = async ({ params }: TParams) => {
    const { restaurantSlug } = await params



    return (
        <CreatePageWrapper title='Add New Menu'>
            <MenuForm restaurantSlug={restaurantSlug} />
        </CreatePageWrapper>
    )
}

export default AddMenuPage