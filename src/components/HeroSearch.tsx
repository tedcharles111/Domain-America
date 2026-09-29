import React, { useState } from 'react';
import { Currency } from '../types';
import { Search, Loader2, X, Sparkles, CheckCircle2 } from 'lucide-react';
import heroImg from '../assets/images/hero_domain_tech_1790703184457.jpg';

interface HeroSearchProps {
  currency: Currency;
  onSearch: (query: string, preferredTld?: string) => void;
  isSearching: boolean;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  currency,
  onSearch,
  isSearching
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  const handleChipClick = (domain: string) => {
    setQuery(domain);
    onSearch(domain);
  };

  const chips = [
    { name: 'ExperienceTech.com', ngn: '₦114,000', usd: '$76.00', hot: true },
    { name: 'TechExperience.com', ngn: '₦114,000', usd: '$76.00' },
    { name: 'TechDiscovery.com', ngn: '₦114,000', usd: '$76.00' },
    { name: 'ExperienceHub.com', ngn: '₦114,000', usd: '$76.00' },
    { name: 'HumanTech.com', ngn: '₦114,000', usd: '$76.00' },
    { name: 'ExperiTechAI.com', ngn: '₦114,000', usd: '$76.00' }
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-950 border border-slate-800">
          
          {/* Background Tech Image & Ambient Gradients */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroImg}
              alt="High speed global server datacenter"
              className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 transform motion-safe:transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/30 via-transparent to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 py-16 sm:py-24 px-6 sm:px-12 text-center max-w-4xl mx-auto flex flex-col items-center">
            
            {/* Promo Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-300 text-xs font-semibold mb-6 tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Real-Time DNS Verification & Automated Expiry Alerts</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight text-balance leading-tight">
              Your Perfect Domain is Now Just{' '}
              <span className="text-white underline decoration-red-500 decoration-4 underline-offset-8">
                $160
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-sm sm:text-base text-slate-300 max-w-2xl text-balance leading-relaxed">
              <span className="font-bold text-white">.com</span> domains{' '}
              <span className="text-amber-400 font-semibold">
                NOW ONLY {currency === 'NGN' ? '₦114,000' : '$76.00'}
              </span>{' '}
              for registration! Let your business be found, trusted, and clicked.
            </p>

            {/* Search Input Box Container */}
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-3xl mt-9 relative shadow-2xl"
            >
              <div className="flex flex-col sm:flex-row items-stretch bg-white rounded-2xl sm:rounded-full p-2 border-2 border-white/20 focus-within:border-red-500 transition-all shadow-xl">
                
                {/* Prefix & Input */}
                <div className="flex items-center flex-1 px-4 py-2 sm:py-0">
                  <span className="text-slate-400 font-mono text-sm sm:text-base select-none mr-1 font-medium">
                    www.
                  </span>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="ExperienceTech.com"
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-base sm:text-lg font-medium focus:outline-none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                      title="Clear"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Submit Coral Button */}
                <button
                  type="submit"
                  disabled={isSearching}
                  className="mt-2 sm:mt-0 px-8 py-4 sm:py-3.5 bg-[#df3333] hover:bg-[#c92424] active:scale-[0.99] text-white text-sm sm:text-base font-bold rounded-xl sm:rounded-full transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-red-600/30 whitespace-nowrap cursor-pointer disabled:opacity-75"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>CHECKING DNS...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 stroke-[2.5]" />
                      <span>CHECK AVAILABILITY</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick TLD Price Chips */}
            <div className="mt-8 flex items-center justify-center flex-wrap gap-2 sm:gap-3 text-xs">
              <span className="text-slate-400 text-xs hidden sm:inline mr-1">Trending:</span>
              {chips.map((chip) => (
                <button
                  key={chip.name}
                  type="button"
                  onClick={() => handleChipClick(chip.name)}
                  className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                    chip.hot
                      ? 'bg-emerald-950/70 border-emerald-500/50 text-white font-semibold shadow-xs hover:border-emerald-400'
                      : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-500'
                  }`}
                >
                  <span className="font-bold text-white">{chip.name}</span>
                  <span className="text-emerald-400 font-semibold tabular-nums">
                    {currency === 'NGN' ? chip.ngn : chip.usd}
                  </span>
                </button>
              ))}
            </div>

            {/* Trust Micro-Metrics */}
            <div className="mt-10 pt-6 border-t border-slate-800/80 w-full flex items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 flex-wrap">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Instant Registry Activation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Free DNS Management & Forwarding</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Automated Expiry Alert Engine</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
