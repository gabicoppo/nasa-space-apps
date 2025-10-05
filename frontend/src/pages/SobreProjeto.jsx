// src/pages/SobreProjeto.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TelaInicial.css';
import '../App.css';
import '../index.css';
import astronautaImg from '../assets/Imagem-astronauta2.png';

const SobreProjeto = () => {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  // Texto da tela (pode ajustar livremente)
  const fullText = "The mission will consist of 3 questions involving biology and space! When you hover your mouse over the stars above each question, you'll receive valuable hints.";

  useEffect(() => {
    setDisplayText('');
    setShowCursor(true);

    let mounted = true;
    let i = 0;
    let timer = null;

    const type = () => {
      if (!mounted) return;
      if (i < fullText.length) {
        setDisplayText(prev => prev + fullText[i]);
        i += 1;
        timer = setTimeout(type, 20);
      } else {
        timer = null;
      }
    };

    timer = setTimeout(type, 20);
    const cursorBlink = setInterval(() => setShowCursor(c => !c), 500);

    return () => {
      mounted = false;
      if (timer) clearTimeout(timer);
      clearInterval(cursorBlink);
    };
  }, []);

  const handleBack = () => {
    // Tenta voltar no histórico; se não houver histórico, vai para a home
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <main className="tela-inicial">
      {/* Botão Voltar alinhado ao topo, reutilizando estilo do quiz */}
      <button onClick={handleBack} className="back-to-home-button" style={{ position: 'absolute', top: 16, left: 16 }}>
        ← Voltar
      </button>

      <h1 className="tela-inicial__title">About the Mission</h1>

      <p className="tela-inicial__subtitle" style={{ maxWidth: 800 }}>
        {displayText}
        <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
      </p>

      <div style={{ marginTop: '1.5rem' }}>
        <img
          src={astronautaImg}
          alt="Astronaut"
          style={{ width: 220, height: 'auto', filter: 'drop-shadow(0 10px 30px rgba(168,85,247,0.5))' }}
        />
      </div>
    </main>
  );
};

export default SobreProjeto;
