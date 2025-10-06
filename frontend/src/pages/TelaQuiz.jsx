import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import cytoscape from 'cytoscape';
import { quizData } from '../data/quizData';
import './TelaQuiz.css';
import astronautaImg from '../assets/Imagem-astronauta2.png';

const ConstellationHint = ({ onGoBack, isVisible, questionData }) => {
  const cyContainerRef = useRef(null);
  const tooltipRef = useRef(null);
  const cyInstanceRef = useRef(null);
  const [isZoomedIn, setIsZoomedIn] = useState(false);

  useEffect(() => {
    if (!isVisible || !questionData) {
        setIsZoomedIn(false);
        if (cyInstanceRef.current) {
            cyInstanceRef.current.destroy();
            cyInstanceRef.current = null;
        }
        return;
    }
    if (cyContainerRef.current) {
      const cy = cytoscape({
        container: cyContainerRef.current,
        elements: [ ...questionData.graphData.nodes, ...questionData.graphData.edges ],
        style: [
            { selector: 'node', style: { 'shape': 'ellipse', 'background-color': (ele) => ele.data('color'), 'label': 'data(name)', 'color': 'white', 'text-outline-color': '#000', 'text-outline-width': '2px', 'font-size': 14, 'width': 120, 'height': 120, 'text-valign': 'center', 'text-halign': 'center', 'text-wrap': 'wrap', 'text-max-width': '100px', 'border-width': '8px', 'border-color': (ele) => ele.data('color'), 'border-opacity': 0.5 } },
            { selector: 'edge', style: { 'width': 3, 'line-color': '#45a29e', 'target-arrow-shape': 'triangle', 'target-arrow-color': '#45a29e', 'curve-style': 'bezier', 'line-opacity': 0.7 } }
        ],
        layout: { name: 'cose', fit: true, padding: 50, idealEdgeLength: 180, nodeRepulsion: 5000, animate: 'end', animationDuration: 1500 },
        zoomingEnabled: true, userZoomingEnabled: true, panningEnabled: true, userPanningEnabled: true, minZoom: 0.5, maxZoom: 2,
      });
      cyInstanceRef.current = cy;
      const tooltip = tooltipRef.current;
      
      cy.on('mouseover', 'node, edge', (event) => {
        cyContainerRef.current.classList.add('cursor-pointer');
        const element = event.target;
        let tooltipContent = '';

        if (element.isNode()) {
          element.style('border-opacity', 0.9);
          const description = element.data('description');
          
          if (description) {
            tooltipContent += `<p>${description}</p>`;
          }
          
          if (questionData.article_name && questionData.url) {
            tooltipContent += `<div class="tooltip-source">Source: <a href="${questionData.url}" target="_blank" rel="noopener noreferrer">${questionData.article_name}</a></div>`;
          }

        } else {
          element.style({ 'line-color': '#66fcf1', 'target-arrow-color': '#66fcf1', 'line-opacity': 1 });
          const description = element.data('description');
          if (description) {
            tooltipContent = description;
          }
        }
        
        if (tooltipContent) {
          tooltip.innerHTML = tooltipContent;
          tooltip.style.display = 'block';
        }
      });

      cy.on('mouseout', 'node, edge', (event) => {
        cyContainerRef.current.classList.remove('cursor-pointer');
        const element = event.target;
        if (element.isNode()) {
          element.style('border-opacity', 0.5);
        } else {
          element.style({ 'line-color': '#45a29e', 'target-arrow-color': '#45a29e', 'line-opacity': 0.7 });
        }
        tooltip.style.display = 'none';
      });
      cy.on('mousemove', (event) => { tooltip.style.left = `${event.originalEvent.pageX + 15}px`; tooltip.style.top = `${event.originalEvent.pageY + 15}px`; });
      
      // --- MODIFIED: Node click now opens the main article URL ---
      cy.on('tap', 'node', () => {
        const articleUrl = questionData.url;
        if (articleUrl) {
          window.open(articleUrl, '_blank', 'noopener,noreferrer');
        }
      });

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
  }, [isVisible, questionData]);

  const handleZoomToggle = () => {
    const cy = cyInstanceRef.current;
    if (!cy) return;
    if (isZoomedIn) { cy.animate({ fit: { padding: 50 }, duration: 500 }); } 
    else { cy.animate({ zoom: 1.5, center: { eles: cy.nodes() }, duration: 500 }); }
    setIsZoomedIn(!isZoomedIn);
  };

  return (
    <div className={`hint-screen ${isVisible ? 'visible' : ''}`}>
        <button onClick={onGoBack} className="back-to-quiz-button">
          Back to Quiz
        </button>
      
      <div id="cy" ref={cyContainerRef} />
      <div id="tooltip" ref={tooltipRef} />
      
      <div id="zoom-controls">
        <button onClick={handleZoomToggle} className="zoom-toggle-btn">{isZoomedIn ? 'Zoom Out' : 'Zoom In'}</button>
        <div className="zoom-slider-container"><span id="zoom-out">-</span><input type="range" id="zoom-slider" /><span id="zoom-in">+</span></div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTE DA TELA DO QUIZ (SEM ALTERAÇÕES INTERNAS) ---
const QuizScreen = ({ onShowHint, isHidden, questionData, onAnswerSelect, onNextQuestion, isLastQuestion }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  useEffect(() => { setSelectedOption(null); setIsAnswered(false); }, [questionData]);
  const formatQuestionText = (text) => { if (!text) return ''; return text.replace(/__(.*?)__/g, '<u>$1</u>'); };
  const handleOptionClick = (option) => { if (isAnswered) return; setSelectedOption(option); };
  const handleConfirmClick = () => { if (!selectedOption) return; setIsAnswered(true); onAnswerSelect(selectedOption); };
  return (
    <div className={`quiz-screen ${isHidden ? 'hidden' : ''}`}>
      <div className="quiz-content">
        <h1 dangerouslySetInnerHTML={{ __html: formatQuestionText(questionData.questionText) }} />
        <div className="quiz-options">
          {questionData.options.map((option, index) => {
            let btnClass = "quiz-option-btn";
            if (isAnswered) { if (option === questionData.correctAnswer) { btnClass += " correct"; } else if (option === selectedOption) { btnClass += " incorrect"; } } 
            else if (option === selectedOption) { btnClass += " selected"; }
            return (<button key={index} className={btnClass} onClick={() => handleOptionClick(option)} disabled={isAnswered}>{option}</button>);
          })}
        </div>
        
    <div className="quiz-actions">
      <button onClick={onShowHint} className="action-btn hint-btn">View in Graph</button>
      {!isAnswered ? (
        <button onClick={handleConfirmClick} className="action-btn confirm-btn" disabled={!selectedOption}>Confirm Answer</button>
      ) : (
        <button onClick={onNextQuestion} className="action-btn next-btn">{isLastQuestion ? 'Finish Quiz' : 'Next Question'}</button>
      )}
    </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL DA PÁGINA ---
export default function TelaQuiz() {
  const [introStep, setIntroStep] = useState(0);

  const dialogs = [
    "  Your first challenge consists of three critical questions drawn from NASA's greatest discoveries.", 
    "  But don't worry, every great explorer needs a guide. For this journey, your map is the stars in our knowledge graph.",
    "  Follow the lines connecting each star, as they hold the clues needed to illuminate the answers.",
    "  Ready to embark on this cosmic quest? Let's begin!"
  ];
  
  const handleNextDialog = () => {
    setIntroStep(prev => prev + 1);
  };
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isSpace = e.key === " " || e.code === "Space";
      if (isSpace && introStep < dialogs.length) {
        e.preventDefault();
        handleNextDialog();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [introStep]);

  const [isHintVisible, setIsHintVisible] = useState(false);
  const [isHomeButtonVisible, setIsHomeButtonVisible] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const currentQuestion = quizData[currentQuestionIndex];
  const handleShowHint = () => { setIsHintVisible(true); setIsHomeButtonVisible(false); };
  const handleHideHint = () => { setIsHintVisible(false); setTimeout(() => { setIsHomeButtonVisible(true); }, 750); };
  const handleAnswerSelect = (selectedAnswer) => { if (selectedAnswer === currentQuestion.correctAnswer) { setScore(score + 1); } };
  const handleNextQuestion = () => { const nextIndex = currentQuestionIndex + 1; if (nextIndex < quizData.length) { setCurrentQuestionIndex(nextIndex); } else { setShowResults(true); } };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    // A LINHA ABAIXO FOI REMOVIDA PARA NÃO MOSTRAR A INTRODUÇÃO NOVAMENTE
    // setIntroStep(0); 
  }

  return (
    <div className="quiz-container">
      <Link to="/" className={`back-to-home-button ${!isHomeButtonVisible ? 'hidden' : ''}`}>
        ← Back to Home
      </Link>

      {showResults ? (
        <div className="quiz-screen">
          <div className="quiz-content">
              <h1>Quiz Finished!</h1>
              <p style={{fontSize: '1.5rem', margin: '20px 0'}}>Your score: {score} out of {quizData.length}</p>
            <div className="quiz-actions" style={{justifyContent: 'center'}}>
                  <button onClick={restartQuiz} className="action-btn next-btn">Try Again</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <ConstellationHint 
            onGoBack={handleHideHint} 
            isVisible={isHintVisible} 
            questionData={currentQuestion} 
          />
          <QuizScreen 
            onShowHint={handleShowHint} 
            isHidden={isHintVisible} 
            questionData={currentQuestion} 
            onAnswerSelect={handleAnswerSelect} 
            onNextQuestion={handleNextQuestion} 
            isLastQuestion={currentQuestionIndex === quizData.length - 1} 
          />
        </>
      )}
    </div>
  );
}