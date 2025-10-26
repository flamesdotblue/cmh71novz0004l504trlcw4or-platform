import { motion } from 'framer-motion';

const skills = [
  { name: 'React', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'UI/UX', level: 88 },
  { name: 'Performance', level: 92 },
  { name: 'Accessibility', level: 86 },
  { name: 'Animation', level: 89 },
];

export default function About() {
  return (
    <section id="about" className="relative border-t border-white/10 bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight">Beyond the Interface</h2>
            <p className="mt-3 text-zinc-300 max-w-xl">
              I specialize in building immersive product experiences—fast, accessible, and visually striking. I lean on design systems, disciplined engineering, and motion as a tool for clarity.
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {skills.map((s) => (
                <div key={s.name} className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">{s.name}</p>
                    <span className="text-xs text-zinc-400">{s.level}%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                    <motion.div
                      className="h-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10">
              <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-6">
              <h3 className="text-lg font-semibold text-white">Approach</h3>
              <p className="mt-2 text-sm text-zinc-300">
                • Start with clarity: define the user journey and performance budgets.
              </p>
              <p className="mt-1 text-sm text-zinc-300">
                • Build scalable components driven by a consistent design system.
              </p>
              <p className="mt-1 text-sm text-zinc-300">
                • Add motion and micro-interactions to reveal structure and affordances.
              </p>
              <p className="mt-1 text-sm text-zinc-300">
                • Test accessibility early; optimize rendering paths for speed.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Design Systems', 'A11y', 'Framer Motion', 'Vite', 'Tailwind', 'Radix'].map((tag) => (
                  <span key={tag} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-zinc-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
