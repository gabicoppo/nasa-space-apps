// src/pages/SobreProjeto.jsx

import React, { useState, useEffect } from "react";
import "./TelaMissao.css";
import "../App.css";
import "../index.css";
import astronautaImg from "../assets/Imagem-astronauta2.png";

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

export default SobreProjeto;