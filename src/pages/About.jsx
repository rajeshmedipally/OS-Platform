import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Rocket } from 'lucide-react';

const Section = ({ children, bg = 'transparent' }) => (
    <section style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4rem 2rem',
        textAlign: 'center',
        background: bg
    }}>
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.5 }}
            style={{ maxWidth: '900px' }}
        >
            {children}
        </motion.div>
    </section>
);

const About = () => {
    return (
        <div style={{ paddingBottom: '100px' }}>

            {/* Slide 1: The Problem */}
            <Section>
                <h2 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '2rem' }}>The <span style={{ color: 'var(--error)' }}>Gap</span> in CS Education</h2>
                <p style={{ fontSize: '1.8rem', color: 'var(--text-dim)', lineHeight: '1.4' }}>
                    Operating Systems are the backbone of computing, yet they are taught using
                    <span style={{ color: '#fff', fontWeight: 'bold' }}> static diagrams</span> and
                    <span style={{ color: '#fff', fontWeight: 'bold' }}> dense textbooks</span>.
                </p>
                <div style={{ marginTop: '3rem', fontSize: '1.2rem', opacity: 0.7 }}>
                    Result: Students memorize algorithms but fail to understand systems.
                </div>
            </Section>

            {/* Slide 2: The Solution */}
            <Section bg="radial-gradient(circle at center, rgba(114, 9, 183, 0.1) 0%, transparent 60%)">
                <div style={{ marginBottom: '2rem' }}>
                    <Rocket size={64} color="var(--secondary)" />
                </div>
                <h2 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Meet OS Playground</h2>
                <p style={{ fontSize: '1.5rem', color: 'var(--text-dim)', maxWidth: '800px', margin: '0 auto' }}>
                    An interactive, <span className="text-gradient" style={{ fontWeight: 'bold' }}>gamified simulation engine</span>.
                    We turn abstract concepts into tangible mechanics. Students don't just "read" about Race Conditions—they cause them.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '4rem', textAlign: 'left' }}>
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
                        <h3 style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>Visual Intuition</h3>
                        <p>Gantt charts that animate in real-time. Semaphores that actually lock. No more imagining.</p>
                    </div>
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
                        <h3 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Active Failure</h3>
                        <p>We encourage students to break the system (Deadlocks, Crashes) to understand why safety matters.</p>
                    </div>
                </div>
            </Section>



            <footer style={{ textAlign: 'center', opacity: 0.5, marginTop: '4rem' }}>
                <p>Built for the AI Hackathon 2026</p>
            </footer>

        </div>
    );
};

export default About;
