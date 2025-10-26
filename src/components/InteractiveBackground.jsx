import { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const particlesRef = useRef([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    ctx.scale(DPR, DPR);

    const particleCount = Math.min(110, Math.floor((width * height) / 12000));
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(width, height));
    }
    particlesRef.current = particles;

    function onResize() {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(DPR, DPR);
    }

    function onMouseMove(e) {
      const rect = container.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.active = true;
      container.style.setProperty('--mx', `${mouse.current.x}px`);
      container.style.setProperty('--my', `${mouse.current.y}px`);
    }

    function onMouseLeave() {
      mouse.current.active = false;
    }

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', onResize);

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, width, height);

      // Subtle vignette
      const gradient = ctx.createRadialGradient(
        width / 2,
        height * 0.4,
        Math.min(width, height) * 0.2,
        width / 2,
        height * 0.5,
        Math.max(width, height) * 0.8
      );
      gradient.addColorStop(0, 'rgba(12,12,12,0)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.35)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      const m = mouse.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse influence (attraction)
        if (m.active) {
          const dx = m.x - p.x;
          const dy = m.y - p.y;
          const dist2 = dx * dx + dy * dy;
          const minDist = 160;
          if (dist2 < minDist * minDist) {
            const force = (minDist - Math.sqrt(dist2)) / minDist;
            p.vx += (dx / Math.sqrt(dist2 + 0.0001)) * force * 0.08;
            p.vy += (dy / Math.sqrt(dist2 + 0.0001)) * force * 0.08;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Wrap edges
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Particle drawing
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16,185,129,${0.45 + Math.sin(p.t) * 0.25})`;
        ctx.fill();
        p.t += p.ts;
      }

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const d2 = dx * dx + dy * dy;
          const maxD = 160;
          if (d2 < maxD * maxD) {
            const alpha = 1 - Math.sqrt(d2) / maxD;
            ctx.strokeStyle = `rgba(16,185,129,${alpha * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Spotlight cursor aura
      if (m.active) {
        const r = 420;
        const grd = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, r);
        grd.addColorStop(0, 'rgba(16,185,129,0.12)');
        grd.addColorStop(1, 'rgba(16,185,129,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(m.x, m.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* Starfield base (parallax via subtle animation) */}
      <div className="pointer-events-none absolute inset-0 opacity-60" style={{
        backgroundImage:
          'radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.6) 50%, transparent 51%),\
           radial-gradient(1px 1px at 30% 80%, rgba(255,255,255,0.4) 50%, transparent 51%),\
           radial-gradient(1px 1px at 70% 40%, rgba(255,255,255,0.5) 50%, transparent 51%),\
           radial-gradient(1px 1px at 90% 70%, rgba(255,255,255,0.35) 50%, transparent 51%)',
        backgroundSize: 'auto',
        animation: 'star-pan 60s linear infinite',
      }} />

      {/* Aurora layers */}
      <div className="pointer-events-none absolute -top-1/3 left-0 right-0 h-[80vh] blur-3xl opacity-60 mix-blend-screen"
           style={{
             background: 'radial-gradient(60% 60% at 20% 30%, rgba(16,185,129,0.25), transparent 60%), radial-gradient(40% 40% at 80% 20%, rgba(59,130,246,0.2), transparent 60%)',
             animation: 'float-aurora 22s ease-in-out infinite',
           }} />
      <div className="pointer-events-none absolute top-1/3 left-0 right-0 h-[70vh] blur-[64px] opacity-50 mix-blend-screen"
           style={{
             background: 'radial-gradient(50% 50% at 70% 60%, rgba(34,197,94,0.18), transparent 60%), radial-gradient(45% 45% at 30% 70%, rgba(14,165,233,0.16), transparent 60%)',
             animation: 'float-aurora-2 26s ease-in-out infinite',
           }} />

      {/* Interactive particles */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px, 60px 60px',
          maskImage: 'radial-gradient(85% 60% at 50% 40%, black 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(85% 60% at 50% 40%, black 60%, transparent 100%)',
          animation: 'grid-move 24s linear infinite',
        }}
      />

      <style>{`
        @keyframes star-pan { 0% { transform: translateY(0); } 100% { transform: translateY(-200px); } }
        @keyframes float-aurora { 0%, 100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(20px) translateX(10px); } }
        @keyframes float-aurora-2 { 0%, 100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-24px) translateX(-12px); } }
        @keyframes grid-move { 0% { background-position: 0px 0px, 0px 0px; } 100% { background-position: 120px 120px, 120px 120px; } }
      `}</style>
    </div>
  );
}

function createParticle(width, height) {
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.2 + Math.random() * 0.6;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    r: Math.random() * 1.6 + 0.6,
    t: Math.random() * Math.PI * 2,
    ts: 0.02 + Math.random() * 0.02,
  };
}
