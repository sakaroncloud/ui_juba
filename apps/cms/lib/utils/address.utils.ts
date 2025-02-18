import { TAddressForm } from "@repo/ui/schemas/schema.address";
import { TAddress } from "@repo/ui/types/address.types";

export const parseAddressFromS2C = (
  addressFromServer?: TAddress
): TAddressForm | undefined => {
  if (!addressFromServer) return undefined;
  return {
    ...addressFromServer,
    city: addressFromServer.city.slug,
  };
};
