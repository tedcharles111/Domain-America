import React, { useState } from 'react';
import { Currency } from '../types';
import { formatCurrency } from '../utils/alertEngine';
import { 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  CreditCard, 
  Building2, 
  ArrowLeft, 
  Sparkles, 
  Download, 
  FileText, 
  RefreshCw,
  Zap,
  Globe,
  Bell,
  Check
} from 'lucide-react';

interface ValleyVistaRenewalPageProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onBackToHome: () => void;
  onOpenPortal: () => void;
  onRenewalSuccess?: (newExpiryDate: string) => void;
}

export const ValleyVistaRenewalPage: React.FC<ValleyVistaRenewalPageProps> = ({
  currency,
  onCurrencyChange,
  onBackToHome,
  onOpenPortal,
  onRenewalSuccess
}) => {
  const [selectedYears, setSelectedYears] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'ussd'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [autoRenewEnabled, setAutoRenewEnabled] = useState(true);
  const [receiptNumber, setReceiptNumber] = useState('');

  // 75,500 NGN renewal pricing
  const baseRateNGN = 75500;
  const baseRateUSD = 50.5;
  const standardRateNGN = 114000;
  const standardRateUSD = 76.0;

  const currentRate = currency === 'NGN' ? baseRateNGN : baseRateUSD;
  const standardRate = currency === 'NGN' ? standardRateNGN : standardRateUSD;
  const totalAmount = currentRate * selectedYears;
  const savings = (standardRate - currentRate) * selectedYears;

  const handleRenewNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generatedReceipt = `INV-VV-${Math.floor(100000 + Math.random() * 900000)}`;
      setReceiptNumber(generatedReceipt);
      setIsSuccess(true);
      if (onRenewalSuccess) {
        onRenewalSuccess(`202${7 + selectedYears - 1}-10-28`);
      }
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation & Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-800">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Domain Search</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Currency selector */}
            <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-xs">
              <button
                onClick={() => onCurrencyChange('NGN')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  currency === 'NGN' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                ₦ NGN (75K)
              </button>
              <button
                onClick={() => onCurrencyChange('USD')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  currency === 'USD' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                $ USD ($50)
              </button>
            </div>

            <button
              onClick={onOpenPortal}
              className="px-3.5 py-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors cursor-pointer"
            >
              Client Portal
            </button>
          </div>
        </div>

        {/* Hero Notice Banner */}
        <div className="mt-8 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-red-950/60 via-slate-900 to-amber-950/40 border border-amber-500/30 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-500/40 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Exclusive Special Renewal Rate: 75K
                </span>
                <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold border border-red-500/30 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-red-400" />
                  Renewal Due: Expiring in 13 Days
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white break-all">
                valleyvista<span className="text-amber-400">.com.ng</span>
              </h1>

              <p className="mt-3 text-sm text-slate-300 max-w-2xl leading-relaxed">
                Official NiRA Accredited Registrar Renewal Desk. Renew your trademark domain now at <strong className="text-amber-300 font-bold">{currency === 'NGN' ? '₦75,500' : '$50.50'} / year</strong> with instant verification and automated expiry shielding.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex flex-col items-center lg:items-end text-center lg:text-right shrink-0">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Next Year Renewal</span>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-1 tabular-nums">
                {currency === 'NGN' ? '₦75,500' : '$50.50'}
              </div>
              <div className="text-xs text-amber-400 font-semibold mt-1">
                No Dns management and Hosting
              </div>
            </div>
          </div>
        </div>

        {/* Renewal Process or Success View */}
        {isSuccess ? (
          <div className="mt-8 bg-slate-900 border border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-950">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <span className="text-xs uppercase tracking-widest text-emerald-400 font-extrabold">
              Renewal Successfully Processed
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              valleyvista.com.ng is renewed for {selectedYears} Year{selectedYears > 1 ? 's' : ''}!
            </h2>

            <p className="mt-3 text-sm text-slate-300 max-w-lg mx-auto">
              Your domain renewal has been confirmed with the NiRA registry at the 75K rate. All DNS records, nameservers, and SSL certificates remain active without interruption.
            </p>

            <div className="mt-6 max-w-md mx-auto bg-slate-950/70 border border-slate-800 rounded-xl p-4 text-xs text-left space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Invoice / Receipt:</span>
                <span className="font-mono font-bold text-white">{receiptNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Domain:</span>
                <span className="font-bold text-white">valleyvista.com.ng</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Amount Paid:</span>
                <span className="font-bold text-amber-400 font-mono">{formatCurrency(totalAmount, currency)} (75K rate)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">New Expiration Date:</span>
                <span className="font-bold text-emerald-400">October 28, 202{7 + selectedYears - 1}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-300" />
                <span>Download Official Receipt</span>
              </button>

              <button
                onClick={onOpenPortal}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-lg shadow-red-950/40"
              >
                <span>View in Client Portal</span>
              </button>

              <button
                onClick={onBackToHome}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-colors cursor-pointer"
              >
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Duration Selector & Included Benefits */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Select Duration */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span>Choose Renewal Term (75K Rate)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Lock in this 75K special renewal pricing for multiple years to protect your business against registry tariff increases.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                  {[
                    { years: 1, label: 'Next Year Renewal', rate: 75500, rateUSD: 50.5, badge: 'Standard Rate' },
                    { years: 2, label: '2 Years Renewal', rate: 151000, rateUSD: 101.0, badge: 'Popular Choice' },
                    { years: 3, label: '3 Years Renewal', rate: 226500, rateUSD: 151.5, badge: 'Save Extra' },
                    { years: 5, label: '5 Years Renewal', rate: 377500, rateUSD: 252.5, badge: 'Maximum Shield' }
                  ].map((tier) => {
                    const isSelected = selectedYears === tier.years;
                    const price = currency === 'NGN' ? tier.rate : tier.rateUSD;
                    const standardTier = (currency === 'NGN' ? standardRateNGN : standardRateUSD) * tier.years;

                    return (
                      <div
                        key={tier.years}
                        onClick={() => setSelectedYears(tier.years)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-950/20'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-sm">{tier.label}</span>
                        </div>

                        <div className="mt-3">
                          <div className="text-xl font-black text-amber-400 tabular-nums">
                            {formatCurrency(price, currency)}
                          </div>
                          <div className="text-[11px] text-slate-400 line-through mt-0.5">
                            Standard: {formatCurrency(standardTier, currency)}
                          </div>
                        </div>

                        <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                          <span className="text-emerald-400 font-semibold">
                            75K/yr applied
                          </span>
                          <span className="text-slate-400">
                            Valid until 202{7 + tier.years - 1}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Auto Renew Toggle */}
                <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Automated Expiry Protection</div>
                      <div className="text-[11px] text-slate-400">Keep valleyvista.com.ng automatically renewed before it lapses</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAutoRenewEnabled(!autoRenewEnabled)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                      autoRenewEnabled ? 'bg-emerald-600' : 'bg-slate-700'
                    }`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      autoRenewEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>

              {/* What is included with this renewal */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Complimentary Enterprise Features Included</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-200">Free Anycast DNS Management</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">Manage A, CNAME, MX, TXT and SPF records directly.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-200">Automated Alert Cadence</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">Multi-channel warnings (60d, 30d, 14d, 7d, 3d, 1d) via Email &amp; SMS.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-200">WHOIS Privacy Guard</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">Mask your personal phone and address from spammers.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-200">Email &amp; Domain Forwarding</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">2 free redirect accounts forwarding to your primary inbox.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary & Instant Checkout */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl sticky top-8">
                
                <h3 className="text-base font-extrabold text-white flex items-center justify-between pb-4 border-b border-slate-800">
                  <span>Renewal Invoice Summary</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    75K Special
                  </span>
                </h3>

                {/* Domain item line */}
                <div className="py-4 space-y-3 text-xs border-b border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-100 text-sm">valleyvista.com.ng</div>
                      <div className="text-slate-400 text-[11px]">Domain Registration Renewal ({selectedYears} Year{selectedYears > 1 ? 's' : ''})</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-white text-sm">
                        {formatCurrency(totalAmount, currency)}
                      </div>
                      <div className="text-[10px] text-emerald-400">
                        75K/yr Promo
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Standard List Rate:</span>
                    <span className="line-through">{formatCurrency(standardRate * selectedYears, currency)}</span>
                  </div>

                  <div className="flex justify-between text-emerald-400 font-semibold text-[11px]">
                    <span>Special Promotional Discount:</span>
                    <span>-{formatCurrency(savings, currency)}</span>
                  </div>

                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>NiRA Registry Processing:</span>
                    <span className="text-emerald-400 font-semibold">FREE</span>
                  </div>

                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>DNS Management &amp; Alerts:</span>
                    <span className="text-emerald-400 font-semibold">FREE</span>
                  </div>
                </div>

                {/* Total Line */}
                <div className="py-4 flex items-baseline justify-between border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-slate-300 block">Total Renewal Fee</span>
                    <span className="text-[10px] text-slate-400">Guaranteed 75K/yr rate</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black text-amber-400 tabular-nums">
                      {formatCurrency(totalAmount, currency)}
                    </span>
                    <span className="text-[11px] text-emerald-400 block font-bold">
                      Saved {formatCurrency(savings, currency)}
                    </span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="mt-5">
                  <label className="text-xs font-bold text-slate-300 block mb-2">
                    Select Payment Method:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        paymentMethod === 'card'
                          ? 'bg-red-950/40 border-red-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span className="text-[10px] font-bold">Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('transfer')}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        paymentMethod === 'transfer'
                          ? 'bg-red-950/40 border-red-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Building2 className="w-4 h-4" />
                      <span className="text-[10px] font-bold">Transfer</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('ussd')}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        paymentMethod === 'ussd'
                          ? 'bg-red-950/40 border-red-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Zap className="w-4 h-4" />
                      <span className="text-[10px] font-bold">USSD</span>
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleRenewNow}
                  disabled={isProcessing}
                  className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 active:scale-98 text-white font-extrabold text-sm shadow-xl shadow-red-900/40 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-75"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Renewing with NiRA Registry...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5 text-amber-200" />
                      <span>Renew valleyvista.com.ng for {formatCurrency(totalAmount, currency)}</span>
                    </>
                  )}
                </button>

                <p className="mt-3 text-[10px] text-center text-slate-400">
                  🔒 256-Bit SSL Encrypted &bull; Instant NiRA Registry Sync &bull; Official Receipt Provided
                </p>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
