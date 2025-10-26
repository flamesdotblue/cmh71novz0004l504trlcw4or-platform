import { Mail, Github, Linkedin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="relative border-top border-white/10 bg-black py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-8 md:p-12">
          <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white text-center">
            Let’s build the future
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-300">
            Have a project in mind or just want to say hi? Reach out and let’s craft something remarkable.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:you@example.com"
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-medium text-black hover:bg-zinc-100"
            >
              <Mail className="h-4 w-4" />
              you@example.com
            </a>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
          <p className="mt-10 text-center text-xs text-zinc-500">© {new Date().getFullYear()} Futura — Crafted with precision and care.</p>
        </div>
      </div>
    </section>
  );
}
