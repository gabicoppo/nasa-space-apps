// GlobalStyles.jsx
import React from "react";

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Exo+2:wght@300;400;700&display=swap');

    :root {
      --bg-color: #000;
      --text-color: #fff;
      --muted: #b3d4f3;
      --primary: #00c9ff;
      --base-font-size: 16px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body, #root {
      height: 100%;
      width: 100%;
    }

    body {
      margin: 0;
      background-color: var(--bg-color);
      color: var(--text-color);
      font-family: 'Exo 2', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: var(--base-font-size);
      -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3 {
      font-family: 'Orbitron', sans-serif;
      line-height: 1.05;
    }

    .stars, .twinkling, .planet-earth {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      pointer-events: none;
    }

    .stars {
      background: #000;
      background-image: 
        radial-gradient(2px 2px at 20px 30px, white, transparent),
        radial-gradient(2px 2px at 40px 70px, white, transparent),
        radial-gradient(1px 1px at 90px 40px, white, transparent),
        radial-gradient(1px 1px at 130px 80px, white, transparent),
        radial-gradient(2px 2px at 160px 30px, white, transparent);
      background-repeat: repeat;
      background-size: 200px 100px;
      z-index: 0;
      opacity: 0.9;
    }

    .twinkling {
      background: transparent;
      background-image: 
        radial-gradient(1px 1px at 25px 25px, rgba(255,255,255,0.8), transparent),
        radial-gradient(1px 1px at 75px 75px, rgba(255,255,255,0.6), transparent),
        radial-gradient(1px 1px at 125px 25px, rgba(255,255,255,0.4), transparent),
        radial-gradient(1px 1px at 175px 75px, rgba(255,255,255,0.7), transparent);
      background-repeat: repeat;
      background-size: 200px 100px;
      z-index: 1;
      animation: move-twink-back 200s linear infinite;
      opacity: 0.75;
    }

    @keyframes move-twink-back {
      from { background-position: 0 0; }
      to { background-position: -8000px 4000px; }
    }

    .planet-earth {
      background: radial-gradient(ellipse at center bottom, 
        rgba(0, 100, 200, 0.3) 0%, 
        rgba(0, 150, 255, 0.2) 30%, 
        rgba(0, 200, 100, 0.1) 60%, 
        transparent 80%);
      background-repeat: no-repeat;
      background-position: center bottom;
      background-size: 800px 400px;
      z-index: 0;
      opacity: 0.6;
    }

    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #07070a;
    }
    ::-webkit-scrollbar-thumb {
      background: #4b5563;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #6b7280;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(24px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .fade-in-up {
      animation: fadeInUp 900ms cubic-bezier(.2,.9,.3,1) both;
    }

    /* Main container styles */
    .tela-inicial {
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 1rem;
      position: relative;
      z-index: 10;
      overflow-x: hidden;
    }

    .tela-inicial__title {
      font-size: clamp(2.5rem, 6vw, 5.5rem);
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 0.75rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      text-shadow: 0 0 18px rgba(0, 255, 255, 0.8);
      animation: fadeInUp 0.8s ease-out;
    }

    .tela-inicial__subtitle {
      font-size: clamp(1rem, 2.5vw, 1.5rem);
      color: #67e8f9;
      margin-bottom: 3rem;
      max-width: 50rem;
      font-weight: 500;
      letter-spacing: 0.025em;
      animation: fadeInUp 1s ease-out;
    }

    .search-form {
      width: 100%;
      max-width: 56rem;
      min-width: 0;
      animation: fadeInUp 1.2s ease-out, pulse-glow 3s ease-in-out infinite;
      display: block;
      margin: 0 auto;
    }

    .search-form__container {
      position: relative;
      display: block;
      width: 100%;
      filter: drop-shadow(0 0 30px rgba(168, 85, 247, 0.4));
    }

    .search-form__icon {
      position: absolute;
      left: 1.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af;
      pointer-events: none;
      width: 1.75rem;
      height: 1.75rem;
      z-index: 2;
    }

    .search-form__input {
      width: 100%;
      padding: 1.75rem 8rem 1.75rem 4.5rem;
      border-radius: 50px;
      font-size: 1.375rem;
      color: #ffffff;
      background: rgba(15, 23, 42, 0.95);
      border: 2px solid #374151;
      transition: all 0.3s ease-in-out;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      appearance: none;
      flex-shrink: 0;
      min-width: 0;
      transform: translateZ(0);
      font-family: inherit;
    }

    /* Firefox-specific fixes */
    @-moz-document url-prefix() {
      .search-form__input {
        background: rgba(15, 23, 42, 0.97);
        border: 2px solid #4b5563;
      }
    }

    .search-form__input::placeholder {
      color: #9ca3af;
      font-weight: 400;
      opacity: 1;
    }

    .search-form__input:focus {
      outline: none;
      border-color: #a855f7;
      box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.2),
                  0 8px 32px rgba(168, 85, 247, 0.4);
      background: rgba(0, 0, 0, 0.7);
    }

    .search-form__button {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #ffffff;
      font-weight: 700;
      font-size: 1.125rem;
      padding: 0.875rem 2.5rem;
      border-radius: 50px;
      background: linear-gradient(90deg, #9333ea 0%, #06b6d4 100%);
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 16px rgba(6, 182, 212, 0.4);
      appearance: none;
      white-space: nowrap;
      font-family: inherit;
      z-index: 2;
    }

    .search-form__button:hover:not(:disabled) {
      transform: translateY(-50%) scale(1.08);
      box-shadow: 0 6px 24px rgba(6, 182, 212, 0.6);
    }

    .search-form__button:active:not(:disabled) {
      transform: translateY(-50%) scale(1.02);
    }

    .search-form__button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .result-message {
      margin-top: 2rem;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-size: 1.125rem;
      max-width: 56rem;
      width: 100%;
      animation: fadeInUp 0.5s ease-out;
    }

    .result-message.success {
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #10b981;
    }

    .result-message.error {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #ef4444;
    }

    @keyframes pulse-glow {
      0%, 100% {
        filter: drop-shadow(0 0 25px rgba(168, 85, 247, 0.3));
      }
      50% {
        filter: drop-shadow(0 0 35px rgba(168, 85, 247, 0.5));
      }
    }

    @media (max-width: 1024px) {
      .search-form {
        max-width: 48rem;
      }
      .search-form__input {
        padding: 1.5rem 7rem 1.5rem 4rem;
        font-size: 1.25rem;
      }
      .search-form__button {
        padding: 0.75rem 2.25rem;
        font-size: 1rem;
      }
    }

    @media (max-width: 768px) {
      .tela-inicial__title {
        font-size: 2.5rem;
        letter-spacing: 0.05em;
        margin-bottom: 0.5rem;
      }
      .tela-inicial__subtitle {
        font-size: 1rem;
        margin-bottom: 2.5rem;
      }
      .search-form {
        max-width: 100%;
      }
      .search-form__input {
        padding: 1.25rem 5.5rem 1.25rem 3.5rem;
        font-size: 1.125rem;
      }
      .search-form__icon {
        left: 1.25rem;
        width: 1.5rem;
        height: 1.5rem;
      }
      .search-form__button {
        padding: 0.625rem 1.75rem;
        font-size: 0.9rem;
      }
    }

    @media (max-width: 480px) {
      .tela-inicial {
        padding: 0.5rem;
      }
      .search-form__input {
        padding: 1rem 4.5rem 1rem 3rem;
        font-size: 1rem;
      }
      .search-form__icon {
        left: 1rem;
        width: 1.25rem;
        height: 1.25rem;
      }
      .search-form__button {
        padding: 0.5rem 1.5rem;
        font-size: 0.85rem;
        right: 0.5rem;
      }
    }
  `}</style>
);

export default GlobalStyles;
