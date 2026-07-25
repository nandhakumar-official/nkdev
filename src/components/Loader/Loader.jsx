// Loader.jsx
import { useEffect, useRef } from "react";
import "./Loader.css";

const CONFIG = {
  PARTICLE_COUNT: 100,
  CONNECTION_DISTANCE: 100,
  MAX_OPACITY: 0.2,
  BASE_SPEED: 0.5,
  COLORS: { minHue: 180, maxHue: 240 },
};

function Loader() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    let lastTime = 0;
    let isActive = true;
    const particles = [];

    const dpr = window.devicePixelRatio || 1;

    const setCanvasSize = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const createParticle = () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * CONFIG.BASE_SPEED,
      speedY: (Math.random() - 0.5) * CONFIG.BASE_SPEED,
      hue:
        Math.random() * (CONFIG.COLORS.maxHue - CONFIG.COLORS.minHue) +
        CONFIG.COLORS.minHue,
    });

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
        particles.push(createParticle());
      }
    };

    const drawParticle = (p) => {
      ctx.fillStyle = `hsl(${p.hue}, 100%, 65%)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    };

    const connectParticles = () => {
      const maxDistSq = CONFIG.CONNECTION_DISTANCE ** 2;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const opacity =
              CONFIG.MAX_OPACITY - dist / (CONFIG.CONNECTION_DISTANCE * 5);

            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 212, 255, ${Math.max(0, opacity)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const updateParticle = (p, deltaTime) => {
      const dt = deltaTime / 16.67;
      p.x += p.speedX * dt;
      p.y += p.speedY * dt;

      const w = window.innerWidth;
      const h = window.innerHeight;
      if (p.x > w) p.x = 0;
      else if (p.x < 0) p.x = w;
      if (p.y > h) p.y = 0;
      else if (p.y < 0) p.y = h;
    };

    const animate = (timestamp) => {
      if (!isActive) return;

      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((p) => {
        updateParticle(p, deltaTime);
        drawParticle(p);
      });

      connectParticles();
      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      setCanvasSize();
      init();
    };

    setCanvasSize();
    init();
    animationId = requestAnimationFrame(animate);

    window.addEventListener("resize", handleResize);

    return () => {
      isActive = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="particle-loader-container" role="status" aria-live="polite">
      <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
      <div className="particle-content">
        <div className="loader-ring" aria-hidden="true">
          <div />
          <div />
          <div />
          <div />
        </div>
        <h2>Compiling Experience</h2>
        <p>npm run build:portfolio</p>
        <p className="loader-sub">›_ Ready in a moment...</p>
      </div>
    </div>
  );
}

export default Loader;
