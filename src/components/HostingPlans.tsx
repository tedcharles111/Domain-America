import React, { useState } from 'react';
import { Currency, CartItem } from '../types';
import { HOSTING_PLANS } from '../data/tldData';
import { formatCurrency } from '../utils/alertEngine';
import { Check, X, Server, Globe, Sparkles } from 'lucide-react';

interface HostingPlansProps {
  currency: Currency;
  onChoosePlan: (plan: typeof HOSTING_PLANS[0]) => void;
}

export const HostingPlans: React.FC<HostingPlansProps> = ({
  currency,
  onChoosePlan
}) => {
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);

  return (
    <section id="hosting-plans" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2">
            Powerful Web Infrastructure
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            High-Speed Hosting Bundled with Free Domain
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base text-balance">
            Get an enterprise-grade home for your digital presence. Every annual plan includes a complimentary <span className="font-bold text-slate-900">.com.ng</span> domain and automated renewal alerts.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {HOSTING_PLANS.map((plan) => {
            const price = currency === 'NGN' ? plan.priceNGN : plan.priceUSD;
            const isExpanded = expandedPlanId === plan.id;
            const displayedFeatures = isExpanded ? plan.features : plan.features.slice(0, 8);

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl border bg-white p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? 'border-red-500 shadow-lg ring-1 ring-red-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Popular Ribbon if applicable */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-red-600 text-white text-[11px] font-extrabold tracking-wider uppercase shadow-sm">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  {/* Icon Header */}
                  <div className="flex justify-center mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                      <Server className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="text-center">
                    <h3 className="text-xl font-extrabold text-slate-900">
                      {plan.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-500 min-h-[32px] px-2 leading-relaxed">
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mt-6 text-center pb-6 border-b border-slate-100">
                    <div className="text-xs text-slate-500 font-medium">from</div>
                    <div className="mt-1 flex items-baseline justify-center gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 tabular-nums">
                        {formatCurrency(price, currency)}
                      </span>
                      <span className="text-sm font-semibold text-slate-500">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Choose Plan Coral Button */}
                  <div className="mt-6">
                    <button
                      onClick={() => onChoosePlan(plan)}
                      className={`w-full py-3.5 px-6 rounded-xl text-sm font-extrabold uppercase tracking-wide transition-all shadow-sm cursor-pointer ${
                        plan.popular
                          ? 'bg-[#df3333] hover:bg-[#c92424] text-white shadow-red-600/30'
                          : 'bg-[#df3333] hover:bg-[#c92424] text-white'
                      }`}
                    >
                      CHOOSE PLAN
                    </button>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="mt-8 space-y-3 text-xs text-slate-700">
                    {displayedFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        {feat.included ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                            <X className="w-3 h-3 stroke-[2.5]" />
                          </div>
                        )}
                        <span className={`${feat.highlight ? 'font-bold text-red-600' : ''} ${!feat.included ? 'text-slate-400' : ''}`}>
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* See All Features Toggle */}
                <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                  <button
                    onClick={() => setExpandedPlanId(isExpanded ? null : plan.id)}
                    className="text-xs font-bold text-slate-500 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    {isExpanded ? 'Show less features' : 'See all features'}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
