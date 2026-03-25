import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

//Get a api call
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
