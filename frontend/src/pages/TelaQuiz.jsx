import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import cytoscape from 'cytoscape';
import { quizData } from '../data/quizData';
import './TelaQuiz.css';

const ConstellationHint = ({ onGoBack, isVisible, graphData }) => {
  const cyContainerRef = useRef(null);
  const tooltipRef = useRef(null);
  const cyInstanceRef = useRef(null);
  
  useEffect(() => {
    if (isVisible && cyContainerRef.current) {
      if (cyInstanceRef.current) {
        cyInstanceRef.current.destroy();
      }
      const cy = cytoscape({
        container: cyContainerRef.current,
        elements: [ ...graphData.nodes, ...graphData.edges ],
        style: [
            { selector: 'node', style: { 'shape': 'ellipse', 'background-color': (ele) => ele.data('color'), 'label': 'data(name)', 'color': 'white', 'text-outline-color': '#000', 'text-outline-width': '2px', 'font-size': 14, 'width': 120, 'height': 120, 'text-valign': 'center', 'text-halign': 'center', 'text-wrap': 'wrap', 'text-max-width': '100px', 'border-width': '8px', 'border-color': (ele) => ele.data('color'), 'border-opacity': 0.5 } },
            { selector: 'edge', style: { 'width': 3, 'line-color': '#45a29e', 'target-arrow-shape': 'triangle', 'target-arrow-color': '#45a29e', 'curve-style': 'bezier', 'line-opacity': 0.7 } }
        ],
        layout: { name: 'cose', fit: true, padding: 50, idealEdgeLength: 180, nodeRepulsion: 5000, animate: 'end', animationDuration: 1500 },
        zoomingEnabled: true, userZoomingEnabled: true, panningEnabled: true, userPanningEnabled: true, minZoom: 0.5, maxZoom: 2,
      });
      cyInstanceRef.current = cy;
      const tooltip = tooltipRef.current;
      cy.on('mouseover', 'node, edge', (event) => { cyContainerRef.current.classList.add('cursor-pointer'); const element = event.target; const description = element.data('description'); if (element.isNode()) { element.style('border-opacity', 0.9); } else { element.style({ 'line-color': '#66fcf1', 'target-arrow-color': '#66fcf1', 'line-opacity': 1 }); } if (description) { tooltip.innerHTML = description; tooltip.style.display = 'block'; } });
      cy.on('mouseout', 'node, edge', (event) => { cyContainerRef.current.classList.remove('cursor-pointer'); const element = event.target; if (element.isNode()) { element.style('border-opacity', 0.5); } else { element.style({ 'line-color': '#45a29e', 'target-arrow-color': '#45a29e', 'line-opacity': 0.7 }); } tooltip.style.display = 'none'; });
      cy.on('mousemove', (event) => { tooltip.style.left = `${event.originalEvent.pageX + 15}px`; tooltip.style.top = `${event.originalEvent.pageY + 15}px`; });
      cy.on('tap', 'node', (evt) => { const node = evt.target; const url = node.data('link'); if (url) { window.open(url, '_blank'); } });

      // --- BARRA DE ZOOM RESTAURADA ---
      const zoomSlider = document.getElementById('zoom-slider');
      const zoomInBtn = document.getElementById('zoom-in');
      const zoomOutBtn = document.getElementById('zoom-out');
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
  }, [isVisible, graphData]);

  return (
    <div className={`hint-screen ${isVisible ? 'visible' : ''}`}>
      <button onClick={onGoBack} className="top-right-button">Voltar</button>
      <div id="cy" ref={cyContainerRef} />
      <div id="tooltip" ref={tooltipRef} />
      <div id="zoom-controls">
        <span id="zoom-out">-</span>
        <input type="range" id="zoom-slider" />
        <span id="zoom-in">+</span>
      </div>
    </div>
  );
};

const QuizScreen = ({ onShowHint, isHidden, questionData, onAnswerSelect, onNextQuestion, isLastQuestion }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
  }, [questionData]);

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };
  
  const handleConfirmClick = () => {
    if (!selectedOption) return; // Não faz nada se nenhuma opção for selecionada
    setIsAnswered(true);
    onAnswerSelect(selectedOption);
  };
  
  const formatQuestionText = (text) => { if (!text) return ''; return text.replace(/__(.*?)__/g, '<u>$1</u>'); };

  return (
    <div className={`quiz-screen ${isHidden ? 'hidden' : ''}`}>
      <div className="quiz-content">
        <h1 dangerouslySetInnerHTML={{ __html: formatQuestionText(questionData.questionText) }} />
        <div className="quiz-options">
          {questionData.options.map((option, index) => {
            let btnClass = "quiz-option-btn";
            if (isAnswered) {
              if (option === questionData.correctAnswer) { btnClass += " correct"; } 
              else if (option === selectedOption) { btnClass += " incorrect"; }
            } else if (option === selectedOption) {
                btnClass += " selected"; // Estilo para a opção apenas selecionada
            }
            return (<button key={index} className={btnClass} onClick={() => handleOptionClick(option)} disabled={isAnswered}>{option}</button>);
          })}
        </div>
        
        {/* --- NOVA SEÇÃO DE BOTÕES DE AÇÃO --- */}
        <div className="quiz-actions">
            <button onClick={onShowHint} className="action-btn hint-btn">Conferir no Grafo</button>
            
            {!isAnswered ? (
                <button onClick={handleConfirmClick} className="action-btn confirm-btn" disabled={!selectedOption}>
                    Confirmar Resposta
                </button>
            ) : (
                <button onClick={onNextQuestion} className="action-btn next-btn">
                    {isLastQuestion ? 'Finalizar Quiz' : 'Próxima Pergunta'}
                </button>
            )}
        </div>

      </div>
    </div>
  );
};

export default function TelaQuiz() {
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [isHomeButtonVisible, setIsHomeButtonVisible] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quizData[currentQuestionIndex];

  const handleShowHint = () => {
    setIsHintVisible(true);
    setIsHomeButtonVisible(false);
  };
  
  const handleHideHint = () => {
    setIsHintVisible(false);
    setTimeout(() => { setIsHomeButtonVisible(true); }, 750);
  };

  const handleAnswerSelect = (selectedAnswer) => { if (selectedAnswer === currentQuestion.correctAnswer) { setScore(score + 1); } };
  const handleNextQuestion = () => { const nextIndex = currentQuestionIndex + 1; if (nextIndex < quizData.length) { setCurrentQuestionIndex(nextIndex); } else { setShowResults(true); } };
  const restartQuiz = () => { setCurrentQuestionIndex(0); setScore(0); setShowResults(false); }

  return (
    <div className="quiz-container">
      <Link to="/" className={`back-to-home-button ${!isHomeButtonVisible ? 'hidden' : ''}`}>
        ← Voltar à Home
      </Link>

      {showResults ? (
        <div className="quiz-screen">
          <div className="quiz-content">
            <h1>Quiz Finalizado!</h1>
            <p style={{fontSize: '1.5rem', margin: '20px 0'}}>Sua pontuação foi: {score} de {quizData.length}</p>
            <button onClick={restartQuiz} className="action-btn confirm-btn">Tentar Novamente</button>
          </div>
        </div>
      ) : (
        <>
          <ConstellationHint onGoBack={handleHideHint} isVisible={isHintVisible} graphData={currentQuestion.graphData} />
          <QuizScreen onShowHint={handleShowHint} isHidden={isHintVisible} questionData={currentQuestion} onAnswerSelect={handleAnswerSelect} onNextQuestion={handleNextQuestion} isLastQuestion={currentQuestionIndex === quizData.length - 1} />
        </>
      )}
    </div>
  );
}