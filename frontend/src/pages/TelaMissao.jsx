// src/pages/TelaMissao.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TelaMissao.css";
import "../App.css";
import "../index.css";
// Se você realmente precisa de estilos da tela inicial, mantenha; caso não, pode remover:
import "./TelaInicial.css";
import astronautaImg from "../assets/apresentacaoastronauta.png";
import SobreProjeto from "./SobreProjeto";

const TelaMissao = ({ onBack, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showQuizButton, setShowQuizButton] = useState(false);
  const [showSobre, setShowSobre] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

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


  // Evita que algum input capture as teclas
  useEffect(() => {
    requestAnimationFrame(() => {
      document.activeElement?.blur?.();
    });
  }, []);

  // Ação para avançar: se onComplete foi passado, respeita; senão, mostra a tela SobreProjeto aqui
  const goNext = () => {
    if (typeof onComplete === "function") {
      try {
        onComplete();
      } catch (err) {
        // ignore
      }
    }
    // navigate to the SobreProjeto route
    navigate('/sobreprojeto');
  };

  // Espaço/Enter avançam
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isEnter = e.key === "Enter" || e.code === "Enter" || e.keyCode === 13;
      const isSpace =
        e.key === " " || e.key === "Space" || e.key === "Spacebar" ||
        e.code === "Space" || e.keyCode === 32;
      if (isEnter || isSpace) {
        e.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []); // goNext é estável

  // Renderiza texto com cursor apenas no último caractere
  const renderTypingText = () => {
    if (!displayText) return showCursor ? "|" : ""; // nunca undefined
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

  // Se o usuário avançou, renderiza a tela SobreProjeto inline (mantém o botão de voltar)
  // render normal mission screen
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
            <p className="typing-text">{renderTypingText()}</p>
          </div>

          {/* Botão extra para avançar manualmente a qualquer momento */}
          <div className="actions">
            <button className="next-button" onClick={goNext}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </main >
  );
};

export default TelaMissao;