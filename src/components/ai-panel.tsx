
"use client";

import type { AnalyzedSensorData } from "@/lib/types";
import { Loader2 } from "lucide-react";
import React from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

interface AIPanelProps {
  latestData: AnalyzedSensorData | null;
}

export function AIPanel({ latestData }: AIPanelProps) {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Anomaly Detection</CardTitle>
        </CardHeader>
        <CardContent>
          {!latestData ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Anomaly Status</h4>
                <Badge
                  variant={
                    latestData.isAnomalous ? "destructive" : "default"
                  }
                  className={!latestData.isAnomalous ? "bg-[hsl(var(--chart-3))] text-white" : ""}
                >
                  {latestData.isAnomalous ? "Anomaly Detected" : "Normal"}
                </Badge>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold">Criticality</h4>
                <Badge
                  variant={
                    latestData.criticality === "high"
                      ? "destructive"
                      : latestData.criticality === "medium"
                      ? "secondary"
                      : "outline"
                  }
                  className={latestData.criticality === 'medium' ? 'bg-accent text-accent-foreground' : ''}
                >
                  {latestData.criticality.toUpperCase()}
                </Badge>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold">Explanation</h4>
                <p className="text-sm text-muted-foreground">
                  {latestData.anomalyExplanation}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
