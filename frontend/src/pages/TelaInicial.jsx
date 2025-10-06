import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import cytoscape from 'cytoscape';
import './TelaInicial.css';
import '../App.css';
import '../index.css';

import { queryBuildKG } from "@/services/apiServices";

const errorGraphData = {
  nodes: [ { data: { id: 'NO', name: 'NO', isErrorNode: true } }, { data: { id: 'WAS', name: 'WAS', isErrorNode: true } }, { data: { id: 'FOUND', name: 'FOUND', isErrorNode: true } }, { data: { id: 'ANSWER', name: 'ANSWER', isErrorNode: true } }, { data: { id: 'FOR', name: 'FOR', isErrorNode: true } }, { data: { id: 'THESE', name: 'THESE', isErrorNode: true } }, { data: { id: 'DATA', name: 'DATA', isErrorNode: true } }, ],
  edges: [ { data: { source: 'NO', target: 'WAS' } }, { data: { source: 'WAS', target: 'FOUND' } }, { data: { source: 'FOUND', target: 'ANSWER' } }, { data: { source: 'ANSWER', target: 'FOR' } }, { data: { source: 'FOR', target: 'THESE' } }, { data: { source: 'THESE', target: 'DATA' } }, ]
};

/**
 * A sub-component responsible for rendering the Cytoscape knowledge graph.
 */
const GraphDisplay = ({ graphData }) => {
  const cyContainerRef = useRef(null);
  const tooltipRef = useRef(null);
  const cyInstanceRef = useRef(null);

  useEffect(() => {
    if (graphData && cyContainerRef.current) {
      const elements = [ ...graphData.nodes.map(node => ({ data: { ...node, name: node.id } })), ...graphData.edges.map(edge => ({ data: { ...edge } })) ];
      const isError = elements.some(el => el.data.isErrorNode);
      const layoutConfig = isError ? { name: 'grid', rows: 1, padding: 30 } : { name: 'cose', fit: true, padding: 50, idealEdgeLength: 180, nodeRepulsion: 5000, animate: 'end', animationDuration: 1500 };
      
      const cy = cytoscape({
        container: cyContainerRef.current,
        elements: elements,
        style: [ { selector: 'node', style: { 'shape': 'ellipse', 'background-color': '#06b6d4', 'label': 'data(name)', 'color': 'white', 'text-outline-color': '#000', 'text-outline-width': '2px', 'font-size': 14, 'width': 120, 'height': 120, 'text-valign': 'center', 'text-halign': 'center', 'text-wrap': 'wrap', 'text-max-width': '100px', 'border-width': '8px', 'border-color': '#06b6d4', 'border-opacity': 0.5 } }, { selector: 'edge', style: { 'width': 3, 'line-color': '#45a29e', 'target-arrow-shape': 'triangle', 'target-arrow-color': '#45a29e', 'curve-style': 'bezier', 'line-opacity': 0.7 } }, { selector: 'node[isErrorNode]', style: { 'background-color': '#ef4444', 'border-color': '#ef4444', color: 'white' } }, { selector: 'node[type="Unknown"]', style: { 'background-color': '#808080', 'border-color': '#808080' } }, { selector: 'edge[source = "NAO"]', style: { 'line-color': '#ef4444', 'target-arrow-color': '#ef4444', 'line-style': 'solid', 'width': 4 } } ],
        layout: layoutConfig,
        zoomingEnabled: true, userZoomingEnabled: false, panningEnabled: true, userPanningEnabled: true, minZoom: 0.2, maxZoom: 3,
      });

      cyInstanceRef.current = cy;

      if (!isError) {
        const components = cy.elements().components();
        const baseHues = [210, 120, 280, 60, 30, 0];
        components.forEach((component, index) => {
          const baseHue = baseHues[index % baseHues.length];
          component.nodes().forEach(node => {
            const lightness = 40 + Math.random() * 30;
            const color = `hsl(${baseHue}, 70%, ${lightness}%)`;
            node.style('background-color', color);
            node.style('border-color', color);
          });
        });
      }

      cy.on('tap', 'node', (evt) => {
        const node = evt.target;
        if (node.data('isErrorNode')) return;
        const query = encodeURIComponent(node.data('name'));
        const url = `https://www.google.com/search?q=${query}`;
        window.open(url, '_blank');
      });

      const tooltip = tooltipRef.current;
      cy.on('mouseover', 'node, edge', (event) => { cyContainerRef.current.classList.add('cursor-pointer'); const element = event.target; const description = element.data('description'); if (description) { tooltip.innerHTML = description; tooltip.style.display = 'block'; } });
      cy.on('mouseout', 'node, edge', () => { cyContainerRef.current.classList.remove('cursor-pointer'); tooltip.style.display = 'none'; });
      cy.on('mousemove', (event) => { tooltip.style.left = `${event.originalEvent.pageX + 15}px`; tooltip.style.top = `${event.originalEvent.pageY + 15}px`; });

      const zoomSlider = document.getElementById('zoom-slider');
      const zoomInBtn = document.getElementById('zoom-in');
      const zoomOutBtn = document.getElementById('zoom-out');
      if (zoomSlider && zoomInBtn && zoomOutBtn) {
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
  }, [graphData]);

  return ( <section className="graph-section" id="graph-view"> <div id="cy" ref={cyContainerRef} /> <div id="tooltip" ref={tooltipRef} /> <div id="zoom-controls"> <span id="zoom-out">-</span> <input type="range" id="zoom-slider" /> <span id="zoom-in">+</span> </div> </section> );
};

/**
 * The main search page component. It handles user input, API calls, and displays results.
 */
const TelaInicial = ({ isBackendReady }) => {
  const [input, setInput] = useState("");
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [sources, setSources] = useState(null);

  const suggestions = [ "What mice were in space?", "What happens to bones in space?", "How does space affect cells?", ];
  const loadingMessages = [ "Aligning cosmic data streams...", "Querying stellar archives...", "Warping spacetime for your answer...", "Calibrating the knowledge engine...", "Charting new neural pathways...", "Translating biological signals...", ];

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingTextIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [loading, loadingMessages.length]);

  const handleSuggestionClick = (question) => {
    setInput(question);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prevent submission if the backend isn't ready or input is empty
    if (!input.trim() || !isBackendReady) return;
    
    setLoading(true);
    setLoadingTextIndex(0);
    setError("");
    setResult("");
    setGraphData(null);
    setSources(null);
    
    const scrollToGraph = () => { setTimeout(() => { document.getElementById('graph-view')?.scrollIntoView({ behavior: 'smooth' }); }, 100); };
    
    try {
      const response = await queryBuildKG(input);
      if (response && response.data && response.data.kg) {
        const { kg, sources } = response.data;
        const { nodes, edges } = kg;

        const nodeIds = new Set(nodes.map(n => n.id));
        (edges || []).forEach(edge => {
          if (edge.source && !nodeIds.has(edge.source)) { nodes.push({ id: edge.source, type: 'Unknown', description: 'Inferred node.' }); nodeIds.add(edge.source); }
            if (edge.target && !nodeIds.has(edge.target)) { nodes.push({ id: edge.target, type: 'Unknown', description: 'Inferred node.' }); nodeIds.add(edge.target); }
        });

        setResult("Search completed! Your knowledge graph is ready below.");
        setGraphData({ nodes, edges: edges || [] });
        setSources(sources || null);
      } else {
        setError("The API response did not contain a valid graph.");
        setGraphData(errorGraphData);
      }
      scrollToGraph();
    } catch (err) {
      setError(err.message || "An error occurred during the search");
      setGraphData(errorGraphData);
      scrollToGraph();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container-scroll">
      <Link to="/" className="back-button"> ← Back </Link>
      <section className="search-section">
        <main className="tela-inicial">
          <h1 className="tela-inicial__title">BIOASTRA EXPLORER</h1>
          <p className="tela-inicial__subtitle"> Ask anything to your NASA Superpower for Biological Data. </p>
          <form onSubmit={handleSubmit} className="search-form">
            <div className="search-form__container">
              <div className="search-form__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <circle cx="11" cy="11" r="8"></circle> <line x1="21" y1="21" x2="16.65" y2="16.65"></line> </svg>
              </div>
              <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                type="search" 
                className="search-form__input" 
                placeholder={isBackendReady ? "Explore exoplanets, missions, data..." : "Please wait, server is activating..."} 
                disabled={!isBackendReady}
              />
              <button 
                type="submit" 
                className="search-form__button" 
                disabled={loading || !isBackendReady}
              >
                {isBackendReady ? (loading ? "Sending..." : "Search") : "Activating..."}
              </button>
            </div>
          </form>
          <div className="suggestions-container">
            {suggestions.map((q, index) => (
              <button key={index} className="suggestion-item" onClick={() => handleSuggestionClick(q)} disabled={!isBackendReady}>
                {q}
              </button>
            ))}
          </div>
          
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <div className="loading-text">{loadingMessages[loadingTextIndex]}</div>
            </div>
          )}

          {error && <div className="result-message error"><strong>Error:</strong> {error}</div>}
          {result && <div className="result-message success"><strong>Response:</strong> {result}</div>}

          {sources && sources.length > 0 && (
            <div className="source-display-container">
              <p className="source-boilerplate">Generated from the primary source:</p>
              <h4 className="source-title">{sources[0].title}</h4>
              <a href={sources[0].url} target="_blank" rel="noopener noreferrer" className="source-url">
                Read Article ↗
              </a>
            </div>
          )}

          {graphData && !error && <div className="scroll-hint">Scroll Down to See the Graph ⬇</div>}
        </main>
      </section>
      {graphData && <GraphDisplay graphData={graphData} />}
    </div>
  );
};

export default TelaInicial;
