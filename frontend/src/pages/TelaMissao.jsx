import React, { useState, useEffect } from "react";
import "./TelaMissao.css";
import "../App.css";
import "../index.css";
import astronautaImg from "../assets/apresentacaoastronauta.png";

const TelaMissao = ({ onBack }) => {
    const [displayText, setDisplayText] = useState("");
    const fullText = "Saudações, tripulante! Preciso da sua ajuda com uma missão espacial. Você deverá responder uma série de 4 perguntas muito difíceis. Mas não se preocupe, os astros vão te ajudar a encontrar o caminho certo!";
    
    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex < fullText.length) {
                setDisplayText(prev => prev + fullText[currentIndex]);
                currentIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 20); // Velocidade da digitação (50ms por caractere)

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <main className="tela-missao">
            <button onClick={onBack} className="back-button">
                ← Voltar
            </button>
            <div className="content-container">
                {/* Imagem do astronauta */}
                <div className="spacecraft-container">
                    <img 
                        src={astronautaImg}
                        alt="Astronauta" 
                        className="spacecraft-image"
                    />
                </div>

                {/* Caixa de texto com efeito de digitação */}
                <div className="text-box">
                    <p className="typing-text">
                        {displayText}
                    </p>
                </div>
            </div>
        </main>
    );
};

export default TelaMissao;
