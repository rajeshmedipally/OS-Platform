import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Play, RotateCcw } from 'lucide-react';

const ProcessInput = ({ onAddProcess, onReset, onRun, isRunning }) => {
    const [burst, setBurst] = useState(2);
    const [arrival, setArrival] = useState(0);
    const [priority, setPriority] = useState(1);

    const handleAdd = () => {
        onAddProcess({ burst: Number(burst), arrival: Number(arrival), priority: Number(priority) });
    };

    return (
        <div style={{
            background: 'var(--bg-card)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
        }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>Add Process</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem' }}>Burst Time</label>
                    <input
                        type="number"
                        min="1"
                        value={burst}
                        onChange={(e) => setBurst(e.target.value)}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '6px',
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid #444',
                            color: '#fff',
                            width: '80px'
                        }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem' }}>Arrival Time</label>
                    <input
                        type="number"
                        min="0"
                        value={arrival}
                        onChange={(e) => setArrival(e.target.value)}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '6px',
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid #444',
                            color: '#fff',
                            width: '80px'
                        }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem' }}>Priority</label>
                    <input
                        type="number"
                        min="1"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '6px',
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid #444',
                            color: '#fff',
                            width: '80px'
                        }}
                    />
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdd}
                    style={{
                        padding: '0.6rem 1rem',
                        background: 'var(--success)',
                        color: '#000',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: 'bold'
                    }}
                >
                    <Plus size={18} /> Add
                </motion.button>

                <div style={{ flex: 1 }}></div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onReset}
                    style={{
                        padding: '0.6rem 1rem',
                        background: '#333',
                        color: '#fff',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginRight: '0.5rem'
                    }}
                >
                    <RotateCcw size={18} /> Reset
                </motion.button>

            </div>
        </div>
    );
};

export default ProcessInput;
