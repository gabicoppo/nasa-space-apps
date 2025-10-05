// GlobalStyles.jsx
import React from 'react';

const GlobalStyles = () => (
  <style>{`
    /* NOTE:
       - For production, prefer loading fonts via <link> in index.html or using bundler.
       - This inline style is OK for quick prototyping.
    */
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Exo+2:wght@300;400;700&display=swap');

    :root {
      --bg-color: #000;
      --text-color: #fff;
      --muted: #b3d4f3;
      --primary: #00c9ff;
      --base-font-size: 16px;
    }

    html, body, #root {
      height: 100%;
    }

    body {
      margin: 0;
      background-color: var(--bg-color);
      color: var(--text-color);
      font-family: 'Exo 2', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      font-size: var(--base-font-size);
      -webkit-font-smoothing:antialiased;
      -moz-osx-font-smoothing:grayscale;
    }

    h1, h2, h3 {
      font-family: 'Orbitron', sans-serif;
      line-height: 1.05;
    }

    /* Background layers (stars + twinkling) */
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
      background: #000 url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/stars.png") repeat;
      background-size: contain;
      z-index: 0;
      opacity: 0.9;
    }

    .twinkling {
      background: transparent url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/twinkling.png") repeat;
      background-size: contain;
      z-index: 1;
      animation: move-twink-back 200s linear infinite;
      opacity: 0.75;
    }

    @keyframes move-twink-back {
      from { background-position: 0 0; }
      to { background-position: -8000px 4000px; } /* reduced travel slightly */
    }

    .planet-earth {
      background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earth.png");
      background-repeat: no-repeat;
      background-position: center bottom;
      background-size: contain;
      z-index: 0;
      opacity: 0.9;
    }

    /* Scrollbar custom for webkit (optional) */
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

    /* Fade-in-up animation used by components (kept here for global usage) */
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
      animation-name: fadeInUp;
      animation-duration: 900ms;
      animation-timing-function: cubic-bezier(.2,.9,.3,1);
      animation-fill-mode: both;
    }

    /* Star cursor (optional) */
    .star-cursor {
      position: fixed;
      pointer-events: none;
      width: 6px;
      height: 6px;
      background-color: white;
      border-radius: 50%;
      z-index: 9999;
      box-shadow: 0 0 8px 3px rgba(173, 216, 230, 0.6);
      transform-origin: center;
      opacity: 0.95;
      mix-blend-mode: screen;
    }

    @keyframes star-fade {
      from { transform: scale(1.2); opacity: 1; }
      to   { transform: scale(0); opacity: 0; }
    }
  `}</style>
);

export default GlobalStyles;
