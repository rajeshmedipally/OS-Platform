import React from 'react';
import { motion } from 'framer-motion';
import { User, Divide } from 'lucide-react';

const Philosopher = ({ id, state }) => {
    // State: THINKING, HUNGRY, EATING, DEADLOCK
    let color = 'var(--secondary)'; // Thinking (Blue-ish)
    let statusText = 'Thinking';

    if (state === 'HUNGRY') {
        color = '#ffb703'; // Yellow
        statusText = 'Hungry';
    } else if (state === 'EATING') {
        color = 'var(--success)'; // Green
        statusText = 'Eating';
    } else if (state === 'DEADLOCK') {
        color = 'var(--error)'; // Red
        statusText = 'Deadlocked';
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100px' }}>
            <motion.div
                animate={state === 'EATING' ? { scale: 1.1, boxShadow: `0 0 20px ${color}` } : { scale: 1, boxShadow: 'none' }}
                style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)',
                    border: `4px solid ${color}`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    transition: 'all 0.3s'
                }}
            >
                <User size={40} color={color} />
                <div style={{ position: 'absolute', top: -10, background: '#222', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    P{id}
                </div>
            </motion.div>
            <div style={{ fontSize: '0.9rem', color: color, fontWeight: 'bold' }}>
                {statusText}
            </div>
        </div>
    );
};

export default Philosopher;
