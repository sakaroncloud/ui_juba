import { GalleryForm } from '@/components/choose-image-card/gallery-form'
import { FormFieldWrapper, FormFooter } from '@/components/form/form-field-wrapper'
import { Form } from '@repo/ui/components/form'
import { submitPropertyGallery } from '@/lib/actions/lodging/action.property'
import { propertyGallerySchema, TPropertyGalleryClientForm } from '@repo/ui/schemas/lodging/property/property.gallery.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { TDefaultImage } from '@repo/ui/types/upload.type'
import { handleToast } from '@repo/ui/lib/utils'
import { API_ROUTES } from '@repo/ui/lib/routes'

type Props = {
    propertyId: string;
    defaultImages?: TDefaultImage[];
}

export const PropertyGalleryForm = ({ defaultImages, propertyId }: Props) => {
    const formValues = {
        galleryIds: defaultImages ? defaultImages.map((image) => image.id) : []
    }
    const form = useForm<TPropertyGalleryClientForm>({
        resolver: zodResolver(propertyGallerySchema),
        defaultValues: formValues || {}
    })

    const [isPending, startTransition] = useTransition();

    const onSubmit = (values: TPropertyGalleryClientForm) => {
        startTransition(async () => {
            const response = await submitPropertyGallery(values, propertyId);
            handleToast(response)
        })
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldWrapper
                    description='Upload your property image gallery here Image size should not be more than  2 MB'
                    label='Gallery'
                >
                    <GalleryForm
                        defaultImages={defaultImages || []}
                        allowMultiple={true}
                        fieldId={"galleryIds"}
                        label={"Gallery"}
                        fetchEndPoint={API_ROUTES.lodging.uploads.singlePropertyImage.endpoint + "/" + propertyId}
                        uploadEndPoint={API_ROUTES.lodging.uploads.singlePropertyImage.endpoint + "/" + propertyId}
                    />
                </FormFieldWrapper>

                <FormFooter
                    buttonLabel={"Update Gallery"}
                    pending={isPending}
                />
            </form>
        </Form>
    )
}
