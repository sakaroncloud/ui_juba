import React from "react";

type OverViewData = {
  name: string;
  data?: string[] | undefined;
};
type Props = {
  overview?: {
    phone: OverViewData;
    address: OverViewData;
    cuisines: OverViewData;
    averageCost: OverViewData;
    moreInfo?: OverViewData;
  };
};

export const TabOverviewContent = ({ overview }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {overview &&
        Object.entries(overview).map(([key, value], index) => {
          return (
            <div key={index}>
              <div className="font-semibold">{value.name}</div>
              {value?.data?.map((item, index) => {
                return (
                  <div key={index} className=" text-gray-600">
                    {item}
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};
