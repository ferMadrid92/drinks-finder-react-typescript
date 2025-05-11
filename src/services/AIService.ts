import { streamText } from "ai"
import { openrouter } from "../lib/ai"

export default {
    async generateRecipe(prompt: string) {
        const result = streamText({
            model: openrouter('mistralai/mistral-7b-instruct:free'),
            // model: openrouter('google/gemini-flash-1.5-8b-exp'),
            // model: openrouter('deepseek/deepseek-r1-distill-llama-70b:free'),
            // model: openrouter('qwen/qwen-2.5-7b-instruct:free'),
            prompt,
            system: `Eres un experto en recetas de bebidas con más de 50 años de experiencia. Genera una receta con ingredientes y pasos claros` + `No incluyas información adicional, solo la receta`+
            `Si el prompt no tiene sentido o es referente a otro campo de estudio, tema o propósito, responde con "Lo siento, no puedo ayudarte con eso, aquí tienes una receta de ejemplo:"` +
            `Utiliza ingredientes aleatorios y diferentes en cada respuesta`,
            temperature: 0.2,
        })
        return result.textStream
    }
}