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
      overflow-x: hidden;
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

    

    /* Background layers */
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
      opacity: 0.6;
    }

    /* Scrollbar */
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

    /* Global animations */
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
  `}</style>
);

export default GlobalStyles;