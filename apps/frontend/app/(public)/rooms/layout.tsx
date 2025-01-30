import Footer from "@/components/navigations/footer/footer";
import RoomHeader from "@/components/navigations/header/room-header";
import { RoomHeaderSearch } from "@/components/navigations/header/room-header-search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juba Hospitality - Hotel Booking",
  description: "Hotel Booking",
};

const HotelBookingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <RoomHeader />

      {children}
      <Footer />
    </>
  );
};

export default HotelBookingLayout;
