import React, { useState } from "react";
import "./App.css";
import TelaInicial from './pages/TelaInicial';
import GlobalStyles from "./GlobalStyles";

function App() {
  const [mostrarTelaInicial, setMostrarTelaInicial] = useState(false);

  const handleChatClick = () => setMostrarTelaInicial(true);

  const LandingSequence = () => (
    <div className="landing-container">
      {/* Seção 1: Hero */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 fade-in-up" style={{ animationDelay: '0.2s' }}>🌌 Welcome, Explorer.</h1>
        <p className="text-2xl md:text-3xl text-gray-300 fade-in-up" style={{ animationDelay: '0.5s' }}>We present the BioAstra Navigator.</p>
        <div className="absolute bottom-10 animate-bounce text-gray-200 text-lg fade-in-up" style={{ animationDelay: '1s' }}>⬇ Scroll</div>
      </section>

      {/* Seção 2: Info */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center text-center p-4">
        <p className="text-3xl md:text-4xl max-w-3xl leading-relaxed fade-in-up" style={{ animationDelay: '0.2s' }}>
          Our mission is to place the power of NASA's vast biological data library at your fingertips,
        </p>
        <p className="text-3xl md:text-4xl max-w-3xl text-cyan-300 mt-4 leading-relaxed fade-in-up" style={{ animationDelay: '0.5s' }}>
          revealing the connections that will shape our next journey to the stars.
        </p>
        <div className="absolute bottom-10 animate-bounce text-gray-200 text-lg fade-in-up" style={{ animationDelay: '1s' }}>⬇ Continue</div>
      </section>

      {/* Seção 3: Actions */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center text-center p-4 gap-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 fade-in-up" style={{ animationDelay: '0.2s' }}>Ready to begin your mission?</h1>
        <button
          className="text-2xl md:text-3xl font-extrabold w-96 md:w-104 p-6 md:p-8 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500
                     hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/60 transition-all duration-300 fade-in-up"
          onClick={handleChatClick}
          style={{ animationDelay: '0.5s' }}
        >
          🚀 Entrar no Mission Control
        </button>
        <button
          className="text-xl md:text-2xl font-semibold w-56 md:w-64 p-4 md:p-5 rounded-lg bg-white/10 border border-white/20 text-cyan-200
                     hover:bg-white/20 transition-all duration-300 fade-in-up"
          onClick={() => console.log('Novo clicked')}
          style={{ animationDelay: '0.6s' }}
        >
          ✨ Novo
        </button>
        <button 
          className="text-lg font-semibold w-72 p-4 rounded-lg bg-transparent border-2 border-gray-500
                     hover:border-white hover:bg-gray-800/50 transition-all duration-300 fade-in-up"
          style={{ animationDelay: '0.8s' }}
        >
          🛰️ How it works
        </button>
      </section>
    </div>
  );

  return (
    <>
      <GlobalStyles />
      <div className="stars"></div>
      <div className="twinkling"></div>
      
      <main className="relative z-10">
        {mostrarTelaInicial ? <TelaInicial /> : <LandingSequence />}
      </main>
    </>
  );
}

export default App;