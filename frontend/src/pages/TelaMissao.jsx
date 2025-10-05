// src/pages/TelaMissao.jsx
import React, { useState, useEffect } from "react";
import "./TelaMissao.css";
import "../App.css";
import "../index.css";
import astronautaImg from "../assets/Imagem-astronauta2.png";

const TelaMissao = ({ onBack, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const fullText = "Greetings, crew member! I need your help with a space mission. You will have to answer a series of difficult questions. But don't worry - the stars will help you find the right path!";

  // Efeito de digitação simplificado
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

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
        e.preventDefault();
        onComplete();
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onComplete]);

  return (
    <main className="tela-missao">
      <button onClick={onBack} className="back-button">
        ← Back
      </button>

      <div className="content-container">
        <div className="spacecraft-container">
          <img
            src={astronautaImg}
            alt="Astronauta do projeto"
            className="spacecraft-image"
          />
        </div>

        <div className="right-panel">
          <div className="text-box" style={{ minHeight: "80px" }}>
            <p className="typing-text">
              {displayText}
              {currentIndex < fullText.length && <span className="caret"></span>}
            </p>
          </div>

          <div className="actions">
            <button className="next-button" onClick={onComplete}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TelaMissao;