'use server';
/**
 * @fileOverview Analyzes sensor data for anomalies using the Gemini API and a rule-based system.
 *
 * - analyzeSensorData - A function that analyzes sensor data for anomalies.
 * - AnalyzeSensorDataInput - The input type for the analyzeSensorData function.
 * - AnalyzeSensorDataOutput - The return type for the analyzeSensorData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSensorDataInputSchema = z.object({
  temperature: z.number().describe('The temperature reading from the sensor.'),
  humidity: z.number().describe('The humidity reading from the sensor.'),
  heartRate: z.number().describe('The heart rate reading from the sensor.'),
  movement: z.string().describe('The movement data from the sensor.'),
  facialAnalysis: z.string().describe('The facial analysis results from the sensor.'),
  timestamp: z.string().describe('The timestamp of the sensor data.'),
});
export type AnalyzeSensorDataInput = z.infer<typeof AnalyzeSensorDataInputSchema>;

const AnalyzeSensorDataOutputSchema = z.object({
  isAnomalous: z.boolean().describe('Whether or not the sensor data is anomalous.'),
  anomalyExplanation: z.string().describe('The explanation of the anomaly, if any.'),
  criticality: z.string().describe('The criticality of the anomaly (e.g., low, medium, high).'),
});
export type AnalyzeSensorDataOutput = z.infer<typeof AnalyzeSensorDataOutputSchema>;

export async function analyzeSensorData(input: AnalyzeSensorDataInput): Promise<AnalyzeSensorDataOutput> {
  return analyzeSensorDataFlow(input);
}

const analyzeSensorDataPrompt = ai.definePrompt({
  name: 'analyzeSensorDataPrompt',
  input: {schema: AnalyzeSensorDataInputSchema},
  output: {schema: AnalyzeSensorDataOutputSchema},
  prompt: `You are an expert data analyst specializing in detecting anomalies in sensor data.

  You will receive sensor data including temperature, humidity, heart rate, movement, and facial analysis results.
  You will analyze this data for anomalies, using a rule-based system to generate warnings and prioritize critical anomalies.

  Here are some rules to follow:
  - If the heart rate is consistently above 120 bpm or below 40 bpm, it is a high criticality anomaly.
  - If the temperature is above 90 degrees Fahrenheit or below 50 degrees Fahrenheit, it is a medium criticality anomaly.
  - Sudden changes in facial expression analysis (e.g., from neutral to distressed) coupled with elevated heart rate should be flagged as high criticality.
  - Lack of movement for extended periods should be flagged as medium criticality, especially if coupled with other unusual readings.
  - Extreme values for humidity (below 20% or above 80%) should be flagged as low criticality.

  Based on the data and these rules, determine if the data is anomalous and provide an explanation.

  Sensor Data:
  Temperature: {{temperature}}
  Humidity: {{humidity}}
  Heart Rate: {{heartRate}}
  Movement: {{movement}}
  Facial Analysis: {{facialAnalysis}}
  Timestamp: {{timestamp}}`,
});

const analyzeSensorDataFlow = ai.defineFlow(
  {
    name: 'analyzeSensorDataFlow',
    inputSchema: AnalyzeSensorDataInputSchema,
    outputSchema: AnalyzeSensorDataOutputSchema,
  },
  async input => {
    const {output} = await analyzeSensorDataPrompt(input);
    return output!;
  }
);
