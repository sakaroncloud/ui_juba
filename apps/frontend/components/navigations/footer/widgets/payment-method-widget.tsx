import React from "react";
import MasterCard from "@/public/icons/mastercard.png";
import VisaCard from "@/public/icons/visa.png";
import Paypal from "@/public/icons/paypal.png";
import Image from "next/image";

export const PaymentMethodWidget = () => {
  return (
    <div className="flex items-center gap-5 flex-wrap">
      <p>We also accepts</p>
      <Image
        quality={100}
        src={MasterCard}
        alt="MasterCard"
        width={35}
        height={35}
        className="md:size-[35px] size-6 object-contain"
      />
      <Image
        quality={100}
        src={VisaCard}
        alt="VisaCard"
        width={35}
        height={35}
        className="md:size-[35px] size-6 object-contain"
      />
      <Image
        quality={100}
        src={Paypal}
        alt="Paypal"
        width={35}
        height={35}
        className="md:size-[35px] size-6 object-contain"
      />
    </div>
  );
};
