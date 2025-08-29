'use server';

/**
 * @fileOverview Summarizes patient data for doctors, including sensor data and history.
 *
 * - summarizePatientDataForDoctors - A function that summarizes patient data for doctors.
 * - SummarizePatientDataForDoctorsInput - The input type for the summarizePatientDataForDoctors function.
 * - SummarizePatientDataForDoctorsOutput - The return type for the summarizePatientDataForDoctors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePatientDataForDoctorsInputSchema = z.object({
  patientId: z.string().describe('The ID of the patient to summarize data for.'),
  sensorData: z.string().describe('The sensor data of the patient in JSON format.'),
  medicalHistory: z.string().describe('The medical history of the patient.'),
});
export type SummarizePatientDataForDoctorsInput = z.infer<typeof SummarizePatientDataForDoctorsInputSchema>;

const SummarizePatientDataForDoctorsOutputSchema = z.object({
  summary: z.string().describe('A summary of the patient data for doctors.'),
});
export type SummarizePatientDataForDoctorsOutput = z.infer<typeof SummarizePatientDataForDoctorsOutputSchema>;

export async function summarizePatientDataForDoctors(input: SummarizePatientDataForDoctorsInput): Promise<SummarizePatientDataForDoctorsOutput> {
  return summarizePatientDataForDoctorsFlow(input);
}

const summarizePatientDataForDoctorsPrompt = ai.definePrompt({
  name: 'summarizePatientDataForDoctorsPrompt',
  input: {schema: SummarizePatientDataForDoctorsInputSchema},
  output: {schema: SummarizePatientDataForDoctorsOutputSchema},
  prompt: `You are an expert medical summarizer.

  Please summarize the following patient data for a doctor, including sensor data and medical history.

  Patient ID: {{{patientId}}}
  Sensor Data: {{{sensorData}}}
  Medical History: {{{medicalHistory}}}
  `,
});

const summarizePatientDataForDoctorsFlow = ai.defineFlow(
  {
    name: 'summarizePatientDataForDoctorsFlow',
    inputSchema: SummarizePatientDataForDoctorsInputSchema,
    outputSchema: SummarizePatientDataForDoctorsOutputSchema,
  },
  async input => {
    const {output} = await summarizePatientDataForDoctorsPrompt(input);
    return output!;
  }
);
