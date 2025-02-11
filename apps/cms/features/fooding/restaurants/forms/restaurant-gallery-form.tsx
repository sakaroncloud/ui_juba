import { GalleryForm } from "@/components/choose-image-card/gallery-form";
import { FormFooter } from "@/components/form/form-field-wrapper";
import { Form } from "@repo/ui/components/form";
import { submitRestaurantGallery } from "@/lib/actions/food/action.restaurant";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { TDefaultImage } from "@repo/ui/types/upload.type";
import {
  restaurantGallerySchema,
  TRestaurantGalleryClientForm,
} from "@repo/ui/schemas/fooding/restaurant/restaurant.gallery.schema";
import { handleToast } from "@repo/ui/lib/utils";
import { API_ROUTES } from "@repo/ui/lib/routes";

type Props = {
  restaurantId: number | string;
  defaultImages?: TDefaultImage[];
};

export const RestaurantGalleryForm = ({
  defaultImages,
  restaurantId,
}: Props) => {
  const formValues = {
    galleryIds: defaultImages ? defaultImages.map((image) => image.id) : [],
  };
  const form = useForm<TRestaurantGalleryClientForm>({
    resolver: zodResolver(restaurantGallerySchema),
    defaultValues: formValues || {},
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: TRestaurantGalleryClientForm) => {
    startTransition(async () => {
      const response = await submitRestaurantGallery(values, restaurantId);
      handleToast(response);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <GalleryForm
          label="Gallery"
          defaultImages={defaultImages || []}
          allowMultiple={true}
          fieldId={"galleryIds"}
          fetchEndPoint={
            API_ROUTES.fooding.uploads.singleRestImage.endpoint +
            "/" +
            restaurantId
          }
          uploadEndPoint={
            API_ROUTES.fooding.uploads.singleRestImage.endpoint +
            "/" +
            restaurantId
          }
        />

        <FormFooter buttonLabel={"Update Gallery"} pending={isPending} />
      </form>
    </Form>
  );
};
