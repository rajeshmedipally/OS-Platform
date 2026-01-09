import React from 'react';
import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';

const Fork = ({ id, owner }) => {
    // Owner: null (Free), or Philosopher ID (0-4)
    const isTaken = owner !== null;

    // Visual position logic based on horizontal row:
    // If owner is 'left' neighbor (id), rotate left.
    // If owner is 'right' neighbor (id+1), rotate right.
    // Note: This logic depends on the parent passing usage direction, but for simplicity we'll just color it.

    return (
        <div style={{
            width: '40px',
            height: '60px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        }}>
            <motion.div
                animate={isTaken ? { y: -10, scale: 1.2 } : { y: 0, scale: 1 }}
                style={{ opacity: isTaken ? 1 : 0.3 }}
            >
                <Utensils
                    size={32}
                    color={isTaken ? '#fb8500' : '#fff'} // Orange if taken
                    style={{ transform: 'rotate(90deg)' }}
                />
            </motion.div>
            <div style={{ position: 'absolute', bottom: -20, fontSize: '0.7rem', opacity: 0.5 }}>
                F{id}
            </div>
        </div>
    );
};

export default Fork;
