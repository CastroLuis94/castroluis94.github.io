// 1. Usamos el CDN para evitar que los archivos grandes entren al bundle de GitHub
import * as webllm from "https://esm.run/@mlc-ai/web-llm";

let engine = null; // Cambiamos a let para poder asignarlo
const selectedModel = "Qwen2-1.5B-Instruct-q4f16_1-MLC"; 

console.log("WORKER: Archivo cargado correctamente");

self.onmessage = async (event) => {
    const { text, context, type } = event.data;
    
    try {
        // Inicialización del motor si no existe
        if (!engine) {
            console.log("WORKER: Inicializando MLCEngine...");
            
            // Usamos CreateMLCEngine que es más robusto para web
            engine = await webllm.CreateMLCEngine(selectedModel, {
                initProgressCallback: (report) => {
                    console.log("WORKER PROGRESS:", report.text);
                    self.postMessage({ 
                        status: "progress", 
                        progress: report.progress, 
                        text: report.text 
                    });
                }
            });

            console.log("WORKER: Modelo cargado con éxito");
            self.postMessage({ status: 'ready' });
        }

        if (type === 'init') return;

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
                { role: "user", content: `Contexto:\n${context}\n\nPregunta: ${text}` }
            ];

            const reply = await engine.chat.completions.create({
                messages,
                temperature: 0.0, // Máxima precisión
                top_p: 1.0,
            });

            self.postMessage({ status: "complete", output: reply.choices[0].message.content });
        }
    } catch (err) {
        console.error("WORKER FATAL ERROR:", err);
        self.postMessage({ status: "error", error: err.message });
    }
};