'use client';

import React, { useEffect, useRef } from 'react';
import { Guitar, Coffee, Monitor, Server, Smartphone, Zap, ShoppingCart, Shield } from 'lucide-react';

export default function LandingPage() {
  const typewriterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // --- Typewriter effect ---
    const phrases = ['AVAILABLE FOR PROJECTS', 'OPEN TO FREELANCE', 'LET\'S BUILD TOGETHER', 'CONTACT ME TODAY'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isActive = true;

    function typeEffect() {
      if (!isActive) return;
      const typeElement = typewriterRef.current;
      if (!typeElement) return;

      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typeElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typeElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
      }

      setTimeout(typeEffect, typeSpeed);
    }

    const timer = setTimeout(typeEffect, 1000);

    // --- Mouse movement effect for cards ---
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.service-card');
      cards.forEach((card) => {
        const el = card as HTMLElement;
        const rect = el.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;
        const angleX = (e.clientY - cardY) / 30;
        const angleY = (e.clientX - cardX) / -30;
        
        if (Math.abs(e.clientX - cardX) < 200 && Math.abs(e.clientY - cardY) < 200) {
          el.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        } else {
          el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        }
      });
    };

    const handleMouseLeave = () => {
      document.querySelectorAll('.service-card').forEach((card) => {
        (card as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      isActive = false;
      clearTimeout(timer);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="text-white min-h-screen relative bg-[#0a0a0a]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        body { font-family: 'Inter', sans-serif; background: #0a0a0a; overflow-x: hidden; }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .gradient-text {
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .glitch { position: relative; }
        .glitch::before, .glitch::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .glitch::before { left: 2px; text-shadow: -1px 0 #ff00c1; clip: rect(44px, 450px, 56px, 0); animation: glitch-anim 5s infinite linear alternate-reverse; }
        .glitch::after { left: -2px; text-shadow: -1px 0 #00fff9; clip: rect(44px, 450px, 56px, 0); animation: glitch-anim2 5s infinite linear alternate-reverse; }
        @keyframes glitch-anim { 0% { clip: rect(12px, 9999px, 52px, 0); } 100% { clip: rect(26px, 9999px, 99px, 0); } }
        @keyframes glitch-anim2 { 0% { clip: rect(65px, 9999px, 99px, 0); } 100% { clip: rect(56px, 9999px, 23px, 0); } }
        .service-card { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); }
        .grid-pattern { background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 50px 50px; }
        .scanlines { background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1)); background-size: 100% 4px; pointer-events: none; }
        .cursor-blink { display: inline-block; width: 3px; height: 1em; background-color: #00ff88; animation: blink 1s infinite; margin-left: 2px; }
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        .noise { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.03; z-index: 50; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 20s linear infinite; }
      `}</style>

      <div className="noise"></div>
      <div className="scanlines fixed inset-0 z-40 opacity-20"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8">
        {/* Hero Section */}
        <header className="relative mb-16 mt-8">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-600 rounded-full filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
          
          <div className="relative grid-pattern border border-white/10 rounded-3xl p-8 md:p-16 bg-black/40 backdrop-blur-xl overflow-hidden">
            <div className="absolute top-4 left-4 text-xs text-gray-600 font-mono opacity-50">
              &lt;html&gt;<br />&nbsp;&nbsp;&lt;body&gt;<br />&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=&quot;awesome&quot;&gt;
            </div>
            
            <div className="text-center relative z-10">
              <div className="inline-block mb-6 px-4 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-mono tracking-wider">
                <span ref={typewriterRef}>AVAILABLE FOR PROJECTS</span>
                <span className="cursor-blink">_</span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                <span className="block glitch" data-text="WEB">WEB</span>
                <span className="block gradient-text">DEVELOPER</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                Crafting <span className="text-white font-semibold">high-performance</span> digital experiences with modern technologies.
              </p>
              <div className="mt-10">
                <a href="https://uramosdev.up.railway.app" className="px-8 py-4 border border-white/30 rounded-full hover:bg-white/10 transition-colors font-medium">
                  View Portfolio
                </a>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 text-xs text-gray-600 font-mono opacity-50 text-right">
              &lt;/div&gt;<br />&nbsp;&nbsp;&lt;/body&gt;<br />&lt;/html&gt;
            </div>
          </div>
        </header>

        {/* Services Grid */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Services</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent ml-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard icon={<Monitor className="text-blue-400"/>} title="Frontend Development" desc="React, Vue, Next.js applications with stunning UI/UX." tags={["React", "TypeScript"]}/>
            <ServiceCard icon={<Server className="text-purple-400"/>} title="Backend Systems" desc="Scalable APIs and database architecture." tags={["Node.js", "PostgreSQL"]}/>
            <ServiceCard icon={<Smartphone className="text-green-400"/>} title="Mobile-First Design" desc="Responsive layouts for all devices." tags={["PWA", "Tailwind"]}/>
            <ServiceCard icon={<Zap className="text-orange-400"/>} title="Performance" desc="Core Web Vitals and caching strategies." tags={["SEO", "Speed"]}/>
            <ServiceCard icon={<ShoppingCart className="text-pink-400"/>} title="E-Commerce" desc="Custom Shopify and headless solutions." tags={["Stripe", "Shopify"]}/>
            <ServiceCard icon={<Shield className="text-cyan-400"/>} title="Maintenance" desc="Security updates and technical support." tags={["DevOps", "Security"]}/>
          </div>
        </section>

        {/* Tech Stack Marquee */}
        <section className="mb-16 overflow-hidden py-8 border-y border-white/10">
          <div className="flex animate-marquee whitespace-nowrap">
            {["REACT", "NEXT.JS", "TYPESCRIPT", "NODE.JS", "TAILWIND", "AWS", "DOCKER"].map((tech, i) => (
              <span key={i} className="text-4xl font-display font-bold text-white/20 mx-8">{tech}</span>
            ))}
            {/* Repetir para el efecto infinito */}
            {["REACT", "NEXT.JS", "TYPESCRIPT", "NODE.JS", "TAILWIND", "AWS", "DOCKER"].map((tech, i) => (
              <span key={`dup-${i}`} className="text-4xl font-display font-bold text-white/20 mx-8">{tech}</span>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="relative rounded-3xl overflow-hidden mb-8">
          <div className="relative grid-pattern p-8 md:p-16 text-center border border-white/20 rounded-3xl bg-black/60 backdrop-blur-xl">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Ready to build something amazing?</h2>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
              <a href="https://uramosdev.up.railway.app" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">Portfolio</a>
              <div className="flex gap-4">
                <SocialIcon href="https://github.com/uramosdev/" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-600 text-sm pb-8 flex flex-col items-center gap-2">
          <p className="flex items-center gap-2">
            © {new Date().getFullYear()} Coded with <Guitar className="w-4 h-4 text-red-500" /> and <Coffee className="w-4 h-4 text-amber-700" /> by uramosDev. 
          </p>
        </footer>
      </div>
    </div>
  );
}

// Sub-componentes para mantener limpio el código
function ServiceCard({ icon, title, desc, tags }: { icon: React.ReactNode, title: string, desc: string, tags: string[] }) {
  return (
    <div className="service-card rounded-2xl p-6 group cursor-pointer">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-display text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      <div className="mt-4 flex gap-2">
        {tags.map(t => <span key={t} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300">{t}</span>)}
      </div>
    </div>
  );
}

function SocialIcon({ href, d }: { href: string, d: string }) {
  return (
    <a href={href} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={d}/></svg>
    </a>
  );
}