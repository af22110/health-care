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
  valueFormatter?: (value: number) => number;
}

export function VitalsChart({ data, dataKey, strokeVar, valueFormatter }: VitalsChartProps) {
  const chartConfig = {
    [dataKey]: {
      label: dataKey.charAt(0).toUpperCase() + dataKey.slice(1),
      color: strokeVar,
    },
  };

  const formattedData = React.useMemo(() => {
    if (!data) return [];
    return data.map(item => {
      let value = item[dataKey];
      if (typeof value === 'number' && valueFormatter) {
        value = valueFormatter(value);
      }
      return {
        ...item,
        [dataKey]: value,
        timestamp: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
  })
  }
, [data, dataKey, valueFormatter]);

  const yDomain = React.useMemo(() => {
    if (!formattedData || formattedData.length === 0) {
      return [0, 100]; // Default domain when no data
    }
    
    const values = formattedData.map(item => item[dataKey]).filter(v => typeof v === 'number') as number[];
    if(values.length === 0) {
      return [0, 100];
    }
    const dataMin = Math.min(...values);
    const dataMax = Math.max(...values);
    
    return [
      Math.floor(dataMin * 0.9),
      Math.ceil(dataMax * 1.1),
    ];
  }, [formattedData, dataKey]);

  if (!formattedData || formattedData.length === 0) {
    return (
      <div className="flex h-[250px] w-full items-center justify-center">
        <p className="text-muted-foreground">No data available.</p>
      </div>
    );
  }


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
          tickFormatter={(value) => typeof value === 'number' ? value.toFixed(0) : value}
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" formatter={(value) => typeof value === 'number' ? value.toFixed(1) : value} />}
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
