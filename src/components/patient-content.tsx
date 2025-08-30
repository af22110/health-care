
"use client";

import {
  Activity,
  Droplets,
  HeartPulse,
  Thermometer,
} from "lucide-react";
import React from "react";
import { AIPanel } from "./ai-panel";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { VitalsChart } from "./vitals-chart";
import type { AnalyzedSensorData, Patient } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MessagingPanel } from "./messaging-panel";

interface PatientContentProps {
  patient: Patient;
  analyzedData: AnalyzedSensorData | null;
}

function fahrenheitToCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

export function PatientContent({ patient, analyzedData }: PatientContentProps) {
  
  const isAnomalous = analyzedData?.isAnomalous ?? false;
  const anomalyExplanation = analyzedData?.anomalyExplanation.toLowerCase() ?? "";

  const isAnomalousMetric = (metric: string): boolean => {
    if (!isAnomalous) return false;
    return anomalyExplanation.includes(metric.toLowerCase());
  };
  
  const tempF = analyzedData?.temperature ?? 0;
  const tempC = fahrenheitToCelsius(tempF);

  const latestDataForCards = analyzedData ?? patient.sensorData[patient.sensorData.length - 1]

  const MetricCard = ({
    title,
    metric,
    value,
    unit,
    icon: Icon,
  }: {
    title: string;
    metric: string;
    value: string | number;
    unit: string;
    icon: React.ElementType;
  }) => (
    <Card
      className={cn(
        isAnomalousMetric(metric) && "bg-destructive/10 border-destructive"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value} {unit}
        </div>
        <p className="text-xs text-muted-foreground">Latest reading</p>
      </CardContent>
    </Card>
  );

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="vitals">Vitals History</TabsTrigger>
        <TabsTrigger value="messages">Messages</TabsTrigger>
        <TabsTrigger value="ai">AI Analysis</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="md:col-span-2 lg:col-span-4">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
              <Avatar className="h-16 w-16">
                <AvatarImage src={patient.avatarUrl} alt={patient.name} />
                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{patient.name}</CardTitle>
                <p className="text-muted-foreground">
                  {patient.age} years old
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold mb-1">Medical History</h4>
              <p className="text-sm text-muted-foreground">
                {patient.medicalHistory}
              </p>
            </CardContent>
          </Card>
          
          <MetricCard
            title="Heart Rate"
            metric="heart rate"
            value={latestDataForCards?.heartRate ?? "N/A"}
            unit="bpm"
            icon={HeartPulse}
          />
           <MetricCard
            title="Temperature"
            metric="temperature"
            value={tempC.toFixed(1)}
            unit="°C"
            icon={Thermometer}
          />
          <MetricCard
            title="Humidity"
            metric="humidity"
            value={latestDataForCards?.humidity ?? "N/A"}
            unit="%"
            icon={Droplets}
          />
           <MetricCard
            title="Movement"
            metric="movement"
            value={latestDataForCards?.movement ?? "N/A"}
            unit=""
            icon={Activity}
          />
          
          <Card className="md:col-span-2 lg:col-span-4">
            <CardHeader>
              <CardTitle>Heart Rate (Last 24 Hours)</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <VitalsChart
                data={patient.sensorData}
                dataKey="heartRate"
                strokeVar="hsl(var(--chart-1))"
              />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="vitals">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Heart Rate History</CardTitle>
            </CardHeader>
            <CardContent>
              <VitalsChart
                data={patient.sensorData}
                dataKey="heartRate"
                strokeVar="hsl(var(--chart-1))"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Temperature History</CardTitle>
            </CardHeader>
            <CardContent>
              <VitalsChart
                data={patient.sensorData}
                dataKey="temperature"
                strokeVar="hsl(var(--chart-2))"
                valueFormatter={(val) => fahrenheitToCelsius(val)}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Humidity History</CardTitle>
            </CardHeader>
            <CardContent>
              <VitalsChart
                data={patient.sensorData}
                dataKey="humidity"
                strokeVar="hsl(var(--chart-3))"
              />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
       <TabsContent value="messages">
        <MessagingPanel patient={patient} currentUser="doctor" />
      </TabsContent>
      <TabsContent value="ai">
        <AIPanel latestData={analyzedData} />
      </TabsContent>
    </Tabs>
  );
}
