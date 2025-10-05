import React from 'react';

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Exo+2:wght@300;400;700&display=swap');

    body {
      background-color: #000;
      color: #fff;
      font-family: 'Exo 2', sans-serif;
      font-size: 30px; /* base font size increased for better readability */
    }

    h1, h2, h3 {
      font-family: 'Orbitron', sans-serif;
    }

    /* Animação para o fundo de estrelas */
    @keyframes move-twink-back {
      from { background-position: 0 0; }
      to { background-position: -10000px 5000px; }
    }

    .stars, .twinkling {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      display: block;
    }

    .stars {
      background: #000 url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/stars.png) repeat top center;
      z-index: -3;
    }

    .twinkling {
      background: transparent url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/twinkling.png) repeat top center;
      z-index: -2;
      animation: move-twink-back 200s linear infinite;
    }

    /* Estilo para o planeta Terra */
    @keyframes pulse-glow {
      0%, 100% {
        filter: drop-shadow(0 10px 30px rgba(128, 222, 234, 0.3));
      }
      50% {
        filter: drop-shadow(0 10px 45px rgba(128, 222, 234, 0.5));
      }
    }

    .planet-earth {
      position: fixed;
      bottom: -20vh;
      left: 0;
      right: 0;
      height: 100vh;
      width: 100%;
      background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earth.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center bottom;
      z-index: -1;
      animation: pulse-glow 7s ease-in-out infinite;
    }

    /* twinkling already defined above */
    
    /* Lógica para o scroll-snap */
    .landing-container {
      scroll-snap-type: y mandatory;
      overflow-y: scroll;
      height: 100vh;
    }
    
    .landing-container section {
      scroll-snap-align: start;
    }

    /* Scrollbar customizada para tema escuro */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #0a0a0a;
    }
    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    /* Animação de entrada */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .fade-in-up {
      animation: fadeInUp 1s ease-out forwards;
    }


        /* Estilos para o cursor de estrela */
    .star-cursor {
        position: fixed;
        pointer-events: none;
        width: 3px;
        height: 3px;
        background-color: white;
        border-radius: 50%;
        z-index: 9999;
        animation: star-fade 1s forwards;
        box-shadow: 0 0 8px 3px rgba(173, 216, 230, 0.7); /* Brilho azul claro */
        transform-origin: center;
    }

    @keyframes star-fade {
        0% {
            transform: scale(1.2);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
  `}</style>
);

export default GlobalStyles;
