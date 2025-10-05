// src/pages/SobreProjeto.jsx

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalStyles from '@/GlobalStyles';
import './TelaInicial.css';
import '../App.css';
import '../index.css';
import astronautaImg from '../assets/Imagem-astronauta2.png';

/**
 * O texto "undefined" estava aparecendo porque algum render estava concatenando
 * um valor não definido no fim da string em certos re-renders.
 * Para evitar QUALQUER risco, trocamos o typewriter para um modelo baseado
 * em índice + slice(), que nunca concatena valores indefinidos.
 * Também garantimos cursor fixo via opacidade (sem injetar strings dinâmicas).
 */
const SobreProjeto = () => {
  const navigate = useNavigate();

  // Texto fixo (pode editar à vontade)
  const fullText = useMemo(
    () =>
      "The mission will consist of 3 questions involving biology and space! When you hover your mouse over the stars above each question, you'll receive valuable hints.",
    []
  );

  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Anima digitação: avança um caractere a cada 20ms
    if (index < fullText.length) {
      const t = setTimeout(() => setIndex(i => i + 1), 20);
      return () => clearTimeout(t);
    }
  }, [index, fullText]);

  useEffect(() => {
    // Piscar do cursor
    const blink = setInterval(() => setShowCursor(c => !c), 500);
    return () => clearInterval(blink);
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };

  return (
    <>
      {/* Mesma base visual da Tela Inicial */}
      <GlobalStyles />
      <div className="stars"></div>
      <div className="twinkling"></div>

      <main className="tela-inicial">
      {/* Botão Voltar */}
      <button
        onClick={handleBack}
        className="back-to-home-button"
        style={{ position: 'absolute', top: 16, left: 16 }}
      >
        ← Voltar
      </button>

      <h1 className="tela-inicial__title">About the Mission</h1>

      <p className="tela-inicial__subtitle" style={{ maxWidth: 800 }}>
        {fullText.slice(0, index)}
        <span aria-hidden style={{ opacity: showCursor ? 1 : 0 }}>|</span>
      </p>

      <div style={{ marginTop: '1.5rem' }}>
        <img
          src={astronautaImg}
          alt="Astronaut"
          style={{
            width: 220,
            height: 'auto',
            filter: 'drop-shadow(0 10px 30px rgba(168,85,247,0.5))',
          }}
        />
      </div>      </main>
    </>
  );
};

export default SobreProjeto;
