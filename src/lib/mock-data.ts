import type { Patient } from "./types";

// A simple pseudo-random number generator for deterministic results
const mulberry32 = (seed: number) => {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const generateSensorData = (baseTime: Date, seed: number) => {
  const data = [];
  const random = mulberry32(seed);

  for (let i = 0; i < 48; i++) {
    // Generate data points for the last 24 hours from the fixed base time
    const timestamp = new Date(baseTime.getTime() - (47 - i) * 30 * 60 * 1000);
    const heartRate = 60 + random() * 20;
    // Introduce an anomaly
    const heartRateWithAnomaly = i > 30 && i < 35 ? heartRate + 60 : heartRate;
    
    data.push({
      timestamp: timestamp.toISOString(),
      temperature: 97.5 + random() * 2,
      humidity: 40 + random() * 10,
      heartRate: Math.round(heartRateWithAnomaly),
      movement: random() > 0.2 ? "active" : "still",
      facialAnalysis: random() > 0.1 ? "neutral" : "distressed",
    });
  }
  return data;
};

function createMockPatients(): Patient[] {
    // Use a fixed date to ensure consistent data generation between server and client
    const fixedNow = new Date('2024-07-30T10:00:00Z');

    return [
      {
        id: "pat1",
        name: "John Doe",
        age: 72,
        avatarUrl: "https://picsum.photos/100/100?random=1",
        medicalHistory: "History of hypertension and had a mild stroke 2 years ago. Currently on medication for blood pressure.",
        sensorData: generateSensorData(fixedNow, 1),
      },
      {
        id: "pat2",
        name: "Jane Smith",
        age: 65,
        avatarUrl: "https://picsum.photos/100/100?random=2",
        medicalHistory: "Diabetic (Type 2) and has asthma. Uses an inhaler as needed. Generally stable.",
        sensorData: generateSensorData(fixedNow, 2),
      },
      {
        id: "pat3",
        name: "Robert Johnson",
        age: 80,
        avatarUrl: "https://picsum.photos/100/100?random=3",
        medicalHistory: "Recovering from hip replacement surgery. Limited mobility. History of atrial fibrillation.",
        sensorData: generateSensorData(fixedNow, 3),
      },
      {
        id: "pat4",
        name: "Emily White",
        age: 76,
        avatarUrl: "https://picsum.photos/100/100?random=4",
        medicalHistory: "Early-stage dementia patient. Experiences periods of confusion. Otherwise physically healthy.",
        sensorData: generateSensorData(fixedNow, 4),
      },
    ];
}

export const mockPatients: Patient[] = createMockPatients();
