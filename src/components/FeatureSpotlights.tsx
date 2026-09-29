import React from 'react';
import { CheckCircle2, Shield, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import devImg from '../assets/images/feature_hosting_developer_1790703197652.jpg';
import securityImg from '../assets/images/feature_security_shield_1790703214648.jpg';
import migrationImg from '../assets/images/feature_server_migration_1790703225987.jpg';

export const FeatureSpotlights: React.FC = () => {
  return (
    <div id="security-section" className="py-16 bg-white space-y-24">
      
      {/* Spotlight 1: All-in-One Hosting Solutions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div>
            <div className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2">
              EVERYTHING YOU NEED TO GET STARTED QUICKLY
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance leading-tight">
              All-in-One Hosting Solutions
            </h2>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-sm text-slate-700">
                  Choose from hundreds of TLDs. Start with a <strong className="text-slate-900">free .com.ng domain</strong> included with annual hosting.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-sm text-slate-700">
                  Create a business email with <strong className="text-slate-900">outgoing spam protection</strong> and webmail access from anywhere.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-sm text-slate-700">
                  Servers boosted with <strong className="text-slate-900">LiteSpeed technology</strong> for blazing fast TTFB and WordPress acceleration.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-sm text-slate-700">
                  Launch your website fast with our <strong className="text-slate-900">easy, no-code Website Builder</strong> and pre-made templates.
                </p>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-50 group">
            <img
              src={devImg}
              alt="Developer working on fast modern cloud hosting"
              className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                  PHP
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">1-Click WordPress & App Installer</div>
                  <div className="text-[11px] text-slate-500">Over 400+ scripts available instantly</div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                Instant
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Spotlight 2: Robust Security Measures */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-50 group">
            <img
              src={securityImg}
              alt="Enterprise cloud security and SSL encryption"
              className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/50 shadow-lg flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-emerald-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">Your site is secure!</div>
                <div className="text-[10px] text-slate-500">Proactive malware detection active</div>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 p-3 rounded-xl bg-slate-900/90 text-white text-xs font-mono backdrop-blur-md">
              DDoS Shield: 2.5 Tbps Scrubbing
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2">
              ROBUST SECURITY MEASURES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance leading-tight">
              For Your Peace of Mind
            </h2>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900">Enhance site stability</strong> with our robust multi-tier DDoS protection and traffic filtering.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900">Secure your site</strong> with proactive malware scanning, automatic quarantine, and daily vulnerability patches.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900">Build visitor trust</strong> with free auto-renewing Let's Encrypt SSL certificates for every hosted domain.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900">Protect your content</strong> with automated daily and weekly offsite backups, restorable in 1 click.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Spotlight 3: Free Migration */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div>
            <div className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2">
              FREE MIGRATION
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance leading-tight">
              Move Your Site Effortlessly
            </h2>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900">Easily switch to our hosting platform</strong> with the white-glove help of our certified migration experts.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900">We take care of moving all your content</strong>, databases, and mailbox archives, so you don't have to lift a finger.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900">Zero downtime guarantee</strong>: your website will stay 100% online while our team performs the transfer.
                </p>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-50 group">
            <img
              src={migrationImg}
              alt="Joyful team enjoying smooth zero-downtime website migration"
              className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md text-white border border-slate-700 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400">100% Free White-Glove Transfer</div>
                <div className="text-[11px] text-slate-300">cPanel, Plesk, WordPress or Custom stacks</div>
              </div>
              <span className="px-3 py-1 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg">
                Free
              </span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
