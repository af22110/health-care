import type { Patient, AnalyzedSensorData } from "./types";

// This interface represents the raw data format coming from the Raspberry Pi
interface RawAnalyzedSensorData {
  date: string;
  time: string;
  temperature: number; // in Fahrenheit
  humidity: number;
  pulse: number;
  motion: string;
  isAnomalous: boolean;
  anomalyExplanation: string;
  criticality: 'low' | 'medium' | 'high' | string;
}

const rawSensorDataPat1: RawAnalyzedSensorData[] = [
  {
    date: "2024-07-29",
    time: "18:00:00",
    temperature: 98.6,
    humidity: 45,
    pulse: 75,
    motion: "active",
    isAnomalous: false,
    anomalyExplanation: "All vitals appear normal.",
    criticality: "low"
  },
  {
    date: "2024-07-29",
    time: "20:00:00",
    temperature: 98.7,
    humidity: 46,
    pulse: 78,
    motion: "still",
    isAnomalous: false,
    anomalyExplanation: "All vitals appear normal.",
    criticality: "low"
  },
  {
    date: "2024-07-29",
    time: "22:00:00",
    temperature: 99.5,
    humidity: 45,
    pulse: 135,
    motion: "still",
    isAnomalous: true,
    anomalyExplanation: "High heart rate detected. Heart rate is 135 bpm, which is above the 120 bpm threshold.",
    criticality: "high"
  },
];

const rawSensorDataPat2: RawAnalyzedSensorData[] = [
  {
    date: "2024-07-29",
    time: "18:00:00",
    temperature: 98.2,
    humidity: 50,
    pulse: 68,
    motion: "active",
    isAnomalous: false,
    anomalyExplanation: "All vitals appear normal.",
    criticality: "low"
  },
  {
    date: "2024-07-29",
    time: "20:00:00",
    temperature: 98.3,
    humidity: 51,
    pulse: 70,
    motion: "active",
    isAnomalous: false,
    anomalyExplanation: "All vitals appear normal.",
    criticality: "low"
  },
  {
    date: "2024-07-29",
    time: "22:00:00",
    temperature: 98.4,
    humidity: 50,
    pulse: 72,
    motion: "still",
    isAnomalous: false,
    anomalyExplanation: "All vitals appear normal.",
    criticality: "low"
  },
];

const rawSensorDataPat3: RawAnalyzedSensorData[] = [
    {
    date: "2024-07-29",
    time: "22:00:00",
    temperature: 98.8,
    humidity: 48,
    pulse: 85,
    motion: "limited",
    isAnomalous: false,
    anomalyExplanation: "All vitals appear normal.",
    criticality: "low"
  }
];

const rawSensorDataPat4: RawAnalyzedSensorData[] = [
    {
    date: "2024-07-29",
    time: "22:00:00",
    temperature: 98.5,
    humidity: 47,
    pulse: 80,
    motion: "still",
    isAnomalous: false,
    anomalyExplanation: "All vitals appear normal.",
    criticality: "low"
  }
];


const processRawData = (rawData: RawAnalyzedSensorData[]): AnalyzedSensorData[] => {
  return rawData.map(d => ({
    timestamp: `${d.date}T${d.time}.000Z`,
    temperature: d.temperature,
    humidity: d.humidity,
    heartRate: d.pulse,
    movement: d.motion,
    isAnomalous: d.isAnomalous,
    anomalyExplanation: d.anomalyExplanation,
    criticality: d.criticality,
  }));
};

export const mockPatients: Patient[] = [
  {
    id: "pat1",
    name: "John Doe",
    age: 72,
    avatarUrl: "https://picsum.photos/100/100?random=1",
    medicalHistory: "History of hypertension and had a mild stroke 2 years ago. Currently on medication for blood pressure.",
    sensorData: processRawData(rawSensorDataPat1),
    messages: [
        {
            id: 'msg1',
            sender: 'doctor',
            content: 'Hello John, I noticed your heart rate was a bit high earlier. Are you feeling okay?',
            timestamp: '2024-07-29T22:05:00.000Z',
        },
        {
            id: 'msg2',
            sender: 'patient',
            content: 'Hi Dr. Angelica. Yes, I was feeling a bit anxious. I\'m feeling better now, thank you for checking in.',
            timestamp: '2024-07-29T22:10:00.000Z',
        }
    ]
  },
  {
    id: "pat2",
    name: "Jane Smith",
    age: 65,
    avatarUrl: "https://picsum.photos/100/100?random=2",
    medicalHistory: "Diabetic (Type 2) and has asthma. Uses an inhaler as needed. Generally stable.",
    sensorData: processRawData(rawSensorDataPat2),
    messages: [
        {
            id: 'msg3',
            sender: 'doctor',
            content: 'Hi Jane, your vitals look stable. Keep up the great work!',
            timestamp: '2024-07-29T19:00:00.000Z',
        }
    ]
  },
  {
    id: "pat3",
    name: "Robert Johnson",
    age: 80,
    avatarUrl: "https://picsum.photos/100/100?random=3",
    medicalHistory: "Recovering from hip replacement surgery. Limited mobility. History of atrial fibrillation.",
    sensorData: processRawData(rawSensorDataPat3),
    messages: []
  },
  {
    id: "pat4",
    name: "Emily White",
    age: 76,
    avatarUrl: "https://picsum.photos/100/100?random=4",
    medicalHistory: "Early-stage dementia patient. Experiences periods of confusion. Otherwise physically healthy.",
    sensorData: processRawData(rawSensorDataPat4),
    messages: []
  },
];
