import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, AppWindow } from 'lucide-react';

const ATMVisual = ({ id, status, localBalance, isActive, isLockedOut, color }) => {
    return (
        <motion.div
            animate={{
                scale: isActive ? 1.05 : 1,
                opacity: isLockedOut ? 0.5 : 1,
                borderColor: isActive ? color : 'transparent'
            }}
            style={{
                background: 'var(--bg-card)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '2px solid transparent',
                width: '250px',
                textAlign: 'left',
                position: 'relative',
                fontFamily: 'monospace'
            }}
        >
            {isLockedOut && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', borderRadius: '10px', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f72585', fontWeight: 'bold' }}>
                    BLOCKED
                </div>
            )}

            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: color, fontWeight: 'bold', fontSize: '1.1rem' }}>THREAD {id}</div>
                <AppWindow size={24} color={color} />
            </div>

            <div style={{ fontSize: '0.8rem', marginBottom: '1rem', color: '#aaa' }}>
                State: <span style={{ color: '#fff' }}>{status || 'READY'}</span>
            </div>

            <div style={{
                background: '#111',
                padding: '1rem',
                borderRadius: '6px',
                border: '1px solid #333',
                minHeight: '80px'
            }}>
                <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.5rem' }}>REGISTER (Local Var)</div>
                {localBalance !== null ? (
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}
                    >
                        {localBalance}
                    </motion.div>
                ) : (
                    <div style={{ opacity: 0.3, fontSize: '1.5rem' }}>0x00</div>
                )}
            </div>
        </motion.div>
    );
};

export default ATMVisual;
