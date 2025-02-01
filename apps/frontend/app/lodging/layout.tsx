import Footer from "@/components/navigations/footer/footer";
import LodgingHeader from "@/components/navigations/header/lodging/lodging-header";

const LodgingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <LodgingHeader />
      {children}
      <Footer />
    </>
  );
};

export default LodgingLayout;
