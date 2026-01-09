import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/scheduling', label: 'CPU Scheduling' },
        { path: '/synchronization', label: 'Synchronization' },
        { path: '/producer-consumer', label: 'Producer-Consumer' },
        { path: '/dining-philosophers', label: 'Dining Philosophers' },
        { path: '/about', label: 'About' },
    ];

    return (
        <nav style={{
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(10, 1, 24, 0.5)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '32px', height: '32px', background: 'linear-gradient(45deg, var(--primary), var(--accent))', borderRadius: '8px' }}></div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '-0.5px' }}>
                    OS<span className="text-gradient">Platform</span>
                </div>
            </Link>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{ position: 'relative', padding: '0.6rem 1.2rem', borderRadius: '50px', fontSize: '0.9rem', color: isActive ? '#fff' : 'var(--text-dim)', transition: 'color 0.2s' }}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-pill"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        borderRadius: '50px',
                                        zIndex: -1,
                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                    }}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            {item.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default Navbar;
