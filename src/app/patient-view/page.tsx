
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockPatients } from "@/lib/mock-data";
import { Settings, User } from "lucide-react";
import React, { useMemo, useState, useTransition, useEffect } from "react";
import { GuardianAngelLogo } from "@/components/icons";
import type { Anomaly, Patient } from "@/lib/types";
import { analyzeSensorData } from "@/ai/flows/analyze-sensor-data-for-anomalies";
import { useToast } from "@/hooks/use-toast";
import { PatientViewContent } from "@/components/patient-view-content";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PatientViewPage() {
  const { toast } = useToast();
  const [isAnomalyPending, startAnomalyTransition] = useTransition();
  const [anomaly, setAnomaly] = useState<Anomaly | null>(null);

  // For this example, we'll use the first patient.
  // In a real app, you'd get the logged-in patient's data.
  const patient = useMemo<Patient | null>(() => mockPatients[0] ?? null, []);

  useEffect(() => {
    const handleAnalyzeAnomaly = () => {
      if (!patient) return;
      const latestData = patient.sensorData[patient.sensorData.length - 1];
      if (!latestData) return;

      startAnomalyTransition(async () => {
        setAnomaly(null);
        try {
          const result = await analyzeSensorData(latestData);
          setAnomaly(result);
        } catch (error) {
          console.error("Error analyzing sensor data:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to analyze sensor data for anomalies.",
          });
        }
      });
    };
    handleAnalyzeAnomaly();
  }, [patient, toast]);

  if (!patient) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Patient data not found.
          </h3>
          <p className="text-sm text-muted-foreground">
            We couldn't load your data. Please try again later.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
       <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
            <GuardianAngelLogo className="size-8 text-primary" />
            <h1 className="text-xl font-semibold font-headline">
              Guardian Angel (Patient)
            </h1>
        </div>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial">
             <h1 className="text-lg font-semibold md:text-2xl text-end">
              {patient.name}'s Dashboard
            </h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                 <Avatar className="h-8 w-8">
                    <AvatarImage src={patient.avatarUrl} alt={patient.name} />
                    <AvatarFallback>
                      {patient.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{patient.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
            <PatientViewContent patient={patient} anomaly={anomaly} isAnomalyPending={isAnomalyPending} />
        </main>
    </div>
  );
}
