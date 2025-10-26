import { Code, Award } from 'lucide-react';

const projects = [
  {
    title: 'Neon Grid Dashboard',
    description: 'A responsive analytics interface with real-time data and shimmering neon accents.',
    tags: ['React', 'Tailwind', 'Vite'],
    link: '#',
  },
  {
    title: 'Holo Portfolio Engine',
    description: 'Modular portfolio components with cinematic motion and accessibility baked in.',
    tags: ['Framer Motion', 'Accessibility', 'Design'],
    link: '#',
  },
  {
    title: 'Edge AI Playground',
    description: 'Lightweight inference playground optimized for edge devices and fast iteration.',
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight">Selected Work</h2>
            <p className="mt-2 max-w-2xl text-zinc-400">Curated projects that blend technology, design, and thoughtful execution.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-300">
            <Award className="h-4 w-4 text-emerald-400" />
            <span>Quality-driven</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, idx) => (
            <a
              key={idx}
              href={p.link}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-4 transition-transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent" />
              </div>
              <div className="flex items-center justify-between">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/30">
                  <Code className="h-5 w-5 text-emerald-400" />
                </div>
                <span className="text-xs text-zinc-400">Case Study</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-1 text-sm text-zinc-400">{p.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-zinc-300">{t}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
