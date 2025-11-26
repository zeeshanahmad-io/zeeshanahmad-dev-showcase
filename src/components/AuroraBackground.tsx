import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const AuroraBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let animationFrameId: number;
        let time = 0;

        const isDark = theme === 'dark';

        // Configuration
        const waveCount = 3;
        const colors = isDark
            ? ['rgba(124, 58, 237, 0.2)', 'rgba(59, 130, 246, 0.2)', 'rgba(236, 72, 153, 0.2)'] // Dark: Violet, Blue, Pink
            : ['rgba(124, 58, 237, 0.1)', 'rgba(59, 130, 246, 0.1)', 'rgba(14, 165, 233, 0.1)']; // Light: Violet, Blue, Sky

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            time += 0.005;

            colors.forEach((color, i) => {
                ctx.beginPath();
                ctx.fillStyle = color;

                // Create wave points
                const points = [];
                const segmentWidth = width / 10;

                for (let x = 0; x <= width + segmentWidth; x += segmentWidth) {
                    // Complex wave function combining multiple sines
                    const y = height / 2 +
                        Math.sin(x * 0.002 + time + i) * 100 +
                        Math.sin(x * 0.005 + time * 2 + i) * 50 +
                        Math.cos(x * 0.003 - time + i) * 50;

                    points.push({ x, y });
                }

                // Draw smooth curve through points
                ctx.moveTo(0, height);
                ctx.lineTo(0, points[0].y);

                for (let j = 0; j < points.length - 1; j++) {
                    const xc = (points[j].x + points[j + 1].x) / 2;
                    const yc = (points[j].y + points[j + 1].y) / 2;
                    ctx.quadraticCurveTo(points[j].x, points[j].y, xc, yc);
                }

                ctx.lineTo(width, points[points.length - 1].y);
                ctx.lineTo(width, height);
                ctx.closePath();
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none filter blur-3xl opacity-60"
        />
    );
};

export default AuroraBackground;
