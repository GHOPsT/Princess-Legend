
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client inside the service function to ensure it uses the most current API key and configuration.
export const generateRoomDescription = async (roomType: string, decorators: string[]): Promise<string> => {
  // Always retrieve the API key from process.env.API_KEY directly as required.
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return `Entras en ${roomType}. Es un lugar tranquilo.`;
  }

  // Create a new GoogleGenAI instance for each call to avoid stale configuration.
  const ai = new GoogleGenAI({ apiKey });

  try {
    const prompt = `
      Act as the Dungeon Master for an 8-bit RPG game. 
      The player is a princess character.
      She just entered: ${roomType}.
      Visible items: ${decorators.join(', ')}.
      
      Write a VERY SHORT (max 150 characters), whimsical, and immersive description in Spanish. 
      Do not use markdown. Just plain text.
    `;

    // Use 'gemini-3-flash-preview' for basic text tasks like narrative generation.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        // When setting maxOutputTokens, you must also set a thinkingBudget for Gemini 3 series models.
        maxOutputTokens: 100,
        thinkingConfig: { thinkingBudget: 50 },
        temperature: 0.8,
      }
    });

    // Extract text from the response using the .text property directly.
    return response.text || "El ambiente es misterioso...";
  } catch (error) {
    console.error("Error generating description:", error);
    return `Entras en ${roomType}.`;
  }
};
