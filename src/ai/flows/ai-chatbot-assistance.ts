'use server';

/**
 * @fileOverview Provides an AI chatbot flow for patients to ask questions about their symptoms and receive general medical information.
 *
 * - aiChatbotAssistance - A function that processes patient queries and returns AI-generated medical information.
 * - AIChatbotAssistanceInput - The input type for the aiChatbotAssistance function.
 * - AIChatbotAssistanceOutput - The return type for the aiChatbotAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotAssistanceInputSchema = z.object({
  query: z.string().describe('The question or symptoms description from the patient.'),
});
export type AIChatbotAssistanceInput = z.infer<typeof AIChatbotAssistanceInputSchema>;

const AIChatbotAssistanceOutputSchema = z.object({
  response: z.string().describe('The AI-generated response to the patient query.'),
});
export type AIChatbotAssistanceOutput = z.infer<typeof AIChatbotAssistanceOutputSchema>;

export async function aiChatbotAssistance(input: AIChatbotAssistanceInput): Promise<AIChatbotAssistanceOutput> {
  return aiChatbotAssistanceFlow(input);
}

const aiChatbotAssistancePrompt = ai.definePrompt({
  name: 'aiChatbotAssistancePrompt',
  input: {schema: AIChatbotAssistanceInputSchema},
  output: {schema: AIChatbotAssistanceOutputSchema},
  prompt: `You are a helpful AI chatbot providing general medical information to patients.

  Please answer the following question or provide information based on the symptoms described:
  
  {{{query}}}
  
  Remember, you are not a substitute for a real doctor, so always advise the patient to consult with a medical professional for accurate diagnosis and treatment.
  `,
});

const aiChatbotAssistanceFlow = ai.defineFlow(
  {
    name: 'aiChatbotAssistanceFlow',
    inputSchema: AIChatbotAssistanceInputSchema,
    outputSchema: AIChatbotAssistanceOutputSchema,
  },
  async input => {
    const {output} = await aiChatbotAssistancePrompt(input);
    return output!;
  }
);
