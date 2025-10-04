import React, { useState, useEffect, useRef } from 'react';

import HeroSection from './telaInicial';
import GuideSection from './quiz';
import ResultsSection from './resultadosPesquisa';
import GlobalStyles from './GlobalStyles';

// =================================================================
// Componente: App (Principal)
// =================================================================
function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const resultsSectionRef = useRef(null);

    useEffect(() => {
        if (showResults && resultsSectionRef.current) {
            resultsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showResults]);
    
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            setResults(mockResults);
            setShowResults(true);
        }
    };

    const startTour = () => {
        if (window.introJs) {
            const intro = window.introJs();
            intro.setOptions({
                steps: [
                    { element: '#search-form-intro', intro: "<strong>Dra. Aris:</strong> Olá, explorador(a)! Todo grande descobrimento começa com uma pergunta. Use a barra de busca para começar." },
                    { element: '#filters-intro', intro: "<strong>Dra. Aris:</strong> Ótimo! Para refinar sua busca, use estes filtros. Eles ajudam a encontrar exatamente o que precisa." },
                    { element: '#results-list-intro', intro: "<strong>Dra. Aris:</strong> Perfeito! Cada item aqui é uma porta para o conhecimento. Explore os detalhes. Parabéns, você completou seu treinamento!" }
                ],
                nextLabel: 'Próximo →', prevLabel: '← Anterior', doneLabel: 'Finalizar', showProgress: true,
            });

            intro.onbeforechange(function() {
                if (this._currentStep === 0) {
                    if (!showResults) {
                        setSearchQuery('Exoplanetas');
                        setResults(mockResults);
                        setShowResults(true);
                    }
                }
            });
            
            intro.start();
        } else {
            console.error("Intro.js não foi encontrado. Certifique-se de que está carregado no seu index.html.");
        }
    };

    return (
        <div className="text-gray-300 font-['Poppins',_sans-serif] space-background">
            <GlobalStyles />
            <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearchSubmit={handleSearchSubmit} />
            <GuideSection startTour={startTour} />
            {showResults && <ResultsSection ref={resultsSectionRef} results={results} />}
        </div>
    );
}

export default App;
