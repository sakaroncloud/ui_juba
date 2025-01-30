import { CustomBreadCrumb } from "@/components/navigations/custom-breadcrumb";
type Props = {
  pageTitle: string
  items: {
    href?: string,
    label: string
  }[]
}
export const SingleRestaurantHeader = ({ pageTitle, items }: Props) => {

  return (
    <div className="md:py-10 py-6 bg-[#F9F8F6]">
      <div className="container h-full space-y-3">
        <h1 className="section__title">{pageTitle} Menu</h1>
        <CustomBreadCrumb items={items} />
      </div>
    </div>
  );
};
