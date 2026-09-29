export type Currency = 'NGN' | 'USD';

export interface TLDInfo {
  extension: string;
  category: 'popular' | 'african' | 'tech' | 'business';
  regPriceNGN: number;
  renewPriceNGN: number;
  promoPriceNGN?: number;
  regPriceUSD: number;
  renewPriceUSD: number;
  promoPriceUSD?: number;
  featured?: boolean;
  tag?: string;
  description: string;
}

export interface WhoisRecord {
  domain: string;
  registrar: string;
  createdDate: string;
  expiryDate: string;
  updatedDate: string;
  status: string[];
  nameServers: string[];
  registrantCountry: string;
  dnssec: string;
  rawWhois?: string;
}

export interface DomainCheckResult {
  domain: string;
  name: string;
  tld: string;
  isAvailable: boolean;
  status: 'available' | 'taken' | 'checking';
  regPriceNGN: number;
  renewPriceNGN: number;
  promoPriceNGN?: number;
  regPriceUSD: number;
  renewPriceUSD: number;
  dnsResolved?: boolean;
  dnsQueryTimeMs?: number;
  whoisData?: WhoisRecord;
  category?: string;
  tag?: string;
}

export interface RenewalAlertConfig {
  enabled: boolean;
  channels: {
    email: boolean;
    sms: boolean;
    webhook: boolean;
    inApp: boolean;
  };
  thresholds: {
    d60: boolean;
    d30: boolean;
    d14: boolean;
    d7: boolean;
    d3: boolean;
    d1: boolean;
    d0: boolean;
    grace: boolean;
  };
  destinationEmail: string;
  destinationPhone: string;
  webhookUrl: string;
}

export interface RegisteredDomain {
  id: string;
  domain: string;
  tld: string;
  registrationDate: string;
  expiryDate: string;
  daysRemaining: number;
  autoRenew: boolean;
  status: 'active' | 'expiring_soon' | 'expired' | 'grace_period';
  renewalPriceNGN: number;
  renewalPriceUSD: number;
  nameservers: string[];
  privacyEnabled: boolean;
  emailForwarding: boolean;
  alertConfig: RenewalAlertConfig;
  lastAlertSent?: {
    date: string;
    threshold: string;
    channel: string;
  };
}

export interface AlertNotification {
  id: string;
  domainId: string;
  domain: string;
  timestamp: string;
  thresholdLabel: string;
  channel: 'email' | 'sms' | 'webhook' | 'inApp';
  status: 'delivered' | 'pending';
  urgency: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  daysRemaining: number;
}

export interface CartItem {
  id: string;
  type: 'domain' | 'hosting' | 'addon';
  name: string;
  periodYears: number;
  priceNGN: number;
  priceUSD: number;
  renewPriceNGN: number;
  renewPriceUSD: number;
  details?: string;
  addons?: {
    whoisPrivacy: boolean;
    dnsManagement: boolean;
    automatedRenewalAlerts: boolean;
  };
}
