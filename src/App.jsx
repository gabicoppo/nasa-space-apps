import React from "react";
import "./App.css";

function App() {
  return (
    <div className="landing-container">
      {/* Hero */}
      <section className="hero">
        <h1 className="title">🌌 A PRÓXIMA FRONTEIRA É BIOLÓGICA</h1>
        <p className="subtitle">Para ir mais longe, precisamos olhar para dentro.</p>
        <div className="scroll-indicator">⬇ Scroll</div>
      </section>

      {/* Info */}
      <section className="info">
        <p>
          Criamos o <span className="highlight">BioAstra Navigator</span>, 
          um copiloto de IA que transforma décadas de dados em decisões instantâneas.
        </p>
        <p>
          Ele conecta o conhecimento, revela as lacunas e capacita os exploradores de amanhã.
        </p>
        <div className="scroll-indicator">⬇ Continue</div>
      </section>

      {/* Actions */}
      <section className="actions">
        <button className="btn-primary">🚀 Entrar no Mission Control</button>
        <button className="btn-secondary">🛰️ Iniciar Simulação</button>
      </section>
    </div>
  );
}

export default App;
  