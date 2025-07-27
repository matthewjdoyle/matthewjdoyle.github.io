import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  targetOpacity: number;
  opacitySpeed: number;
  twinkleSpeed: number;
  baseSize: number;
}

const useStarryBackground = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const numParticles = Math.floor(window.innerWidth / 12);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      // Ensure canvas covers the full scrollable height of the page content
      canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight, document.body.scrollHeight);
      createParticles();
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        const baseSize = Math.random() * 1.5 + 0.5;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: baseSize,
          baseSize: baseSize,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.2,
          targetOpacity: Math.random() * 0.5 + 0.2,
          opacitySpeed: 0.01 + Math.random() * 0.02,
          twinkleSpeed: Math.random() * 0.005,
        });
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        p.opacity += (p.targetOpacity - p.opacity) * p.opacitySpeed;
        if (Math.random() < p.twinkleSpeed) {
          p.targetOpacity = Math.random() * 0.6 + 0.1;
        }

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        p.size += (p.baseSize - p.size) * 0.1; // Smooth size transition

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 248, 255, ${p.opacity})`; // star_white
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animateParticles);
    };

    // Initial setup
    resizeCanvas();
    animateParticles();

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    
    // Use ResizeObserver to detect body height changes (e.g., content loading)
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            // Check if the overall document height has changed significantly
            const newHeight = Math.max(window.innerHeight, document.documentElement.scrollHeight, document.body.scrollHeight);
            if (canvas.height !== newHeight) {
                 resizeCanvas();
            }
        }
    });
    resizeObserver.observe(document.body);


    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      resizeObserver.unobserve(document.body);
    };
  }, [canvasRef]);
};

export default useStarryBackground;
