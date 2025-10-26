import { useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkBase =
    'relative text-sm md:text-[15px] text-zinc-200 hover:text-white transition-colors group';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10 shadow-[0_0_40px_-10px_rgba(16,185,129,0.35)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#home" className="inline-flex items-center gap-2 group">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500/10 ring-1 ring-emerald-500/30">
            <Rocket className="h-4 w-4 text-emerald-400" />
          </span>
          <span className="font-semibold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
            Futura
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: '#home', label: 'Home' },
            { href: '#work', label: 'Work' },
            { href: '#contact', label: 'Contact' },
          ].map((item) => (
            <a key={item.href} className={linkBase} href={item.href}>
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400 to-emerald-400/0 transition-all duration-500 group-hover:w-full" />
              <span className="relative">{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <a
            href="#contact"
            className="rounded-md border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200 hover:bg-emerald-400/20 hover:text-white transition-colors"
          >
            Let’s Talk
          </a>
        </div>
        <div className="md:hidden" />
      </div>
    </header>
  );
}
