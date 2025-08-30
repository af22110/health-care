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
        timestamp: "2024-07-29T18:00:00.000Z",
        temperature: 98.6,
        humidity: 45,
        heartRate: 75,
        movement: "active",
        facialAnalysis: "neutral",
        isAnomalous: false,
        anomalyExplanation: "All vitals are within normal ranges.",
        criticality: "low",
      },
      {
        timestamp: "2024-07-29T20:00:00.000Z",
        temperature: 98.7,
        humidity: 46,
        heartRate: 78,
        movement: "still",
        facialAnalysis: "neutral",
        isAnomalous: false,
        anomalyExplanation: "All vitals are within normal ranges.",
        criticality: "low",
      },
      {
        timestamp: "2024-07-29T22:00:00.000Z",
        temperature: 99.5,
        humidity: 45,
        heartRate: 135,
        movement: "still",
        facialAnalysis: "distressed",
        isAnomalous: true,
        anomalyExplanation: "High heart rate (135 bpm) and 'distressed' facial analysis indicate a potential issue.",
        criticality: "high",
      }
    ],
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
    sensorData: [
       {
        timestamp: "2024-07-29T18:00:00.000Z",
        temperature: 98.2,
        humidity: 50,
        heartRate: 68,
        movement: "active",
        facialAnalysis: "neutral",
        isAnomalous: false,
        anomalyExplanation: "All vitals are within normal ranges.",
        criticality: "low",
      },
      {
        timestamp: "2024-07-29T20:00:00.000Z",
        temperature: 98.3,
        humidity: 51,
        heartRate: 70,
        movement: "active",
        facialAnalysis: "neutral",
        isAnomalous: false,
        anomalyExplanation: "All vitals are within normal ranges.",
        criticality: "low",
      },
      {
        timestamp: "2024-07-29T22:00:00.000Z",
        temperature: 98.4,
        humidity: 50,
        heartRate: 72,
        movement: "still",
        facialAnalysis: "neutral",
        isAnomalous: false,
        anomalyExplanation: "All vitals are within normal ranges.",
        criticality: "low",
      }
    ],
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
    sensorData: [
      {
        timestamp: "2024-07-29T22:00:00.000Z",
        temperature: 98.8,
        humidity: 48,
        heartRate: 85,
        movement: "limited",
        facialAnalysis: "neutral",
        isAnomalous: false,
        anomalyExplanation: "All vitals are within normal ranges.",
        criticality: "low",
      }
    ],
    messages: []
  },
  {
    id: "pat4",
    name: "Emily White",
    age: 76,
    avatarUrl: "https://picsum.photos/100/100?random=4",
    medicalHistory: "Early-stage dementia patient. Experiences periods of confusion. Otherwise physically healthy.",
    sensorData: [
      {
        timestamp: "2024-07-29T22:00:00.000Z",
        temperature: 98.5,
        humidity: 47,
        heartRate: 80,
        movement: "still",
        facialAnalysis: "confused",
        isAnomalous: true,
        anomalyExplanation: "'Confused' facial analysis may require attention.",
        criticality: "medium",
      }
    ],
    messages: []
  },
];
