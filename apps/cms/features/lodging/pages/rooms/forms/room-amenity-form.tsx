import {
  CustomFormField,
  DynamicTagField,
} from "@/components/form/custom-form-field";
import { FormFooter } from "@/components/form/form-field-wrapper";
import { Form } from "@repo/ui/components/form";
import { updateRoomAmenities } from "@/lib/actions/lodging/action.room";
import {
  roomAmenitiesClientSchema,
  roomAmenitiesDefaultValues,
  TRoomAmenitiesClientForm,
} from "@repo/ui/schemas/lodging/room/room-amenities.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { handleToast } from "@repo/ui/lib/utils";

type Props = {
  formValues?: TRoomAmenitiesClientForm | null;
  roomId: string | number;
  propertyId: string | number;
};

export const RoomAmenityForm = ({ formValues, roomId, propertyId }: Props) => {
  const form = useForm<TRoomAmenitiesClientForm>({
    resolver: zodResolver(roomAmenitiesClientSchema),
    defaultValues: formValues
      ? {
          ...formValues,
        }
      : {
          ...roomAmenitiesDefaultValues,
          propertyId: parseInt(propertyId as string),
        },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: TRoomAmenitiesClientForm) => {
    startTransition(async () => {
      const response = await updateRoomAmenities(values, roomId);
      handleToast(response);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        {/*wifi  */}
        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="general.wifi.status"
            label="Wifi"
            placeholder="Check if wifi is available"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="general.wifi.description"
            className="w-full"
            label="Write short note"
          />
        </div>

        {/*phone  */}
        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="general.phone.status"
            label="Phone"
            placeholder="Check if telephone is available"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="general.phone.description"
            className="w-full"
            label="Write short note"
          />
        </div>

        {/*ac  */}
        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="general.ac.status"
            label="AC"
            placeholder="Check if ac is available"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="general.ac.description"
            className="w-full"
            label="Write short note"
          />
        </div>

        {/*television  */}
        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="general.television.status"
            label="Television"
            placeholder="Check if television is available"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="general.television.description"
            className="w-full"
            label="Write short note"
          />
        </div>

        {/*miniFridge  */}
        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="general.miniFridge.status"
            label="Mini Fridge"
            placeholder="Check if mini fridge is available"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="general.miniFridge.description"
            className="w-full"
            label="Write short note"
          />
        </div>

        {/*coffeeMake  */}
        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="general.coffeeMaker.status"
            label="Coffee Maker"
            placeholder="Check if Coffee Maker is available"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="general.coffeeMaker.description"
            className="w-full"
            label="Write short note"
          />
        </div>

        <DynamicTagField
          fieldId="general.others"
          defaultTags={formValues?.general?.others}
          placeholder="Hey, what else you want to add?"
          label="Others (Hit Enter to add)"
          className="w-full"
        />
        {/* Bathroom */}

        {/*privateBathroom  */}
        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="bathroom.privateBathroom.status"
            label="Private Bathroom"
            placeholder="Check if private bathroom is available"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="bathroom.privateBathroom.description"
            className="w-full"
            label="Write short note"
          />
        </div>

        {/* hotWater */}
        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="bathroom.hotWater.status"
            label="Hotwater (Geyser)"
            placeholder="Do have hot water?"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="bathroom.hotWater.description"
            className="w-full"
            label="Write short note"
          />
        </div>

        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="bathroom.shower.status"
            label="Shower"
            placeholder="Do have Shower?"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="bathroom.shower.description"
            className="w-full"
            label="Write short note"
          />
        </div>

        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="bathroom.bathtub.status"
            label="Bathtub"
            placeholder="Do have Bathtub?"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="bathroom.bathtub.description"
            className="w-full"
            label="Write short note"
          />
        </div>

        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="bathroom.hairDryer.status"
            label="Hair Dryer"
            placeholder="Do have Hair Dryer?"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="bathroom.hairDryer.description"
            className="w-full"
            label="Write short note"
          />
        </div>

        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="bathroom.toiletries.status"
            label="Toiletries"
            placeholder="Do have Toiletries?"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="bathroom.toiletries.description"
            className="w-full"
            label="Write short note"
          />
        </div>

        <DynamicTagField
          fieldId="bathroom.others"
          defaultTags={formValues?.bathroom?.others}
          placeholder="Hey, what else you want to add?"
          label="Others (Hit Enter to add)"
          className="w-full"
        />

        {/* bedroom */}

        {/*hangers  */}
        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="bedroom.hangers.status"
            label="Hangers"
            placeholder="Have hangers?"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="bedroom.hangers.description"
            className="w-full"
            label="Write short note"
          />
        </div>

        {/*extraPillowAndBlanket  */}
        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="bedroom.extraPillowAndBlanket.status"
            label="Car Parking"
            placeholder="Do you provide extra pillow and blanket?"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="bedroom.extraPillowAndBlanket.description"
            className="w-full"
            label="Write short note"
          />
        </div>

        {/*iron  */}
        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="bedroom.iron.status"
            label="Iron"
            placeholder="Have iron?"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="bedroom.iron.description"
            className="w-full"
            label="Write short note"
          />
        </div>

        {/* laptopDesk  */}
        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="bedroom.laptopDesk.status"
            label="Laptop Desk"
            placeholder="Have Laptop Desk?"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="bedroom.laptopDesk.description"
            className="w-full"
            label="Write short note"
          />
        </div>

        <DynamicTagField
          fieldId="bedroom.others"
          defaultTags={formValues?.bedroom?.others}
          placeholder="Hey, what else you want to add?"
          label="Others (Hit Enter to add)"
          className="w-full"
        />

        {/* Safety */}

        {/*smokeAlarm */}
        <div className="w-full flex justify-between gap-4">
          <CustomFormField
            elementName="checkbox"
            fieldId="safety.smokeAlarm.status"
            label="Smoke Alarm"
            placeholder="Have Smoke Alarm?"
            className="w-full  shadow-none"
          />
          <CustomFormField
            elementName="input"
            fieldId="safety.smokeAlarm.description"
            className="w-full"
            label="Write short note"
          />
        </div>
        <DynamicTagField
          fieldId="safety.others"
          defaultTags={formValues?.safety?.others}
          placeholder="Hey, what else you want to add?"
          label="Others (Hit Enter to add)"
          className="w-full"
        />

        <FormFooter
          buttonLabel={formValues ? "Update" : "Add New"}
          pending={isPending}
          goBack={{
            path: `/properties`,
          }}
        />
      </form>
    </Form>
  );
};
