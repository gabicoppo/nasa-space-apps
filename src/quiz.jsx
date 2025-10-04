import React from 'react';

// =================================================================
// Componente: GuideSection (Seção do Tour)
// =================================================================
const GuideSection = ({ startTour }) => (
    <section className="min-h-screen w-full flex flex-col justify-center items-center py-20 px-4" style={{ background: 'rgba(10,10,26,0.8)', backdropFilter: 'blur(5px)' }}>
        <div className="max-w-4xl grid md:grid-cols-2 gap-10 items-center">
            <div className="text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Orbitron',_sans-serif]">Novo por aqui?</h2>
                <p className="text-lg text-gray-300 mb-8">Deixe a Dra. Aris guiá-lo em sua primeira missão de exploração de dados. É rápido, fácil e divertido!</p>
                <button onClick={startTour} className="btn-primary text-white font-bold py-3 px-8 rounded-full text-lg">Iniciar Jornada do Explorador</button>
            </div>
            <div className="flex justify-center">
                <img src="https://placehold.co/400x400/0a0a1a/c026d3?text=Dra.\nAris" alt="Avatar da Dra. Aris" className="rounded-full border-4 border-purple-500 shadow-lg shadow-purple-500/50" />
            </div>
        </div>
    </section>
);

export default GuideSection;
