"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@repo/ui/components/form";
import { CustomFormField } from "@/components/form/custom-form-field";
import { submitProduct } from "@/lib/actions/food/product.action";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { API_ROUTES } from "@repo/ui/lib/routes";

import { FormFooter } from "@/components/form/form-field-wrapper";
import { Restaurant } from "@repo/ui/types/restaurant.types";

import { GalleryForm } from "@/components/choose-image-card/gallery-form";
import {
  productDefaultValues,
  productFormSchema,
  TProductForm,
} from "@repo/ui/schemas/fooding/schema.product";
import { TDefaultImage } from "@repo/ui/types/upload.type";
import { getIDsFromSlug, handleToast } from "@repo/ui/lib/utils";
import { ResponseWithNoMeta } from "@repo/ui/types/response.type";

type Props = {
  formValues?: TProductForm;
  productId?: string | number;
  restaurantSlug: string;
  defaultImages?: TDefaultImage[];
};

export const ProductForm = ({
  defaultImages,
  formValues,
  productId,
  restaurantSlug,
}: Props) => {
  const { restaurantId } = getIDsFromSlug({
    restaurantSlug,
  });

  const { data: menus } = useFetch<
    ResponseWithNoMeta<Restaurant.Menu.TMenusResponse>
  >({
    endPoint:
      API_ROUTES.fooding.menu.endpoint + "?restaurantId=" + restaurantId,
    queryKey: API_ROUTES.fooding.menu.queryKey + restaurantId,
  });

  const form = useForm<TProductForm>({
    resolver: zodResolver(productFormSchema),
    defaultValues: formValues || {
      ...productDefaultValues,
      restaurantId: parseInt(`${restaurantId}`),
    },
  });

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onSubmit = (values: TProductForm) => {
    startTransition(async () => {
      const response = await submitProduct(values, productId);
      handleToast(response, () => {
        router.refresh();
        if (!formValues) {
          router.push(`/restaurants/${restaurantSlug}/products`);
          form.reset();
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 "
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CustomFormField
            elementName="input"
            fieldId="name"
            label="Name"
            inputType="text"
            placeholder="Enter product name"
          />

          <CustomFormField
            elementName="input"
            fieldId="price"
            label="Price"
            inputType="number"
            placeholder="Enter Price"
            step={"any"}
          />

          <CustomFormField
            elementName="textarea"
            fieldId="description"
            label="Description"
            inputType="text"
            className="sm:col-span-2 col-span-1"
            placeholder="Enter product description"
          />

          <CustomFormField
            elementName="input"
            fieldId="preparationTime"
            label="Preparation Time (in minutes)"
            inputType="number"
            placeholder="eg: 30"
          />

          <CustomFormField
            elementName="input"
            fieldId="commissionPercentage"
            label="Commission Percentage"
            inputType="number"
            placeholder="Enter Commission Percentage"
          />

          <CustomFormField
            elementName="multiselect"
            fieldId="menus"
            label="Menus"
            placeholder="Describe a little about your cuisine"
            isMulti={true}
            selectOptions={
              menus?.data?.menus?.map((menu) => ({
                value: `${menu.id}`,
                label: menu.name,
              })) || []
            }
            defaultValue={formValues?.menus || productDefaultValues.menus}
          />

          <div className="sm:col-span-2 col-span-1">
            <GalleryForm
              defaultImages={defaultImages || []}
              allowMultiple={false}
              fieldId={"bannerImage"}
              label={"Banner Image"}
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
          </div>
        </div>
        <FormFooter
          buttonLabel={formValues ? "Update" : "Add New"}
          pending={isPending}
        />
      </form>
    </Form>
  );
};
