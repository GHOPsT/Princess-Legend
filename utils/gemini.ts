
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { logger } from "./logger";

export const generateNPCDialogue = async (role: string, name: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Actúa como un NPC de un RPG de 16 bits. Nombre: ${name}, Rol: ${role}. 
    Cuéntame una breve historia o comentario sobre el reino (máx 120 caracteres). 
    Sé inmersivo y no uses markdown.`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { 
        temperature: 0.9 
      }
    });

    return response.text || "Un día radiante, ¿no cree?";
  } catch (error) {
    logger.error("Gemini Dialogue Error", error);
    const fallbacks: Record<string, string> = {
      guard: "El camino hacia el norte es peligroso hoy.",
      merchant: "Tengo las mejores telas de seda del reino.",
      elder: "En mis tiempos, las flores brillaban por la noche.",
      storyteller: "Había una vez un reino flotante..."
    };
    return fallbacks[role] || "Hola, joven princesa.";
  }
};

export const generateRoomDescription = async (roomType: string): Promise<string> => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Describe brevemente (10 carac.) la entrada a ${roomType} en un RPG.`,
        });
        return response.text || "Nueva zona descubierta.";
    } catch (error) {
        logger.error("Gemini Room Description Error", error);
        return `Entras en ${roomType}. Todo está impecable.`;
    }
};
