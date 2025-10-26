import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, Palette, Zap } from 'lucide-react';

const projects = [
  {
    title: 'Neon Grid Dashboard',
    description:
      'Real-time analytics interface with cinematic glow and buttery-smooth performance.',
    tags: ['React', 'Tailwind', 'Vite'],
    icon: Code,
    link: '#',
  },
  {
    title: 'Edge AI Playground',
    description:
      'Latency-optimized inference experiments designed for edge devices and fast iteration.',
    tags: ['TypeScript', 'AI', 'Performance'],
    icon: Cpu,
    link: '#',
  },
  {
    title: 'Holo UI Kit',
    description:
      'Holographic component kit with motion presets and accessibility baked in.',
    tags: ['Framer Motion', 'A11y', 'Design'],
    icon: Palette,
    link: '#',
  },
  {
    title: 'Lightning CLI',
    description:
      'Zero-config tooling with DX-first ergonomics and delightful feedback loops.',
    tags: ['Node', 'DX', 'Open Source'],
    icon: Zap,
    link: '#',
  },
];

export default function Showcase() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Web', 'AI', 'Design'];

  const filtered = projects.filter((p) => {
    if (filter === 'All') return true;
    if (filter === 'AI') return p.tags.includes('AI');
    if (filter === 'Design') return p.tags.includes('Design') || p.tags.includes('A11y');
    if (filter === 'Web') return p.tags.includes('React') || p.tags.includes('Node') || p.tags.includes('TypeScript');
    return true;
  });

  return (
    <section id="work" className="relative bg-gradient-to-b from-black to-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight">Interactive Work</h2>
            <p className="mt-2 max-w-2xl text-zinc-400">A selection of projects emphasizing speed, clarity, and tactile interactions.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-3 py-1 text-xs border transition-colors ${
                  filter === f
                    ? 'bg-emerald-500 text-black border-emerald-400'
                    : 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          {filtered.map((p, idx) => (
            <Card key={idx} project={p} />
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
    </section>
  );
}

function Card({ project }) {
  const ref = useRef(null);
  const Icon = project.icon;

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotX = (py - 0.5) * -10;
    const rotY = (px - 0.5) * 10;
    el.style.setProperty('--rx', `${rotX}deg`);
    el.style.setProperty('--ry', `${rotY}deg`);
    el.style.setProperty('--px', `${px * 100}%`);
    el.style.setProperty('--py', `${py * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <motion.a
      href={project.link}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-4 will-change-transform"
      style={{ transform: 'perspective(900px) rotateX(var(--rx)) rotateY(var(--ry))', transition: 'transform 150ms ease' }}
      variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(220px_circle_at_var(--px,_50%)_var(--py,_50%),_rgba(16,185,129,0.15),_transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent" />
      </div>
      <div className="flex items-center justify-between">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/30">
          <Icon className="h-5 w-5 text-emerald-400" />
        </div>
        <span className="text-xs text-zinc-400">Case Study</span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{project.title}</h3>
      <p className="mt-1 text-sm text-zinc-400">{project.description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {project.tags.map((t) => (
          <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-zinc-300">
            {t}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
