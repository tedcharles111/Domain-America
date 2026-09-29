import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/tldData';
import { Plus, Minus, HelpCircle, MessageSquare } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([0, 2]); // First and renewal alerts questions open by default

  const toggleIndex = (idx: number) => {
    setOpenIndices(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Have a Question?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Find answers to the most commonly asked questions about our domains, hosting, and automated renewal alerts.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndices.includes(idx);

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full py-4 sm:py-5 px-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-red-600 transition-colors cursor-pointer"
                >
                  <span className="text-balance">{item.question}</span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-amber-500">
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Speak to a consultant prompt */}
        <div className="mt-12 text-center text-xs sm:text-sm text-slate-500">
          <span>Still have questions? </span>
          <button
            onClick={() => alert('Support ticket portal opened: You can contact our 24/7 technical team at support@domainking.ng')}
            className="text-red-600 font-bold hover:underline cursor-pointer"
          >
            Speak to a consultant
          </button>
        </div>

      </div>
    </section>
  );
};
