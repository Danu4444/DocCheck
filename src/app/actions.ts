// @ts-nocheck
'use server';
import { aiChatbotAssistance } from '@/ai/flows/ai-chatbot-assistance';
import { summarizePrescription } from '@/ai/flows/prescription-summary';

export async function getPrescriptionSummary(prescriptionImage: string) {
  try {
    const result = await summarizePrescription({ prescriptionImage });
    return { success: true, summary: result.summary };
  } catch (error) {
    console.error('Error summarizing prescription:', error);
    return { success: false, error: 'Failed to summarize prescription.' };
  }
}

export async function getChatbotResponse(query: string) {
  try {
    const result = await aiChatbotAssistance({ query });
    return { success: true, response: result.response };
  } catch (error) {
    console.error('Error getting chatbot response:', error);
    return { success: false, error: 'Failed to get response from chatbot.' };
  }
}
