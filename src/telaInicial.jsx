import React from 'react';

// =================================================================
// Componente: HeroSection (Tela Inicial)
// =================================================================
const HeroSection = ({ searchQuery, setSearchQuery, handleSearchSubmit }) => (
    <section className="h-screen w-full flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-widest font-['Orbitron',_sans-serif]">STELLAR SEARCH</h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">O seu portal para explorar o universo de artigos científicos.</p>
        <form id="search-form-intro" onSubmit={handleSearchSubmit} className="w-full max-w-xl">
            <div className="relative">
                <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar w-full p-4 pl-5 pr-20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Pesquise por planetas, missões, dados..."
                />
                <button type="submit" className="btn-primary absolute right-2.5 bottom-2.5 text-white font-medium rounded-full text-sm px-6 py-2">Buscar</button>
            </div>
        </form>
        <div className="absolute bottom-10 animate-bounce">
            <svg className="w-8 h-8 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </div>
    </section>
);

export default HeroSection;
