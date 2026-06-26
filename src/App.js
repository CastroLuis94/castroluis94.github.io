import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Portfolio from './pages/Portfolio';
import FloatingChat from './pages/Chat'; // Lo importamos como el componente flotante
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* El Chat fuera de Routes para que esté presente en TODAS las páginas */}
        <FloatingChat /> 
        
        <Routes>
          <Route path="/" element={<Portfolio />} />
          {/* Ya no necesitas la ruta /chat si lo vas a usar como widget flotante */}
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;