import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import "./index.css";
import HomePage from "./pages/HomePage";
import TelaQuiz from "./pages/TelaQuiz";
import TelaMissao from './pages/TelaMissao';
import TelaInicial from './pages/TelaInicial';
import GlobalStyles from "./GlobalStyles";

function App() {
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
            <Route path="/quiz" element={<TelaQuiz />} />
            <Route path="/telamissao" element={<TelaMissao />} />
            <Route path="/telainicial" element={<TelaInicial />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;