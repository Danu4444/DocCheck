'use server';

/**
 * @fileOverview AI flow to summarize prescription information from an image.
 *
 * - summarizePrescription - A function that summarizes prescription details from an image.
 * - SummarizePrescriptionInput - The input type for the summarizePrescription function.
 * - SummarizePrescriptionOutput - The return type for the summarizePrescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePrescriptionInputSchema = z.object({
  prescriptionImage: z
    .string()
    .describe(
      'An image of a prescription, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected typo here
    ),
});
export type SummarizePrescriptionInput = z.infer<typeof SummarizePrescriptionInputSchema>;

const SummarizePrescriptionOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the prescription, including medication names, dosages, and instructions.'),
});
export type SummarizePrescriptionOutput = z.infer<typeof SummarizePrescriptionOutputSchema>;

export async function summarizePrescription(input: SummarizePrescriptionInput): Promise<SummarizePrescriptionOutput> {
  return summarizePrescriptionFlow(input);
}

const summarizePrescriptionPrompt = ai.definePrompt({
  name: 'summarizePrescriptionPrompt',
  input: {schema: SummarizePrescriptionInputSchema},
  output: {schema: SummarizePrescriptionOutputSchema},
  prompt: `You are a helpful AI assistant that summarizes prescription information from images.

  Analyze the following image of a prescription and extract the key information, including medication names, dosages, and instructions. Provide a concise summary.

  Prescription Image: {{media url=prescriptionImage}}`,
});

const summarizePrescriptionFlow = ai.defineFlow(
  {
    name: 'summarizePrescriptionFlow',
    inputSchema: SummarizePrescriptionInputSchema,
    outputSchema: SummarizePrescriptionOutputSchema,
  },
  async input => {
    const {output} = await summarizePrescriptionPrompt(input);
    return output!;
  }
);
