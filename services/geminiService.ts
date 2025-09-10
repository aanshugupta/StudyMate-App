
import { GoogleGenAI, Chat, GenerateContentStreamResult } from "@google/genai";
import type { ChatMessage } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are a professional teacher and guide for graduation-level students. Your purpose is to help students with their studies by providing clear, accurate, and concise answers.
- When asked for notes, provide them in well-structured Markdown format.
- When asked to solve a problem, give a step-by-step explanation.
- Maintain a supportive and encouraging tone.
- Your goal is to be a high-performance virtual teacher.`;

let chat: Chat | null = null;

function getChatSession(): Chat {
    if (!chat) {
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: systemInstruction,
            },
        });
    }
    return chat;
}

export const streamAIResponse = async (
    prompt: string,
): Promise<GenerateContentStreamResult> => {
    try {
        const chatSession = getChatSession();
        const result = await chatSession.sendMessageStream({ message: prompt });
        return result;
    } catch (error) {
        console.error("Error generating content from Gemini:", error);
        throw new Error("Failed to get response from AI assistant.");
    }
};
