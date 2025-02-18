"use client";
import { Line, LineChart } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/components/chart";

const data = [
  {
    revenue: 10400,
  },
  {
    revenue: 14405,
  },
  {
    revenue: 9400,
  },
  {
    revenue: 8200,
  },
  {
    revenue: 7000,
  },
  {
    revenue: 9600,
  },
  {
    revenue: 11244,
  },
  {
    revenue: 26475,
  },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
  subscription: {
    label: "Subscriptions",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

type Props = {
  label: string;
  value: string;
  fieldId: string;
};
export function DashboardStatCard({ label, value, fieldId }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-normal">{label}</CardTitle>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
          <ChartContainer config={chartConfig} className="h-[80px] w-full">
            <LineChart
              accessibilityLayer
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                type="natural"
                strokeWidth={2}
                dataKey={fieldId}
                stroke="var(--color-revenue)"
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
