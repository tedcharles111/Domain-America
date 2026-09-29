import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Server, 
  Clock, 
  MessageCircle, 
  Lock, 
  Activity,
  ArrowRight
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Cloud Dashboard Mockup */}
          <div className="relative">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 relative z-10">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-slate-400 ml-2 select-none">
                    cpanel.domainking.ng
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Your site is secure! No malware</span>
                </div>
              </div>

              {/* Status Banner */}
              <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    Your website has installed and is ready for you!
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    PHP 8.3 · LiteSpeed Cache · HTTP/3 Enabled
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors">
                  Edit Website
                </button>
              </div>

              {/* Service Rows */}
              <div className="mt-5 space-y-3">
                <div className="p-3.5 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                      WP
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">WP Starter</div>
                      <div className="text-[11px] text-slate-400">mydomain.com.ng</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                      .NG
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Domain Registration</div>
                      <div className="text-[11px] text-slate-400">mydomain.com.ng · Auto-Renew ON</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    Alerts Active
                  </span>
                </div>
              </div>

              {/* Resource Graph Mock */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-slate-700">Server Health & Load</span>
                  <span className="font-mono text-emerald-600 font-bold">Optimal (14% CPU)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[14%] h-full bg-emerald-500 rounded-full" />
                </div>
              </div>

              {/* Bottom Badges */}
              <div className="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-black text-sm">
                    99.9%
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-slate-900">Uptime Guaranteed</div>
                    <div className="text-[11px] text-slate-400">Tier 3 Datacenter</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-xs font-medium text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">
                    DK
                  </div>
                  <span>Hi! How can I help you?</span>
                </div>
              </div>

            </div>

            {/* Subtle Glow Backdrop */}
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 to-amber-500/10 rounded-3xl blur-2xl -z-10" />
          </div>

          {/* Right Column: Copy & Value Proposition */}
          <div>
            <div className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2">
              WHY CHOOSE DOMAINKING?
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance leading-tight">
              You Deserve The Best
            </h2>
            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              We empower over 50,000 businesses, developers, and institutions across Nigeria and Africa with lightning-fast cloud hosting, automated domain protection, and human 24/7 technical support.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900">Get 24/7 expert support you can trust</strong>, for your peace of mind whenever you need technical assistance.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900">Enjoy top website speed</strong> with our efficient LiteSpeed Web Servers and native NVMe enterprise arrays.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900">Our Tier 3 Datacenter guarantees 99.9% uptime</strong>, keeping your website and emails perpetually online.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900">Get more for less</strong> with a free .com.ng domain, automated renewal alerts, SSL certificates, daily backups, and malware protection.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <a
                href="#hosting-plans"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-red-600 hover:text-red-700 transition-colors"
              >
                <span>Explore all hosting plans & features</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
