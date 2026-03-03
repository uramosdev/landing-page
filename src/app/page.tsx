'use client';

import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import { Guitar, Coffee } from 'lucide-react';

export default function LandingPage() {
  const typewriterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Typewriter effect
    const phrases = ['AVAILABLE FOR PROJECTS', 'OPEN TO FREELANCE', 'LET\'S BUILD TOGETHER', 'CONTACT ME TODAY'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const typeElement = typewriterRef.current;
    if (!typeElement) return;

    function typeEffect() {
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

    // Mouse movement effect for cards
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.service-card');
      
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;
        
        const angleX = (e.clientY - cardY) / 30;
        const angleY = (e.clientX - cardX) / -30;
        
        if (Math.abs(e.clientX - cardX) < 200 && Math.abs(e.clientY - cardY) < 200) {
          (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        } else {
          (card as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
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
      clearTimeout(timer);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Landing Page | uramosDev</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="logo.ico" />
      </Head>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          background: #0a0a0a;
          overflow-x: hidden;
        }
        
        .font-display {
          font-family: 'Space Grotesk', sans-serif;
        }
        
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
        
        .float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        .glitch {
          position: relative;
        }
        
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
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
          transform: translateY(-10px) scale(1.02);
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
        
        .btn-magnetic {
          transition: transform 0.3s ease;
        }
        
        .btn-magnetic:hover {
          transform: scale(1.05);
        }
        
        .noise {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
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

      <div className="text-white min-h-screen relative">
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
              {/* Decorative code elements */}
              <div className="absolute top-4 left-4 text-xs text-gray-600 font-mono opacity-50">
                &lt;html&gt;<br />
                &nbsp;&nbsp;&lt;body&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=&quot;awesome&quot;&gt;
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
                  Crafting <span className="text-white font-semibold">high-performance</span> digital experiences with modern technologies and pixel-perfect precision.
                </p>
                
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <a href="https://uramosdev.up.railway.app" className="px-8 py-4 border border-white/30 rounded-full hover:bg-white/10 transition-colors font-medium">
                    View Portfolio
                  </a>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4 text-xs text-gray-600 font-mono opacity-50 text-right">
                &lt;/div&gt;<br />
                &nbsp;&nbsp;&lt;/body&gt;<br />
                &lt;/html&gt;
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
              {/* Service 1 */}
              <div className="service-card rounded-2xl p-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Frontend Development</h3>
                <p className="text-gray-400 text-sm leading-relaxed">React, Vue, Next.js applications with stunning UI/UX and smooth animations.</p>
                <div className="mt-4 flex gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300">React</span>
                  <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300">TypeScript</span>
                </div>
              </div>

              {/* Service 2 */}
              <div className="service-card rounded-2xl p-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/>
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Backend Systems</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Scalable APIs, database architecture, and serverless cloud solutions.</p>
                <div className="mt-4 flex gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300">Node.js</span>
                  <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300">PostgreSQL</span>
                </div>
              </div>

              {/* Service 3 */}
              <div className="service-card rounded-2xl p-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Mobile-First Design</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Responsive layouts that work flawlessly across all devices and screen sizes.</p>
                <div className="mt-4 flex gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300">PWA</span>
                  <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300">Tailwind</span>
                </div>
              </div>

              {/* Service 4 */}
              <div className="service-card rounded-2xl p-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Performance Optimization</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Core Web Vitals optimization, lazy loading, and caching strategies.</p>
                <div className="mt-4 flex gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300">SEO</span>
                  <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300">Speed</span>
                </div>
              </div>

              {/* Service 5 */}
              <div className="service-card rounded-2xl p-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/>
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">E-Commerce</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Custom Shopify themes, WooCommerce, and headless commerce solutions.</p>
                <div className="mt-4 flex gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300">Stripe</span>
                  <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300">Shopify</span>
                </div>
              </div>

              {/* Service 6 */}
              <div className="service-card rounded-2xl p-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Maintenance & Support</h3>
                <p className="text-gray-400 text-sm leading-relaxed">24/7 monitoring, security updates, and ongoing technical support.</p>
                <div className="mt-4 flex gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300">DevOps</span>
                  <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300">Security</span>
                </div>
              </div>
            </div>
          </section>

          {/* Tech Stack Marquee */}
          <section className="mb-16 overflow-hidden py-8 border-y border-white/10">
            <div className="flex animate-marquee whitespace-nowrap">
              <span className="text-4xl font-display font-bold text-white/20 mx-8">REACT</span>
              <span className="text-4xl font-display font-bold text-white/20 mx-8">NEXT.JS</span>
              <span className="text-4xl font-display font-bold text-white/20 mx-8">TYPESCRIPT</span>
              <span className="text-4xl font-display font-bold text-white/20 mx-8">NODE.JS</span>
              <span className="text-4xl font-display font-bold text-white/20 mx-8">TAILWIND</span>
              <span className="text-4xl font-display font-bold text-white/20 mx-8">POSTGRESQL</span>
              <span className="text-4xl font-display font-bold text-white/20 mx-8">AWS</span>
              <span className="text-4xl font-display font-bold text-white/20 mx-8">DOCKER</span>
              <span className="text-4xl font-display font-bold text-white/20 mx-8">REACT</span>
              <span className="text-4xl font-display font-bold text-white/20 mx-8">NEXT.JS</span>
              <span className="text-4xl font-display font-bold text-white/20 mx-8">TYPESCRIPT</span>
              <span className="text-4xl font-display font-bold text-white/20 mx-8">NODE.JS</span>
            </div>
          </section>

          {/* Stats Section */}
          {/*<section className="justify-items-center grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 ">
            <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">50+</div>
              <div className="text-sm text-gray-400">Projects Delivered</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">99%</div>
              <div className="text-sm text-gray-400">Client Satisfaction</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 mb-2">5+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-2">24/7</div>
              <div className="text-sm text-gray-400">Support Available</div>
            </div>
          </section>*/}

          {/* Contact CTA */}
          <section className="relative rounded-3xl overflow-hidden mb-8">
            <div className="absolute inset-0 gradient-bg opacity-20"></div>
            <div className="relative grid-pattern p-8 md:p-16 text-center border border-white/20 rounded-3xl bg-black/60 backdrop-blur-xl">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Ready to build something amazing?</h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">Let&apos;s discuss your project requirements and create a tailored solution that exceeds your expectations.</p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <a href="https://uramosdev.up.railway.app" className="btn-magnetic px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2">
                  
                  Portfolio
                </a>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/in/ubaldino-ramos-" className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href="https://github.com/uramosdev/" className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center text-gray-600 text-sm pb-8 flex flex-col items-center gap-2">
  <p className="flex items-center gap-2">
    © {new Date().getFullYear()} Coded with 
    <Guitar className="w-4 h-4 inline-block text-red-500" /> 
    and 
    <Coffee className="w-4 h-4 inline-block text-amber-700" /> by uramosDev. 
  </p>
</footer>
        </div>
      </div>
    </>
  );
}