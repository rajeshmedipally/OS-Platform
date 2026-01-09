import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, AlertTriangle } from 'lucide-react';

const ConveyorBelt = ({ buffer, capacity, isOverflow }) => {
    return (
        <div style={{
            position: 'relative',
            padding: '2rem',
            background: '#222',
            borderRadius: '20px',
            border: '2px dashed #444',
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            overflow: 'visible'
        }}>
            {/* Conveyor Belt Track */}
            <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                height: '10px',
                background: 'repeating-linear-gradient(90deg, #333 0px, #333 20px, #444 20px, #444 40px)',
                opacity: 0.5
            }} />

            {/* Overflow Alert */}
            <AnimatePresence>
                {isOverflow && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute',
                            top: '-40px',
                            left: '50%',
                            x: '-50%',
                            background: 'var(--error)',
                            color: '#fff',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: 'bold',
                            zIndex: 10
                        }}
                    >
                        <AlertTriangle size={18} /> BUFFER OVERFLOW!
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Slots */}
            {Array.from({ length: capacity }).map((_, index) => {
                const item = buffer[index];
                return (
                    <div
                        key={index}
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '8px',
                            background: 'rgba(255,255,255,0.05)',
                            border: item ? 'none' : '2px dashed rgba(255,255,255,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}
                    >
                        <AnimatePresence>
                            {item && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20, scale: 0.5 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 20, scale: 0.5 }}
                                    style={{ color: item.color }}
                                >
                                    <Box size={32} fill={item.color} />
                                    <div style={{ position: 'absolute', top: '-15px', right: '-10px', background: '#333', fontSize: '0.7em', padding: '2px 4px', borderRadius: '4px', color: '#fff' }}>
                                        #{item.id}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div style={{ position: 'absolute', bottom: '-25px', fontSize: '0.7rem', color: '#666' }}>
                            Slot {index}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ConveyorBelt;
