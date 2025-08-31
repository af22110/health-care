"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Raspberry Piから受け取るデータ構造の型定義
interface LinkEventStat {
  platform: string;
  count: string;
  event: string;
}

export function JsonDisplay() {
  const [stats, setStats] = useState<LinkEventStat[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/raspberry-pi');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStats(data.linkEventStats);
        setError(null);
      } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError('An unknown error occurred.');
        }
        console.error("Failed to fetch data:", e);
      }
    };

    // 最初にデータを取得
    fetchData();

    // 5秒ごとにデータをポーリング
    const intervalId = setInterval(fetchData, 5000);

    // クリーンアップ関数でインターバルをクリア
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Raspberry Pi Data (Live)</CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-red-500">
            <p>Error loading data: {error}</p>
            <p>Is the API route working?</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead>Event</TableHead>
                <TableHead className="text-right">Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.length > 0 ? (
                stats.map((stat, index) => (
                  <TableRow key={index}>
                    <TableCell>{stat.platform}</TableCell>
                    <TableCell>{stat.event}</TableCell>
                    <TableCell className="text-right">{stat.count}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    Loading data...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
