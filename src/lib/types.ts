export interface SensorData {
  timestamp: string;
  temperature: number;
  humidity: number;
  heartRate: number;
  movement: string;
  facialAnalysis: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  avatarUrl: string;
  medicalHistory: string;
  sensorData: SensorData[];
}

export interface Anomaly {
  isAnomalous: boolean;
  anomalyExplanation: string;
  criticality: 'low' | 'medium' | 'high' | string;
}
