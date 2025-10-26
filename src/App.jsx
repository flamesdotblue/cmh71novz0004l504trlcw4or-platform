import Header from './components/Header';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-black text-white antialiased selection:bg-emerald-500/30">
      <Header />
      <main>
        <Hero />
        <Showcase />
        <Contact />
      </main>
    </div>
  );
}

export default App;
