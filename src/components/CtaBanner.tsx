import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CtaBannerProps {
  onGetStarted: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onGetStarted }) => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl bg-slate-950 border border-slate-800 p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl">
          
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-balance">
              Join Thousands of Happy Customers :)
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 text-balance leading-relaxed">
              Join us today and see why we're rated as Nigeria's best hosting provider & trusted domain registrar.
            </p>

            <button
              onClick={onGetStarted}
              className="mt-8 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-amber-400/20 flex items-center gap-2 cursor-pointer"
            >
              <span>GET STARTED</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
