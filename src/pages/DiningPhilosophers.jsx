import React, { useState, useEffect, useRef } from 'react';
import Philosopher from '../features/dining/Philosopher';
import Fork from '../features/dining/Fork';
import ConceptExplainer from '../components/common/ConceptExplainer';
import QuizComponent from '../components/common/QuizComponent';
import { Play, RotateCcw, ShieldCheck, ShieldAlert, BookOpen, ArrowDown } from 'lucide-react';

const DiningPhilosophers = () => {
    // States: 'THINKING', 'HUNGRY', 'EATING', 'DEADLOCK'
    const [philosophers, setPhilosophers] = useState(Array(5).fill('THINKING'));
    const [forks, setForks] = useState(Array(5).fill(null)); // Array of IDs or null
    const [isRunning, setIsRunning] = useState(false);
    const [useSolution, setUseSolution] = useState(false);
    const [message, setMessage] = useState("Ready to start.");
    const timeouts = useRef([]);

    const reset = () => {
        timeouts.current.forEach(clearTimeout);
        timeouts.current = [];
        setPhilosophers(Array(5).fill('THINKING'));
        setForks(Array(5).fill(null));
        setIsRunning(false);
        setMessage("Simulation Reset.");
    };

    const wait = (ms) => new Promise(resolve => {
        const id = setTimeout(resolve, ms);
        timeouts.current.push(id);
    });

    const runSimulation = async () => {
        reset();
        setIsRunning(true);

        if (!useSolution) {
            // DEADLOCK SCENARIO
            setMessage("Attempting to eat without order (Deadlock Prone)...");

            // 1. Everyone gets hungry
            setPhilosophers(Array(5).fill('HUNGRY'));
            await wait(1000);

            // 2. Everyone picks LEFT fork
            setMessage("Every philosopher picks up their LEFT fork.");
            setForks([1, 2, 3, 4, 0]); // F0=P1, F1=P2... cyclic shift implies everyone holds one
            // Or visually: Fork i is between i and i+1. Left for P0 is F4? Right is F0?
            // Let's standardise: P(i) sits between F(i) [Right] and F(i-1) [Left].
            // If everyone picks Left (F(i-1)), then F(4) taken by P0, F(0) by P1...
            const deadlockForks = [null, null, null, null, null];
            deadlockForks[4] = 0;
            deadlockForks[0] = 1;
            deadlockForks[1] = 2;
            deadlockForks[2] = 3;
            deadlockForks[3] = 4;
            setForks(deadlockForks);
            await wait(1500);

            // 3. Try to pick RIGHT fork -> Failed
            setMessage("Waiting for RIGHT fork... Forever.");
            setPhilosophers(Array(5).fill('DEADLOCK'));
            await wait(1000);
            setMessage("DEADLOCK DETECTED! Circular Wait.");

        } else {
            // SOLUTION SCENARIO (Ordered)
            setMessage("Using Resource Ordering (Safe)...");

            const eatSequence = [0, 2, 4, 1, 3]; // Arbitrary non-conflicting order

            for (let pid of eatSequence) {
                // Hungry
                updatePhil(pid, 'HUNGRY');
                setMessage(`P${pid} is Hungry.`);
                await wait(800);

                // Pick Both
                updateForks(pid, true);
                updatePhil(pid, 'EATING');
                setMessage(`P${pid} acquires forks and EATS.`);
                await wait(1500);

                // Put Down
                updateForks(pid, false);
                updatePhil(pid, 'THINKING');
                setMessage(`P${pid} is done thinking.`);
                await wait(500);
            }
            setMessage("All philosophers ate successfully!");
            setIsRunning(false);
        }
    };

    const runConflict = async () => {
        reset();
        setIsRunning(true);
        setMessage("Conflict Mode: P0 and P1 want to eat same time!");

        // 1. Both Hungry
        setPhilosophers(prev => {
            const copy = [...prev];
            copy[0] = 'HUNGRY';
            copy[1] = 'HUNGRY';
            return copy;
        });
        await wait(1000);

        // 2. P0 wins race
        setMessage("P0 is faster! Grabs forks.");
        updateForks(0, true);
        updatePhil(0, 'EATING');
        await wait(1000);

        // 3. P1 blocked
        setMessage("P1 tries to eat... BLOCKED by P0 (Fork 0 taken).");
        await wait(2000);

        // 4. P0 finishes
        setMessage("P0 finishes and drops forks.");
        updateForks(0, false);
        updatePhil(0, 'THINKING');
        await wait(1000);

        // 5. P1 eats
        setMessage("Fork 0 free! P1 grabs it and EATS.");
        updateForks(1, true);
        updatePhil(1, 'EATING');
        await wait(2000);

        // 6. Finish
        updateForks(1, false);
        updatePhil(1, 'THINKING');
        setMessage("P1 finished. Conflict resolved.");
        setIsRunning(false);
    };

    const updatePhil = (id, status) => {
        setPhilosophers(prev => {
            const copy = [...prev];
            copy[id] = status;
            return copy;
        });
    };

    const updateForks = (pid, pick) => {
        setForks(prev => {
            const copy = [...prev];
            const left = (pid + 4) % 5;
            const right = pid;
            copy[left] = pick ? pid : null;
            copy[right] = pick ? pid : null;
            return copy;
        });
    };

    const scrollToAssignment = () => {
        const section = document.getElementById('assignment-section');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh', paddingBottom: '100px' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Dining <span className="text-gradient">Philosophers</span></h1>
                <p style={{ opacity: 0.7 }}>Visualizing Deadlock & Resource Starvation</p>
            </header>

            {/* MAIN VISUALIZATION */}
            <div className="glass-panel" style={{
                width: '600px', height: '600px', margin: '0 auto 2rem',
                borderRadius: '50%', position: 'relative',
                background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)'
            }}>
                {philosophers.map((status, i) => {
                    // Geometry: 5 items in circle
                    const angle = (i * 72) - 90;
                    const rad = (angle * Math.PI) / 180;
                    const r = 220; // Radius
                    const x = 300 + r * Math.cos(rad);
                    const y = 300 + r * Math.sin(rad);

                    // Forks between
                    const fAngle = ((i * 72) + 36) - 90;
                    const fRad = (fAngle * Math.PI) / 180;
                    const fR = 150;
                    const fx = 300 + fR * Math.cos(fRad);
                    const fy = 300 + fR * Math.sin(fRad);

                    return (
                        <React.Fragment key={i}>
                            {/* Philosopher */}
                            <div style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)' }}>
                                <Philosopher id={i} state={status} />
                            </div>
                            {/* Fork */}
                            <div style={{ position: 'absolute', left: fx, top: fy, transform: 'translate(-50%, -50%) rotate(' + (fAngle + 90) + 'deg)' }}>
                                <Fork id={i} owner={forks[i]} />
                            </div>
                        </React.Fragment>
                    )
                })}

                {/* Center Status */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    textAlign: 'center', width: '200px', color: 'var(--text-dim)'
                }}>
                    <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>CURRENT STATE</div>
                    <div style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{message}</div>
                </div>
            </div>

            {/* CONTROLS */}
            <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto 3rem', padding: '2rem', borderRadius: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        {useSolution ? <ShieldCheck color="var(--success)" /> : <ShieldAlert color="var(--error)" />}
                        <span>Mode: <strong>{useSolution ? 'Ordered (Safe)' : 'No Sync (Deadlock)'}</strong></span>
                    </div>
                    <button
                        onClick={() => setUseSolution(!useSolution)}
                        disabled={isRunning}
                        style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', cursor: 'pointer', opacity: isRunning ? 0.5 : 1 }}
                    >
                        Toggle Mode
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                        onClick={runSimulation}
                        disabled={isRunning}
                        style={{
                            padding: '1rem 3rem', background: isRunning ? '#444' : 'var(--primary)',
                            color: '#fff', border: 'none', borderRadius: '50px', fontWeight: 'bold', fontSize: '1.1rem',
                            display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: isRunning ? 'not-allowed' : 'pointer'
                        }}
                    >
                        <Play size={20} fill="currentColor" /> Start Simulation
                    </button>

                    <button
                        onClick={runConflict}
                        disabled={isRunning}
                        style={{
                            padding: '1rem 2rem', background: isRunning ? '#444' : 'var(--accent)',
                            color: '#fff', border: 'none', borderRadius: '50px', fontWeight: 'bold', fontSize: '1rem',
                            cursor: isRunning ? 'not-allowed' : 'pointer'
                        }}
                    >
                        ⚔️ Neighbors Fight
                    </button>

                    <button onClick={reset} style={{ padding: '1rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', cursor: 'pointer' }}>
                        <RotateCcw size={20} />
                    </button>
                </div>
            </div>

            {/* EXPLAINER */}
            <ConceptExplainer
                title="The Dining Philosophers Problem"
                osExplanation="A classic concurrency problem dealing with Deadlock and Starvation. Five philosophers sit at a table, but there are only five forks. To eat, a philosopher needs two forks (left and right). If everyone picks up the left fork at once, no one can pick up the right fork, and they all wait forever (Deadlock)."
                realWorldAnalogy="Imagine 5 cars at a 5-way intersection. If everyone moves forward at once into the center, they block each other (Gridlock). If we add a rule (e.g., 'Odd numbered streets go first'), we avoid the jam."
            />

            {/* ASSIGNMENT SHORTCUT */}
            <div style={{ textAlign: 'center', margin: '4rem 0' }}>
                <button
                    onClick={scrollToAssignment}
                    style={{
                        padding: '1rem 2rem',
                        background: 'transparent',
                        border: '1px solid var(--accent)',
                        color: 'var(--accent)',
                        borderRadius: '8px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    <BookOpen size={20} /> Go to Dining Philosophers Assignment <ArrowDown size={16} />
                </button>
            </div>

            <div id="assignment-section">
                <QuizComponent topic="dining_philosophers" />
            </div>
        </div>
    );
};

export default DiningPhilosophers;
