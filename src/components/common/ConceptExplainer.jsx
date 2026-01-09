import React from 'react';
import { Cpu, Globe } from 'lucide-react';

const ConceptExplainer = ({ title, osExplanation, realWorldAnalogy }) => {
    return (
        <div className="glass-panel" style={{
            padding: '2rem',
            borderRadius: '24px',
            marginTop: '3rem',
            borderTop: '4px solid var(--primary)'
        }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                Understanding <span className="text-gradient">{title}</span>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

                {/* OS Theory */}
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', marginBottom: '1rem' }}>
                        <Cpu size={24} /> In The OS
                    </h3>
                    <p style={{ lineHeight: '1.6', opacity: 0.8, fontSize: '0.95rem' }}>
                        {osExplanation}
                    </p>
                </div>

                {/* Real World */}
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', marginBottom: '1rem' }}>
                        <Globe size={24} /> Real World
                    </h3>
                    <p style={{ lineHeight: '1.6', opacity: 0.8, fontSize: '0.95rem' }}>
                        {realWorldAnalogy}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default ConceptExplainer;
