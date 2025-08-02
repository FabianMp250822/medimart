'use server';
/**
 * @fileOverview A support chatbot flow for Clínica de la Costa.
 *
 * - supportFlow - A function that handles the chatbot conversation.
 * - SupportInput - The input type for the supportFlow function.
 * - SupportOutput - The return type for the supportFlow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SupportInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({
        text: z.string(),
    }))
  })).describe('The conversation history.'),
});
export type SupportInput = z.infer<typeof SupportInputSchema>;

const SupportOutputSchema = z.string().describe('The chatbot response.');
export type SupportOutput = z.infer<typeof SupportOutputSchema>;

const CLINIC_INFO = `
- **Nombre:** Clínica de la Costa
- **Ubicación Principal:** Carrera 50 No. 80-90, Barranquilla, Colombia.
- **Teléfono Principal:** +57 (605) 3369999.
- **Especialidades Principales:** Cardiología, Cirugía (General, Cardiovascular, Pediátrica, Plástica, etc.), Ginecología, Neurocirugía, Oncología, Ortopedia, Pediatría, Urgencias 24/7.
- **Servicios Clave:** Hospitalización, Cuidado Intensivo (UCI) para adultos y neonatos, Laboratorio Clínico, Radiología, Urgencias, Consulta Externa.
- **Citas:** Los usuarios pueden registrarse y solicitar citas a través de la página "Solicitar Cita". Deben crear una cuenta o iniciar sesión.
- **Contacto:** Para información general, los usuarios pueden llamar al Call Center (ext. 0) o visitar la sección de Contacto en la web.
- **Horarios:** Urgencias está disponible 24/7. El horario de consulta externa varía por especialista.
- **Valores:** Compromiso con la calidad, atención humanizada, seguridad del paciente e innovación.
`;

const systemPrompt = `Eres un asistente virtual de soporte para la "Clínica de la Costa". Tu nombre es CostaBot. Eres amable, servicial y profesional.

  Tu objetivo es responder las preguntas de los usuarios de manera concisa y clara, utilizando ÚNICAMENTE la siguiente información sobre la clínica. No inventes información que no esté aquí.

  **Información de la Clínica de la Costa:**
  ${CLINIC_INFO}

  **Instrucciones:**
  1.  **Sé Breve:** Responde de forma corta y directa.
  2.  **Usa la Información Proporcionada:** Basa todas tus respuestas en la información de arriba. Si no sabes la respuesta, di amablemente: "No tengo esa información en este momento, pero puedes comunicarte con nuestro Call Center al (605) 3369999 para más detalles."
  3.  **Guía a los Usuarios:** Si te preguntan cómo pedir una cita, explícales que deben ir a la sección "Solicitar Cita" del menú de Pacientes y registrarse.
  4.  **Mantén tu Personalidad:** Siempre sé amable y profesional. Empieza la primera conversación presentándote.

  A continuación se muestra el historial de conversación. Responde a la última pregunta del usuario.`;


export const supportFlow = ai.defineFlow(
  {
    name: 'supportFlow',
    inputSchema: SupportInputSchema,
    outputSchema: SupportOutputSchema,
  },
  async ({history}) => {
    const {output} = await ai.generate({
      model: 'googleai/gemini-2.0-flash',
      prompt: systemPrompt,
      history,
    });
    return output || "Lo siento, no pude generar una respuesta en este momento. Por favor, intenta de nuevo.";
  }
);
