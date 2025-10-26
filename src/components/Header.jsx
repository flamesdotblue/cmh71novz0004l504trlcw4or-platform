import { useState, useEffect } from 'react';
import { Rocket } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkBase = 'text-sm md:text-[15px] text-zinc-200 hover:text-white transition-colors';

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${
      scrolled ? 'backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#home" className="inline-flex items-center gap-2 group">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500/10 ring-1 ring-emerald-500/30">
            <Rocket className="h-4 w-4 text-emerald-400" />
          </span>
          <span className="font-semibold tracking-tight text-white group-hover:text-emerald-300 transition-colors">Futura</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          <a className={linkBase} href="#home">Home</a>
          <a className={linkBase} href="#projects">Projects</a>
          <a className={linkBase} href="#contact">Contact</a>
        </nav>
        <div className="md:hidden" />
      </div>
    </header>
  );
}
