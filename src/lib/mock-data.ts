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
    const timestamp = new Date(baseTime.getTime() + i * 30 * 60 * 1000); // Every 30 minutes
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
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    return [
      {
        id: "pat1",
        name: "John Doe",
        age: 72,
        avatarUrl: "https://picsum.photos/100/100?random=1",
        medicalHistory: "History of hypertension and had a mild stroke 2 years ago. Currently on medication for blood pressure.",
        sensorData: generateSensorData(yesterday, 1),
      },
      {
        id: "pat2",
        name: "Jane Smith",
        age: 65,
        avatarUrl: "https://picsum.photos/100/100?random=2",
        medicalHistory: "Diabetic (Type 2) and has asthma. Uses an inhaler as needed. Generally stable.",
        sensorData: generateSensorData(new Date(yesterday.getTime() + 60 * 60 * 1000), 2),
      },
      {
        id: "pat3",
        name: "Robert Johnson",
        age: 80,
        avatarUrl: "https://picsum.photos/100/100?random=3",
        medicalHistory: "Recovering from hip replacement surgery. Limited mobility. History of atrial fibrillation.",
        sensorData: generateSensorData(new Date(yesterday.getTime() + 2 * 60 * 60 * 1000), 3),
      },
      {
        id: "pat4",
        name: "Emily White",
        age: 76,
        avatarUrl: "https://picsum.photos/100/100?random=4",
        medicalHistory: "Early-stage dementia patient. Experiences periods of confusion. Otherwise physically healthy.",
        sensorData: generateSensorData(new Date(yesterday.getTime() + 3 * 60 * 60 * 1000), 4),
      },
    ];
}

export const mockPatients: Patient[] = createMockPatients();
