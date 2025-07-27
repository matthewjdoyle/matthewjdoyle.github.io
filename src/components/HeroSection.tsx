
import React, { useEffect, useRef, FC } from 'react'; // Added FC
import { YOUR_TITLE, HERO_SUBTITLE } from '../constants';

interface HeroSectionProps {
  id: string;
  showAllResearchView: () => void;
  showWebPortfolioView: () => void;
}

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

export const HeroSection: FC<HeroSectionProps> = (props) => {
  const { id, showAllResearchView, showWebPortfolioView } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const displayName = "matthew d0yle";
  const displayNameChars = displayName.split("");
  const suffixName = "PhD";
  const titleWords = YOUR_TITLE.split(" ");

  const baseNameAnimationDelay = 0.5;
  const charAnimationDuration = 0.05;
  const phdAnimationDelay = baseNameAnimationDelay + displayNameChars.length * charAnimationDuration;
  const titleAnimationDelayStart = phdAnimationDelay + 0.3; // Start title after PhD starts appearing
  const subtitleDelay = titleAnimationDelayStart + titleWords.length * 0.1 + 0.3;
  const buttonsDelay = subtitleDelay + 0.3;


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const numParticles = Math.floor(window.innerWidth / 12); // Responsive particle count

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
          twinkleSpeed: Math.random() * 0.005
        });
      }
    };
    
    let lastMouseUpdate = 0;
    const MOUSE_UPDATE_INTERVAL = 50; // ms

    const handleMouseMoveParticles = (event: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseUpdate < MOUSE_UPDATE_INTERVAL) return;
      lastMouseUpdate = now;

      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      particles.forEach(p => {
        const dist = Math.hypot(p.x - mouseX, p.y - mouseY);
        if (dist < 100) { // Interaction radius
          p.size = p.baseSize + (100 - dist) / 30;
          p.targetOpacity = Math.min(1, p.opacity + (100 - dist) / 150);
        } else {
          p.size = p.baseSize;
          // targetOpacity is already managed by twinkle
        }
      });
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Twinkle effect
        p.opacity += (p.targetOpacity - p.opacity) * p.opacitySpeed;
        if (Math.random() < p.twinkleSpeed) { // Randomly change target opacity for twinkling
            p.targetOpacity = Math.random() * 0.6 + 0.1;
        }


        // Edge wrapping
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Size lerp back to baseSize
        p.size += (p.baseSize - p.size) * 0.1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 248, 255, ${p.opacity})`; // star_white
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animateParticles);
    };

    resizeCanvas();
    animateParticles();
    
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMoveParticles);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      if (canvas) { // Check if canvas exists before removing event listener
        canvas.removeEventListener('mousemove', handleMouseMoveParticles);
      }
    };
  }, []);

  useEffect(() => {
    const heroSectionElement = document.getElementById(id); // Renamed to avoid conflict with HeroSection component
    if (!heroSectionElement || !contentRef.current) return;

    let lastParallaxUpdate = 0;
    const PARALLAX_UPDATE_INTERVAL = 30; // ms for smoother parallax

    const handleMouseMoveParallax = (event: MouseEvent) => {
        const now = Date.now();
        if (now - lastParallaxUpdate < PARALLAX_UPDATE_INTERVAL) return;
        lastParallaxUpdate = now;

        const { clientX, clientY } = event;
        const { offsetWidth, offsetHeight } = heroSectionElement;
        
        const xRotation = ((clientY - offsetHeight / 2) / offsetHeight) * 10; // Max rotation 5deg
        const yRotation = -((clientX - offsetWidth / 2) / offsetWidth) * 10; // Max rotation 5deg

        if (contentRef.current) {
            contentRef.current.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateZ(50px)`;
        }
    };
    
    heroSectionElement.addEventListener('mousemove', handleMouseMoveParallax);
    return () => {
      if (heroSectionElement) { // Check if heroSectionElement exists
        heroSectionElement.removeEventListener('mousemove', handleMouseMoveParallax);
      }
    };

  }, [id]);

  return (
    <section 
      id={id} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden" 
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>
      
      <div 
        ref={contentRef}
        className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          {displayNameChars.map((char, index) => {
            const isZero = char === '0';
            const fontClass = isZero ? 'font-lacquer tracking-widest' : 'font-poppins tracking-wide';
            return (
              <span 
                key={`name-${index}`} 
                className={`inline-block opacity-0 animate-reveal-up ${fontClass} text-secondary [text-shadow:0_0_8px_var(--color-secondary),0_0_3px_rgba(0,0,0,0.5)]`}
                style={{ animationDelay: `${baseNameAnimationDelay + index * charAnimationDuration}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
          <span
            className="inline-block opacity-0 animate-fade-in-up font-poppins text-star_white align-baseline ml-6 tracking-wide text-3xl sm:text-4xl md:text-5xl"
            style={{ animationDelay: `${phdAnimationDelay}s` }}
          >
            {suffixName}
          </span>
        </h1>
        <p className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-star_white font-poppins [text-shadow:0_0_8px_rgba(0,0,0,0.7)]">
          {titleWords.map((word, index) => (
            <span
              key={`title-${index}`}
              className="inline-block animate-fade-in-word opacity-0"
              style={{ animationDelay: `${titleAnimationDelayStart + index * 0.1}s` }}
            >
              {word}&nbsp;
            </span>
          ))}
        </p>
        <p 
            className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-star_white/90 [text-shadow:0_0_6px_rgba(0,0,0,0.6)] animate-fade-in-up opacity-0"
            style={{ animationDelay: `${subtitleDelay}s` }}
        >
          {HERO_SUBTITLE}
        </p>
        <div 
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 animate-fade-in-up opacity-0"
          style={{ animationDelay: `${buttonsDelay}s` }}
        >
          <button
            onClick={showAllResearchView}
            aria-label="Explore My Research Contributions"
            className="px-8 py-3 rounded-lg font-semibold text-md sm:text-lg bg-transparent border-2 border-primary text-star_white hover:bg-primary hover:text-star_white transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 focus:ring-offset-space_deep"
          >
            Explore My Research
          </button>
          <button
            onClick={showWebPortfolioView}
            aria-label="View My Web Development Portfolio"
            className="px-8 py-3 rounded-lg font-semibold text-md sm:text-lg bg-transparent border-2 border-secondary text-star_white hover:bg-secondary hover:text-star_white transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary-light focus:ring-offset-2 focus:ring-offset-space_deep"
          >
            View My Websites
          </button>
        </div>
      </div>
    </section>
  );
};
