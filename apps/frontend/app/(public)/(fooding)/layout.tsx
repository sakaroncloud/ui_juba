import Footer from "@/components/navigations/footer/footer";
import Header from "@/components/navigations/header/food-header";
import React from "react";

const FoodLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default FoodLayout;
