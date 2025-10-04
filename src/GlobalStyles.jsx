import React from 'react';

// =================================================================
// Componente: GlobalStyles
// Injeta estilos complexos ou globais que são difíceis de fazer com Tailwind.
// =================================================================
const GlobalStyles = () => (
    <style>{`
        body {
            background-color: #0a0a1a; /* Cor de fundo base */
        }
        .space-background {
            background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop');
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .btn-primary {
            background: linear-gradient(90deg, #4f46e5, #c026d3);
            transition: all 0.3s ease;
            box-shadow: 0 0 15px rgba(192, 38, 211, 0.5);
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 25px rgba(192, 38, 211, 0.8);
        }
        .btn-secondary {
            background-color: transparent;
            border: 1px solid #22d3ee;
            color: #22d3ee;
            transition: all 0.3s ease;
        }
        .btn-secondary:hover {
            background-color: #22d3ee;
            color: #0a0a1a;
            box-shadow: 0 0 15px rgba(34, 211, 238, 0.5);
        }
        .search-bar {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
    `}</style>
);

export default GlobalStyles;
