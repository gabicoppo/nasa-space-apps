import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TelaMissao.css";
import "../App.css";
import "../index.css";
import "./TelaInicial.css";
import astronautaImg from "../assets/apresentacaoastronauta.png";

const TelaMissao = () => {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const fullText = "Greetings, crew member! I need your help with a space mission. You will have to answer 3 difficult questions. But don't worry, the stars will help you find the right path!";
    
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

    return (
        <main className="tela-missao">
            <Link to="/" className="back-button">
                ← Back
            </Link>
            <div className="content-container">
                <div className="spacecraft-container">
                    <img 
                        src={astronautaImg}
                        alt="Astronauta" 
                        className="spacecraft-image"
                    />
                </div>

                <div style={{ 
                    position: 'absolute', 
                    right: '5%', 
                    width: '45%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-end', 
                    gap: '1.5rem' 
                }}>
                    <div style={{ 
                        width: '100%',
                        minHeight: '200px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        border: '2px solid rgba(0, 255, 255, 0.3)',
                        borderRadius: '10px',
                        padding: '2.5rem',
                        boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <p className="typing-text">
                            {displayText}
                            {currentIndex < fullText.length && <span className="caret"></span>}
                        </p>
                    </div>
                    
                    {/* Botão só aparece quando o texto termina */}
                    {currentIndex >= fullText.length && (
                        <Link to="/quiz" className="start-quiz-button">
                            Quiz →
                        </Link>
                    )}
                </div>
            </div>
        </main>
    );
};

export default TelaMissao;