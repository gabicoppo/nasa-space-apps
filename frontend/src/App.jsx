// App.jsx
import React, { useState, useCallback } from "react";

import "./App.css";
import "./index.css"; // keep Tailwind directives available
import TelaInicial from './pages/TelaInicial';
import GlobalStyles from "./GlobalStyles";

/**
 * LandingSequence - pure/presentational component
 * kept outside App to prevent re-creation on every render
 */
export const LandingSequence = ({ onStartMission }) => {
  return (
    <div className="landing-container">
      {/* Section 1: Hero */}
      <section className="hero-section" aria-label="Hero">
        <h1 className="hero-title fade-in-up delay-200">Welcome, Explorer.</h1>
        <p className="hero-sub fade-in-up delay-500">We present the BioAstra Navigator.</p>
        <div className="scroll-hint fade-in-up delay-1000" aria-hidden="true">⬇ Scroll</div>
      </section>

      {/* Section 2: Info */}
      <section className="info-section" aria-label="Mission Info">
        <p className="info-text fade-in-up delay-200">
          Our mission is to place the power of NASA's vast biological data library at your fingertips,
        </p>
        <p className="info-text highlight fade-in-up delay-500">
          revealing the connections that will shape our next journey to the stars.
        </p>
      </section>

      {/* Section 3: Actions */}
      <section className="actions-section" aria-label="Actions">
        <h2 className="actions-title fade-in-up delay-200">Ready to begin your mission?</h2>

        <button
          className="btn-primary mission-btn fade-in-up delay-500"
          onClick={onStartMission}
          aria-label="Enter Mission Control"
        >
          New here? Get to know our new tool.
        </button>

        <div className="actions-row fade-in-up delay-600">
          <button
            className="btn-secondary"
            onClick={() => console.log('New clicked')}
            aria-label="New"
            type="button"
          >
            New
          </button>

          <button
            className="btn-ghost"
            onClick={() => alert('How it works (placeholder)')}
            aria-label="How it works"
            type="button"
          >
            How it works
          </button>
        </div>
      </section>
    </div>
  );
};

function App() {
  const [mostrarTelaInicial, setMostrarTelaInicial] = useState(false);

  const handleChatClick = useCallback(() => {
    setMostrarTelaInicial(true);
  }, []);

  return (
    <>
      <GlobalStyles />
      {/* Background layers - keep behind content */}
      <div className="stars" aria-hidden="true" />
      <div className="twinkling" aria-hidden="true" />
      <div className="planet-earth" aria-hidden="true" />

      <main className="app-main" role="main">
        {mostrarTelaInicial ? <TelaInicial /> : <LandingSequence onStartMission={handleChatClick} />}
      </main>
    </>
  );
}

export default App;
