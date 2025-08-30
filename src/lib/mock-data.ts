import type { Patient, SensorData } from "./types";

interface RawSensorData {
  date: string;
  time: string;
  temperature: number;
  humidity: number;
  pulse: number;
  motion: string;
}

const rawSensorDataPat1: RawSensorData[] = [
  {
    date: "2024-07-29",
    time: "18:00:00",
    temperature: 98.6,
    humidity: 45,
    pulse: 75,
    motion: "active",
  },
  {
    date: "2024-07-29",
    time: "20:00:00",
    temperature: 98.7,
    humidity: 46,
    pulse: 78,
    motion: "still",
  },
  {
    date: "2024-07-29",
    time: "22:00:00",
    temperature: 99.5,
    humidity: 45,
    pulse: 135,
    motion: "still",
  },
];

const rawSensorDataPat2: RawSensorData[] = [
  {
    date: "2024-07-29",
    time: "18:00:00",
    temperature: 98.2,
    humidity: 50,
    pulse: 68,
    motion: "active",
  },
  {
    date: "2024-07-29",
    time: "20:00:00",
    temperature: 98.3,
    humidity: 51,
    pulse: 70,
    motion: "active",
  },
  {
    date: "2024-07-29",
    time: "22:00:00",
    temperature: 98.4,
    humidity: 50,
    pulse: 72,
    motion: "still",
  },
];

const rawSensorDataPat3: RawSensorData[] = [
    {
    date: "2024-07-29",
    time: "22:00:00",
    temperature: 98.8,
    humidity: 48,
    pulse: 85,
    motion: "limited",
  }
];

const rawSensorDataPat4: RawSensorData[] = [
    {
    date: "2024-07-29",
    time: "22:00:00",
    temperature: 98.5,
    humidity: 47,
    pulse: 80,
    motion: "still",
  }
];


const processRawData = (rawData: RawSensorData[]): SensorData[] => {
  return rawData.map(d => ({
    timestamp: `${d.date}T${d.time}.000Z`,
    temperature: d.temperature,
    humidity: d.humidity,
    heartRate: d.pulse,
    movement: d.motion,
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
