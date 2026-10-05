import { gemini } from "../lib/openAI.js";
export async function generatePokemonDescription(pokemonName,pokemonType) {
    const prompt = `
    create a detailed description for the Pokemon named "${pokemonName}" and typed "${pokemonType}". The description should include its type, abilities, and any unique characteristics that make it stand out. Please provide the description in a concise paragraph format.
    `;
    const response = await gemini.models.generateContent({
        // model: gemini.Models.CHAT_BISON, model currently not working, so using the default model
        model:"gemini-3-flash-preview",
        contents: prompt,
    });
    return response.text
}