import React, { useState } from 'react';
import { RegisteredDomain } from '../../types';
import { X, Plus, Globe, Calendar, Bell, ShieldCheck } from 'lucide-react';
import { calculateDaysRemaining, evaluateDomainStatus } from '../../utils/alertEngine';

interface AddDomainModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDomain: (newDomain: RegisteredDomain) => void;
}

export const AddDomainModal: React.FC<AddDomainModalProps> = ({
  isOpen,
  onClose,
  onAddDomain
}) => {
  const [domainName, setDomainName] = useState('');
  const [expiryDate, setExpiryDate] = useState('2026-11-15');
  const [registrar, setRegistrar] = useState('External Registrar');
  const [enableAlerts, setEnableAlerts] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainName.trim()) return;

    let clean = domainName.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
    const daysRemaining = calculateDaysRemaining(expiryDate);
    const status = evaluateDomainStatus(daysRemaining);

    const newDomain: RegisteredDomain = {
      id: `dom-ext-${Date.now()}`,
      domain: clean,
      tld: clean.includes('.') ? clean.slice(clean.indexOf('.')) : '.com',
      registrationDate: '2024-01-01',
      expiryDate,
      daysRemaining,
      autoRenew: false,
      status,
      renewalPriceNGN: 17000,
      renewalPriceUSD: 11.99,
      nameservers: ['ns1.externaldns.com', 'ns2.externaldns.com'],
      privacyEnabled: true,
      emailForwarding: false,
      alertConfig: {
        enabled: enableAlerts,
        channels: {
          email: true,
          sms: true,
          webhook: false,
          inApp: true
        },
        thresholds: {
          d60: true,
          d30: true,
          d14: true,
          d7: true,
          d3: true,
          d1: true,
          d0: true,
          grace: true
        },
        destinationEmail: 'tedcharleschinekezi@gmail.com',
        destinationPhone: '+234 803 123 4567',
        webhookUrl: ''
      }
    };

    onAddDomain(newDomain);
    onClose();
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
            <Plus className="w-5 h-5 text-red-600" />
            <h3 className="font-extrabold text-base text-slate-900">
              Add Domain to Alert Engine
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Domain Name
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                placeholder="example.com.ng"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:outline-none focus:border-red-500"
                required
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              You can track any domain from GoDaddy, Namecheap, Google, or local registrars.
            </p>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Current Expiration Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:outline-none focus:border-red-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Current Registrar
            </label>
            <input
              type="text"
              value={registrar}
              onChange={(e) => setRegistrar(e.target.value)}
              placeholder="e.g. GoDaddy / Web4Africa"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-600" />
              <div>
                <div className="font-bold text-amber-900">Automate Expiry Alerts</div>
                <div className="text-[11px] text-amber-800">Email & SMS reminders at 60, 30, 14, 7 & 1 day</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={enableAlerts}
              onChange={(e) => setEnableAlerts(e.target.checked)}
              className="w-4 h-4 accent-red-600 rounded cursor-pointer"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow-xs cursor-pointer"
            >
              Start Monitoring
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
