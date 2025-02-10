import { GalleryForm } from "@/components/choose-image-card/gallery-form";
import { FormFieldWrapper, FormFooter } from "@/components/form/form-field-wrapper";
import { Form } from "@repo/ui/components/form";
import { updateRestaurantBrandings } from "@/lib/actions/food/action.restaurant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { TDefaultImage } from "@repo/ui/types/upload.type";
import { restaurantBrandingDefaultValues, restBrandingFormSchema, TRestBrandingForm } from "@repo/ui/schemas/fooding/restaurant/restaurant-branding.schema";
import { handleToast } from "@repo/ui/lib/utils";
import { API_ROUTES } from "@repo/ui/lib/routes";

type Props = {
    restaurantId: string | number;
    defaultImages?: {
        logo?: TDefaultImage;
        bannerImage?: TDefaultImage;
    }

}

export const RestaurantBrandingForm = ({ restaurantId, defaultImages }: Props) => {
    const formValues = defaultImages && {
        logo: defaultImages.logo?.id,
        bannerImage: defaultImages.bannerImage?.id
    }

    const form = useForm<TRestBrandingForm>({
        resolver: zodResolver(restBrandingFormSchema),
        defaultValues: formValues || restaurantBrandingDefaultValues
    })
    const [isPending, startTransition] = useTransition();


    const onSubmit = (values: TRestBrandingForm) => {
        startTransition(async () => {
            const response = await updateRestaurantBrandings(values, restaurantId);
            handleToast(response)
        })
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldWrapper
                    description='Upload your logo  here Image size should not be more than  2 MB'
                    label='logo'
                >
                    <GalleryForm
                        defaultImages={defaultImages?.logo?.id ? [defaultImages.logo] : []}
                        allowMultiple={false}
                        fieldId={"logo"}
                        label={"Logo"}
                        fetchEndPoint={API_ROUTES.fooding.uploads.singleRestImage.endpoint + "/" + restaurantId}
                        uploadEndPoint={API_ROUTES.fooding.uploads.singleRestImage.endpoint + "/" + restaurantId}
                    />
                </FormFieldWrapper>

                <FormFieldWrapper
                    description='Upload your banner image, size should not be more than  2 MB'
                    label='Banner'
                >
                    <GalleryForm
                        defaultImages={defaultImages?.bannerImage?.id ? [defaultImages.bannerImage] : []}
                        allowMultiple={false}
                        fieldId={"bannerImage"}
                        label={"Banner Image"}
                        fetchEndPoint={API_ROUTES.fooding.uploads.singleRestImage.endpoint + "/" + restaurantId}
                        uploadEndPoint={API_ROUTES.fooding.uploads.singleRestImage.endpoint + "/" + restaurantId}
                    />
                </FormFieldWrapper>

                <FormFooter
                    buttonLabel={"Update Images"}
                    pending={isPending}
                />
            </form>
        </Form>
    )
}
