import { Input } from "@repo/ui/components/input";
import { Search } from "lucide-react";

export const FoodHeaderSearch = () => {
  return (
    <>
      <div
        className="flex-1 ml-auto max-w-[560px] items-center gap-x-2 min-w-[250px]  border-gray-300
    md:flex hidden h-12 w-full rounded-md border border-input bg-transparent px-4 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
    "
      >
        <Search />
        <Input
          placeholder={"Search for restaurant, cuisine or a dish"}
          className="border-0 shadow-none focus:ring-0 focus-visible:ring-0 px-0"
        />
      </div>
      <button className="md:hidden">
        <Search className="size-6" />
      </button>
    </>
  );
};
