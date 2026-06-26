import React, { useState, useEffect, useRef } from 'react';

// 1. Definimos el contexto fuera del componente para que sea estático y limpio.
const today = new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });

const LUIS_CONTEXT = `
FECHA ACTUAL: ${today}
ESTADO LABORAL: Disponible para nuevas oportunidades (Open to Work). No trabaja en Digpatho actualmente.
-----------------------------------------
SECCIÓN: DATOS PERSONALES
----------------------------------------- 
* Nombre: Luis Castro.
* Ubicación: Argentina.
* Título universitario: Analista Universitario en Computación(2024).
* Idiomas: Español nativo, ingles(B2 -- Intermedio alto).

-----------------------------------------
SECCIÓN: EXPERIENCIA LABORAL (DIGPATHO, 2025)
-----------------------------------------
* Periodo: Marzo 2025 - Diciembre 2025.
* Roles: Machine Learning Leader y ML Engineer.
* Logros: Lideró el desarrollo de un clasificador de Deep Learning para cáncer y diseñó pipelines de segmentación de imágenes médicas para biomarcadores.

-----------------------------------------
SECCIÓN: PROYECTOS TÉCNICOS DESTACADOS
-----------------------------------------
1. API de Clasificación de Imágenes para E-commerce (2026):
- Pipeline completo en PyTorch con entrenamiento de CNN para productos.
- Inferencia con FastAPI y despliegue de API REST con métricas de confianza.

2. Modelo de Detección de Fraude en Tarjetas de Crédito (2025):
- Modelo supervisado con manejo de desbalance extremo de clases.
- Optimización de ROC-AUC, recall y precisión mediante matriz de confusión.

3. Detección de Uso de Barbijo en Tiempo Real (2021):
- Clasificación de imágenes mediante cámara usando CNN.
- Implementación de pipeline de inferencia en tiempo real.

4. Ganador Competencia Machine Learning UBA (2019):
- Primer puesto en clasificación de texto.
- Optimización automática de hiperparámetros y modelos supervisados.

-----------------------------------------
SECCIÓN: STACK TÉCNICO
-----------------------------------------
* Lenguajes y Frameworks: Python, PyTorch, TensorFlow.
* Herramientas y DevOps: FastAPI, Docker.
`;

export default function FloatingChat() {
    // Al estar esto aquí, todo lo que sigue (hooks y el HTML de abajo) 
    // es ignorado por React. El botón NO se renderizará.
    return null;

    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [ready, setReady] = useState(false);
    const [progress, setProgress] = useState(0);
    const worker = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

   
    useEffect(() => {
                // Reemplazá tu actual instanciación por esta:
        if (!worker.current) {
            // Forzamos la ruta relativa directa. 
            // El navegador la buscará en luiscastro.com.ar/worker.js
            worker.current = new Worker('./worker.js', {
                type: 'module'
            });
        }

        const onMessageReceived = (e) => {
            if (e.data.status === 'progress') setProgress(e.data.progress * 100);
            if (e.data.status === 'ready') setReady(true);
            if (e.data.status === 'complete') {
                setMessages(prev => [...prev, { role: 'assistant', text: e.data.output }]);
            }
        };

        worker.current.addEventListener('message', onMessageReceived);
        worker.current.postMessage({ type: 'init' });

        return () => worker.current.removeEventListener('message', onMessageReceived);
    }, []);

    const handleSend = () => {
        if (!input.trim() || !ready) return;
        
        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        
        // 2. Pasamos el contexto completo que definimos arriba
        worker.current.postMessage({ 
            text: input, 
            context: LUIS_CONTEXT 
        });
        
        setInput('');
    };
    
    return (
        <>
            <button className="chat-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '✕' : '🤖'}
            </button>

            {isOpen && (
                <div className="chat-container">
                    <div style={{ padding: '15px', background: '#252525', borderBottom: '1px solid #333' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong>Asistente IA</strong>
                            <span style={{ fontSize: '10px', color: ready ? '#4caf50' : '#ffa500' }}>
                                {ready ? '● Online' : '○ Cargando...'}
                            </span>
                        </div>
                        {!ready && (
                            <div style={{ width: '100%', height: '2px', background: '#444', marginTop: '10px' }}>
                                <div style={{ width: `${progress}%`, height: '100%', background: '#4caf50', transition: 'width 0.3s' }}></div>
                            </div>
                        )}
                    </div>

                    <div ref={scrollRef} style={{ flexGrow: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {messages.length === 0 && (
                            <p style={{ color: '#888', fontSize: '13px', textAlign: 'center' }}>
                                ¡Hola! Soy el asistente de Luis. Preguntame sobre su experiencia en ML o sus proyectos.
                            </p>
                        )}
                        {messages.map((msg, i) => (
                            <div key={i} style={{ 
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                backgroundColor: msg.role === 'user' ? '#007bff' : '#333',
                                color: '#fff',
                                padding: '8px 12px', 
                                borderRadius: '12px',
                                maxWidth: '85%', 
                                fontSize: '14px'
                            }}>
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <div style={{ padding: '10px', display: 'flex', gap: '5px', background: '#252525' }}>
                        <input 
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSend()}
                            placeholder={ready ? "Escribí tu consulta..." : "Cargando modelo..."}
                            style={{ flexGrow: 1, background: '#111', color: '#fff', border: '1px solid #444', padding: '8px', borderRadius: '4px', outline: 'none' }}
                            disabled={!ready}
                        />
                        <button 
                            onClick={handleSend} 
                            disabled={!ready || !input.trim()} 
                            style={{ background: ready ? '#4caf50' : '#444', border: 'none', color: '#fff', padding: '0 15px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}