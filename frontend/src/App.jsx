import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import "./index.css";
import TelaInicial from "./pages/TelaInicial";
import TelaMissao from "./pages/TelaMissao";
import SobreProjeto from "./pages/SobreProjeto";
import HomePage from "./pages/HomePage";
import TelaQuiz from "./pages/TelaQuiz";
import GlobalStyles from "./GlobalStyles";

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');

  const handleMissionStart = useCallback(() => {
    setCurrentScreen('mission');
  }, []);

  const handleBack = useCallback(() => {
    setCurrentScreen('landing');
  }, []);

  const handleMissionComplete = useCallback(() => {
    setCurrentScreen('sobreProjeto');
  }, []);

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

            {/* Rota "/telamissao" renderiza a TelaMissao */}
            <Route path="/telamissao" element={<TelaMissao />} />

            {/* Rota "/telainicial" renderiza a TelaInicial (search) */}
            <Route path="/telainicial" element={<TelaInicial />} />

            {/* Rota "/telainicial" renderiza a TelaInicial (search) */}
            <Route path="/sobreprojeto" element={<SobreProjeto />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;