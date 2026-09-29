import React, { useState } from 'react';
import { RegisteredDomain, Currency } from '../../types';
import { formatCurrency } from '../../utils/alertEngine';
import { X, RefreshCw, ShieldCheck, CheckCircle2, CreditCard } from 'lucide-react';

interface RenewModalProps {
  domain: RegisteredDomain | null;
  isOpen: boolean;
  currency: Currency;
  onClose: () => void;
  onConfirmRenewal: (domainId: string, additionalYears: number) => void;
}

export const RenewModal: React.FC<RenewModalProps> = ({
  domain,
  isOpen,
  currency,
  onClose,
  onConfirmRenewal
}) => {
  const [periodYears, setPeriodYears] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('card');

  if (!isOpen || !domain) return null;

  const unitPrice = currency === 'NGN' ? domain.renewalPriceNGN : domain.renewalPriceUSD;
  const totalPrice = unitPrice * periodYears;

  const handleRenew = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirmRenewal(domain.id, periodYears);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-red-600" />
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Renew Domain Registration
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                {domain.domain}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-slate-500 font-medium">Current Expiry:</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">{domain.expiryDate}</div>
            </div>
            <div className="text-right">
              <div className="text-slate-500 font-medium">Status:</div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                domain.daysRemaining <= 5 ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {domain.daysRemaining <= 0 ? 'Grace Period' : `${domain.daysRemaining} days left`}
              </span>
            </div>
          </div>

          {/* Period Selector */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Select Renewal Extension Term
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((years) => (
                <button
                  key={years}
                  type="button"
                  onClick={() => setPeriodYears(years)}
                  className={`py-2.5 px-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                    periodYears === years
                      ? 'border-red-600 bg-red-50 text-red-700 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-sm">{years} Year{years > 1 ? 's' : ''}</div>
                  <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                    {formatCurrency(unitPrice * years, currency)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Payment Method
            </label>
            <div className="space-y-2">
              <label className="p-3 rounded-xl border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-50">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-slate-800">Mastercard / Visa (Debit Card)</span>
                </div>
                <input
                  type="radio"
                  name="pay_method"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="accent-red-600"
                />
              </label>

              <label className="p-3 rounded-xl border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="text-orange-500 font-bold text-xs">₦</span>
                  <span className="font-semibold text-slate-800">Flutterwave / Direct Bank Transfer</span>
                </div>
                <input
                  type="radio"
                  name="pay_method"
                  checked={paymentMethod === 'transfer'}
                  onChange={() => setPaymentMethod('transfer')}
                  className="accent-red-600"
                />
              </label>
            </div>
          </div>

          {/* Total & Submit */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="font-bold text-slate-700">Total Renewal Fee:</span>
              <span className="font-black text-xl text-red-600 tabular-nums">
                {formatCurrency(totalPrice, currency)}
              </span>
            </div>

            <button
              onClick={handleRenew}
              disabled={isProcessing}
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>EXTENDING DOMAIN REGISTRATION...</span>
                </>
              ) : (
                <span>PROCESS INSTANT RENEWAL</span>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
