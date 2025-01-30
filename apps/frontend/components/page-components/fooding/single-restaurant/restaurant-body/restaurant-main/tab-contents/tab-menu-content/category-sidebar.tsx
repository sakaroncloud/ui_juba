import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import React from "react";
type Props = {
  data?: {
    id: string;
    title: string;
    children: {
      id: string;
      title: string;
    }[];
  }[];
  activeMenu: string | null;
  setActiveMenu: React.Dispatch<React.SetStateAction<string | null>>;
};
export const MenuCategorySidebar = ({
  activeMenu,
  data,
  setActiveMenu,
}: Props) => {
  return (
    <div className="shrink-0 sm:w-[240px] lg:block hidden border-r border-gray-200">
      <ul className="m-0 p-0">
        {data?.map((item) => {
          return (
            <li
              key={item.id}
              className={cn(
                `pl-3 pr-2 py-3 hover:text-primary hover:bg-slate-100 rounded-l-lg wie__transition__200 cursor-pointer`
              )}
            >
              <Button
                variant={"ghost"}
                className={cn(
                  "w-full",
                  activeMenu === item.id && "text-primary"
                )}
                onClick={() => setActiveMenu(item.id)}
              >
                {item.title}{" "}
                <span className="text-sm">({item.children.length})</span>
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
