import React, { useState, useEffect } from 'react';
import { Scheduler, Process } from '../features/scheduling/scheduler';
import ProcessInput from '../features/scheduling/ProcessInput';
import GanttChart from '../features/scheduling/GanttChart';
import ConceptExplainer from '../components/common/ConceptExplainer';
import QuizComponent from '../components/common/QuizComponent';
import { AnimatePresence, motion } from 'framer-motion';

const Scheduling = () => {
    const [algorithm, setAlgorithm] = useState('FCFS');
    const [processes, setProcesses] = useState([]);
    const [scheduler] = useState(new Scheduler());
    const [quantum, setQuantum] = useState(2);
    const [result, setResult] = useState(null);

    const colors = ['#f72585', '#4cc9f0', '#7209b7', '#4361ee', '#f8961e', '#06d6a0'];

    const handleAddProcess = ({ burst, arrival, priority }) => {
        const color = colors[processes.length % colors.length];
        const newProcess = new Process(processes.length + 1, arrival, burst, priority, color);
        setProcesses([...processes, newProcess]);
        scheduler.addProcess(newProcess);
        runSimulation(algorithm, [...processes, newProcess]);
    };

    const reset = () => {
        setProcesses([]);
        setResult(null);
        scheduler.processes = [];
    };

    const runSimulation = (algo, currentProcs = processes) => {
        if (currentProcs.length === 0) return;

        // Re-instantiate scheduler with current processes to ensure clean state
        const tempScheduler = new Scheduler();
        currentProcs.forEach(p => tempScheduler.addProcess(p));

        let res;
        switch (algo) {
            case 'FCFS': res = tempScheduler.runFCFS(); break;
            case 'SJF': res = tempScheduler.runSJF(); break;
            case 'Priority': res = tempScheduler.runPriority(); break;
            case 'RR': res = tempScheduler.runRoundRobin(quantum); break;
            default: res = tempScheduler.runFCFS();
        }
        setResult(res);
    };

    // Live update when algo or quantum changes
    useEffect(() => {
        runSimulation(algorithm);
    }, [algorithm, quantum]);

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh', paddingBottom: '100px' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Scheduling <span className="text-gradient">Arena</span></h1>
                <p style={{ opacity: 0.7 }}>Experiment with CPU scheduling. Add processes and see how the OS handles them.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>

                {/* Left Column: Controls & Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Controls */}
                    <div className="glass-panel" style={{
                        padding: '1.5rem',
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>Algorithm Control</h3>

                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                            {['FCFS', 'SJF', 'Priority', 'RR'].map(algo => (
                                <button
                                    key={algo}
                                    onClick={() => setAlgorithm(algo)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '8px',
                                        background: algorithm === algo ? 'linear-gradient(45deg, var(--primary), var(--secondary))' : 'rgba(255,255,255,0.05)',
                                        color: algorithm === algo ? '#fff' : 'var(--text-dim)',
                                        fontWeight: 'bold',
                                        border: '1px solid',
                                        borderColor: algorithm === algo ? 'transparent' : 'rgba(255,255,255,0.1)',
                                        transition: 'all 0.2s',
                                        flex: 1
                                    }}
                                >
                                    {algo}
                                </button>
                            ))}
                        </div>

                        {algorithm === 'RR' && (
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Time Quantum: {quantum}ms</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={quantum}
                                    onChange={(e) => setQuantum(Number(e.target.value))}
                                    style={{ width: '100%', accentColor: 'var(--accent)' }}
                                />
                            </div>
                        )}

                        <div style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: '1.4', minHeight: '3em' }}>
                            {algorithm === 'FCFS' && "First Come First Serve: The simplest algorithm. Processes are executed in the order they arrive."}
                            {algorithm === 'SJF' && "Shortest Job First: Processes with smaller burst times get priority. Minimizes waiting time but causes starvation."}
                            {algorithm === 'Priority' && "Priority Scheduling: Processes with higher priority (lower number) execute first."}
                            {algorithm === 'RR' && "Round Robin: Each process gets a small unit of time (Quantum). Fair, but higher turnaround."}
                        </div>
                    </div>

                    <ProcessInput onAddProcess={handleAddProcess} onReset={reset} />

                    {/* Player List */}
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>Process Queue</h3>
                        <AnimatePresence>
                            {processes.map(p => (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        background: 'rgba(255,255,255,0.03)',
                                        padding: '0.8rem',
                                        marginBottom: '0.5rem',
                                        borderRadius: '8px',
                                        borderLeft: `4px solid ${p.color}`
                                    }}
                                >
                                    <div style={{ fontWeight: 'bold', marginRight: '1rem', width: '30px' }}>P{p.id}</div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.8, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', flex: 1 }}>
                                        <span>Burst: {p.burstTime}</span>
                                        <span>Arrival: {p.arrivalTime}</span>
                                        <span>Prior: {p.priority}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {processes.length === 0 && <div style={{ opacity: 0.5, fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>No processes active</div>}
                    </div>

                </div>

                {/* Right Column: Visualization */}
                <div className="glass-panel" style={{
                    borderRadius: '24px',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden'
                }}>

                    {/* Metrics Panel */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ background: 'rgba(0,180,216,0.1)', padding: '1.5rem', borderRadius: '16px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--secondary)', marginBottom: '0.5rem' }}>AVG WAITING TIME</div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: 1 }}>{result ? result.metrics.avgWait : '0.00'} <span style={{ fontSize: '1rem', opacity: 0.5 }}>ms</span></div>
                        </div>
                        <div style={{ background: 'rgba(247,37,133,0.1)', padding: '1.5rem', borderRadius: '16px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>AVG TURNAROUND</div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: 1 }}>{result ? result.metrics.avgTurnaround : '0.00'} <span style={{ fontSize: '1rem', opacity: 0.5 }}>ms</span></div>
                        </div>
                    </div>

                    {/* Gantt Chart Container */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {result && result.log.length > 0 ? (
                            <>
                                <GanttChart timeLog={result.log} />
                                <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                                    TIMELINE (milliseconds)
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', opacity: 0.3, marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏱️</div>
                                Waiting for processes...
                            </div>
                        )}
                    </div>

                </div>

            </div>

            <ConceptExplainer
                title="CPU Scheduling"
                osExplanation="The Scheduler (Dispatcher) decides which process gets the CPU next. The goal is to maximize throughput and minimize waiting time. Context Switching (saving/restoring state) has a cost (overhead)."
                realWorldAnalogy="Think of a Restaurant Kitchen. 
        The Chef (CPU) handles Orders (Processes).
        FCFS: First order in, first served. Simple but large orders block small ones.
        Round Robin: Chef spends 1 min on each order, rotating. Fast initial response for everyone.
        SJF: Chef picks the quickest dish first. Maximizes throughput but risks starving large orders."
            />

            <QuizComponent topic="scheduling" />
        </div>
    );
};

export default Scheduling;
