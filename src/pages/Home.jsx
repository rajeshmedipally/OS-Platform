import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, Lock, Factory, Utensils, ArrowRight, Sparkles } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const Home = () => {
    return (
        <div style={{ paddingBottom: '4rem' }}>

            {/* Hero Section */}
            <section style={{
                height: '90vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                background: 'radial-gradient(ellipse at center, rgba(114, 9, 183, 0.15) 0%, transparent 70%)',
                position: 'relative'
            }}>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    style={{ maxWidth: '900px', padding: '0 2rem', zIndex: 10 }}
                >
                    <motion.div variants={itemVariants} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '50px', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <Sparkles size={16} color="var(--secondary)" />
                        <span style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>REIMAGINING CS EDUCATION</span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} style={{ fontSize: '5rem', fontWeight: '700', lineHeight: '1.1', marginBottom: '1.5rem' }}>
                        Master Operating Systems<br />
                        <span className="text-gradient">Without The Boredom</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} style={{ fontSize: '1.5rem', color: 'var(--text-dim)', maxWidth: '700px', margin: '0 auto 3rem' }}>
                        Ditch the textbooks. Visualize algorithms, interact with simulations, and debug race conditions in an interactive learning platform.
                    </motion.p>

                    <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <Link to="/scheduling">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 20px var(--primary-glow)' }}
                                whileTap={{ scale: 0.95 }}
                                style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', background: 'var(--text-light)', color: '#000', borderRadius: '50px', fontWeight: 'bold' }}
                            >
                                Start Learning
                            </motion.button>
                        </Link>
                        <Link to="/about">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', background: 'rgba(255,255,255,0.05)', color: '#fff', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.2)' }}
                            >
                                Our Mission
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Decorative Grid */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '200px',
                    background: 'linear-gradient(to top, var(--bg-dark), transparent)',
                    zIndex: 5
                }} />
            </section>

            {/* Modules Section */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}
                >

                    {/* Module 1: Scheduling */}
                    <Link to="/scheduling">
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="glass-panel"
                            style={{ padding: '3rem', borderRadius: '24px', height: '100%', position: 'relative', overflow: 'hidden' }}
                        >
                            <div style={{ position: 'absolute', top: 0, right: 0, padding: '1.5rem', opacity: 0.1 }}>
                                <Cpu size={120} />
                            </div>
                            <Cpu size={48} color="var(--secondary)" style={{ marginBottom: '1.5rem' }} />
                            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Scheduling Arena</h3>
                            <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                                Step into the shoes of the Process Scheduler. Manage queues, visualize bursts, and optimize CPU time using algorithms like Round Robin and SJF.
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', fontWeight: 'bold' }}>
                                ENTER MODULE <ArrowRight size={20} />
                            </div>
                        </motion.div>
                    </Link>

                    {/* Module 2: Synchronization */}
                    <Link to="/synchronization">
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="glass-panel"
                            style={{ padding: '3rem', borderRadius: '24px', height: '100%', position: 'relative', overflow: 'hidden' }}
                        >
                            <div style={{ position: 'absolute', top: 0, right: 0, padding: '1.5rem', opacity: 0.1 }}>
                                <Lock size={120} />
                            </div>
                            <Lock size={48} color="var(--accent)" style={{ marginBottom: '1.5rem' }} />
                            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Critical Section</h3>
                            <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                                Race Conditions can crash your OS. Learn how Threads fight for shared resources, and how Mutex Locks prevent the chaos of data corruption.
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontWeight: 'bold' }}>
                                ENTER MODULE <ArrowRight size={20} />
                            </div>
                        </motion.div>
                    </Link>

                    {/* Module 3: Producer-Consumer */}
                    <Link to="/producer-consumer">
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="glass-panel"
                            style={{ padding: '3rem', borderRadius: '24px', height: '100%', position: 'relative', overflow: 'hidden' }}
                        >
                            <div style={{ position: 'absolute', top: 0, right: 0, padding: '1.5rem', opacity: 0.1 }}>
                                <Factory size={120} />
                            </div>
                            <Factory size={48} color="#06d6a0" style={{ marginBottom: '1.5rem' }} />
                            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>The Smart Factory</h3>
                            <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                                Master the Bounded Buffer Problem. Manage lines, handle overflows, and use Semaphores to coordinate Producers and Consumers flawlessly.
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#06d6a0', fontWeight: 'bold' }}>
                                ENTER MODULE <ArrowRight size={20} />
                            </div>
                        </motion.div>
                    </Link>

                    {/* Module 4: Dining Philosophers */}
                    <Link to="/dining-philosophers">
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="glass-panel"
                            style={{ padding: '3rem', borderRadius: '24px', height: '100%', position: 'relative', overflow: 'hidden' }}
                        >
                            <div style={{ position: 'absolute', top: 0, right: 0, padding: '1.5rem', opacity: 0.1 }}>
                                <Utensils size={120} />
                            </div>
                            <Utensils size={48} color="#ef476f" style={{ marginBottom: '1.5rem' }} />
                            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Dining Philosophers</h3>
                            <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                                A classic deadlock dilemma. Five philosophers, five forks. Can you solve the Resource Hierarchy without letting anyone starve?
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef476f', fontWeight: 'bold' }}>
                                ENTER MODULE <ArrowRight size={20} />
                            </div>
                        </motion.div>
                    </Link>

                </motion.div>
            </section>

        </div>
    );
};

export default Home;
