"use client"
import { GalleryForm } from "@/components/choose-image-card/gallery-form"
import { CustomFormField } from "@/components/form/custom-form-field"
import { FormFieldWrapper, FormFooter } from "@/components/form/form-field-wrapper"
import { Form } from "@repo/ui/components/form"
import { submitCusine } from "@/lib/actions/food/action.cuisine"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { API_ROUTES } from "@repo/ui/lib/routes"
import { TDefaultImage } from "@repo/ui/types/upload.type"
import { handleToast } from "@repo/ui/lib/utils"
import { TCuisineForm, cuisineFormSchema } from "@repo/ui/schemas/fooding/schema.cuisine"

type Props = {
  formValues?: TCuisineForm & { id: string, slug: string };
  defaultImages?: TDefaultImage[]
}

export const CuisineForm = ({ defaultImages, formValues }: Props) => {

  const router = useRouter()
  const form = useForm<TCuisineForm>({
    resolver: zodResolver(cuisineFormSchema),
    defaultValues: formValues || {
      description: "",
      bannerImage: "",
      name: ""
    }
  })


  const [isPending, startTransition] = useTransition();



  const onSubmit = (values: TCuisineForm) => {
    startTransition(async () => {
      const response = await submitCusine(values, formValues?.slug);
      handleToast(response, () => {
        router.push(`/restaurants/cuisines/${response.data.slug}`)
      })
    })
  };



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FormFieldWrapper
          description="Add your cuisine details here"
          label="Cuisine Details"
          className="flex flex-col gap-6"
        >
          <CustomFormField
            elementName="input"
            fieldId="name"
            label="Cuisine Name"
            inputType="text"
            placeholder="Enter Cuisine Name"
            className="w-full"
          />
          <CustomFormField
            elementName="textarea"
            fieldId="description"
            label="Description"
            placeholder="Describe a little about your cuisine"
            className="w-full"
          />
        </FormFieldWrapper>

        <FormFieldWrapper
          description='Upload your cuisine icon here Image size should not be more than  2 MB'
          label='Icon'
        >
          <GalleryForm
            defaultImages={defaultImages || []}
            allowMultiple={false}
            fieldId={"bannerImage"}
            label={"Icon for Cuisine"}
            fetchEndPoint={API_ROUTES.fooding.uploads.endpoint}
            uploadEndPoint={API_ROUTES.fooding.uploads.endpoint}
          />
        </FormFieldWrapper>

        <FormFooter
          buttonLabel={formValues ? "Update" : "Add New"}
          pending={isPending}
          goBack={{
            path: "/restaurants/cuisines"
          }}
        />
      </form>
    </Form>
  )
}
