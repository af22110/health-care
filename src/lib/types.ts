export interface SensorData {
  timestamp: string;
  temperature: number; // in Fahrenheit
  humidity: number;
  heartRate: number;
  movement: string;
}

export interface AnalyzedSensorData extends SensorData {
  isAnomalous: boolean;
  anomalyExplanation: string;
  criticality: 'low' | 'medium' | 'high' | string;
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
  sensorData: AnalyzedSensorData[];
  messages: Message[];
}
