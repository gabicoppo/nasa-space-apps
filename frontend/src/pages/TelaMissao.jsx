// src/pages/TelaMissao.jsx
import React, { useState, useEffect } from "react";
import "./TelaMissao.css";
import "../App.css";
import "../index.css";
import astronautaImg from "../assets/Imagem-astronauta2.png";

const TelaMissao = ({ onBack, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const fullText =
    "Grreetings, crew member! I need your help with a space mission. You will have to answer a series of difficult questions. But don’t worry—the stars will help you find the right path!";

  // Digitação do texto
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText((prev) => prev + fullText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 20);

    return () => clearInterval(typingInterval);
  }, []);

  // Blink do cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(id);
  }, []);

  // Garante que nenhuma input capture as teclas
  useEffect(() => {
    requestAnimationFrame(() => {
      if (document.activeElement && typeof document.activeElement.blur === "function") {
        document.activeElement.blur();
      }
    });
  }, []);

  // Atalho de teclado: Espaço ou Enter -> próxima página
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isEnter = e.key === "Enter" || e.code === "Enter" || e.keyCode === 13;
      const isSpace =
        e.key === " " ||
        e.key === "Space" ||
        e.key === "Spacebar" ||
        e.code === "Space" ||
        e.keyCode === 32;

      if ((isEnter || isSpace) && typeof onComplete === "function") {
        e.preventDefault(); // evita scroll
        onComplete();
      }
    };

    // passive:false para permitir preventDefault em Space
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onComplete]);

  // Renderiza texto mostrando cursor apenas no último caractere
  const renderTypingText = () => {
    if (!displayText) return null;
    const lastChar = displayText.slice(-1);
    const rest = displayText.slice(0, -1);

    return (
      <>
        {rest}
        <span
          className="caret"
          style={{
            borderRight: showCursor ? "3px solid rgba(0, 255, 255, 0.8)" : "3px solid transparent",
            paddingRight: "2px",
          }}
        >
          {lastChar}
        </span>
      </>
    );
  };

  return (
    <main className="tela-missao">
      <button onClick={onBack} className="back-button">
        ← Voltar
      </button>

      <div className="content-container">
        <div className="spacecraft-container">
          <img
            src={astronautaImg}
            alt="Astronauta do projeto"
            className="spacecraft-image"
          />
        </div>

        <div className="text-box" style={{ minHeight: "80px" }}>
          <p className="typing-text">{renderTypingText()}</p>
        </div>

        {/* Botão opcional para avançar com clique/touch */}
        <div className="actions">
          <button className="next-button" onClick={onComplete}>
            Pressione Espaço/Enter ou clique aqui →
          </button>
        </div>
      </div>
    </main>
  );
};

export default TelaMissao;
