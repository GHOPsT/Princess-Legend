
import { GoogleGenAI } from "@google/genai";
import { logger } from "./logger";

/**
 * Acceso ultra-seguro a variables de entorno en el navegador.
 */
const getApiKey = (): string | undefined => {
  try {
    // Usar globalThis para evitar ReferenceError: process is not defined
    const env = (globalThis as any).process?.env;
    return env?.API_KEY;
  } catch {
    return undefined;
  }
};

export const generateRoomDescription = async (roomType: string, decorators: string[]): Promise<string> => {
  const apiKey = getApiKey();

  if (!apiKey) {
    logger.warn("Gemini: No se detectó API_KEY. Usando descripciones locales.");
    return `Entras en ${roomType}. El lugar tiene un encanto real innegable.`;
  }

  logger.info(`Gemini: Solicitando descripción para ${roomType}...`);

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
      Eres el narrador de un MMORPG de 8 bits. 
      Personaje: Princesa.
      Lugar: ${roomType}.
      Muebles: ${decorators.join(', ')}.
      Escribe una frase corta (100 carac.) de bienvenida mágica en español. Sin markdown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        maxOutputTokens: 60,
        temperature: 0.8,
      }
    });

    const text = response.text || "Un rincón pacífico del reino.";
    logger.ia("Gemini: Respuesta recibida exitosamente.");
    return text;
  } catch (error: any) {
    logger.error("Gemini: Error en la llamada a la API", error.message);
    return `Has llegado a ${roomType}. Se siente un aire de misterio.`;
  }
};
