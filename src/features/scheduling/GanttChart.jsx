import React from 'react';
import { motion } from 'framer-motion';

const GanttChart = ({ timeLog }) => {
    if (!timeLog || timeLog.length === 0) return null;

    const totalTime = timeLog[timeLog.length - 1].end;

    return (
        <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Execution Timeline (Gantt Chart)</h3>
            <div style={{
                display: 'flex',
                width: '100%',
                height: '60px',
                background: '#222',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative'
            }}>
                {timeLog.map((block, index) => {
                    const duration = block.end - block.start;
                    const widthPercent = (duration / totalTime) * 100;

                    return (
                        <motion.div
                            key={index}
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: `${widthPercent}%`, opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            style={{
                                height: '100%',
                                background: block.processId === 'IDLE' ? '#333' : block.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                position: 'relative',
                                borderRight: '1px solid rgba(0,0,0,0.2)'
                            }}
                        >
                            {block.processId !== 'IDLE' && `P${block.processId}`}

                            {/* Time Indicators */}
                            <span style={{
                                position: 'absolute',
                                bottom: '2px',
                                left: '2px',
                                fontSize: '0.6rem',
                                opacity: 0.7
                            }}>
                                {block.start}
                            </span>
                            {index === timeLog.length - 1 && (
                                <span style={{
                                    position: 'absolute',
                                    bottom: '2px',
                                    right: '2px',
                                    fontSize: '0.6rem',
                                    opacity: 0.7
                                }}>
                                    {block.end}
                                </span>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default GanttChart;
