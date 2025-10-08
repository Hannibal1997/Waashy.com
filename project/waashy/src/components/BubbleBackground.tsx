import React, { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

interface BubbleBackgroundProps {
  bubbleCount?: number;
}

const BubbleBackground: React.FC<BubbleBackgroundProps> = ({ bubbleCount = 15 }) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles: Bubble[] = [];
      for (let i = 0; i < bubbleCount; i++) {
        newBubbles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 100 + 50,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
      setBubbles(newBubbles);
    };

    generateBubbles();

    const animateBubbles = () => {
      setBubbles(prevBubbles =>
        prevBubbles.map(bubble => ({
          ...bubble,
          y: bubble.y - bubble.speed,
          x: bubble.x + Math.sin(Date.now() * 0.001 + bubble.id) * 0.1,
        }))
      );
    };

    const interval = setInterval(animateBubbles, 50);
    return () => clearInterval(interval);
  }, [bubbleCount]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-br from-blue-200/20 to-blue-300/20 animate-pulse"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            opacity: bubble.opacity,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
};

export default BubbleBackground;