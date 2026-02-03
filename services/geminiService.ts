import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

try {
  if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
} catch (error) {
  console.warn("Gemini API Key missing or invalid.");
}

export const generateRoomDescription = async (roomType: string, decorators: string[]): Promise<string> => {
  if (!ai) {
    return `Entras en ${roomType}. Es un lugar tranquilo.`;
  }

  try {
    const prompt = `
      Act as the Dungeon Master for an 8-bit RPG game. 
      The player is a princess character.
      She just entered: ${roomType}.
      Visible items: ${decorators.join(', ')}.
      
      Write a VERY SHORT (max 150 characters), whimsical, and immersive description in Spanish. 
      Do not use markdown. Just plain text.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        maxOutputTokens: 60,
        temperature: 0.8,
      }
    });

    return response.text || "El ambiente es misterioso...";
  } catch (error) {
    console.error("Error generating description:", error);
    return `Entras en ${roomType}.`;
  }
};