import { useRef } from 'react';
import { Code, Award } from 'lucide-react';

const projects = [
  {
    title: 'Neon Grid Dashboard',
    description:
      'A responsive analytics interface with real-time visualizations and shimmering neon accents.',
    tags: ['React', 'Tailwind', 'Vite'],
    link: '#',
  },
  {
    title: 'Holo Portfolio Engine',
    description:
      'Modular portfolio components with cinematic motion and inclusive, accessible design.',
    tags: ['Framer Motion', 'A11y', 'UI'],
    link: '#',
  },
  {
    title: 'Edge AI Playground',
    description:
      'Lightweight inference sandbox optimized for edge devices, latency, and iteration speed.',
    tags: ['TypeScript', 'AI', 'Performance'],
    link: '#',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative bg-gradient-to-b from-black to-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-start justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight">
              Selected Work
            </h2>
            <p className="mt-2 max-w-2xl text-zinc-400">
              Curated projects blending technology, motion, and systemized design.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-300">
            <Award className="h-4 w-4 text-emerald-400" />
            <span>Quality-driven</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, idx) => (
            <ProjectCard key={idx} project={p} />
          ))}
        </div>
      </div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
    </section>
  );
}

function ProjectCard({ project }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotX = (py - 0.5) * -8; // tilt up/down
    const rotY = (px - 0.5) * 8; // tilt left/right
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
    <a
      href={project.link}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-4 will-change-transform"
      style={{
        transform: 'perspective(900px) rotateX(var(--rx)) rotateY(var(--ry))',
        transition: 'transform 150ms ease, box-shadow 300ms ease',
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(200px_circle_at_var(--px,_50%)_var(--py,_50%),_rgba(16,185,129,0.15),_transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent" />
      </div>
      <div className="flex items-center justify-between">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/30">
          <Code className="h-5 w-5 text-emerald-400" />
        </div>
        <span className="text-xs text-zinc-400">Case Study</span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{project.title}</h3>
      <p className="mt-1 text-sm text-zinc-400">{project.description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-zinc-300"
          >
            {t}
          </span>
        ))}
      </div>
    </a>
  );
}
