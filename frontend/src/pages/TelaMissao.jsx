// src/pages/TelaMissao.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TelaMissao.css";
import "../App.css";
import "../index.css";
// Se você realmente precisa de estilos da tela inicial, mantenha; caso não, pode remover:
import "./TelaInicial.css";
import astronautaImg from "../assets/apresentacaoastronauta.png"
import SobreProjeto from "./SobreProjeto";

const TelaMissao = ({ onBack, onComplete }) => {
  const navigate = useNavigate();

  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showQuizButton, setShowQuizButton] = useState(false);
  const [showSobre, setShowSobre] = useState(false);

  const fullText =
    "Grreetings, crew member! I need your help with a space mission. You will have to answer a series of difficult questions. But don’t worry—the stars will help you find the right path!";

  // Digitação do texto
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText((prev) => prev + fullText[i]);
        i++;
      } else {
        clearInterval(id);
        setShowQuizButton(true);
      }
    }, 20);
    return () => clearInterval(id);
  }, []);

  // Blink do cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(id);
  }, []);

  // Evita que algum input capture as teclas
  useEffect(() => {
    requestAnimationFrame(() => {
      document.activeElement?.blur?.();
    });
  }, []);

  // Ação para avançar: se onComplete foi passado, respeita; senão, mostra a tela SobreProjeto aqui
  const goNext = () => {
    if (typeof onComplete === "function") {
      onComplete();
    } else {
      setShowSobre(true);
    }
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
  if (showSobre) {
    return <SobreProjeto onBack={() => setShowSobre(false)} />;
  }

  return (
    <main className="tela-missao">
      {/* Voltar: usa onBack se vier por props; caso contrário, linka para a home */}
      {typeof onBack === "function" ? (
        <button onClick={onBack} className="back-button">← Voltar</button>
      ) : (
        <Link to="/" className="back-button">← Voltar</Link>
      )}

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

        {/* Botão extra para avançar manualmente a qualquer momento */}
        <div className="actions">
          <button className="next-button" onClick={goNext}>
            Pressione Espaço/Enter ou clique aqui →
          </button>
        </div>
      </div>
    </main>
  );
};

export default TelaMissao;
