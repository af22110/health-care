"use client";

import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { SensorData } from "@/lib/types";

interface VitalsChartProps {
  data: SensorData[];
  dataKey: keyof SensorData;
  strokeVar: string;
}

export function VitalsChart({ data, dataKey, strokeVar }: VitalsChartProps) {
  const chartConfig = {
    [dataKey]: {
      label: dataKey.charAt(0).toUpperCase() + dataKey.slice(1),
      color: strokeVar,
    },
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex h-[250px] w-full items-center justify-center">
        <p className="text-muted-foreground">No data available.</p>
      </div>
    );
  }

  const formattedData = data.map(item => ({
    ...item,
    timestamp: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }));

  const yDomain = React.useMemo(() => [
    (dataMin: number) => Math.floor(dataMin * 0.9),
    (dataMax: number) => Math.ceil(dataMax * 1.1),
  ], []);


  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <LineChart data={formattedData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="timestamp"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value, index) => {
            // Show every Nth tick to prevent overlap
            const N = Math.floor(data.length / 5) || 1;
            return index % N === 0 ? value : '';
          }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          domain={yDomain}
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Line
          dataKey={dataKey}
          type="natural"
          stroke={chartConfig[dataKey].color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
