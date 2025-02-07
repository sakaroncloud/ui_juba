import { GalleryForm } from '@/components/choose-image-card/gallery-form'
import { FormFieldWrapper, FormFooter } from '@/components/form/form-field-wrapper'
import { Form } from '@repo/ui/components/form'
import { submitRoomGallery } from '@/lib/actions/lodging/action.property'

import { roomGallerySchema, TRoomGalleryClientForm } from '@repo/ui/schemas/lodging/room/room.gallery.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { TDefaultImage } from '@repo/ui/types/upload.type'
import { handleToast } from '@repo/ui/lib/utils'
import { API_ROUTES } from '@repo/ui/lib/routes'

type Props = {
    propertyId: string | number;
    roomId: string;
    defaultImages?: TDefaultImage[];
}

export const RoomGalleryForm = ({ defaultImages, propertyId, roomId }: Props) => {

    const formValues = {
        galleryIds: defaultImages ? defaultImages.map((image) => image.id) : [],
        propertyId: parseInt(propertyId as string)
    }
    const form = useForm<TRoomGalleryClientForm>({
        resolver: zodResolver(roomGallerySchema),
        defaultValues: formValues
    })

    const [isPending, startTransition] = useTransition();

    const onSubmit = (values: TRoomGalleryClientForm) => {
        startTransition(async () => {
            const response = await submitRoomGallery(values, roomId);
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
