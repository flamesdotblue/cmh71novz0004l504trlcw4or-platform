import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import InteractiveBackground from './InteractiveBackground';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* Interactive background */}
      <InteractiveBackground />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-zinc-300 backdrop-blur"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for select collaborations
        </motion.div>

        <motion.h1
          className="mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
        >
          <span className="bg-gradient-to-br from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
            Futurist. Engineer. Creator.
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-4 max-w-2xl text-zinc-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          I craft immersive, high-performance interfaces that blend cutting-edge interactions with precise engineering.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <Magnetic>
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-emerald-500 px-5 py-3 text-sm font-medium text-black shadow-[0_8px_30px_rgba(16,185,129,0.45)] ring-1 ring-emerald-400 transition-transform hover:-translate-y-0.5 hover:bg-emerald-400"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              Get in touch
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          className="mt-10 flex items-center gap-2 text-xs text-zinc-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          <Star className="h-4 w-4 text-emerald-400" />
          <span>Performance-first</span>
          <span className="text-zinc-600">•</span>
          <span>Accessibility-minded</span>
          <span className="text-zinc-600">•</span>
          <span>Design systems driven</span>
        </motion.div>
      </div>

      {/* Ambient corner glows */}
      <CornerGlow position="top-left" />
      <CornerGlow position="bottom-right" />
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

function Magnetic({ children, strength = 28 }) {
  const ref = useRef(null);
  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${(relX / rect.width) * strength}px, ${(relY / rect.height) * strength}px)`;
  };
  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
  };
  return (
    <span className="inline-block will-change-transform" ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      {children}
    </span>
  );
}
