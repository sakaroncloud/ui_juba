import { Input } from "@repo/ui/components/input";
import { Search } from "lucide-react";

export const SearchMenuItem = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex items-center gap-x-1 border border-gray-2 rounded-xl px-4">
      <Search className="size-5" />
      <Input
        className="border-0 outline-0 focus-visible:ring-0"
        placeholder="Search menu item"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};
