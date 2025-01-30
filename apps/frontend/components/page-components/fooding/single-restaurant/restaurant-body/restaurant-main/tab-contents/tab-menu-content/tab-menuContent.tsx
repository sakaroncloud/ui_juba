"use client";
import React, { useEffect, useState } from "react";

import { SearchMenuItem } from "./search-menu-item";
import { TabMenuItemLists } from "./tab-menu-item-lists";
import { Restaurant } from "@repo/ui/types/restaurant.types";



type Props = {
  data?: Restaurant.Menu.TMenu[];
};

export const TabMenuContent = ({ data }: Props) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredMenu, setFilteredMenu] = useState<Restaurant.Menu.TMenu[] | undefined>([]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = data
        ?.map((menu) => {
          const filteredProducts = menu?.products?.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          if (filteredProducts && filteredProducts?.length > 0) {
            return { ...menu, products: filteredProducts };
          }
          return null;
        })
        .filter((menu) => menu !== null);

      setFilteredMenu(filtered);
    } else {
      setFilteredMenu(data);
    }
  }, [searchTerm, data]);

  return (
    <div className="flex justify-between gap-6 flex-1">
      <div className="space-y-4 flex-1">
        <SearchMenuItem searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TabMenuItemLists filteredMenu={filteredMenu} />
      </div>
    </div>
  );
};
