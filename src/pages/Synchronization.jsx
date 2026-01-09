import React, { useState } from 'react';
import ATMVisual from '../features/synchronization/ATMVisual';
import SharedBalance from '../features/synchronization/SharedBalance';
import ConceptExplainer from '../components/common/ConceptExplainer';
import QuizComponent from '../components/common/QuizComponent';
import { BankSimulation } from '../features/synchronization/bankLogic';
import { Play, Lock } from 'lucide-react';

const Synchronization = () => {
    const [balance, setBalance] = useState(1000);
    const [logs, setLogs] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);

    // State for visual representation
    const [userAState, setUserAState] = useState({ status: 'READY', localBalance: null, isKeyHolder: false });
    const [userBState, setUserBState] = useState({ status: 'READY', localBalance: null, isKeyHolder: false });
    const [isLocked, setIsLocked] = useState(false);
    const [lockedBy, setLockedBy] = useState(null);

    const bankSim = new BankSimulation(1000);

    const runSimulation = (mode) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setLogs([]);
        setBalance(1000);
        setUserAState({ status: 'READY', localBalance: null, isKeyHolder: false });
        setUserBState({ status: 'READY', localBalance: null, isKeyHolder: false });
        setIsLocked(false);
        setLockedBy(null);

        // Get steps from logic
        const simulationSteps = mode === 'MUTEX' ? bankSim.getMutexSteps(100) : bankSim.getRaceConditionSteps(100);

        let stepIndex = 0;

        const intervalId = setInterval(() => {
            // Finished?
            if (stepIndex >= simulationSteps.length) {
                clearInterval(intervalId);
                setIsAnimating(false);
                setLogs(prev => [...prev, "Process Terminated."]);
                setUserAState(p => ({ ...p, status: 'TERMINATED' }));
                setUserBState(p => ({ ...p, status: 'TERMINATED' }));
                return;
            }

            const step = simulationSteps[stepIndex];
            processStep(step);

            setLogs(prev => [...prev, step.desc]);

            if (step.sharedVal !== undefined) {
                setBalance(step.sharedVal);
            }

            stepIndex++;
        }, 1200);
    };

    const processStep = (step) => {
        if (step.action === 'LOCK') {
            setIsLocked(true);
            setLockedBy(step.actor === 'A' ? 'Thread 1' : 'Thread 2');
        }
        if (step.action === 'UNLOCK') {
            setIsLocked(false);
            setLockedBy(null);
        }

        const isUserA = step.actor === 'A';
        const setActorState = isUserA ? setUserAState : setUserBState;

        setActorState(prev => ({
            ...prev,
            status: step.action,
            localBalance: step.localVal !== undefined && step.localVal !== null ? step.localVal : prev.localBalance,
            isKeyHolder: step.action === 'LOCK'
        }));
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh', paddingBottom: '100px' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Critical <span className="text-gradient">Section</span></h1>
                <p style={{ opacity: 0.7 }}>Simulating concurrent threads accessing a shared variable (Critical Section).</p>
            </header>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>

                {/* Left Thread */}
                <ATMVisual
                    id="1"
                    color="var(--secondary)"
                    status={userAState.status}
                    localBalance={userAState.localBalance}
                    isActive={isAnimating && userAState.status !== 'READY' && userAState.status !== 'TERMINATED'}
                    isLockedOut={isLocked && lockedBy !== 'Thread 1'}
                />

                {/* Shared Resource (Memory) */}
                <SharedBalance balance={balance} isLocked={isLocked} lockedBy={lockedBy} />

                {/* Right Thread */}
                <ATMVisual
                    id="2"
                    color="var(--accent)"
                    status={userBState.status}
                    localBalance={userBState.localBalance}
                    isActive={isAnimating && userBState.status !== 'READY' && userBState.status !== 'TERMINATED'}
                    isLockedOut={isLocked && lockedBy !== 'Thread 2'}
                />

            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

                {/* Controls */}
                <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontFamily: 'monospace' }}>Execution Controls</h3>

                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                        <button
                            onClick={() => runSimulation('RACE')}
                            disabled={isAnimating}
                            style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                background: 'rgba(239, 71, 111, 0.15)',
                                color: '#ef476f',
                                border: '1px solid rgba(239, 71, 111, 0.3)',
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                opacity: isAnimating ? 0.5 : 1,
                                cursor: isAnimating ? 'not-allowed' : 'pointer',
                                fontFamily: 'monospace'
                            }}
                        >
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Run without Lock (Race)</div>
                                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Variable value corrupted</div>
                            </div>
                            <Play size={24} />
                        </button>

                        <button
                            onClick={() => runSimulation('MUTEX')}
                            disabled={isAnimating}
                            style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                background: 'rgba(6, 214, 160, 0.15)',
                                color: '#06d6a0',
                                border: '1px solid rgba(6, 214, 160, 0.3)',
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                opacity: isAnimating ? 0.5 : 1,
                                cursor: isAnimating ? 'not-allowed' : 'pointer',
                                fontFamily: 'monospace'
                            }}
                        >
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Run with Mutex</div>
                                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Safe execution. Correct Value.</div>
                            </div>
                            <Lock size={24} />
                        </button>
                    </div>
                </div>

                {/* Console Log */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', maxHeight: '300px', overflowY: 'auto' }}>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1rem', opacity: 0.7, fontFamily: 'monospace' }}>Kernel Log</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                        {logs.length === 0 && <div style={{ opacity: 0.3 }}>Kernel ready...</div>}
                        {logs.map((log, i) => (
                            <div key={i} style={{ paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ color: '#555', marginRight: '10px' }}>{i + 1}</span> {log}
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <ConceptExplainer
                title="Critical Section & Mutex"
                osExplanation="A Critical Section is code that accesses a shared variable. If two threads enter it at once, a Race Condition occurs (data corruption). A Mutex (Mutual Exclusion) or Lock prevents this by ensuring only one thread enters at a time."
                realWorldAnalogy="Think of a Single-Stall Restroom (Critical Section). 
        The Key (Mutex) hangs by the door. 
        Thread 1 takes the key and enters. 
        Thread 2 arrives, sees the key is gone, and MUST WAIT (Block). 
        When Thread 1 leaves and returns the key, Thread 2 can now grab it and enter."
            />

            <QuizComponent topic="synchronization" />
        </div>
    );
};

export default Synchronization;
