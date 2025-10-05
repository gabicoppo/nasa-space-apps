import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import "./index.css";
import TelaInicial from "./pages/TelaInicial";
import TelaMissao from "./pages/TelaMissao";
import SobreProjeto from "./pages/SobreProjeto";
import HomePage from "./pages/HomePage";
import TelaQuiz from "./pages/TelaQuiz";

import { queryBuildKG } from './services/apiServices';

import GlobalStyles from "./GlobalStyles";

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');


  useEffect(() => {
    const wakeUpBackend = async () => {
      try {
        console.log('Waking up backend...');
        const response = await queryBuildKG("test");
        
        if (response.ok) {
          console.log('Backend activated successfully');
        }
      } catch (error) {
        console.error('Failed to wake up backend:', error);
        // You can choose to retry or handle the error as needed
      }
    };

    wakeUpBackend();
  }, []); // Empty dependency array ensures this runs only once on mount

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

      {/* Fundo estrelado gerenciado globalmente aqui */}
      <div className="stars" aria-hidden="true" />
      <div className="twinkling" aria-hidden="true" />
      <div className="planet-earth" aria-hidden="true" />

      <Router>
        <main className="app-main" role="main">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/telamissao" element={<TelaMissao />} />

            <Route path="/quiz" element={<TelaQuiz />} />
              
            <Route path="/telamissao" element={<TelaMissao />} />

            <Route path="/telainicial" element={<TelaInicial />} />
              
            <Route path="/sobreprojeto" element={<SobreProjeto />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;