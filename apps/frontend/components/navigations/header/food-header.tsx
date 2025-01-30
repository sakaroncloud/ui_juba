import SiteLogo from "@/components/logo";
import React from "react";
import DesktopNav from "./desktop-nav/desktop-nav";
import { FoodHeaderSearch } from "./desktop-nav/food-header-search";

const FoodHeader = () => {
  return (
    <header id="site-header" className="bg-white shadow-md fixed top-0 inset-x-0 z-50">
      <div className="h-[80px] container  flex items-center justify-between gap-6">
        <div className="left py-2">
          <SiteLogo type="light" />
        </div>
        <div className="right flex items-center md:flex-1 gap-6">
          <FoodHeaderSearch />
          <DesktopNav type="food" />
        </div>
      </div>
    </header>
  );
};

export default FoodHeader;
