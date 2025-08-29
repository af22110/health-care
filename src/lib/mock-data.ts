import type { Patient } from "./types";

export const mockPatients: Patient[] = [
  {
    id: "pat1",
    name: "John Doe",
    age: 72,
    avatarUrl: "https://picsum.photos/100/100?random=1",
    medicalHistory: "History of hypertension and had a mild stroke 2 years ago. Currently on medication for blood pressure.",
    sensorData: [
      {
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        temperature: 98.6,
        humidity: 45,
        heartRate: 75,
        movement: "active",
        facialAnalysis: "neutral",
      },
      {
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        temperature: 98.7,
        humidity: 46,
        heartRate: 78,
        movement: "still",
        facialAnalysis: "neutral",
      },
      {
        timestamp: new Date().toISOString(),
        temperature: 99.5,
        humidity: 45,
        heartRate: 130,
        movement: "still",
        facialAnalysis: "distressed",
      }
    ],
  },
  {
    id: "pat2",
    name: "Jane Smith",
    age: 65,
    avatarUrl: "https://picsum.photos/100/100?random=2",
    medicalHistory: "Diabetic (Type 2) and has asthma. Uses an inhaler as needed. Generally stable.",
    sensorData: [
       {
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        temperature: 98.2,
        humidity: 50,
        heartRate: 68,
        movement: "active",
        facialAnalysis: "neutral",
      },
      {
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        temperature: 98.3,
        humidity: 51,
        heartRate: 70,
        movement: "active",
        facialAnalysis: "neutral",
      },
      {
        timestamp: new Date().toISOString(),
        temperature: 98.4,
        humidity: 50,
        heartRate: 72,
        movement: "still",
        facialAnalysis: "neutral",
      }
    ],
  },
  {
    id: "pat3",
    name: "Robert Johnson",
    age: 80,
    avatarUrl: "https://picsum.photos/100/100?random=3",
    medicalHistory: "Recovering from hip replacement surgery. Limited mobility. History of atrial fibrillation.",
    sensorData: [
      {
        timestamp: new Date().toISOString(),
        temperature: 98.8,
        humidity: 48,
        heartRate: 85,
        movement: "limited",
        facialAnalysis: "neutral",
      }
    ],
  },
  {
    id: "pat4",
    name: "Emily White",
    age: 76,
    avatarUrl: "https://picsum.photos/100/100?random=4",
    medicalHistory: "Early-stage dementia patient. Experiences periods of confusion. Otherwise physically healthy.",
    sensorData: [
      {
        timestamp: new Date().toISOString(),
        temperature: 98.5,
        humidity: 47,
        heartRate: 80,
        movement: "still",
        facialAnalysis: "confused",
      }
    ],
  },
];
