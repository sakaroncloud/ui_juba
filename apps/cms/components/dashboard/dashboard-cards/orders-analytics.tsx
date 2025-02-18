"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/components/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { use, useEffect, useState } from "react";
import { TDashboardData } from "@repo/ui/types/dashboard.types";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  order: {
    label: "Order",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type TOption = {
  period: string;
  revenue: number;
  order: number;
};

type Props = {
  title: string;
  subtitle: string;
  data: TDashboardData;
  // options: {
  //   period: string;
  //   revenue: number;
  //   order: number;
  // }[];
};
export function OrderAnalytics({ title, subtitle, data }: Props) {
  const [group, setGroup] = useState("daily");

  const [options, setOptions] = useState<TOption[]>([]);

  useEffect(() => {
    const hey = data[group as keyof TDashboardData];
    const filtered = hey.map((item) => {
      return {
        period: item.period,
        revenue: parseFloat(item.totalrevenue),
        order: parseInt(item.totalorders),
      };
    });
    setOptions(filtered);
  }, [group]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <div className="">
            <Select onValueChange={(e) => setGroup(e)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>filter</SelectLabel>
                  <SelectItem value="daily">Day</SelectItem>
                  <SelectItem value="weekly">Week</SelectItem>
                  <SelectItem value="monthly">Month</SelectItem>
                  <SelectItem value="yearly">Year</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={options}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
            <Bar dataKey="order" fill="var(--color-order)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this day <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 days
        </div>
      </CardFooter>
    </Card>
  );
}
