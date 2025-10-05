import React, { useState } from 'react';
import { Link } from "react-router-dom";
import GlobalStyles from '@/GlobalStyles';
import './TelaInicial.css'; // Import the CSS file
import '../App.css'

import { queryBuildKG } from "@/services/apiServices";

const TelaInicial = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await queryBuildKG(input);
      setResult("Search completed! Your query has been processed successfully.");
    } catch (err) {
      setError(err.message || "An error occurred during the search");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GlobalStyles />
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="planet-earth"></div>

      <main className="tela-inicial">
        <h1 className="tela-inicial__title">Stellar Search</h1>
        
        <p className="tela-inicial__subtitle">
          Ask anything to your NASA Superpower for Biological Data.
        </p>

        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-form__container">
            <div className="search-form__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
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
              disabled={loading}
            />
            
            <button
              type="submit"
              className="search-form__button"
              disabled={loading}
            >
              {loading ? "Sending..." : "Search"}
            </button>
          </div>

          {result && (
            <div className="result-message success">
              <strong>Response:</strong> {result}
            </div>
          )}
          
          {error && (
            <div className="result-message error">
              <strong>Error:</strong> {error}
            </div>
          )}
        </form>
      </main>
    </>
  );
};

export default TelaInicial;