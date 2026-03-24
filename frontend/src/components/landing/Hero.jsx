import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-6">
            <Sparkles size={16} />
            <span>Next Generation HR Experience</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-display font-bold leading-tight text-ink mb-6">
            Manage your team with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Ethara.</span>
          </h1>
          
          <p className="text-xl text-muted leading-relaxed mb-10 max-w-xl">
            The intelligent platform for modern teams. Streamline attendance, empower employees, and scale your business with ease.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="btn btn-primary px-8 py-4 rounded-full text-lg shadow-float">
              Start Free Trial
            </button>
            <button className="btn bg-white border border-slate-200 text-ink px-8 py-4 rounded-full text-lg hover:bg-slate-50">
              Watch Demo
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-4 text-sm text-muted">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
              ))}
            </div>
            <p><span className="font-bold text-ink">500+</span> teams joined Ethara last month</p>
          </div>
        </div>
        
        <div className="relative animate-fade-in delay-200">
          <div className="relative z-10 glass-card p-4 rounded-3xl overflow-hidden shadow-2xl animate-float">
            <div className="aspect-[4/3] bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl flex items-center justify-center">
              <div className="w-3/4 h-3/4 glass-card rounded-2xl p-6 shadow-lg flex flex-col gap-4">
                <div className="h-8 w-1/2 bg-indigo-100 rounded-lg" />
                <div className="h-4 w-full bg-slate-100 rounded-lg" />
                <div className="h-4 w-3/4 bg-slate-100 rounded-lg" />
                <div className="mt-auto flex justify-between items-center">
                   <div className="h-10 w-10 rounded-full bg-indigo-500" />
                   <div className="h-4 w-20 bg-emerald-100 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-600/10 rounded-2xl -z-10 rotate-12" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full -z-10" />
        </div>
      </div>
    </section>
  );
}
