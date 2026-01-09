import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Trophy, RefreshCcw, ArrowRight } from 'lucide-react';
import { quizData } from '../../data/quizData';

const QuizComponent = ({ topic }) => {
    const questions = quizData[topic];
    const [started, setStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showResult, setShowResult] = useState(false);

    if (!questions) return null;

    const handleOptionSelect = (qId, option) => {
        if (isSubmitted) return;
        setAnswers(prev => ({ ...prev, [qId]: option }));
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        setShowResult(true);
    };

    const handleRetry = () => {
        setAnswers({});
        setIsSubmitted(false);
        setShowResult(false);
        setCurrentQuestionIndex(0);
        setStarted(false);
    };

    const calculateScore = () => {
        let correct = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) correct++;
        });
        return correct;
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const score = calculateScore();
    const currentQ = questions[currentQuestionIndex];

    if (!started) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel"
                style={{ padding: '3rem', borderRadius: '16px', textAlign: 'center', marginTop: '4rem' }}
            >
                <Trophy size={48} color="var(--accent)" style={{ marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Challenge Content</h2>
                <p style={{ color: 'var(--text-dim)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Test your understanding of {topic.replace('_', ' ')}.
                    Complete the assignment to verify your mastery of these concepts.
                </p>
                <button
                    onClick={() => setStarted(true)}
                    style={{
                        padding: '1rem 3rem',
                        fontSize: '1.1rem',
                        background: 'linear-gradient(45deg, var(--primary), var(--secondary))',
                        color: '#fff',
                        borderRadius: '50px',
                        fontWeight: 'bold',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Start Assignment
                </button>
            </motion.div>
        );
    }

    if (showResult) {
        const percentage = (score / questions.length) * 100;
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel"
                style={{ padding: '3rem', borderRadius: '16px', marginTop: '4rem' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ fontSize: '1.2rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>Assignment Complete</div>
                    <div style={{ fontSize: '4rem', fontWeight: 'bold', color: percentage >= 70 ? 'var(--success)' : 'var(--error)' }}>
                        {score} / {questions.length}
                    </div>
                    <p style={{ opacity: 0.7 }}>
                        {percentage >= 70 ? "Excellent work! You've mastered any simulated scenario." : "Good effort! Review the simulations and try again."}
                    </p>
                </div>

                <div style={{ display: 'grid', gap: '2rem' }}>
                    {questions.map((q, i) => {
                        const isCorrect = answers[q.id] === q.correctAnswer;
                        const userAnswer = answers[q.id];

                        return (
                            <div key={q.id} style={{
                                background: 'rgba(255,255,255,0.03)',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                borderLeft: `4px solid ${isCorrect ? 'var(--success)' : 'var(--error)'}`
                            }}>
                                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', gap: '0.8rem' }}>
                                    <span style={{ opacity: 0.5 }}>{i + 1}.</span> {q.question}
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isCorrect ? 'var(--success)' : 'var(--error)' }}>
                                        {isCorrect ? <CheckCircle size={18} /> : <XCircle size={18} />}
                                        <span style={{ fontWeight: 'bold' }}>Your Answer:</span> {userAnswer || "Skipped"}
                                    </div>
                                    {!isCorrect && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)' }}>
                                            <CheckCircle size={18} />
                                            <span style={{ fontWeight: 'bold' }}>Correct Answer:</span> {q.correctAnswer}
                                        </div>
                                    )}
                                </div>

                                <div style={{ fontSize: '0.9rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', color: 'var(--text-dim)' }}>
                                    <span style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>Explanation: </span>
                                    {q.explanation}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <button
                        onClick={handleRetry}
                        style={{
                            padding: '1rem 2rem',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <RefreshCcw size={18} /> Retry Assignment
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel"
            style={{ padding: '3rem', borderRadius: '16px', marginTop: '4rem', maxWidth: '800px', margin: '4rem auto 0' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.9rem', opacity: 0.5, letterSpacing: '1px' }}>QUESTION {currentQuestionIndex + 1} / {questions.length}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent)' }}>{topic.toUpperCase().replace('_', ' ')}</span>
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', lineHeight: '1.4' }}>
                {currentQ.question}
            </h3>

            <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
                {currentQ.options.map((opt, idx) => {
                    const isSelected = answers[currentQ.id] === opt;
                    return (
                        <motion.button
                            key={idx}
                            whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.08)' }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleOptionSelect(currentQ.id, opt)}
                            style={{
                                textAlign: 'left',
                                padding: '1.2rem',
                                background: isSelected ? 'var(--secondary)' : 'rgba(255,255,255,0.03)',
                                border: isSelected ? '1px solid var(--secondary)' : '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: isSelected ? '#fff' : 'var(--text-dim)',
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                fontWeight: isSelected ? 'bold' : 'normal'
                            }}
                        >
                            <span style={{ opacity: 0.5, marginRight: '1rem' }}>{String.fromCharCode(65 + idx)}.</span>
                            {opt}
                        </motion.button>
                    )
                })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    onClick={nextQuestion}
                    disabled={!answers[currentQ.id]}
                    style={{
                        padding: '1rem 2rem',
                        background: answers[currentQ.id] ? '#fff' : 'rgba(255,255,255,0.1)',
                        color: answers[currentQ.id] ? '#000' : 'rgba(255,255,255,0.3)',
                        borderRadius: '50px',
                        fontWeight: 'bold',
                        border: 'none',
                        cursor: answers[currentQ.id] ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    {currentQuestionIndex === questions.length - 1 ? 'Submit Assignment' : 'Next Question'}
                    <ArrowRight size={20} />
                </button>
            </div>
        </motion.div>
    );
};

export default QuizComponent;
