import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { CityForm } from './city-form'
import { getData } from '@/app/data'
import { TCity } from '@repo/ui/types/address.types'
import { API_ROUTES } from '@repo/ui/lib/routes'
import { ResponseWithNoMeta } from '@repo/ui/types/response.type'
import { CreatePageWrapper } from '@/components/providers/create-page-wrapper'

type Props = {
    slug: string
}


export const EditCityWrapper = async ({ slug }: Props) => {


    const result = await getData<ResponseWithNoMeta<TCity>>({
        endPoint: API_ROUTES.city.endpoint,
        param: slug,
        tags: ["city", slug]
    });

    if (!result?.data) return null


    return (
        <DashboardProvider >
            <CreatePageWrapper title='Edit City'>
                <CityForm
                    formValues={
                        {
                            ...result?.data,
                            pincodes: result?.data?.pincodes?.map((pincode) => ({ id: pincode, text: pincode })) || []
                        }
                    }
                />
            </CreatePageWrapper>
        </DashboardProvider>
    )
}

