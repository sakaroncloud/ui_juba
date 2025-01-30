import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  widgetTitle?: string;
  className?: string;

  navItems?: {
    title: string;
    href: string;
  }[];
};

export const WidgetLinkItems = ({
  className,
  navItems,
  widgetTitle,
}: Props) => {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="widget__title">{widgetTitle}</div>
      <ul className="space-y-4">
        {navItems?.map((item, i) => {
          return (
            <li key={i}>
              <Link href={item.href} className="text-gray-600">
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
