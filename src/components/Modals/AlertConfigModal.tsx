import React, { useState } from 'react';
import { RegisteredDomain, RenewalAlertConfig } from '../../types';
import { 
  X, 
  Bell, 
  Mail, 
  MessageSquare, 
  Webhook, 
  CheckCircle2, 
  Save, 
  ShieldCheck,
  Clock
} from 'lucide-react';

interface AlertConfigModalProps {
  domain: RegisteredDomain | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (domainId: string, updatedConfig: RenewalAlertConfig) => void;
}

export const AlertConfigModal: React.FC<AlertConfigModalProps> = ({
  domain,
  isOpen,
  onClose,
  onSave
}) => {
  if (!isOpen || !domain) return null;

  const [config, setConfig] = useState<RenewalAlertConfig>({
    ...domain.alertConfig
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(domain.id, config);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Automated Renewal Alert Preferences
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

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6 text-sm flex-1">
          
          {/* Master Enable/Disable */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900">Enable Automated Alerts Daemon</div>
              <div className="text-xs text-slate-500 mt-0.5">
                Automatically scans and dispatches notifications at key milestones.
              </div>
            </div>
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
              className="w-5 h-5 accent-red-600 rounded cursor-pointer"
            />
          </div>

          {/* Delivery Channels */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              Delivery Channels
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-xs text-slate-900">Email Notification</span>
                </div>
                <input
                  type="checkbox"
                  checked={config.channels.email}
                  onChange={(e) => setConfig({
                    ...config,
                    channels: { ...config.channels, email: e.target.checked }
                  })}
                  className="w-4 h-4 accent-red-600 rounded cursor-pointer"
                />
              </label>

              <label className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-xs text-slate-900">SMS / WhatsApp</span>
                </div>
                <input
                  type="checkbox"
                  checked={config.channels.sms}
                  onChange={(e) => setConfig({
                    ...config,
                    channels: { ...config.channels, sms: e.target.checked }
                  })}
                  className="w-4 h-4 accent-red-600 rounded cursor-pointer"
                />
              </label>

              <label className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Webhook className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold text-xs text-slate-900">Slack / Webhook</span>
                </div>
                <input
                  type="checkbox"
                  checked={config.channels.webhook}
                  onChange={(e) => setConfig({
                    ...config,
                    channels: { ...config.channels, webhook: e.target.checked }
                  })}
                  className="w-4 h-4 accent-red-600 rounded cursor-pointer"
                />
              </label>

              <label className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-600" />
                  <span className="font-semibold text-xs text-slate-900">In-Portal Push</span>
                </div>
                <input
                  type="checkbox"
                  checked={config.channels.inApp}
                  onChange={(e) => setConfig({
                    ...config,
                    channels: { ...config.channels, inApp: e.target.checked }
                  })}
                  className="w-4 h-4 accent-red-600 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Alert Thresholds */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Expiration Warning Cadence
            </label>
            <p className="text-xs text-slate-500 mb-3">
              Select which timeline checkpoints trigger an automated notification.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { key: 'd60', label: '60 Days' },
                { key: 'd30', label: '30 Days' },
                { key: 'd14', label: '14 Days' },
                { key: 'd7', label: '7 Days' },
                { key: 'd3', label: '3 Days' },
                { key: 'd1', label: '1 Day' },
                { key: 'd0', label: 'Expiry Day' },
                { key: 'grace', label: 'Grace Period' }
              ].map(({ key, label }) => {
                const isChecked = config.thresholds[key as keyof typeof config.thresholds];
                return (
                  <label
                    key={key}
                    className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                      isChecked
                        ? 'border-red-300 bg-red-50 text-red-900'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{label}</span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setConfig({
                        ...config,
                        thresholds: {
                          ...config.thresholds,
                          [key]: e.target.checked
                        }
                      })}
                      className="accent-red-600"
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* Contact Destinations */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Destination Alert Email
              </label>
              <input
                type="email"
                value={config.destinationEmail}
                onChange={(e) => setConfig({ ...config, destinationEmail: e.target.value })}
                placeholder="you@domain.ng"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                SMS / Mobile Phone Number
              </label>
              <input
                type="tel"
                value={config.destinationPhone}
                onChange={(e) => setConfig({ ...config, destinationPhone: e.target.value })}
                placeholder="+234 803 123 4567"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Webhook URL (Slack, Discord, Custom API)
              </label>
              <input
                type="url"
                value={config.webhookUrl}
                onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                placeholder="https://hooks.slack.com/services/..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Alert Policy</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
