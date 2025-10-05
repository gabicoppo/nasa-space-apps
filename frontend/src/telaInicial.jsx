import React from 'react';

// --- COMPONENTE TELA INICIAL ---
const TelaInicial = () => {
  // Estado e handlers podem ser adicionados aqui se necessário
  // const [searchQuery, setSearchQuery] = useState('');
  // const handleSearchSubmit = (e) => e.preventDefault();

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center text-center p-4 relative z-10 fade-in-up">
        {/* Título Principal */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-widest uppercase" style={{ textShadow: '0 0 15px rgba(0, 255, 255, 0.7)' }}>
            Stellar Search
        </h1>

        {/* Subtítulo Aprimorado */}
        <p className="text-lg md:text-2xl text-cyan-300 mb-10 max-w-2xl font-medium tracking-wide">
            Your NASA Superpower for Biological Data.
        </p>

        {/* Formulário de Busca */}
        <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-2xl">
            <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <input
                    type="search"
                    className="w-full p-5 pl-14 pr-24 rounded-full text-lg text-white placeholder-gray-400 
                               focus:outline-none focus:ring-2 focus:ring-purple-500 
                               focus:shadow-lg focus:shadow-purple-500/50
                               transition-all duration-300 ease-in-out bg-black/50 backdrop-blur-md border border-gray-700"
                    placeholder="Explore exoplanets, missions, data..."
                />
                <button 
                    type="submit" 
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white font-bold rounded-full text-md px-8 py-3
                               hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-purple-600 to-cyan-500
                               hover:shadow-lg hover:shadow-cyan-500/50">
                    Search
                </button>
            </div>
        </form>
    </main>
  );
};

export default TelaInicial;
