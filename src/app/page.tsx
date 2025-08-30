
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { GuardianAngelLogo } from "@/components/icons";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center p-8 rounded-lg shadow-xl bg-card border">
        <GuardianAngelLogo className="w-16 h-16 mb-4 text-primary" />
        <h1 className="text-3xl font-bold mb-2 text-center font-headline">
          Welcome to Guardian Angel
        </h1>
        <p className="text-muted-foreground mb-8">
          Your Remote Patient Monitoring Dashboard
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/doctor">Doctor View</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/patient">Patient View</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
