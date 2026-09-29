import React from 'react';
import { Star, CheckCircle, ArrowRight } from 'lucide-react';
import { GOOGLE_REVIEWS } from '../data/tldData';

interface ReviewsSectionProps {
  title?: string;
  reviews?: typeof GOOGLE_REVIEWS;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  title,
  reviews = GOOGLE_REVIEWS
}) => {
  return (
    <section id="reviews" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {title && (
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-all hover:shadow-md"
            >
              <div>
                {/* Google Logo & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 font-bold text-slate-700 text-sm">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                    <span className="text-xs text-slate-400 font-normal ml-1">Reviews</span>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Review Prose */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "{rev.review}"
                </p>
              </div>

              {/* Author & Timestamp */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {rev.date} · Verified Client
                  </div>
                </div>

                <div className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
