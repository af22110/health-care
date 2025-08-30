"use client";

import { summarizePatientDataForDoctors } from "@/ai/flows/summarize-patient-data-for-doctors";
import { useToast } from "@/hooks/use-toast";
import type { Anomaly, Patient } from "@/lib/types";
import { Loader2 } from "lucide-react";
import React, { useState, useTransition } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

interface AIPanelProps {
  patient: Patient;
  anomaly: Anomaly | null;
  isAnomalyPending: boolean;
}

export function AIPanel({ patient, anomaly, isAnomalyPending }: AIPanelProps) {
  const { toast } = useToast();
  const [isSummaryPending, startSummaryTransition] = useTransition();

  const [summary, setSummary] = useState<string | null>(null);

  const handleSummarize = () => {
    startSummaryTransition(async () => {
      setSummary(null);
      try {
        const result = await summarizePatientDataForDoctors({
          patientId: patient.id,
          medicalHistory: patient.medicalHistory,
          sensorData: JSON.stringify(patient.sensorData),
        });
        setSummary(result.summary);
      } catch (error) {
        console.error("Error summarizing patient data:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to generate patient summary.",
        });
      }
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>AI Patient Summary</CardTitle>
          <Button onClick={handleSummarize} disabled={isSummaryPending}>
            {isSummaryPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Generate Summary
          </Button>
        </CardHeader>
        <CardContent>
          {isSummaryPending && (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}
          {summary ? (
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {summary}
            </p>
          ) : (
            !isSummaryPending && (
              <p className="text-sm text-muted-foreground">
                Click "Generate Summary" to get an AI-powered overview of the
                patient's current status and history.
              </p>
            )
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>AI Anomaly Detection</CardTitle>
        </CardHeader>
        <CardContent>
          {isAnomalyPending && (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}
          {anomaly ? (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Anomaly Status</h4>
                <Badge
                  variant={
                    anomaly.isAnomalous ? "destructive" : "default"
                  }
                  className={!anomaly.isAnomalous ? "bg-[hsl(var(--chart-3))] text-white" : ""}
                >
                  {anomaly.isAnomalous ? "Anomaly Detected" : "Normal"}
                </Badge>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold">Criticality</h4>
                <Badge
                  variant={
                    anomaly.criticality === "high"
                      ? "destructive"
                      : anomaly.criticality === "medium"
                      ? "secondary"
                      : "outline"
                  }
                  className={anomaly.criticality === 'medium' ? 'bg-accent text-accent-foreground' : ''}
                >
                  {anomaly.criticality.toUpperCase()}
                </Badge>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold">Explanation</h4>
                <p className="text-sm text-muted-foreground">
                  {anomaly.anomalyExplanation}
                </p>
              </div>
            </div>
          ) : (
            !isAnomalyPending && (
              <p className="text-sm text-muted-foreground">
                Patient data is being analyzed for anomalies...
              </p>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
