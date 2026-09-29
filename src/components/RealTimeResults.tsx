import React, { useState } from 'react';
import { Currency, DomainCheckResult, WhoisRecord } from '../types';
import { formatCurrency } from '../utils/alertEngine';
import { 
  CheckCircle, 
  ShoppingCart, 
  Sparkles, 
  Activity, 
  Clock, 
  BellRing,
  Tag
} from 'lucide-react';

interface RealTimeResultsProps {
  primaryResult: DomainCheckResult | null;
  alternatives: DomainCheckResult[];
  currency: Currency;
  onAddToCart: (domainResult: DomainCheckResult, periodYears: number) => void;
  cartItemNames: Set<string>;
  onInspectWhois: (whois: WhoisRecord) => void;
  searchTerm: string;
}

export const RealTimeResults: React.FC<RealTimeResultsProps> = ({
  primaryResult,
  alternatives,
  currency,
  onAddToCart,
  cartItemNames,
  searchTerm
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'all' | 'core' | 'tech' | 'experience' | 'human' | 'enterprise' | 'brandable'>('all');

  if (!primaryResult) return null;

  const isInCart = cartItemNames.has(primaryResult.domain);
  const regPrice = currency === 'NGN' ? primaryResult.regPriceNGN : primaryResult.regPriceUSD;
  const renewPrice = currency === 'NGN' ? primaryResult.renewPriceNGN : primaryResult.renewPriceUSD;
  const totalPrice = regPrice + (selectedPeriod > 1 ? renewPrice * (selectedPeriod - 1) : 0);

  // Filter alternatives by tab
  const filteredAlternatives = alternatives.filter(alt => {
    if (activeTab === 'all') return true;
    return alt.category === activeTab;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-16 relative z-20">
      
      {/* Primary Result Banner Card */}
      <div className="rounded-2xl border p-6 sm:p-8 shadow-xl transition-all bg-gradient-to-r from-emerald-950/90 via-slate-900 to-slate-950 border-emerald-500/40 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Domain & Availability Status */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                AVAILABLE FOR REGISTRATION
              </span>

              {primaryResult.dnsQueryTimeMs && (
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  DNS probe: {primaryResult.dnsQueryTimeMs}ms
                </span>
              )}

              <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 font-medium">
                <BellRing className="w-3 h-3" />
                Includes Automated Renewal Alerts
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight break-all">
              {primaryResult.domain}
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Great choice! This name is ready for immediate registration. Automated renewal reminders &amp; DNS included.
            </p>
          </div>

          {/* Pricing & Call to Action */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4 shrink-0 pt-4 lg:pt-0 border-t sm:border-t-0 border-slate-800">
            <div className="text-left lg:text-right">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-amber-400 tabular-nums">
                  {formatCurrency(totalPrice, currency)}
                </span>
                <span className="text-xs text-slate-400">
                  for {selectedPeriod} year{selectedPeriod > 1 ? 's' : ''}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Then {formatCurrency(renewPrice, currency)}/yr renewal
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Duration Selector */}
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(Number(e.target.value))}
                className="bg-slate-800 border border-slate-700 text-white text-xs font-semibold rounded-lg px-3 py-3 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value={1}>1 Year</option>
                <option value={2}>2 Years</option>
                <option value={3}>3 Years</option>
                <option value={5}>5 Years</option>
              </select>

              <button
                onClick={() => onAddToCart(primaryResult, selectedPeriod)}
                disabled={isInCart}
                className={`flex-1 sm:flex-initial px-6 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isInCart
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white shadow-lg shadow-emerald-900/30'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{isInCart ? 'In Cart ✓' : 'Add to Cart'}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Alternative Domain Results Section */}
      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        
        {/* Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">
                Premium Domain Search Results ({alternatives.length} Available)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              All domains verified available at standard registration rate of <strong>{currency === 'NGN' ? '₦114,000' : '$76.00'}</strong> with free DNS management and automated renewal alerts.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({alternatives.length})
            </button>
            <button
              onClick={() => setActiveTab('core')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'core' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Core Tech
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'tech' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Horizons &amp; Flow
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'experience' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Labs &amp; Studios
            </button>
            <button
              onClick={() => setActiveTab('human')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'human' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Human &amp; Connect
            </button>
            <button
              onClick={() => setActiveTab('enterprise')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'enterprise' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Enterprise
            </button>
            <button
              onClick={() => setActiveTab('brandable')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'brandable' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Brandable
            </button>
          </div>
        </div>

        {/* Domains Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAlternatives.map((alt) => {
            const inCart = cartItemNames.has(alt.domain);
            const pReg = currency === 'NGN' ? alt.regPriceNGN : alt.regPriceUSD;
            const pRenew = currency === 'NGN' ? alt.renewPriceNGN : alt.renewPriceUSD;

            return (
              <div
                key={alt.domain}
                className="group p-4 rounded-xl border border-slate-200 hover:border-emerald-300 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition-colors break-all">
                      {alt.domain}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                      Available
                    </span>
                  </div>

                  {alt.tag && (
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-500 font-semibold tracking-wide uppercase">
                      <Tag className="w-3 h-3 text-emerald-600" />
                      <span>{alt.tag}</span>
                    </div>
                  )}

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-lg font-black text-slate-900 tabular-nums">
                      {formatCurrency(pReg, currency)}
                    </span>
                    <span className="text-xs text-slate-500">
                      / 1st yr (then {formatCurrency(pRenew, currency)}/yr)
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Instant Setup</span>
                  </div>

                  <button
                    onClick={() => onAddToCart(alt, 1)}
                    disabled={inCart}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      inCart
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white shadow-xs'
                    }`}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{inCart ? 'Added ✓' : 'Add to Cart'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
