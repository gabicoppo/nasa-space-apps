import React from 'react';
import { Link } from 'react-router-dom'; // Usamos Link para a navegação

// A LandingSequence agora usa <Link> para navegar
const LandingSequence = () => {
  return (
    <div className="landing-container">
      {/* Section 1: Hero */}
      <section id="hero" className="hero-section" aria-label="Hero Section">
        <h1 className="hero-title fade-in-up delay-200">
          Welcome, Explorer.
        </h1>
        <p className="hero-sub fade-in-up delay-500">
          Introducing the <span className="highlight">BioAstra Navigator</span>.
        </p>
        <div className="scroll-hint fade-in-up delay-1000" aria-hidden="true">
          ⬇ Scroll
        </div>
      </section>

      {/* Section 2: Info */}
      <section
        id="mission-info"
        className="info-section"
        aria-label="Mission Information"
      >
        <p className="info-text fade-in-up delay-200">
          Our mission is to make NASA's bioscience research more accessible and democratize
          knowledge,
        </p>
        <p className="info-text highlight fade-in-up delay-500">
          bringing NASA’s biological data directly to your fingertips.
        </p>
      </section>

      {/* Section 3: Actions */}
      <section id="actions" className="actions-section" aria-label="Mission Actions">
        <h2 className="actions-title fade-in-up delay-200">
          Ready to begin your mission?
        </h2>

        <div className="actions-column fade-in-up delay-400">
          {/* --- ALTERADO: Botão 1 agora é um Link para /telamissao --- */}
          <Link
            to="/telamissao"
            className="btn-composite btn-primary mission-btn"
            aria-label="Enter Mission Control"
          >
            <span className="btn-title">NEW HERE?</span>
            <span className="btn-desc">
              Explore BioAstra.
            </span>
          </Link>

          {/* --- ALTERADO: Botão 2 agora é um Link para /telainicial --- */}
          <Link
            to="/telainicial"
            className="btn-composite btn-secondary mission-btn"
            aria-label="Start Knowledge Simulation"
          >
            <span className="btn-title">START SEARCH</span>
            <span className="btn-desc">
              Dive into the data and chat with our AI copilot.
            </span>
          </Link>
        </div>

        <p className="scroll-hint final-hint fade-in-up delay-800" aria-hidden="true">
          ⬆ Scroll up to revisit the stars
        </p>
      </section>
    </div>
  );
};

// Este componente agora apenas renderiza a LandingSequence
export default function HomePage() {
  return <LandingSequence />;
}