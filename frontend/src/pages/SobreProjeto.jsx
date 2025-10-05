// src/pages/SobreProjeto.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TelaMissao.css";
import "../App.css";
import "../index.css";
import astronautaImg from "../assets/Imagem-astronauta2.png";

const SobreProjeto = ({ onBack, onAdvance }) => {
    const navigate = useNavigate();
    const [displayText, setDisplayText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const fullText = "The mission will consist of 3 questions involving biology and space! When you hover your mouse over the stars above each question, you'll receive valuable hints.";

    useEffect(() => {
        // Reset text on mount to avoid leftover state from previous renders
        setDisplayText("");
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
                // typing finished — keep cursor blinking (do not set to false)
                timer = null;
            }
        };

        timer = setTimeout(type, 20);

        return () => {
            mounted = false;
            if (timer) clearTimeout(timer);
        };
    }, [fullText]);

    // Cursor blink independent of typing; runs while component is mounted
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(c => !c);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    // Renderiza texto com cursor apenas na última letra
    const renderTypingText = () => {
        if (displayText.length === 0) return showCursor ? "|" : "";
        const lastChar = displayText[displayText.length - 1];
        const rest = displayText.slice(0, -1);
        return (
            <>
                {rest}
                <span className="caret" style={{ borderRight: showCursor ? "3px solid rgba(255, 255, 255, 0.9)" : "3px solid transparent", paddingRight: "2px" }}>
                    {lastChar}
                </span>
            </>
        );
    };

    // Avançar para o quiz ao pressionar Enter/Espaço na tela SobreProjeto
    useEffect(() => {
        const handleKeyDown = (e) => {
            const isEnter = e.key === "Enter" || e.code === "Enter" || e.keyCode === 13;
            const isSpace = e.key === " " || e.key === "Space" || e.key === "Spacebar" || e.code === "Space" || e.keyCode === 32;
            if (isEnter || isSpace) {
                e.preventDefault();
                if (typeof onAdvance === 'function') {
                    onAdvance();
                } else {
                    navigate('/quiz');
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown, { passive: false });
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onAdvance, navigate]);

    const SobreProjeto = ({ onBack }) => {
        const [displayText, setDisplayText] = useState("");
        const [currentIndex, setCurrentIndex] = useState(0);

        const fullText = "The mission will consist of 3 questions involving biology and space! When you hover your mouse over the stars above each question, you will receive valuable hints.";

        useEffect(() => {
            if (currentIndex < fullText.length) {
                const timeout = setTimeout(() => {
                    setDisplayText(fullText.slice(0, currentIndex + 1));
                    setCurrentIndex(currentIndex + 1);
                }, 20);
                return () => clearTimeout(timeout);
            }
        }, [currentIndex, fullText]);

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
                    <div className="text-box" style={{ minHeight: '80px' }}>
                        <p className="typing-text">
                            {displayText}
                            {currentIndex < fullText.length && <span className="caret"></span>}
                        </p>
                    </div>


                </div>
            </main>
        );
    };
};
    export default SobreProjeto;