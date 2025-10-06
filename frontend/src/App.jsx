import React, { useState, useEffect } from 'react';
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
  // State to track if the backend has responded to the initial wake-up call
  const [isBackendReady, setIsBackendReady] = useState(false);

  // This effect runs only once when the App component mounts
  useEffect(() => {
    const wakeUpBackend = async () => {
      try {
        console.log('Waking up the knowledge source... Use the time to explore the quiz!');
        // We just need to wait for the call to finish, no need to process the response
        await queryBuildKG("sjdhsiudhsidjsodisjdoisdosidjsodijsodisodsijd");
        console.log('Backend activated successfully.');
      } catch (error) {
        console.error('Failed to wake up knowledge source, but enabling UI anyway:', error);
      } finally {
        // IMPORTANT: Set to true even if the call fails.
        // This prevents the user from being locked out if the server has a hiccup.
        // The goal is just to wait for the initial cold start to finish.
        setIsBackendReady(true);
      }
    };

    wakeUpBackend();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      <GlobalStyles />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Starry background managed globally */}
      <div className="stars" aria-hidden="true" />
      <div className="twinkling" aria-hidden="true" />
      <div className="planet-earth" aria-hidden="true" />

      <Router>
        <main className="app-main" role="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/telamissao" element={<TelaMissao />} />
            <Route path="/quiz" element={<TelaQuiz />} />
            {/* Pass the isBackendReady state as a prop to TelaInicial */}
            <Route 
              path="/telainicial" 
              element={<TelaInicial isBackendReady={isBackendReady} />} 
            />
            <Route path="/sobreprojeto" element={<SobreProjeto />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
