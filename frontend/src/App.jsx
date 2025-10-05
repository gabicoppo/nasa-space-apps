import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import "./index.css";
import HomePage from "./pages/HomePage";
import TelaQuiz from "./pages/TelaQuiz";
import TelaMissao from './pages/TelaMissao';   // --- ADICIONADO ---
import TelaInicial from './pages/TelaInicial'; // --- ADICIONADO ---
import GlobalStyles from "./GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Background layers */}
      <div className="stars" aria-hidden="true" />
      <div className="twinkling" aria-hidden="true" />
      <div className="planet-earth" aria-hidden="true" />
      
      <Router>
        <main className="app-main" role="main">
          <Routes>
            {/* Rota principal "/" renderiza a HomePage (com os botões de escolha) */}
            <Route path="/" element={<HomePage />} />
            
            {/* Rota "/quiz" renderiza a TelaQuiz */}
            <Route path="/quiz" element={<TelaQuiz />} />

            {/* --- ADICIONADO: Rota "/telamissao" renderiza a TelaMissao --- */}
            <Route path="/telamissao" element={<TelaMissao />} />

            {/* --- ADICIONADO: Rota "/telainicial" renderiza a TelaInicial (search) --- */}
            <Route path="/telainicial" element={<TelaInicial />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;