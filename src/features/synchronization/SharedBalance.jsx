import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, FileCode } from 'lucide-react';

const SharedBalance = ({ balance, isLocked, lockedBy }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            position: 'relative'
        }}>
            {/* Lock Indicator */}
            <motion.div
                animate={{ y: isLocked ? 5 : -5 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
            >
                {isLocked ? (
                    <div style={{
                        background: '#f72585',
                        color: '#fff',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 0 15px #f72585',
                        fontFamily: 'monospace'
                    }}>
                        <Lock size={16} /> LOCKED: {lockedBy}
                    </div>
                ) : (
                    <div style={{
                        background: '#4cc9f0',
                        color: '#000',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontFamily: 'monospace'
                    }}>
                        <Unlock size={16} /> UNLOCKED
                    </div>
                )}
            </motion.div>

            {/* Shared Variable Visual */}
            <motion.div
                animate={{
                    boxShadow: isLocked ? '0 0 30px rgba(247, 37, 133, 0.4)' : '0 0 0px transparent',
                    borderColor: isLocked ? '#f72585' : '#333'
                }}
                style={{
                    background: '#1a1a1a',
                    padding: '2rem',
                    borderRadius: '8px',
                    border: '2px solid #333',
                    width: '300px',
                    textAlign: 'center',
                    fontFamily: 'monospace'
                }}
            >
                <FileCode size={48} color={isLocked ? '#f72585' : '#4cc9f0'} style={{ marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '1rem', color: '#888', marginBottom: '0.5rem' }}>SHARED MEMORY (0x3F)</h2>
                <motion.div
                    key={balance}
                    initial={{ scale: 1.2, color: '#fff' }}
                    animate={{ scale: 1, color: '#4cc9f0' }}
                    style={{ fontSize: '3rem', fontWeight: 'bold' }}
                >
                    {balance}
                </motion.div>
                <div style={{ fontSize: '0.8rem', color: '#555', marginTop: '0.5rem' }}>int shared_value;</div>
            </motion.div>

        </div>
    );
};

export default SharedBalance;
