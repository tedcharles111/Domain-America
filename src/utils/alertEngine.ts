import { AlertNotification, RegisteredDomain } from '../types';

export function calculateDaysRemaining(expiryDateStr: string): number {
  const now = new Date('2026-09-29T12:00:00Z').getTime();
  const expiry = new Date(expiryDateStr).getTime();
  const diffMs = expiry - now;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function evaluateDomainStatus(daysRemaining: number): RegisteredDomain['status'] {
  if (daysRemaining < -30) return 'expired';
  if (daysRemaining < 0) return 'grace_period';
  if (daysRemaining <= 14) return 'expiring_soon';
  return 'active';
}

export function createSimulatedNotification(
  domain: RegisteredDomain,
  channel: 'email' | 'sms' | 'webhook' | 'inApp' = 'email',
  customDays?: number
): AlertNotification {
  const days = customDays !== undefined ? customDays : domain.daysRemaining;
  let urgency: AlertNotification['urgency'] = 'info';
  let thresholdLabel = `${days} Days Remaining`;
  let title = '';
  let message = '';

  if (days <= 0) {
    urgency = 'critical';
    thresholdLabel = 'Grace Period (EXPIRED)';
    title = `URGENT: ${domain.domain} has entered 30-Day Registrar Grace Period`;
    message = `Your domain ${domain.domain} reached its expiration deadline. DomainKing has suspended active DNS resolution to protect your asset. Immediate renewal is required before the registry releases the name into public redemption.`;
  } else if (days <= 3) {
    urgency = 'critical';
    thresholdLabel = `${days} Days Left (CRITICAL)`;
    title = `CRITICAL ALERT: ${domain.domain} expires in ${days} day${days === 1 ? '' : 's'}`;
    message = `Immediate action required: ${domain.domain} will expire on ${domain.expiryDate}. ${domain.autoRenew ? 'Auto-renew is scheduled to process.' : 'Auto-renew is turned off. Please process manual payment immediately.'}`;
  } else if (days <= 14) {
    urgency = 'warning';
    thresholdLabel = `${days} Days Notice`;
    title = `Reminder: ${domain.domain} expires in ${days} days`;
    message = `Your domain ${domain.domain} is scheduled for expiration on ${domain.expiryDate}. Avoid website downtime and ensure your domain remains secured.`;
  } else {
    urgency = 'info';
    thresholdLabel = `${days} Days Advance Notice`;
    title = `Notice: Upcoming renewal for ${domain.domain}`;
    message = `This is an automated courtesy alert that ${domain.domain} will be up for renewal on ${domain.expiryDate}.`;
  }

  return {
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    domainId: domain.id,
    domain: domain.domain,
    timestamp: 'Just now',
    thresholdLabel,
    channel,
    status: 'delivered',
    urgency,
    title,
    message,
    daysRemaining: days
  };
}

export function formatCurrency(amount: number, currency: 'NGN' | 'USD'): string {
  if (currency === 'NGN') {
    return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
