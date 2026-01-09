import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Star, Send } from 'lucide-react';

const FeedbackModal = ({ isOpen, onClose }) => {
    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate saving to DB (Local Storage for now)
        const feedback = { rating, text, date: new Date().toISOString() };
        const existing = JSON.parse(localStorage.getItem('os_feedback') || '[]');
        localStorage.setItem('os_feedback', JSON.stringify([...existing, feedback]));

        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setRating(0);
            setText('');
            onClose();
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
                    zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }} onClick={onClose}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                        className="glass-panel"
                        style={{ width: '400px', padding: '2rem', borderRadius: '16px', position: 'relative' }}
                    >
                        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                            <X size={20} />
                        </button>

                        {!submitted ? (
                            <form onSubmit={handleSubmit}>
                                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                    <MessageSquare size={24} color="var(--accent)" /> Student Feedback
                                </h2>

                                <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={32}
                                            fill={star <= rating ? "#ffb703" : "transparent"}
                                            color={star <= rating ? "#ffb703" : "#555"}
                                            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => {/* Optional hover effect */ }}
                                        />
                                    ))}
                                </div>

                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Tell us what you learned or what could be improved..."
                                    style={{
                                        width: '100%', height: '100px', background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
                                        padding: '1rem', color: '#fff', resize: 'none', marginBottom: '1.5rem'
                                    }}
                                    required
                                />

                                <button
                                    type="submit"
                                    style={{
                                        width: '100%', padding: '1rem', background: 'var(--primary)',
                                        color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Send size={18} /> Submit Feedback
                                </button>
                            </form>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                                <h3>Thank you!</h3>
                                <p style={{ opacity: 0.7 }}>Your feedback helps us improve.</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default FeedbackModal;
