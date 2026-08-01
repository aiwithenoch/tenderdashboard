import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { DashboardCard } from "../../shared/dashboard-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const activityData = {
  "Last 30 Days": [
    { date: "Jul 3", discovered: 14, qualified: 7 },
    { date: "Jul 7", discovered: 22, qualified: 11 },
    { date: "Jul 11", discovered: 18, qualified: 9 },
    { date: "Jul 15", discovered: 30, qualified: 16 },
    { date: "Jul 19", discovered: 26, qualified: 14 },
    { date: "Jul 23", discovered: 38, qualified: 21 },
    { date: "Jul 27", discovered: 28, qualified: 17 },
    { date: "Aug 1", discovered: 41, qualified: 23 },
  ],
  "Last 7 Days": [
    { date: "Jul 26", discovered: 18, qualified: 8 },
    { date: "Jul 27", discovered: 23, qualified: 12 },
    { date: "Jul 28", discovered: 20, qualified: 10 },
    { date: "Jul 29", discovered: 31, qualified: 16 },
    { date: "Jul 30", discovered: 35, qualified: 18 },
    { date: "Jul 31", discovered: 37, qualified: 20 },
    { date: "Aug 1", discovered: 41, qualified: 23 },
  ],
  "Last 90 Days": [
    { date: "May 1", discovered: 16, qualified: 6 },
    { date: "May 15", discovered: 21, qualified: 9 },
    { date: "Jun 1", discovered: 24, qualified: 12 },
    { date: "Jun 15", discovered: 29, qualified: 14 },
    { date: "Jul 1", discovered: 33, qualified: 17 },
    { date: "Jul 15", discovered: 36, qualified: 19 },
    { date: "Aug 1", discovered: 41, qualified: 23 },
  ],
};

const chartConfig = {
  discovered: {
    label: "Discovered",
    color: "var(--color-primary)",
  },
  qualified: {
    label: "Qualified",
    color: "color-mix(in srgb, var(--primary) 60%, transparent)",
  },
} satisfies ChartConfig;

const periodOptions = ["Last 30 Days", "Last 7 Days", "Last 90 Days"] as const;
type Period = (typeof periodOptions)[number];

export default function TotalSales() {
  const [period, setPeriod] = useState<Period>("Last 30 Days");

  return (
    <DashboardCard className="flex flex-col gap-0!">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp size={16} className="text-muted-foreground" />
          Opportunity Intelligence
        </CardTitle>
      </CardHeader>

      <CardContent className="p-5 flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex flex-col gap-1">
            <span className="text-base font-normal text-foreground leading-6">Qualified Opportunities</span>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-2xl font-semibold tracking-[-0.3px] text-foreground leading-8">23</span>
              <span className="text-sm font-medium text-chart-2">+9</span>
              <span className="text-sm font-normal text-muted-foreground">since yesterday</span>
            </div>
          </div>

          <Select value={period} onValueChange={(value) => value && setPeriod(value as Period)}>
            <SelectTrigger className="h-auto! w-fit text-sm font-medium text-foreground border-border shadow-[0px_1px_2px_rgba(0,0,0,0.05)] cursor-pointer gap-1.5 px-3">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {periodOptions.map((option) => (
                <SelectItem key={option} value={option} className="cursor-pointer">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ChartContainer config={chartConfig} className="h-[215px]! w-full">
          <LineChart data={activityData[period]} margin={{ top: 8, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="4 4" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              domain={[0, 50]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="discovered"
              type="linear"
              stroke="var(--color-discovered)"
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
            <Line
              dataKey="qualified"
              type="linear"
              stroke="var(--color-qualified)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </DashboardCard>
  );
}
