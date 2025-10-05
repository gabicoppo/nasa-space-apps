import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importa o Link para navegação
import "./TelaMissao.css";
import "../App.css";
import "../index.css";
import "./TelaInicial.css";
import astronautaImg from "../assets/apresentacaoastronauta.png";

const TelaMissao = () => {
    const [displayText, setDisplayText] = useState("");
    // Adicionado estado para controlar a visibilidade do botão
    const [showQuizButton, setShowQuizButton] = useState(false); 
    const fullText = "Saudações, tripulante! Preciso da sua ajuda com uma missão espacial. Você deverá responder uma série de perguntas muito difíceis. Mas não se preocupe, os astros vão te ajudar a encontrar o caminho certo!";
    
    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex < fullText.length) {
                setDisplayText(prev => prev + fullText[currentIndex]);
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                setShowQuizButton(true); // Mostra o botão quando o texto termina
            }
        }, 20); // Velocidade da digitação

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <main className="tela-missao">
            <Link to="/" className="back-button">
                ← Voltar
            </Link>
            <div className="content-container">
                <div className="spacecraft-container">
                    <img 
                        src={astronautaImg}
                        alt="Astronauta" 
                        className="spacecraft-image"
                    />
                </div>

                <div className="text-box">
                    <p className="typing-text">
                        {displayText}
                    </p>
                    
                    {/* --- BOTÃO PARA O QUIZ ADICIONADO AQUI --- */}
                    {/* Ele só aparece quando showQuizButton é true */}
                    {showQuizButton && (
                        <Link to="/quiz" className="start-quiz-button">
                            Iniciar Missão (Quiz)
                        </Link>
                    )}
                </div>
            </div>
        </main>
    );
};

export default TelaMissao;