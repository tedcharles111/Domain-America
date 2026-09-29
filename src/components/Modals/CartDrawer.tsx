import React, { useState } from 'react';
import { CartItem, Currency } from '../../types';
import { formatCurrency } from '../../utils/alertEngine';
import { 
  X, 
  Trash2, 
  ShoppingCart, 
  ShieldCheck, 
  BellRing, 
  CheckCircle2, 
  ArrowRight,
  Lock,
  Globe
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: Currency;
  onRemoveItem: (id: string) => void;
  onUpdatePeriod: (id: string, years: number) => void;
  onToggleAddon: (id: string, addonKey: 'whoisPrivacy' | 'dnsManagement' | 'automatedRenewalAlerts') => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  currency,
  onRemoveItem,
  onUpdatePeriod,
  onToggleAddon,
  onCheckout
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const total = cart.reduce((acc, item) => {
    const itemPrice = currency === 'NGN' ? item.priceNGN : item.priceUSD;
    const renewPrice = currency === 'NGN' ? item.renewPriceNGN : item.renewPriceUSD;
    const additionalYears = item.periodYears > 1 ? (item.periodYears - 1) * renewPrice : 0;
    return acc + itemPrice + additionalYears;
  }, 0);

  const handleCheckoutClick = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onCheckout();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-bold text-slate-900">Your Cart</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {cart.length} item{cart.length === 1 ? '' : 's'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-3 stroke-[1.5]" />
                <p className="text-sm font-semibold text-slate-700">Your shopping cart is empty</p>
                <p className="text-xs text-slate-400 mt-1">
                  Search for a domain above or choose a hosting package to begin.
                </p>
              </div>
            ) : (
              cart.map((item) => {
                const itemPrice = currency === 'NGN' ? item.priceNGN : item.priceUSD;
                const renewPrice = currency === 'NGN' ? item.renewPriceNGN : item.renewPriceUSD;
                const lineTotal = itemPrice + (item.periodYears > 1 ? (item.periodYears - 1) * renewPrice : 0);

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between gap-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-extrabold text-sm text-slate-900 break-all">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {item.type === 'domain' ? 'Domain Registration' : 'Web Hosting Plan'}
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Period Selector & Price */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                      {item.type === 'domain' ? (
                        <div className="flex items-center gap-1.5">
                          <label className="text-xs text-slate-500">Duration:</label>
                          <select
                            value={item.periodYears}
                            onChange={(e) => onUpdatePeriod(item.id, Number(e.target.value))}
                            className="bg-white border border-slate-300 text-xs font-semibold rounded px-2 py-1 focus:outline-none"
                          >
                            <option value={1}>1 Year</option>
                            <option value={2}>2 Years</option>
                            <option value={3}>3 Years</option>
                            <option value={5}>5 Years</option>
                          </select>
                        </div>
                      ) : (
                        <div className="text-xs text-slate-500">
                          {item.details || 'Billed Annually'}
                        </div>
                      )}

                      <div className="font-black text-sm text-slate-900 tabular-nums">
                        {formatCurrency(lineTotal, currency)}
                      </div>
                    </div>

                    {/* Add-ons for domains */}
                    {item.type === 'domain' && item.addons && (
                      <div className="mt-1 pt-2 border-t border-slate-200/60 space-y-1.5 text-xs">
                        <label className="flex items-center justify-between text-slate-700 cursor-pointer">
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Free WHOIS ID Privacy</span>
                          </div>
                          <span className="text-[11px] text-emerald-600 font-bold">FREE</span>
                        </label>

                        <label className="flex items-center justify-between text-slate-700 cursor-pointer">
                          <div className="flex items-center gap-1.5">
                            <BellRing className="w-3.5 h-3.5 text-amber-600" />
                            <span>Automated Renewal Alerts</span>
                          </div>
                          <span className="text-[11px] text-emerald-600 font-bold">INCLUDED</span>
                        </label>
                      </div>
                    )}

                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {formatCurrency(total, currency)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Taxes & ICANN Fee</span>
                <span className="font-semibold text-emerald-600">
                  ₦0.00 (Included)
                </span>
              </div>
              <div className="flex items-center justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Due Today:</span>
                <span className="text-xl text-red-600 tabular-nums">
                  {formatCurrency(total, currency)}
                </span>
              </div>

              <button
                onClick={handleCheckoutClick}
                disabled={isProcessing}
                className="w-full py-4 bg-[#df3333] hover:bg-[#c92424] text-white font-extrabold text-sm uppercase tracking-wide rounded-xl shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isProcessing ? (
                  <span>PROVISIONING DOMAIN & ALERTS...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>CHECKOUT & ACTIVATE RENEWAL ALERTS</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>256-Bit SSL Encrypted & Instant Registry Provisioning</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
