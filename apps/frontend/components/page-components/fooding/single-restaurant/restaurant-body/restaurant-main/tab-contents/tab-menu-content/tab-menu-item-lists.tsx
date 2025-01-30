"use client";
import { TabMenuItem } from "./tab-menu-item";
import { Separator } from "@repo/ui/components/separator";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { Restaurant } from "@repo/ui/types/restaurant.types";

type Props = {
  filteredMenu?: Restaurant.Menu.TMenu[]
};
export const TabMenuItemLists = ({ filteredMenu }: Props) => {
  return (
    <ScrollArea className="h-[600px] w-full">
      <div className="space-y-6 mr-4  md:pr-6 ">
        {filteredMenu?.map((menu, i) => {
          return (
            <div key={i} id={`${menu.id}`} className="space-y-3">
              <Title key={i} title={menu.name} />

              <div className="space-y-4">
                {menu?.products?.map((item, i) => {
                  return <TabMenuItem key={i} product={item} />;
                })}
                <Separator className="!my-6" />
              </div>
            </div>
          );
        })}
        {filteredMenu?.length == 0 && (
          <div className="text-center text-gray-600 text-lg">
            No results found
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

type TitleProps = {
  title: string;
};
const Title = ({ title }: TitleProps) => {
  return (
    <div className="text-2xl text-center font-semibold text-primary">
      {title}
    </div>
  );
};
