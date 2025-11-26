import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface Star {
    x: number;
    y: number;
    z: number;
    size: number;
    opacity: number;
}

const StarField = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let stars: Star[] = [];
        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let mouseX = 0;
        let mouseY = 0;
        let targetMouseX = 0;
        let targetMouseY = 0;

        const isDark = theme === 'dark';
        const starColor = isDark ? '255, 255, 255' : '15, 23, 42'; // White or Dark Slate

        const initStars = () => {
            stars = [];
            const numStars = Math.floor((width * height) / 4000); // Density based on screen size

            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * width - width / 2,
                    y: Math.random() * height - height / 2,
                    z: Math.random() * width, // Depth
                    size: Math.random() * 1.5,
                    opacity: Math.random()
                });
            }
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse position from -1 to 1
            targetMouseX = (e.clientX - width / 2) * 0.0005;
            targetMouseY = (e.clientY - height / 2) * 0.0005;
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Smooth mouse movement
            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;

            stars.forEach(star => {
                // Move stars based on depth and mouse position
                star.z -= 2; // Forward movement speed

                // Wrap around when star passes camera
                if (star.z <= 0) {
                    star.z = width;
                    star.x = Math.random() * width - width / 2;
                    star.y = Math.random() * height - height / 2;
                }

                // Project 3D coordinates to 2D screen
                const k = 128.0 / star.z;
                const px = star.x * k + width / 2;
                const py = star.y * k + height / 2;

                // Apply mouse parallax
                const parallaxX = (mouseX * width) * (width / star.z);
                const parallaxY = (mouseY * height) * (width / star.z);

                if (px + parallaxX >= 0 && px + parallaxX <= width && py + parallaxY >= 0 && py + parallaxY <= height) {
                    const size = (1 - star.z / width) * star.size * 2;
                    const opacity = (1 - star.z / width) * star.opacity;

                    ctx.beginPath();
                    ctx.fillStyle = `rgba(${starColor}, ${opacity})`;
                    ctx.arc(px + parallaxX, py + parallaxY, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        handleResize();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
        />
    );
};

export default StarField;
