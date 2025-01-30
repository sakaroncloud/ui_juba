import SiteLogo from "@/components/logo";
import React from "react";
import DesktopNav from "./desktop-nav/desktop-nav";
import { RoomHeaderSearch } from "./room-header-search";

const RoomHeader = () => {
  return (
    <header className="bg-white shadow-md fixed top-0 inset-x-0 z-50">
      <div className="h-[80px] container  flex items-center justify-between gap-6">
        <div className="left py-2 w-fit">
          <SiteLogo type="light" />
        </div>
        <RoomHeaderSearch />
        <DesktopNav type="room" />
      </div>
    </header>
  );
};

export default RoomHeader;
