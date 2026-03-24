import React from 'react';
import { Users, Zap, BarChart3, Shield } from 'lucide-react';

const features = [
  {
    title: 'Team Directory',
    description: 'Centralize all employee information in one sleek, searchable interface.',
    icon: <Users size={24} className="text-indigo-600" />,
    delay: '0',
  },
  {
    title: 'Instant Insights',
    description: 'Real-time dashboard with metrics that matter for your workforce.',
    icon: <BarChart3 size={24} className="text-blue-600" />,
    delay: '100',
  },
  {
    title: 'Smart Attendance',
    description: 'Automated tracking with geographic and time-sensitive validations.',
    icon: <Zap size={24} className="text-indigo-500" />,
    delay: '200',
  },
  {
    title: 'Secure by Design',
    description: 'Enterprise-grade security protocols to protect your sensitive data.',
    icon: <Shield size={24} className="text-blue-500" />,
    delay: '300',
  },
];

export default function Sections() {
  return (
    <>
      <section id="features" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ink mb-6">
              Features that empower your team
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Everything you need to manage your modern workforce in one integrated platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className={`glass-card p-8 rounded-3xl animate-slide-up`}
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 shadow-inner">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-ink mb-4">{feature.title}</h3>
                <p className="text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 md:order-1">
             <div className="aspect-square rounded-3xl bg-indigo-600/5 border border-indigo-100 p-8 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                   <div className="w-20 h-20 rounded-full bg-indigo-500 mb-6 flex items-center justify-center text-white font-display font-bold text-3xl shadow-xl">E</div>
                   <h4 className="text-2xl font-display font-bold text-ink mb-2">Our Mission</h4>
                   <p className="text-muted">Simplifying HR for companies that value their people.</p>
                </div>
             </div>
             {/* Abstract shapes */}
             <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl" />
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-400/10 rounded-full blur-2xl" />
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ink mb-8 leading-tight">
              Built for the <br /> modern era of work.
            </h2>
            <p className="text-lg text-muted mb-8 leading-relaxed">
              Ethara was founded on the principle that HR software shouldn't be a chore to use. We've combined consumer-grade design with enterprise-grade power to create an experience your employees will actually love.
            </p>
            <ul className="space-y-4 mb-10">
              {['Intuitive and easy to use', 'Fast and responsive performance', 'Cloud-native architecture'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="font-semibold text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
            <button className="btn btn-primary px-8 py-4 rounded-full font-bold">
              Learn More About Us
            </button>
          </div>
        </div>
      </section>

      <footer id="contact" className="py-20 bg-ink text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">Ready to transform your workspace?</h2>
           <p className="text-slate-400 mb-12 max-w-xl mx-auto">Join thousands of teams who trust Ethara for their HR needs.</p>
           <button className="btn bg-white text-ink hover:bg-slate-100 px-10 py-5 rounded-full text-xl font-bold shadow-xl shadow-white/5 transition-transform active:scale-95">
              Get Started for Free
           </button>
           
           <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-ink">
                    <span className="font-display font-bold">E</span>
                 </div>
                 <span className="font-display font-bold text-2xl tracking-tight">Ethara</span>
              </div>
              <p className="text-slate-500 text-sm">© 2024 Ethara Inc. All rights reserved.</p>
              <div className="flex gap-6">
                 {['Twitter', 'LinkedIn', 'Github'].map(social => (
                    <a key={social} href="#" className="text-slate-400 hover:text-white transition-colors">{social}</a>
                 ))}
              </div>
           </div>
        </div>
      </footer>
    </>
  );
}
