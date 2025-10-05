import React from "react";
import "./TelaInicial.css";  // ✅ Correto (mesmo diretório)
import "../App.css";          // ⬅️ Sobe um nível para src/
import "../index.css";        // ⬅️ Sobe um nível para src/

const TelaInicial = ({ onStartQuiz }) => {
    
  return (
    <main className="tela-inicial">
        {/* Título Principal */}
        <h1 className="tela-inicial__title">
            BioAstra Navigator
        </h1>

        {/* Subtítulo */}
        <p className="tela-inicial__subtitle">
            Your NASA Superpower for Biological Data.
        </p>

        {/* Formulário de Busca */}
        <form onSubmit={(e) => e.preventDefault()} className="search-form">
            <div className="search-form__container">
                <div className="search-form__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
                <input
                    type="search"
                    className="search-form__input"
                    placeholder="Explore exoplanets, missions, data..."
                />
                <button type="submit" className="search-form__button">
                    Search
                </button>
            </div>
        </form>

        {/* Botão para iniciar a missão */}
        <button onClick={onStartQuiz} className="mission-button">
            Iniciar Missão Espacial
        </button>
    </main>
  );
};

export default TelaInicial;