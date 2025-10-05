import React, { useState } from "react";
import "./TelaInicial.css";  // ✅ Correto (mesmo diretório)
import "../App.css";          // ⬅️ Sobe um nível para src/
import "../index.css";        // ⬅️ Sobe um nível para src/

import { queryBuildKG } from "@/services/apiServices";

const TelaInicial = () => {

    const [input, setInput] = useState("")
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await queryBuildKG(input);
            setResult(response.message || JSON.stringify(response));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
  return (
    <main className="tela-inicial">
        
        {/* Título Principal */}
        <h1 className="tela-inicial__title">
            Stellar Search
        </h1>

        {/* Subtítulo */}
        <p className="tela-inicial__subtitle">
            Ask anything to your NASA Superpower for Biological Data.
        </p>

        {/* Formulário de Busca */}
        <form onSubmit={handleSubmit} className="search-form">
            <div className="search-form__container">
                <div className="search-form__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="search"
                    className="search-form__input"
                    placeholder="Explore exoplanets, missions, data..."
                />
                <button 
                    type="submit" 
                    className="search-form__button"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Search"}
                </button>
            </div>
            {result && <p className="text-green-600">Response: {result}</p>}
            {error && <p className="text-red-600">Error: {error}</p>}
        </form>
    </main>
  );
};

export default TelaInicial;