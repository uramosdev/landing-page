'use client';

import React, { useEffect, useRef } from 'react';
import { Guitar, Coffee } from 'lucide-react';

export default function LandingPage() {
  const typewriterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // --- Typewriter effect ---
    const phrases = ['AVAILABLE FOR PROJECTS', 'OPEN TO FREELANCE', 'LET\'S BUILD TOGETHER', 'CONTACT ME TODAY'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isActive = true; // Control para limpiar el timeout

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

    const initialTimer = setTimeout(typeEffect, 1000);

    // --- Mouse movement effect for cards ---
    const handleMouseMove = (e: MouseEvent) => {
      // Usamos el selector solo cuando es necesario
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
      isActive = false; // Detiene el typewriter
      clearTimeout(initialTimer);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="text-white min-h-screen relative">
      {/* NOTA: He quitado el <Head> porque en App Router se recomienda usar 
         el objeto 'metadata' en layout.tsx o page.tsx (server side). 
      */}
      
      <style jsx global>{`
        /* Tus estilos se mantienen igual... */
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          background: #0a0a0a;
          overflow-x: hidden;
        }
        
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        
        .gradient-text {
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .glitch { position: relative; }
        .glitch::before, .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
        }
        
        .glitch::before {
          left: 2px;
          text-shadow: -1px 0 #ff00c1;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
        }
        
        .glitch::after {
          left: -2px;
          text-shadow: -1px 0 #00fff9;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim2 5s infinite linear alternate-reverse;
        }
        
        @keyframes glitch-anim {
          0% { clip: rect(12px, 9999px, 52px, 0); }
          20% { clip: rect(58px, 9999px, 12px, 0); }
          40% { clip: rect(12px, 9999px, 86px, 0); }
          60% { clip: rect(82px, 9999px, 4px, 0); }
          80% { clip: rect(34px, 9999px, 62px, 0); }
          100% { clip: rect(26px, 9999px, 99px, 0); }
        }
        
        @keyframes glitch-anim2 {
          0% { clip: rect(65px, 9999px, 99px, 0); }
          20% { clip: rect(12px, 9999px, 45px, 0); }
          40% { clip: rect(78px, 9999px, 12px, 0); }
          60% { clip: rect(34px, 9999px, 67px, 0); }
          80% { clip: rect(12px, 9999px, 89px, 0); }
          100% { clip: rect(56px, 9999px, 23px, 0); }
        }
        
        .service-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .service-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        .scanlines {
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0),
            rgba(255,255,255,0) 50%,
            rgba(0,0,0,0.1) 50%,
            rgba(0,0,0,0.1)
          );
          background-size: 100% 4px;
          pointer-events: none;
        }
        
        .cursor-blink {
          display: inline-block;
          width: 3px;
          height: 1em;
          background-color: #00ff88;
          animation: blink 1s infinite;
          margin-left: 2px;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .noise {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none;
          opacity: 0.03;
          z-index: 50;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>

      {/* Noise overlay */}
      <div className="noise"></div>
      
      {/* Scanlines */}
      <div className="scanlines fixed inset-0 z-40 opacity-20"></div>
      
      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8">
          
        {/* Hero Section */}
        <header className="relative mb-16 mt-8">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
          
          <div className="relative grid-pattern border border-white/10 rounded-3xl p-8 md:p-16 bg-black/40 backdrop-blur-xl overflow-hidden">
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
                Crafting <span className="text-white font-semibold">high-performance</span> digital experiences with modern technologies and pixel-perfect precision.
              </p>
            </div>
          </div>
        </header>

        {/* Services Grid (Acortado para brevedad) */}
        <section className="mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <div className="service-card rounded-2xl p-6 group cursor-pointer">
                <h3 className="font-display text-xl font-bold mb-2">Frontend Development</h3>
                <p className="text-gray-400 text-sm">React, Next.js y animaciones fluidas.</p>
             </div>
             {/* Agrega los demás aquí... */}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-600 text-sm pb-8 flex flex-col items-center gap-2">
          <p className="flex items-center gap-2">
            © {new Date().getFullYear()} Coded with 
            <Guitar className="w-4 h-4 text-red-500" /> 
            and 
            <Coffee className="w-4 h-4 text-amber-700" /> by uramosDev. 
          </p>
        </footer>
      </div>
    </div>
  );
}