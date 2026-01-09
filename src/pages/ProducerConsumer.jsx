import React, { useState, useEffect, useRef } from 'react';
import ConveyorBelt from '../features/producer-consumer/ConveyorBelt';
import FactoryWorker from '../features/producer-consumer/FactoryWorker';
import ConceptExplainer from '../components/common/ConceptExplainer';
import QuizComponent from '../components/common/QuizComponent';
import { Play, Pause, RotateCcw, Settings, ShieldCheck, ShieldAlert } from 'lucide-react';

const ProducerConsumer = () => {
    // Config
    const [capacity, setCapacity] = useState(5);
    const [prodSpeed, setProdSpeed] = useState(2000);
    const [consSpeed, setConsSpeed] = useState(3000);
    const [isSafeMode, setIsSafeMode] = useState(false);

    // State
    const [buffer, setBuffer] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [prodState, setProdState] = useState({ working: false, waiting: false });
    const [consState, setConsState] = useState({ working: false, waiting: false });
    const [logs, setLogs] = useState([]);
    const [isOverflow, setIsOverflow] = useState(false);

    // Refs for intervals/counters
    const prodInterval = useRef(null);
    const consInterval = useRef(null);
    const itemCount = useRef(0);

    // Helper to add log
    const addLog = (msg, type = 'info') => {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 4)]);
    };

    const startSimulation = () => {
        setIsRunning(true);
        setIsOverflow(false);

        // Producer Loop
        prodInterval.current = setInterval(() => {
            setBuffer(prev => {
                if (prev.length >= capacity) {
                    if (isSafeMode) {
                        setProdState({ working: false, waiting: true });
                        addLog("Producer waiting (Buffer Full)", 'warn');
                        return prev;
                    } else {
                        // OVERFLOW!
                        setIsOverflow(true);
                        setTimeout(() => setIsOverflow(false), 1000);
                        addLog("BUFFER OVERFLOW! Item lost.", 'error');
                        return prev;
                    }
                }

                // Add Item
                setProdState({ working: true, waiting: false });
                setTimeout(() => setProdState(s => ({ ...s, working: false })), 500);
                itemCount.current++;
                addLog(`Produced Item #${itemCount.current}`);

                const newItem = { id: itemCount.current, color: getRandomColor() };
                return [...prev, newItem];
            });
        }, prodSpeed);

        // Consumer Loop
        consInterval.current = setInterval(() => {
            setBuffer(prev => {
                if (prev.length === 0) {
                    if (isSafeMode) {
                        setConsState({ working: false, waiting: true });
                        addLog("Consumer waiting (Buffer Empty)", 'warn');
                    } else {
                        setConsState({ working: false, waiting: true });
                        addLog("Consumer failed - buffer empty", 'error');
                    }
                    return prev;
                }

                // Consume Item
                setConsState({ working: true, waiting: false });
                setTimeout(() => setConsState(s => ({ ...s, working: false })), 500);
                const item = prev[0]; // FIFO
                addLog(`Consumed Item #${item.id}`);
                return prev.slice(1);
            });
        }, consSpeed);
    };

    const stopSimulation = () => {
        setIsRunning(false);
        clearInterval(prodInterval.current);
        clearInterval(consInterval.current);
        setProdState({ working: false, waiting: false });
        setConsState({ working: false, waiting: false });
    };

    const reset = () => {
        stopSimulation();
        setBuffer([]);
        setLogs([]);
        itemCount.current = 0;
        setIsOverflow(false);
    };

    // Speed Logic Update while running
    useEffect(() => {
        if (isRunning) {
            stopSimulation();
            startSimulation();
        }
    }, [prodSpeed, consSpeed, isSafeMode]); // Restart if settings change

    // Cleanup
    useEffect(() => {
        return () => stopSimulation();
    }, []);

    const getRandomColor = () => {
        const colors = ['#f72585', '#4cc9f0', '#7209b7', '#4361ee', '#f8961e', '#06d6a0'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh', paddingBottom: '100px' }}>
            <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>The <span className="text-gradient">Smart Factory</span></h1>
                <p style={{ opacity: 0.7 }}>Master the Producer-Consumer problem. Manage the Conveyor Belt buffer to keep the factory running.</p>
            </header>

            {/* Main Factory Floor */}
            <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px', marginBottom: '2rem', position: 'relative', display: 'flex', flexDirection: 'column' }}>

                {/* Sync Mode Toggle - In Flex Flow, Top Right */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', width: '100%' }}>
                    <button
                        onClick={() => setIsSafeMode(!isSafeMode)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            background: isSafeMode ? 'rgba(6, 214, 160, 0.2)' : 'rgba(239, 71, 111, 0.2)',
                            border: `1px solid ${isSafeMode ? 'var(--success)' : 'var(--error)'}`,
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                        }}
                    >
                        {isSafeMode ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
                        {isSafeMode ? "Semaphores: ON" : "Semaphores: OFF"}
                    </button>
                </div>

                {/* Semaphore Dashboard (Only visible in Safe Mode) */}
                {isSafeMode && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '2rem',
                        marginBottom: '2rem',
                        fontFamily: 'monospace'
                    }}>
                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--secondary)' }}>
                            <span style={{ color: 'var(--text-dim)' }}>Semaphore(EmptySlots): </span>
                            <span style={{ fontWeight: 'bold', color: 'var(--secondary)' }}>{capacity - buffer.length}</span>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--accent)' }}>
                            <span style={{ color: 'var(--text-dim)' }}>Semaphore(FullSlots): </span>
                            <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>{buffer.length}</span>
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <h3 style={{ color: 'var(--secondary)', fontSize: '0.9rem', letterSpacing: '1px' }}>PRODUCER THREAD</h3>
                        <FactoryWorker type="PRODUCER" isWorking={prodState.working} isWaiting={prodState.waiting} speed={prodSpeed} />
                        <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Speed: {(prodSpeed / 1000).toFixed(1)}s</div>
                    </div>

                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <h3 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem', letterSpacing: '1px', opacity: 0.8 }}>SHARED BUFFER (CAPACITY: {capacity})</h3>
                        <ConveyorBelt buffer={buffer} capacity={capacity} isOverflow={isOverflow} />
                        <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
                            Items in Buffer: <span style={{ color: '#fff', fontWeight: 'bold' }}>{buffer.length} / {capacity}</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <h3 style={{ color: 'var(--accent)', fontSize: '0.9rem', letterSpacing: '1px' }}>CONSUMER THREAD</h3>
                        <FactoryWorker type="CONSUMER" isWorking={consState.working} isWaiting={consState.waiting} speed={consSpeed} />
                        <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Speed: {(consSpeed / 1000).toFixed(1)}s</div>
                    </div>

                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>

                {/* Left Column: Controls & Guide */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Settings size={20} /> Factory Controls
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Producer Speed (ms)</label>
                                <input type="range" min="500" max="4000" step="100" value={prodSpeed} onChange={e => setProdSpeed(Number(e.target.value))} style={{ width: '100%' }} />
                                <div style={{ textAlign: 'right', fontSize: '0.8rem', opacity: 0.5 }}>{prodSpeed}ms</div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Consumer Speed (ms)</label>
                                <input type="range" min="500" max="4000" step="100" value={consSpeed} onChange={e => setConsSpeed(Number(e.target.value))} style={{ width: '100%' }} />
                                <div style={{ textAlign: 'right', fontSize: '0.8rem', opacity: 0.5 }}>{consSpeed}ms</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {!isRunning ? (
                                <button onClick={startSimulation} style={{ padding: '0.8rem 2rem', borderRadius: '8px', background: 'var(--success)', color: '#000', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Play size={18} fill="#000" /> Start Factory
                                </button>
                            ) : (
                                <button onClick={stopSimulation} style={{ padding: '0.8rem 2rem', borderRadius: '8px', background: 'var(--accent)', color: '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Pause size={18} fill="#fff" /> Pause
                                </button>
                            )}

                            <button onClick={reset} style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', background: '#333', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <RotateCcw size={18} /> Reset
                            </button>
                        </div>
                    </div>

                    {/* Educational Info Panel */}
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)' }}>
                        <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>How It Works</h3>

                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div>
                                <h4 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>1. The Problem (Semaphores OFF)</h4>
                                <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: '1.5' }}>
                                    Producers and Consumers work blindly. If the producer is too fast, the buffer overflows (Data Loss). If the consumer is too fast, it tries to grab from an empty belt (Error).
                                </p>
                            </div>

                            <div>
                                <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>2. The Solution (Semaphores ON)</h4>
                                <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: '1.5' }}>
                                    We use two "counters" (Semaphores) to signal safe states:
                                </p>
                                <div style={{ marginLeft: '1rem', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                                    <div style={{ marginBottom: '0.3rem' }}><span style={{ fontWeight: 'bold', color: 'var(--secondary)' }}>EmptySlots:</span> Producer waits if this is 0.</div>
                                    <div><span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>FullSlots:</span> Consumer waits if this is 0.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Logs */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', maxHeight: '500px', overflowY: 'auto' }}>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1rem', opacity: 0.7 }}>Factory Logs</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                        {logs.length === 0 && <div style={{ opacity: 0.3 }}>Factory logic ready...</div>}
                        {logs.map((log, i) => (
                            <div key={i} style={{
                                paddingBottom: '0.5rem',
                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                color: log.includes('error') ? 'var(--error)' : log.includes('warn') ? 'var(--secondary)' : '#fff'
                            }}>
                                {log}
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <ConceptExplainer
                title="Producer-Consumer"
                osExplanation="This problem deals with two processes sharing a fixed-size buffer. The Producer adds data, and the Consumer removes it. We need 'Semaphores' (counters) to track empty and full slots so the Producer doesn't write to a full buffer (Overflow) and the Consumer doesn't read from an empty one (Underflow)."
                realWorldAnalogy="Think of a Fast Food Kitchen. 
        The Burger Cook (Producer) places burgers on a heat rack (Buffer) that holds exactly 5 slots. 
        The Cashier (Consumer) grabs burgers to serve. 
        If the rack is full, the Cook MUST stop (sleep) or burgers fall on the floor. 
        If the rack is empty, the Cashier MUST wait (sleep) or they hand the customer an empty bag."
            />

            <QuizComponent topic="producer_consumer" />
        </div>
    );
};

export default ProducerConsumer;
