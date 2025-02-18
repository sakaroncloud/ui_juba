import React, { PropsWithChildren } from "react";

type Props = {
  title?: string;
} & PropsWithChildren;

export const CreatePageWrapper = ({ title, children }: Props) => {
  return (
    <div className="bg-white px-4 py-5 rounded-lg space-y-4 border">
      {title && (
        <h1 className="font-semibold tracking-wide text-lg pb-2  shadow-sm border-dotted">
          {title}
        </h1>
      )}
      <div className=" rounded-lg">{children}</div>
    </div>
  );
};
