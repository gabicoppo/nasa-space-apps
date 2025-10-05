import React, { useState, useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { quizData } from '../data/quizData';
import './TelaQuiz.css';

const ConstellationHint = ({ onGoBack, isVisible, graphData, hintKeyword }) => {
  const cyContainerRef = useRef(null);
  const tooltipRef = useRef(null);
  const cyInstanceRef = useRef(null);
  const [hintState, setHintState] = useState('idle');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [starShadows, setStarShadows] = useState({ s1: '', s2: '', s3: '' });

  useEffect(() => {
    const generateStarShadows = (starCount) => {
      let shadows = '';
      for (let i = 0; i < starCount; i++) {
        shadows += `${Math.random() * 2000}px ${Math.random() * 2000}px #FFF`;
        if (i < starCount - 1) { shadows += ', '; }
      }
      return shadows;
    };
    setStarShadows({ s1: generateStarShadows(700), s2: generateStarShadows(200), s3: generateStarShadows(100) });
  }, []);

  useEffect(() => {
    if (isVisible) { setHintState('search'); } 
    else { setHintState('idle'); setSearchTerm(''); }
  }, [isVisible]);

  useEffect(() => {
    if (hintState === 'graph' && cyContainerRef.current) {
      const cy = cytoscape({
        container: cyContainerRef.current,
        elements: [ ...graphData.nodes, ...graphData.edges ],
        style: [
            { selector: 'node', style: { 'shape': 'ellipse', 'background-color': (ele) => ele.data('color'), 'label': 'data(name)', 'color': 'white', 'text-outline-color': '#000', 'text-outline-width': '2px', 'font-size': 14, 'width': 120, 'height': 120, 'text-valign': 'center', 'text-halign': 'center', 'text-wrap': 'wrap', 'text-max-width': '100px', 'border-width': '8px', 'border-color': (ele) => ele.data('color'), 'border-opacity': 0.5 } },
            { selector: 'edge', style: { 'width': 3, 'line-color': '#45a29e', 'target-arrow-shape': 'triangle', 'target-arrow-color': '#45a29e', 'curve-style': 'bezier', 'line-opacity': 0.7 } }
        ],
        layout: { name: 'cose', fit: true, padding: 50, idealEdgeLength: 180, nodeRepulsion: 5000, animate: 'end', animationDuration: 1500 },
        zoomingEnabled: true, userZoomingEnabled: false, panningEnabled: true, userPanningEnabled: true, minZoom: 0.5, maxZoom: 2,
      });
      cyInstanceRef.current = cy;
      const tooltip = tooltipRef.current;
      cy.on('mouseover', 'node, edge', (event) => { cyContainerRef.current.classList.add('cursor-pointer'); const element = event.target; const description = element.data('description'); if (element.isNode()) { element.style('border-opacity', 0.9); } else { element.style({ 'line-color': '#66fcf1', 'target-arrow-color': '#66fcf1', 'line-opacity': 1 }); } if (description) { tooltip.innerHTML = description; tooltip.style.display = 'block'; } });
      cy.on('mouseout', 'node, edge', (event) => { cyContainerRef.current.classList.remove('cursor-pointer'); const element = event.target; if (element.isNode()) { element.style('border-opacity', 0.5); } else { element.style({ 'line-color': '#45a29e', 'target-arrow-color': '#45a29e', 'line-opacity': 0.7 }); } tooltip.style.display = 'none'; });
      cy.on('mousemove', (event) => { tooltip.style.left = `${event.originalEvent.pageX + 15}px`; tooltip.style.top = `${event.originalEvent.pageY + 15}px`; });
      cy.on('tap', 'node', (evt) => { const node = evt.target; const url = node.data('link'); if (url) { window.open(url, '_blank'); } });
      const zoomSlider = document.getElementById('zoom-slider'); const zoomInBtn = document.getElementById('zoom-in'); const zoomOutBtn = document.getElementById('zoom-out');
      if(zoomSlider && zoomInBtn && zoomOutBtn) {
        const zoomStep = 0.1;
        zoomSlider.min = cy.minZoom(); zoomSlider.max = cy.maxZoom();
        zoomSlider.step = 0.01; zoomSlider.value = cy.zoom();
        const updateZoomSlider = () => { zoomSlider.value = cy.zoom(); };
        const onSliderInput = () => { cy.zoom(parseFloat(zoomSlider.value)); cy.center(); };
        const zoomIn = () => { cy.zoom(cy.zoom() + zoomStep); cy.center(); };
        const zoomOut = () => { cy.zoom(cy.zoom() - zoomStep); cy.center(); };
        cy.on('zoom', updateZoomSlider);
        zoomSlider.addEventListener('input', onSliderInput);
        zoomInBtn.addEventListener('click', zoomIn);
        zoomOutBtn.addEventListener('click', zoomOut);
      }
    }
    return () => { if (cyInstanceRef.current) { cyInstanceRef.current.destroy(); cyInstanceRef.current = null; } };
  }, [hintState, graphData]);

  const handleSearchSubmit = (event) => { event.preventDefault(); if (searchTerm.toLowerCase().trim() === hintKeyword) { setHintState('graph'); } else { setIsAlertVisible(true); setTimeout(() => setIsAlertVisible(false), 4000); setSearchTerm(''); } };

  return (
    <div className={`hint-screen ${isVisible ? 'visible' : ''}`}>
      <button onClick={onGoBack} className="top-right-button">Voltar</button>
      <div className="stars-background"><div className="stars" style={{boxShadow: starShadows.s1}}></div><div className="stars2" style={{boxShadow: starShadows.s2}}></div><div className="stars3" style={{boxShadow: starShadows.s3}}></div></div>
      <div className="top-search-bar">
        <form onSubmit={handleSearchSubmit}><input className="search-input" type="text" placeholder="Digite a palavra-chave sublinhada..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /><button className="search-button" type="submit">Buscar</button></form>
        <div className={`search-alert ${isAlertVisible ? 'visible' : ''}`}>Palavra-chave incorreta. A dica é: <strong>{hintKeyword}</strong></div>
      </div>
      {hintState === 'graph' && (
        <><div id="cy" ref={cyContainerRef} /><div id="tooltip" ref={tooltipRef} /><div id="zoom-controls"><span id="zoom-out">-</span><input type="range" id="zoom-slider" /><span id="zoom-in">+</span></div></>
      )}
    </div>
  );
};

const QuizScreen = ({ onShowHint, isHidden, questionData, onAnswerSelect, onNextQuestion, isLastQuestion }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  useEffect(() => { setSelectedOption(null); setIsAnswered(false); }, [questionData]);
  const formatQuestionText = (text) => { if (!text) return ''; return text.replace(/__(.*?)__/g, '<u>$1</u>'); };
  const handleOptionClick = (option) => { if (isAnswered) return; setSelectedOption(option); setIsAnswered(true); onAnswerSelect(option); };
  return (
    <div className={`quiz-screen ${isHidden ? 'hidden' : ''}`}>
      <button onClick={onShowHint} className="top-right-button">Mostrar Dica</button>
      <div className="quiz-content">
        <h1 dangerouslySetInnerHTML={{ __html: formatQuestionText(questionData.questionText) }} />
        <div className="quiz-options">
          {questionData.options.map((option, index) => {
            let btnClass = "quiz-option-btn";
            if (isAnswered) { if (option === questionData.correctAnswer) { btnClass += " correct"; } else if (option === selectedOption) { btnClass += " incorrect"; } }
            return (<button key={index} className={btnClass} onClick={() => handleOptionClick(option)} disabled={isAnswered}>{option}</button>);
          })}
        </div>
        {isAnswered && (<button onClick={onNextQuestion} className="next-btn">{isLastQuestion ? 'Finalizar Quiz' : 'Próxima Pergunta'}</button>)}
      </div>
    </div>
  );
};

export default function TelaQuiz() {
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quizData[currentQuestionIndex];

  const handleShowHint = () => setIsHintVisible(true);
  const handleHideHint = () => setIsHintVisible(false);

  const handleAnswerSelect = (selectedAnswer) => { if (selectedAnswer === currentQuestion.correctAnswer) { setScore(score + 1); } };
  const handleNextQuestion = () => { const nextIndex = currentQuestionIndex + 1; if (nextIndex < quizData.length) { setCurrentQuestionIndex(nextIndex); } else { setShowResults(true); } };
  const restartQuiz = () => { setCurrentQuestionIndex(0); setScore(0); setShowResults(false); }

  return (
    <div className="quiz-container">
      {showResults ? (
        <div className="quiz-screen">
          <div className="quiz-content">
            <h1>Quiz Finalizado!</h1>
            <p style={{fontSize: '1.5rem', margin: '20px 0'}}>Sua pontuação foi: {score} de {quizData.length}</p>
            <button onClick={restartQuiz} className="next-btn">Tentar Novamente</button>
          </div>
        </div>
      ) : (
        <>
          <ConstellationHint onGoBack={handleHideHint} isVisible={isHintVisible} graphData={currentQuestion.graphData} hintKeyword={currentQuestion.hintKeyword} />
          <QuizScreen onShowHint={handleShowHint} isHidden={isHintVisible} questionData={currentQuestion} onAnswerSelect={handleAnswerSelect} onNextQuestion={handleNextQuestion} isLastQuestion={currentQuestionIndex === quizData.length - 1} />
        </>
      )}
    </div>
  );
}