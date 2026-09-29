import React, { useState } from 'react';
import { AlertNotification } from '../../types';
import { 
  X, 
  Mail, 
  MessageSquare, 
  Webhook, 
  Crown, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Send,
  ExternalLink
} from 'lucide-react';

interface AlertPreviewModalProps {
  notification: AlertNotification | null;
  onClose: () => void;
  onRenewTarget?: (domainName: string) => void;
}

export const AlertPreviewModal: React.FC<AlertPreviewModalProps> = ({
  notification,
  onClose,
  onRenewTarget
}) => {
  const [viewMode, setViewMode] = useState<'email' | 'sms' | 'webhook'>('email');

  if (!notification) return null;

  const isGrace = notification.daysRemaining <= 0;
  const isUrgent = notification.daysRemaining > 0 && notification.daysRemaining <= 7;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-100 text-red-600">
              <Send className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Automated Renewal Alert Preview
              </h3>
              <p className="text-xs text-slate-500">
                Live simulation of the multi-channel notification sent by DomainKing's alert engine.
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

        {/* View Mode Tabs */}
        <div className="px-6 pt-3 pb-2 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
          <button
            onClick={() => setViewMode('email')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'email'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Template</span>
          </button>
          <button
            onClick={() => setViewMode('sms')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'sms'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>SMS Message</span>
          </button>
          <button
            onClick={() => setViewMode('webhook')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'webhook'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Webhook className="w-3.5 h-3.5" />
            <span>Slack / Webhook JSON</span>
          </button>
        </div>

        {/* Content Renderers */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* 1. Email Template View */}
          {viewMode === 'email' && (
            <div className="max-w-lg mx-auto border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
              {/* Email Envelope Header */}
              <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 text-xs space-y-1 text-slate-600 font-mono">
                <div><strong className="text-slate-900 font-sans">From:</strong> DomainKing Alert Engine &lt;renewals@domainking.ng&gt;</div>
                <div><strong className="text-slate-900 font-sans">To:</strong> tedcharleschinekezi@gmail.com</div>
                <div><strong className="text-slate-900 font-sans">Subject:</strong> {notification.title}</div>
              </div>

              {/* Email Body */}
              <div className="p-6">
                {/* Brand Banner */}
                <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-base text-slate-900">
                      Domain<span className="text-red-600">King</span>
                    </span>
                    <span className="text-[10px] text-slate-400 block -mt-1 font-semibold uppercase">
                      Automated Domain Protection System
                    </span>
                  </div>
                </div>

                {/* Status Notice Card */}
                <div className={`p-4 rounded-xl mb-4 ${
                  isGrace
                    ? 'bg-rose-50 border border-rose-200 text-rose-900'
                    : isUrgent
                    ? 'bg-amber-50 border border-amber-200 text-amber-900'
                    : 'bg-blue-50 border border-blue-200 text-blue-900'
                }`}>
                  <div className="flex items-center gap-2 font-bold text-xs">
                    {isGrace ? <AlertTriangle className="w-4 h-4 text-rose-600" /> : <Clock className="w-4 h-4 text-amber-600" />}
                    <span>{notification.thresholdLabel}</span>
                  </div>
                  <h4 className="mt-1 font-extrabold text-base">
                    {notification.domain}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed">
                    {notification.message}
                  </p>
                </div>

                {/* Checklist of what happens if expired */}
                <div className="space-y-2 mb-6 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl">
                  <div className="font-bold text-slate-800">What happens if you do not renew:</div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>Website & DNS traffic immediately suspends</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>Business email sending and receiving halts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>Domain enters registry redemption penalty period</span>
                  </div>
                </div>

                {/* Big Action Button */}
                <button
                  onClick={() => {
                    onClose();
                    if (onRenewTarget) onRenewTarget(notification.domain);
                  }}
                  className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>RENEW {notification.domain.toUpperCase()} NOW</span>
                  <ExternalLink className="w-4 h-4" />
                </button>

                <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
                  This automated message was sent by DomainKing.ng according to your alert thresholds.
                </div>
              </div>
            </div>
          )}

          {/* 2. Direct SMS View */}
          {viewMode === 'sms' && (
            <div className="max-w-xs mx-auto bg-slate-900 rounded-[2.5rem] p-4 border-4 border-slate-800 shadow-2xl">
              <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-4" />
              <div className="text-center text-xs text-slate-400 font-bold mb-3">
                SMS from <span className="text-white">DomainKing</span>
              </div>
              <div className="bg-slate-800/80 rounded-2xl p-4 text-xs text-slate-200 font-sans leading-relaxed border border-slate-700">
                <div className="text-[10px] text-amber-400 font-bold uppercase mb-1 tracking-wider">
                  Official Registry Alert
                </div>
                {notification.message}
                <div className="mt-3 text-red-400 font-mono text-[11px]">
                  https://domainking.ng/renew/{notification.domain}
                </div>
                <div className="mt-2 text-[10px] text-slate-400 text-right">
                  Delivered via MTN/Airtel SMS Gateway
                </div>
              </div>
            </div>
          )}

          {/* 3. Webhook JSON View */}
          {viewMode === 'webhook' && (
            <div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Webhook Event Payload (POST /webhooks/domain-expiry)
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
{JSON.stringify({
  event: "domain.renewal_alert",
  domain_id: notification.domainId,
  domain: notification.domain,
  threshold: notification.thresholdLabel,
  urgency: notification.urgency,
  days_remaining: notification.daysRemaining,
  timestamp: "2026-09-29T10:32:00Z",
  action_required: true,
  auto_renew_enabled: false,
  payment_link: `https://domainking.ng/client/renew?domain=${notification.domain}`,
  contact: {
    email: "tedcharleschinekezi@gmail.com",
    phone: "+2348031234567"
  }
}, null, 2)}
              </pre>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Delivered in 28ms via automated background daemon
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Close Preview
          </button>
        </div>

      </div>
    </div>
  );
};
