// src/pages/TelaMissao.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TelaMissao.css";
import "../App.css";
import "../index.css";
// Se você realmente precisa de estilos da tela inicial, mantenha; caso não, pode remover:
import "./TelaInicial.css";
import astronautaImg from "../assets/Imagem-astronauta2.png";

const TelaMissao = ({ onBack, onComplete }) => {
  const navigate = useNavigate();

  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showQuizButton, setShowQuizButton] = useState(false);

  const fullText =
    "Saudações, tripulante! Preciso da sua ajuda com uma missão espacial. Você deverá responder uma série de 3 perguntas envolvendo biologia e espaço! Quando passar o mouse sobre as estrelas acima de cada pergunta, você receberá dicas valiosas.";

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

  // Ação para avançar
  const goNext = () => {
    if (typeof onComplete === "function") {
      onComplete();
    } else {
      navigate("/quiz");
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

          {/* Botão aparece ao final da digitação */}
          {showQuizButton && (
            <Link to="/quiz" className="start-quiz-button">
              Iniciar Missão (Quiz)
            </Link>
          )}
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
