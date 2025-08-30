"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { mockPatients } from "@/lib/mock-data";
import type { Patient } from "@/lib/types";
import { Bell, Search, Settings, User } from "lucide-react";
import React, { useMemo, useState, useTransition, useEffect } from "react";
import { GuardianAngelLogo } from "@/components/icons";
import { PatientContent } from "@/components/patient-content";
import type { Anomaly } from "@/lib/types";
import { analyzeSensorData } from "@/ai/flows/analyze-sensor-data-for-anomalies";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    mockPatients[0]?.id ?? null
  );

  const { toast } = useToast();
  const [isAnomalyPending, startAnomalyTransition] = useTransition();
  const [anomaly, setAnomaly] = useState<Anomaly | null>(null);

  const selectedPatient = useMemo<Patient | null>(() => {
    return mockPatients.find((p) => p.id === selectedPatientId) ?? null;
  }, [selectedPatientId]);

  useEffect(() => {
    const handleAnalyzeAnomaly = () => {
      if (!selectedPatient) return;
      const latestData = selectedPatient.sensorData[selectedPatient.sensorData.length - 1];
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
  }, [selectedPatient, toast]);


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <GuardianAngelLogo className="size-8 text-primary" />
            <h1 className="text-xl font-semibold font-headline">
              Guardian Angel
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={true}
                className="font-semibold text-base"
              >
                Patients
              </SidebarMenuButton>
            </SidebarMenuItem>
            {mockPatients.map((patient) => (
              <SidebarMenuItem key={patient.id}>
                <SidebarMenuButton
                  onClick={() => setSelectedPatientId(patient.id)}
                  isActive={selectedPatientId === patient.id}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={patient.avatarUrl} alt={patient.name} />
                    <AvatarFallback>
                      {patient.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{patient.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="flex md:hidden" />
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold md:text-2xl">
              {selectedPatient?.name ?? "Patient Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <form className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search patients..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-background"
                />
              </div>
            </form>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://picsum.photos/100" data-ai-hint="doctor portrait" />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Dr. Angelica</DropdownMenuLabel>
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
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {selectedPatient ? (
            <PatientContent patient={selectedPatient} anomaly={anomaly} isAnomalyPending={isAnomalyPending} />
          ) : (
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  No patient selected
                </h3>
                <p className="text-sm text-muted-foreground">
                  Please select a patient from the sidebar to view their data.
                </p>
              </div>
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
