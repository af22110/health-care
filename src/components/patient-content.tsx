
"use client";

import {
  Activity,
  Droplets,
  HeartPulse,
  Smile,
  Thermometer,
} from "lucide-react";
import React from "react";
import { AIPanel } from "./ai-panel";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { VitalsChart } from "./vitals-chart";
import type { Patient } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MessagingPanel } from "./messaging-panel";

interface PatientContentProps {
  patient: Patient;
}

function fahrenheitToCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

export function PatientContent({ patient }: PatientContentProps) {
  const latestData = patient.sensorData[patient.sensorData.length - 1];

  const isAnomalous = latestData?.isAnomalous ?? false;
  const anomalyExplanation = latestData?.anomalyExplanation.toLowerCase() ?? "";

  const isAnomalousMetric = (metric: string): boolean => {
    if (!isAnomalous) return false;
    return anomalyExplanation.includes(metric.toLowerCase());
  };
  
  const tempF = latestData?.temperature ?? 0;
  const tempC = fahrenheitToCelsius(tempF);

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
          <Card
            className={cn(
              isAnomalousMetric("heart rate") &&
                "bg-destructive/10 border-destructive"
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
              <HeartPulse className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {latestData?.heartRate ?? "N/A"} bpm
              </div>
              <p className="text-xs text-muted-foreground">Latest reading</p>
            </CardContent>
          </Card>
           <Card
            className={cn(
              isAnomalousMetric("temperature") &&
                "bg-destructive/10 border-destructive"
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Temperature (F)
              </CardTitle>
              <Thermometer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tempF.toFixed(1) ?? "N/A"} °F
              </div>
              <p className="text-xs text-muted-foreground">
                Body Temperature
              </p>
            </CardContent>
          </Card>
           <Card
            className={cn(
              isAnomalousMetric("temperature") &&
                "bg-destructive/10 border-destructive"
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Temperature (C)
              </CardTitle>
              <Thermometer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tempC.toFixed(1) ?? "N/A"} °C
              </div>
              <p className="text-xs text-muted-foreground">
                Body Temperature
              </p>
            </CardContent>
          </Card>
          <Card
            className={cn(
              isAnomalousMetric("humidity") &&
                "bg-destructive/10 border-destructive"
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Humidity</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {latestData?.humidity ?? "N/A"}%
              </div>
              <p className="text-xs text-muted-foreground">Ambient Humidity</p>
            </CardContent>
          </Card>
          <Card
            className={cn(
              (isAnomalousMetric("facial") || isAnomalousMetric("expression")) &&
                "bg-destructive/10 border-destructive"
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Facial Analysis
              </CardTitle>
              <Smile className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">
                {latestData?.facialAnalysis ?? "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">Latest reading</p>
            </CardContent>
          </Card>
          <Card
            className={cn(
              isAnomalousMetric("movement") &&
                "bg-destructive/10 border-destructive"
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Movement
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">
                {latestData?.movement ?? "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">Latest reading</p>
            </CardContent>
          </Card>

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
        <AIPanel latestData={latestData} />
      </TabsContent>
    </Tabs>
  );
}
