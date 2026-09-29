import React, { useState } from 'react';
import { Currency } from '../types';
import { Crown, Bell, ShoppingCart, Globe, ChevronDown, User, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  cartCount: number;
  onOpenCart: () => void;
  expiringCount: number;
  onOpenPortal: () => void;
  onOpenWhois: () => void;
  activeView: 'home' | 'portal';
  setActiveView: (view: 'home' | 'portal') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currency,
  onCurrencyChange,
  cartCount,
  onOpenCart,
  expiringCount,
  onOpenPortal,
  onOpenWhois,
  activeView,
  setActiveView
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40">
      {/* Top Notification Announcement Bar */}
      <div className="bg-[#b91c1c] text-white text-xs py-2 px-4 text-center font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span>We have upgraded! our brand-new client portal is here. Its smoother, faster and simpler.</span>
          <button
            onClick={() => {
              setActiveView('portal');
              onOpenPortal();
            }}
            className="underline font-bold hover:text-amber-200 transition-colors cursor-pointer"
          >
            Access Automated Renewal Portal &rarr;
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo Zone */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-sm shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-red-700 transition-colors">
                  Domain<span className="text-red-600">America</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold -mt-1">
                  powered by HOSTAFRICA
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links Zone */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <div className="relative group">
              <button 
                onClick={() => setActiveView('home')}
                className={`flex items-center gap-1 py-2 hover:text-red-600 transition-colors cursor-pointer ${activeView === 'home' ? 'text-red-600' : ''}`}
              >
                <span>Domains</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 top-full pt-2 hidden group-hover:block w-56">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-2 py-3 text-xs flex flex-col gap-1">
                  <button onClick={() => { setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-medium text-slate-800">
                    Register a Domain (.com.ng / .com)
                  </button>
                  <button onClick={onOpenWhois} className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-medium text-slate-800">
                    WHOIS Lookup & DNS Inspector
                  </button>
                  <button onClick={() => setActiveView('portal')} className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-medium text-slate-800">
                    Domain Renewal Alerts Manager
                  </button>
                  <a href="#tld-catalog" className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-medium text-slate-800">
                    Domain Pricing & TLDs
                  </a>
                </div>
              </div>
            </div>

            <a href="#hosting-plans" className="hover:text-red-600 transition-colors">Hosting</a>
            <a href="#security-section" className="hover:text-red-600 transition-colors">Email</a>
            <a href="#hosting-plans" className="hover:text-red-600 transition-colors">Websites</a>
            <a href="#reviews" className="hover:text-red-600 transition-colors">Partners</a>
            <a href="#faq" className="hover:text-red-600 transition-colors">Blog</a>
          </nav>

          {/* Action Zone: Currency, Renewals, Cart, Client Portal */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Currency Switcher */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
              <button
                onClick={() => onCurrencyChange('NGN')}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  currency === 'NGN' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Nigerian Naira"
              >
                ₦ NGN
              </button>
              <button
                onClick={() => onCurrencyChange('USD')}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  currency === 'USD' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="US Dollars"
              >
                $ USD
              </button>
            </div>

            {/* Renewal Alerts Trigger Button */}
            <button
              onClick={() => {
                setActiveView('portal');
                onOpenPortal();
              }}
              className="relative flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-amber-50 hover:text-amber-900 rounded-lg border border-slate-200 transition-all cursor-pointer"
              title="Automated Renewal Alerts"
            >
              <Bell className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">Renewal Alerts</span>
              {expiringCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[11px] font-bold flex items-center justify-center animate-pulse">
                  {expiringCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-slate-700 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Support Link */}
            <a
              href="#faq"
              className="hidden md:inline-flex text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Support
            </a>

            {/* Login / Client Portal Button */}
            <button
              onClick={() => setActiveView(activeView === 'portal' ? 'home' : 'portal')}
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'portal'
                  ? 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                  : 'bg-white text-slate-900 border-slate-300 hover:border-slate-900 shadow-xs'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{activeView === 'portal' ? 'Back to Store' : 'Client Portal'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
