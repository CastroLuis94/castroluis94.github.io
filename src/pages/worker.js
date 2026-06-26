// Usamos el CDN para asegurar que el Worker cargue las dependencias sin problemas de bundler
import * as webllm from "https://esm.run/@mlc-ai/web-llm";

let engine = null;

console.log("WORKER: Archivo cargado correctamente");

self.onmessage = async (event) => {
    const { text, context, type } = event.data;
    console.log("WORKER: Mensaje recibido", type || "chat");

    try {
        if (!engine) {
            console.log("WORKER: Inicializando MLCEngine...");
            engine = new webllm.MLCEngine();

            console.log("WORKER: Empezando reload del modelo...");
            
            await engine.reload("Qwen2-1.5B-Instruct-q4f16_1-MLC", {
                initProgressCallback: (report) => {
                    console.log("WORKER PROGRESS:", report.text); // Esto DEBE salir en consola
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
                content: `Eres el asistente de Luis Castro. Tu única fuente de verdad es el contexto.
              
                INFORMACIÓN CRÍTICA: Luis terminó su relación laboral con Digpatho en Diciembre de 2025. 
                Hoy es 2026 y Luis está ACTUALMENTE BUSCANDO NUEVOS DESAFÍOS (desempleado).
                // REGLAS DE RESPUESTA OBLIGATORIAS:
                - Si preguntan "¿Dónde trabaja Luis?" o su empleo actual, responde: "Luis actualmente está abierto a nuevas oportunidades laborales y se encuentra en búsqueda activa de desafíos en Machine Learning."
                - Si preguntan "¿Dónde estudió Luis?", responde: "Luis estudió en la Universidad de Buenos Aires (UBA) y se graduó como Analista Universitario en Computación en 2024."
                - Si preguntan "¿Qué idiomas habla?", responde: "Luis habla español nativo e inglés nivel B2 (intermedio alto), lo que le permite trabajar de forma fluida en equipos internacionales."
                - Si preguntan sobre su experiencia en "Digpatho", responde: "Luis trabajó en Digpatho hasta diciembre de 2025, donde se desempeñó como Machine Learning Leader y Engineer liderando proyectos de diagnóstico de cáncer."
                - Si preguntan por sus "Proyectos", responde: "Luis tiene proyectos destacados en Clasificación de Imágenes para E-commerce, Detección de Fraude en Tarjetas de Crédito y Visión Artificial en tiempo real."
                - Si preguntan por su "Stack" o tecnologías, responde: "Su stack principal incluye Python, PyTorch, TensorFlow, FastAPI y Docker."
                - Si preguntan "¿Quién eres?", responde: "Soy el asistente virtual de Luis Castro, un Machine Learning Engineer especializado en Computer Vision y optimización de modelos."EJEMPLO DE RESPUESTA CORRECTA:
                Usuario: "¿Qué hizo en Digpatho?"
                Asistente: "En Digpatho (2025), Luis lideró un clasificador de Deep Learning para cáncer y desarrolló pipelines de segmentación de imágenes médicas."

                EJEMPLO DE RESPUESTA INCORRECTA (NO HACER ESTO):
                "En Digpatho ganó un premio de la UBA..." <- ERROR: No mezcles secciones.

                REGLA DE ORO: Responde solo lo que se pide. Si preguntan por trabajo, no hables de la universidad. Si la pregunta no esta relacionada a Luis Castro/Luis o a ninguno de los topicos responde que simplemente no tenes esa informacion` 
            },
            { role: "user", content: `Contexto:\n${context}\n\nPregunta: ${text}` }
        ];
            const reply = await engine.chat.completions.create({
                messages,
                temperature: 0.0, // <-- Bajalo a 0.1 para máxima precisión
                top_p: 0.9,
            });
            self.postMessage({ status: "complete", output: reply.choices[0].message.content });
        }
    } catch (err) {
        console.error("WORKER FATAL ERROR:", err);
        self.postMessage({ status: "error", error: err.message });
    }
};