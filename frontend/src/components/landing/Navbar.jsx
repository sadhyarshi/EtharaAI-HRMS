import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Process', href: '#process' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-glass' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
            <span className="font-display font-bold text-xl">E</span>
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-ink">Ethara</span>
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-sm font-semibold text-muted hover:text-primary transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
          <button className="btn-primary px-6 py-2.5 rounded-full text-sm">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
