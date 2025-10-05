import React, { useState, useEffect } from "react";
import "./TelaMissao.css";
import "../App.css";
import "../index.css";
import astronautaImg from "../assets/Imagem-astronauta2.png";


const SobreProjeto = ({ onBack }) => {
    const [displayText, setDisplayText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const fullText = "Thhe mission will consist of 3 questions involving biology and space! When you hover your mouse over the stars above each question, you’ll receive valuable hints.";

    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex < fullText.length) {
                setDisplayText(prev => prev + fullText[currentIndex]);
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                setShowCursor(false);
            }
        }, 20);
        return () => clearInterval(typingInterval);
    }, []);

    // // Efeito do cursor piscando
    useEffect(() => {
        if (!showCursor) return;
        const cursorInterval = setInterval(() => {
            setShowCursor(c => !c);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, [showCursor]);

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
                    <p className="typing-text" style={{ whiteSpace: 'pre-wrap', minHeight: '1em' }}>
                        {renderTypingText()}
                    </p>
                </div>
            </div>
        </main>
    );
};

export default SobreProjeto;
