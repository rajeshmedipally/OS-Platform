import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, PackageOpen, PauseCircle, Zap } from 'lucide-react';

const FactoryWorker = ({ type, isWorking, isWaiting, speed }) => {
    const isProducer = type === 'PRODUCER';
    const color = isProducer ? 'var(--secondary)' : 'var(--accent)';

    return (
        <div className="glass-panel" style={{
            padding: '1.5rem',
            borderRadius: '16px',
            width: '200px',
            textAlign: 'center',
            borderTop: `4px solid ${color}`,
            opacity: isWaiting ? 0.6 : 1
        }}>
            <div style={{ marginBottom: '1rem', position: 'relative', display: 'inline-block' }}>
                <motion.div
                    animate={isWorking ? { rotate: isProducer ? [0, -45, 0] : [0, 10, -10, 0] } : {}}
                    transition={{ repeat: Infinity, duration: speed ? speed / 1000 : 1 }}
                >
                    {isProducer ? <Hammer size={40} color={color} /> : <PackageOpen size={40} color={color} />}
                </motion.div>

                {isWaiting && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{ position: 'absolute', top: -10, right: -10, background: '#333', borderRadius: '50%' }}
                    >
                        <PauseCircle size={20} color="#fb8500" />
                    </motion.div>
                )}
            </div>

            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: isWaiting ? '#aaa' : '#fff' }}>
                {type}
            </h3>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', height: '1.5em' }}>
                {isWaiting ? "Waiting..." : (isWorking ? (isProducer ? "Creating..." : "Consuming...") : "Idle")}
            </div>
        </div>
    );
};

export default FactoryWorker;
