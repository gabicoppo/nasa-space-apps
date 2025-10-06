// src/pages/SobreProjeto.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SobreProjeto.module.css';
import astronautaImg from '../assets/Imagem-astronauta2.png';

const SobreProjeto = ({ onBack, onAdvance }) => {
    const navigate = useNavigate();
    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const fullText = "The mission will consist of 3 questions involving biology and space! When you hover your mouse over the stars above each question, you'll receive valuable hints.";

    useEffect(() => {
        setDisplayText('');
        setShowCursor(true);
        let mounted = true;
        let i = 0;
        let timer = null;
        const type = () => {
            if (!mounted) return;
            if (i < fullText.length) {
                setDisplayText(prev => prev + fullText[i]);
                i += 1;
                timer = setTimeout(type, 20);
            } else {
                timer = null;
            }
        };
        timer = setTimeout(type, 20);
        return () => {
            mounted = false;
            if (timer) clearTimeout(timer);
        };
    }, [fullText]);

    useEffect(() => {
        const id = setInterval(() => setShowCursor(c => !c), 500);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const isEnter = e.key === 'Enter' || e.code === 'Enter' || e.keyCode === 13;
            const isSpace = e.key === ' ' || e.key === 'Space' || e.code === 'Space' || e.keyCode === 32;
            if (isEnter || isSpace) {
                e.preventDefault();
                if (typeof onAdvance === 'function') return onAdvance();
                return navigate('/quiz');
            }
        };
        window.addEventListener('keydown', handleKeyDown, { passive: false });
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate, onAdvance]);

    const renderTypingText = () => {
        if (!displayText) return showCursor ? '|' : '';
        const last = displayText.slice(-1);
        const rest = displayText.slice(0, -1);
        return (
            <>
                {rest}
                <span className={styles.caret} style={{ borderRight: showCursor ? '3px solid rgba(255,255,255,0.9)' : '3px solid transparent', paddingRight: '2px' }}>{last}</span>
            </>
        );
    };

    return (
        <div className={styles.root}>
            <button className={styles.backButton} onClick={onBack}>Back</button>
            <div className={styles.container}>
                <img src={astronautaImg} className={styles.spacecraft} alt="astronaut" />
                <div className={styles.content}>
                    <div className={styles.textBox}>
                        <p className={styles.typingText}>{renderTypingText()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SobreProjeto;