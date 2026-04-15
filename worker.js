// public/worker.js

// 1. Importamos el motor de WebLLM desde el CDN
import * as webllm from "https://esm.run/@mlc-ai/web-llm";

let engine = null;
// Usamos el modelo 0.5B: es ligero (~300MB), rápido y muy compatible
const selectedModel = "Qwen2.5-0.5B-Instruct-q4f16_1-MLC"; 

console.log("WORKER: Script cargado y listo.");

self.onmessage = async (event) => {
    const { text, context, type } = event.data;
    
    try {
        // Inicialización del motor
        if (!engine) {
            console.log("WORKER: Iniciando CreateMLCEngine...");
            
            engine = await webllm.CreateMLCEngine(selectedModel, {
                initProgressCallback: (report) => {
                    // Enviamos el progreso al componente de React para la barra
                    self.postMessage({ 
                        status: "progress", 
                        progress: report.progress, 
                        text: report.text 
                    });
                }
            });

            console.log("WORKER: MLCEngine está listo.");
            self.postMessage({ status: 'ready' });
        }

        // Si solo enviamos el 'init', frenamos aquí.
        if (type === 'init') return;

        // Procesamiento de mensajes
        if (text && engine) {
            const messages = [
               { 
                    role: "system", 
                    content: `Eres el asistente de Luis Castro. Tu única fuente de verdad es el contexto proporcionado.
                  
                    INFORMACIÓN CRÍTICA: Luis terminó su relación laboral con Digpatho en Diciembre de 2025. 
                    Hoy es 2026 y Luis está ACTUALMENTE BUSCANDO NUEVOS DESAFÍOS (disponible para trabajar).

                    REGLAS DE RESPUESTA OBLIGATORIAS:
                    - Si preguntan "¿Dónde trabaja Luis?", responde: "Luis actualmente está abierto a nuevas oportunidades laborales y se encuentra en búsqueda activa de desafíos en Machine Learning."
                    - Si preguntan "¿Dónde estudió Luis?", responde: "Luis estudió en la Universidad de Buenos Aires (UBA) y se graduó como Analista Universitario en Computación en 2024."
                    - Si preguntan "¿Qué idiomas habla?", responde: "Luis habla español nativo e inglés nivel B2 (intermedio alto), lo que le permite trabajar de forma fluida en equipos internacionales."
                    - Si preguntan sobre su experiencia en "Digpatho", responde: "Luis trabajó en Digpatho hasta diciembre de 2025, donde se desempeñó como Machine Learning Leader y Engineer liderando proyectos de diagnóstico de cáncer."
                    - Si preguntan por sus "Proyectos", responde: "Luis tiene proyectos destacados en Clasificación de Imágenes para E-commerce, Detección de Fraude en Tarjetas de Crédito y Visión Artificial en tiempo real."
                    - Si preguntan por su "Stack" o tecnologías, responde: "Su stack principal incluye Python, PyTorch, TensorFlow, FastAPI y Docker."
                    - Si preguntan "¿Quién eres?", responde: "Soy el asistente virtual de Luis Castro, un Machine Learning Engineer especializado en Computer Vision y optimización de modelos."

                    REGLA DE ORO: Habla siempre de Luis en TERCERA PERSONA. Responde solo lo que se pide. Si la pregunta no está relacionada a Luis Castro o su carrera profesional, responde amablemente que no tienes esa información.` 
                },
                { 
                    role: "user", 
                    content: `Contexto profesional de Luis:\n${context}\n\nPregunta del usuario: ${text}` 
                }
            ];

            const reply = await engine.chat.completions.create({
                messages,
                temperature: 0.2, // Un toque de fluidez pero manteniendo precisión
                top_p: 0.95,
            });

            const finalOutput = reply.choices[0].message.content;
            self.postMessage({ status: "complete", output: finalOutput });
        }
    } catch (err) {
        console.error("WORKER FATAL ERROR:", err);
        self.postMessage({ status: "error", error: err.message });
    }
};
