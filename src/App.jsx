import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Scheduling from './pages/Scheduling';
import Synchronization from './pages/Synchronization';
import ProducerConsumer from './pages/ProducerConsumer';
import DiningPhilosophers from './pages/DiningPhilosophers';
import About from './pages/About';
import { AnimatePresence } from 'framer-motion';

import FeedbackModal from './components/common/FeedbackModal';
import { useState } from 'react';

const AppContent = () => {
  const location = useLocation();
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/scheduling" element={<Scheduling />} />
          <Route path="/synchronization" element={<Synchronization />} />
          <Route path="/producer-consumer" element={<ProducerConsumer />} />
          <Route path="/dining-philosophers" element={<DiningPhilosophers />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </AnimatePresence>

      {/* GLOBAL FEATURES */}

      <FeedbackModal isOpen={showFeedback} onClose={() => setShowFeedback(false)} />

      {/* Temporary Floating Review Button (Top Right) for Demo */}
      <button
        onClick={() => setShowFeedback(true)}
        style={{
          position: 'fixed', top: '100px', right: '20px',
          background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
          color: 'var(--text-dim)', padding: '0.5rem 1rem', borderRadius: '20px',
          cursor: 'pointer', zIndex: 900, fontSize: '0.8rem', backdropFilter: 'blur(4px)'
        }}
      >
        📝 Feedback
      </button>
    </>
  );
};

function App() {
  return (
    <AppContent />
  );
}

export default App;
