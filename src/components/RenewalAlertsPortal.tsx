import React, { useState } from 'react';
import { 
  RegisteredDomain, 
  AlertNotification, 
  Currency, 
  RenewalAlertConfig 
} from '../types';
import { formatCurrency } from '../utils/alertEngine';
import { 
  Bell, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  Mail, 
  MessageSquare, 
  Webhook, 
  RefreshCw, 
  CheckCircle2, 
  Plus, 
  Settings, 
  Send, 
  Calendar,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';

interface RenewalAlertsPortalProps {
  domains: RegisteredDomain[];
  notifications: AlertNotification[];
  currency: Currency;
  onToggleAutoRenew: (domainId: string) => void;
  onOpenRenewModal: (domain: RegisteredDomain) => void;
  onOpenAlertConfigModal: (domain: RegisteredDomain) => void;
  onTriggerTestAlert: (domain: RegisteredDomain, channel: 'email' | 'sms' | 'webhook') => void;
  onOpenAddDomainModal: () => void;
  onViewNotificationDetail: (notif: AlertNotification) => void;
  onRunAutomatedAudit: () => void;
}

export const RenewalAlertsPortal: React.FC<RenewalAlertsPortalProps> = ({
  domains,
  notifications,
  currency,
  onToggleAutoRenew,
  onOpenRenewModal,
  onOpenAlertConfigModal,
  onTriggerTestAlert,
  onOpenAddDomainModal,
  onViewNotificationDetail,
  onRunAutomatedAudit
}) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'logs' | 'settings'>('portfolio');

  // Metrics
  const expiringSoonCount = domains.filter(d => d.daysRemaining <= 30 && d.daysRemaining >= 0).length;
  const gracePeriodCount = domains.filter(d => d.daysRemaining < 0).length;
  const autoRenewCount = domains.filter(d => d.autoRenew).length;
  const alertsDispatchedCount = notifications.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-600">
              <Bell className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Automated Renewal Alerts & Domain Portfolio
            </h1>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Intelligent multi-channel expiration monitoring (60d, 30d, 14d, 7d, 3d, 1d & Grace Period) across your registered domains.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRunAutomatedAudit}
            className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            title="Scan domain expiration status now"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Run Expiry Audit</span>
          </button>
          <button
            onClick={onOpenAddDomainModal}
            className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add External Domain</span>
          </button>
        </div>
      </div>

      {/* Expiration Warning Alert Banner if urgent domains exist */}
      {(expiringSoonCount > 0 || gracePeriodCount > 0) && (
        <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                Action Required: {expiringSoonCount + gracePeriodCount} domain(s) need immediate attention
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                Automated alerts have been triggered to your registered email and phone. Renew now to avoid DNS interruption and registry redemption fees.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const urgentDomain = domains.find(d => d.daysRemaining <= 14);
              if (urgentDomain) onOpenRenewModal(urgentDomain);
            }}
            className="px-4 py-2 text-xs font-bold text-amber-950 bg-amber-300 hover:bg-amber-400 rounded-lg whitespace-nowrap transition-colors cursor-pointer"
          >
            Renew Expiring Domains
          </button>
        </div>
      )}

      {/* Key Metric Counters */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Monitored Domains
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900 tabular-nums">
            {domains.length}
          </div>
          <div className="mt-1 text-xs text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>100% covered by alert engine</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Expiring &le; 30 Days
          </div>
          <div className="mt-2 text-3xl font-extrabold text-red-600 tabular-nums">
            {expiringSoonCount + gracePeriodCount}
          </div>
          <div className="mt-1 text-xs text-red-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-red-500" />
            <span>High alert dispatch state</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Auto-Renew Protection
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900 tabular-nums">
            {autoRenewCount} <span className="text-sm font-medium text-slate-400">/ {domains.length}</span>
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Automatic card renewal enabled
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Alerts Dispatched (Log)
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900 tabular-nums">
            {alertsDispatchedCount}
          </div>
          <div className="mt-1 text-xs text-slate-400 flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-blue-500" />
            <span>Email, SMS & Webhooks</span>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="mt-8 flex items-center gap-2 border-b border-slate-200 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`pb-3 px-3 relative cursor-pointer ${
            activeTab === 'portfolio'
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Domain Portfolio ({domains.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`pb-3 px-3 relative cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'logs'
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Automated Alert Logs</span>
          <span className="px-1.5 py-0.5 text-[10px] bg-slate-100 rounded-full font-bold">
            {notifications.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 px-3 relative cursor-pointer ${
            activeTab === 'settings'
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Alert Channels & Policy</span>
        </button>
      </div>

      {/* Tab 1: Domain Portfolio Table */}
      {activeTab === 'portfolio' && (
        <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Domain Name</th>
                  <th className="py-3.5 px-4">Expiration Date</th>
                  <th className="py-3.5 px-4">Status & Days Left</th>
                  <th className="py-3.5 px-4">Auto-Renew</th>
                  <th className="py-3.5 px-4">Alert Config</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {domains.map((dom) => {
                  const isCritical = dom.daysRemaining <= 5;
                  const isWarning = dom.daysRemaining > 5 && dom.daysRemaining <= 30;
                  const renewalPrice = currency === 'NGN' ? dom.renewalPriceNGN : dom.renewalPriceUSD;

                  return (
                    <tr key={dom.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Domain Name */}
                      <td className="py-4 px-6">
                        <div className="font-extrabold text-slate-900 text-base">
                          {dom.domain}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                          <span>DNS: {dom.nameservers[0]}</span>
                          <span>·</span>
                          <span className={dom.privacyEnabled ? 'text-emerald-600' : 'text-slate-400'}>
                            {dom.privacyEnabled ? 'WHOIS Privacy Protected' : 'Public WHOIS'}
                          </span>
                        </div>
                      </td>

                      {/* Expiration Date */}
                      <td className="py-4 px-4 font-mono text-xs text-slate-700 tabular-nums">
                        <div className="font-semibold text-slate-900">{dom.expiryDate}</div>
                        <div className="text-[11px] text-slate-400">Renews at {formatCurrency(renewalPrice, currency)}</div>
                      </td>

                      {/* Status & Days Left */}
                      <td className="py-4 px-4">
                        {dom.status === 'grace_period' ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-100 text-rose-800 text-xs font-bold animate-pulse">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                            <span>Expired 2d ago (Grace Period)</span>
                          </div>
                        ) : isCritical ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-100 text-red-800 text-xs font-bold">
                            <Clock className="w-3.5 h-3.5 text-red-600 animate-spin" />
                            <span>{dom.daysRemaining} days remaining!</span>
                          </div>
                        ) : isWarning ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-semibold">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>{dom.daysRemaining} days remaining</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Active ({dom.daysRemaining} days)</span>
                          </div>
                        )}
                      </td>

                      {/* Auto Renew Toggle */}
                      <td className="py-4 px-4">
                        <button
                          onClick={() => onToggleAutoRenew(dom.id)}
                          className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer group"
                          title="Click to toggle auto-renew"
                        >
                          {dom.autoRenew ? (
                            <>
                              <ToggleRight className="w-7 h-7 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
                              <span className="text-emerald-700 font-bold">ENABLED</span>
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-7 h-7 text-slate-400 group-hover:text-slate-500 transition-colors" />
                              <span className="text-slate-500">OFF</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Alert Config Status */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1 text-slate-600">
                          {dom.alertConfig.channels.email && (
                            <span className="p-1 rounded bg-slate-100 text-slate-700" title="Email alerts active">
                              <Mail className="w-3.5 h-3.5" />
                            </span>
                          )}
                          {dom.alertConfig.channels.sms && (
                            <span className="p-1 rounded bg-slate-100 text-slate-700" title="SMS alerts active">
                              <MessageSquare className="w-3.5 h-3.5" />
                            </span>
                          )}
                          {dom.alertConfig.channels.webhook && (
                            <span className="p-1 rounded bg-slate-100 text-slate-700" title="Webhook alerts active">
                              <Webhook className="w-3.5 h-3.5" />
                            </span>
                          )}
                          <span className="text-xs text-slate-500 font-medium ml-1">
                            {dom.alertConfig.enabled ? 'Active Alerts' : 'Paused'}
                          </span>
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onTriggerTestAlert(dom, 'email')}
                            className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
                            title="Test alert notification dispatch"
                          >
                            <Send className="w-3 h-3 text-amber-600" />
                            <span className="hidden xl:inline">Test Alert</span>
                          </button>

                          <button
                            onClick={() => onOpenAlertConfigModal(dom)}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                            title="Configure Alert Thresholds & Channels"
                          >
                            <Settings className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => onOpenRenewModal(dom)}
                            className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer whitespace-nowrap"
                          >
                            Renew Now
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Alert Dispatch History & Logs */}
      {activeTab === 'logs' && (
        <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Dispatched Automated Expiration Notices
              </h3>
              <p className="text-xs text-slate-500">
                Log of automated warnings triggered across email, SMS, and developer webhooks.
              </p>
            </div>
            <button
              onClick={() => {
                if (domains.length > 0) {
                  onTriggerTestAlert(domains[0], 'email');
                }
              }}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Simulate Instant Alert Dispatch</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => onViewNotificationDetail(notif)}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 p-3 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg mt-0.5 ${
                    notif.urgency === 'critical'
                      ? 'bg-red-100 text-red-700'
                      : notif.urgency === 'warning'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {notif.channel === 'email' ? (
                      <Mail className="w-4 h-4" />
                    ) : notif.channel === 'sms' ? (
                      <MessageSquare className="w-4 h-4" />
                    ) : (
                      <Webhook className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-sm text-slate-900 group-hover:text-red-600 transition-colors">
                        {notif.title}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                        {notif.channel.toUpperCase()}
                      </span>
                      <span className="text-xs text-slate-400">· {notif.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                      {notif.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                    Delivered ✓
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Alert Policy & Schedule Configuration */}
      {activeTab === 'settings' && (
        <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
          <div className="max-w-3xl">
            <h3 className="text-lg font-bold text-slate-900">
              Automated Alert Schedule & Delivery Channels
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              DomainKing's automated daemon monitors domain registries 24/7. When expiration reaches these defined milestones, notifications are automatically dispatched.
            </p>

            <div className="mt-6 space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Multi-Threshold Expiry Cadence</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Standard alerts fire at <strong>60 days</strong>, <strong>30 days</strong>, <strong>14 days</strong>, <strong>7 days</strong>, <strong>3 days</strong>, <strong>1 day</strong>, on <strong>Expiry Day (0d)</strong>, and during the <strong>30-day Registrar Grace Period</strong>.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-bold shrink-0">
                  Enforced
                </span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Email Alerts</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Delivered with cryptographic SPF/DKIM authentication and one-click quick-renewal links.
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-700 font-semibold">
                  tedcharleschinekezi@gmail.com
                </span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">SMS / WhatsApp Gateway</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    High-priority direct SMS alerts via Nigerian telecom networks (MTN, Airtel, Glo, 9mobile).
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-700 font-semibold">
                  +234 803 123 4567
                </span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Slack / DevOps Webhook</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    POST JSON payloads to your engineering webhook URL so team leads never miss an expiration.
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-500 truncate max-w-xs">
                  https://hooks.slack.com/services/...
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
