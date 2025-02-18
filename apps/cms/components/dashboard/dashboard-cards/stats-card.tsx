import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import { CiDollar } from "react-icons/ci";
import { IconType } from "react-icons/lib";
import { ClassNameValue } from "tailwind-merge";

type Props = {
  label: string;
  value: string;
  subtitle: string;
  icon: IconType;
  iconColor: ClassNameValue;
};

export const StatsCard = ({
  label,
  value,
  subtitle,
  icon,
  iconColor,
}: Props) => {
  const Icon = icon;
  return (
    <Card className="rounded-xl">
      <CardHeader className="pb-0 px-4">
        <CardTitle className="flex items-center justify-between">
          <div>{value}</div>
          <div className="size-10 shadow-md rounded-xl flex justify-center items-center">
            <Icon />
          </div>
        </CardTitle>
        <CardDescription className="text-gray-800 font-semibold">
          {label}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="text-xs flex gap-2 text-gray-600">
          <ArrowUpRight className="text-emerald-300 size-5" />
          10.2 + 20.1% from last month
        </div>
      </CardContent>
    </Card>
  );
};
