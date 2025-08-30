export interface SensorData {
  timestamp: string;
  temperature: number;
  humidity: number;
  heartRate: number;
  movement: string;
  facialAnalysis: string;
}

export interface Message {
  id: string;
  sender: 'patient' | 'doctor';
  content: string;
  timestamp: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  avatarUrl: string;
  medicalHistory: string;
  sensorData: SensorData[];
  messages: Message[];
}

export interface Anomaly {
  isAnomalous: boolean;
  anomalyExplanation: string;
  criticality: 'low' | 'medium' | 'high' | string;
}
