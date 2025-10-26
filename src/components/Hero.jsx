import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMouse({ x, y });
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full overflow-hidden"
    >
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </div>

      {/* Animated Grid Overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(16,185,129,0.06), transparent 40%), radial-gradient(circle at 80% 0%, rgba(59,130,246,0.06), transparent 35%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px, 60px 60px',
          maskImage:
            'radial-gradient(90% 60% at 50% 40%, black 60%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(90% 60% at 50% 40%, black 60%, transparent 100%)',
          animation: 'grid-move 24s linear infinite',
        }}
      />

      {/* Spotlight cursor aura */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(600px 600px at ${mouse.x}px ${mouse.y}px, rgba(16,185,129,0.15), transparent 60%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-zinc-300 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Exploring the edge of possibility
        </div>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
          <span className="bg-gradient-to-br from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
            Futurist. Engineer. Creator.
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-zinc-300">
          Designing immersive, high-performance experiences that fuse advanced interfaces with precision engineering.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="#projects"
            className="group inline-flex items-center justify-center gap-2 rounded-md bg-emerald-500 px-5 py-3 text-sm font-medium text-black shadow-[0_8px_30px_rgba(16,185,129,0.45)] ring-1 ring-emerald-400 transition-transform hover:-translate-y-0.5 hover:bg-emerald-400"
          >
            View Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            Get in touch
          </a>
        </div>

        {/* Badge strip */}
        <div className="mt-10 flex items-center gap-2 text-xs text-zinc-400">
          <Star className="h-4 w-4 text-emerald-400" />
          <span>Performance-first</span>
          <span className="text-zinc-600">•</span>
          <span>Accessibility-minded</span>
          <span className="text-zinc-600">•</span>
          <span>Design systems driven</span>
        </div>
      </div>

      {/* Neon corner accents */}
      <CornerGlow position="top-left" />
      <CornerGlow position="bottom-right" />

      <style>{`
        @keyframes grid-move {
          0% { background-position: 0px 0px, 0px 0px; }
          100% { background-position: 120px 120px, 120px 120px; }
        }
      `}</style>
    </section>
  );
}

function CornerGlow({ position = 'top-left' }) {
  const pos = {
    'top-left': 'top-10 left-10',
    'bottom-right': 'bottom-10 right-10',
  }[position];
  return (
    <div className={`pointer-events-none absolute ${pos}`}>
      <div className="h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />
    </div>
  );
}
