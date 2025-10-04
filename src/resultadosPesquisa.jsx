import React from 'react';

// =================================================================
// Componente: ResultsSection (Resultados da Pesquisa)
// =================================================================
const ResultsSection = React.forwardRef(({ results }, ref) => (
    <section ref={ref} className="min-h-screen w-full py-20 px-4" style={{ backgroundColor: '#0a0a1a' }}>
        <div className="container mx-auto">
            <h2 className="text-4xl text-center mb-12 text-white font-['Orbitron',_sans-serif]">Resultados da Pesquisa</h2>
            <div className="flex flex-col md:flex-row gap-8">
                <aside id="filters-intro" className="w-full md:w-1/4">
                    <div className="bg-gray-900 p-6 rounded-lg sticky top-10">
                        <h3 className="text-xl font-bold mb-4 text-white">Filtros Avançados</h3>
                        <div className="space-y-4">
                            <div><label className="flex items-center text-gray-300"><input type="checkbox" className="mr-2 h-4 w-4 accent-purple-500" /> Zona Habitável</label></div>
                            <div><label className="flex items-center text-gray-300"><input type="checkbox" className="mr-2 h-4 w-4 accent-purple-500" /> Com Imagens</label></div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Ano de Publicação</label>
                                <input type="range" min="1960" max="2024" className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                            </div>
                        </div>
                    </div>
                </aside>
                <main id="results-list-intro" className="w-full md:w-3/4">
                    {results.map(item => (
                        <div key={item.id} className="bg-gray-900 p-6 rounded-lg mb-4 border border-gray-800 hover:border-purple-500 transition-colors duration-300 transform hover:-translate-y-1">
                            <h4 className="text-xl font-bold text-purple-400 mb-2">{item.title}</h4>
                            <p className="text-sm text-gray-500 mb-3">{item.author} ({item.year})</p>
                            <p className="text-gray-400 mb-4">{item.summary}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {item.tags.map(tag => (
                                    <span key={tag} className="bg-cyan-900/50 text-cyan-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>
                                ))}
                            </div>
                             <div className="flex gap-4 mt-4">
                                <button className="btn-secondary text-sm font-bold py-2 px-4 rounded-full">Resumir com IA</button>
                                <button className="btn-primary text-sm font-bold py-2 px-4 rounded-full">Salvar na Constelação</button>
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    </section>
));

export default ResultsSection;
