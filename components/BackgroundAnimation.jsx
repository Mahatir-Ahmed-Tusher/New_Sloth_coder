'use client';

import { useEffect, useState } from 'react';

const BackgroundAnimation = () => {
  const [particles, setParticles] = useState([]);
  const [dots, setDots] = useState([]);

  useEffect(() => {
    // Create multiple floating particles
    const initialParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 40, // 40-100px
      speed: Math.random() * 0.5 + 0.2, // 0.2-0.7
      direction: Math.random() * 360,
      opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4
      delay: Math.random() * 5, // Random start delay
    }));
    
    // Create smaller glowing dots with fixed values to prevent hydration mismatch
    const initialDots = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 20 + 10,
      height: Math.random() * 20 + 10,
      animation: `pulse ${Math.random() * 3 + 2}s ease-in-out infinite`,
      animationDelay: `${Math.random() * 2}s`,
    }));

    setParticles(initialParticles);
    setDots(initialDots);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-yellow-400/20 to-yellow-300/20 blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `float ${10 + particle.speed * 10}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            filter: 'blur(8px)',
            boxShadow: `
              0 0 ${particle.size * 0.5}px rgba(255, 255, 0, 0.3),
              0 0 ${particle.size * 0.8}px rgba(255, 255, 0, 0.2),
              0 0 ${particle.size * 1.2}px rgba(255, 255, 0, 0.1)
            `,
          }}
        />
      ))}
      
      {/* Additional smaller glowing dots */}
      {dots.map((dot) => (
        <div
          key={`dot-${dot.id}`}
          className="absolute rounded-full bg-yellow-300/40"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.width}px`,
            height: `${dot.height}px`,
            animation: dot.animation,
            animationDelay: dot.animationDelay,
            filter: 'blur(2px)',
            boxShadow: '0 0 20px rgba(255, 255, 0, 0.6)',
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundAnimation;
