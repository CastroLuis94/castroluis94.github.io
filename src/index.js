import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Asegurate de que la ruta sea correcta según tu carpeta
import './i18n/config'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />); // Podés quitar el StrictMode temporalmente si querés menos ruido en consola