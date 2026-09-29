import React, { useState, useEffect } from 'react';
import { 
  Currency, 
  RegisteredDomain, 
  AlertNotification, 
  CartItem, 
  DomainCheckResult, 
  WhoisRecord, 
  RenewalAlertConfig 
} from './types';
import { 
  TLD_CATALOG, 
  INITIAL_REGISTERED_DOMAINS, 
  INITIAL_NOTIFICATIONS, 
  HOSTING_PLANS,
  GOOGLE_REVIEWS,
  GOOGLE_REVIEWS_ROW_2
} from './data/tldData';
import {
  getAllTargetDomainResults,
  buildDomainCheckResult,
  DOMAIN_FIXED_PRICE_NGN,
  DOMAIN_FIXED_PRICE_USD,
  TARGET_DOMAIN_NAMES
} from './data/domainSearchResults';
import { 
  cleanDomainInput, 
  checkSingleDomainAvailability, 
  checkBatchDomains,
  generateWhoisData
} from './utils/dnsChecker';
import { 
  calculateDaysRemaining, 
  evaluateDomainStatus, 
  createSimulatedNotification,
  formatCurrency
} from './utils/alertEngine';

// Components
import { Header } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { RealTimeResults } from './components/RealTimeResults';
import { RenewalAlertsPortal } from './components/RenewalAlertsPortal';
import { HostingPlans } from './components/HostingPlans';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { CtaBanner } from './components/CtaBanner';
import { FeatureSpotlights } from './components/FeatureSpotlights';
import { FaqSection } from './components/FaqSection';
import { AccreditationBar } from './components/AccreditationBar';
import { Footer } from './components/Footer';

// Modals
import { CartDrawer } from './components/Modals/CartDrawer';
import { WhoisModal } from './components/Modals/WhoisModal';
import { AlertConfigModal } from './components/Modals/AlertConfigModal';
import { AlertPreviewModal } from './components/Modals/AlertPreviewModal';
import { AddDomainModal } from './components/Modals/AddDomainModal';
import { RenewModal } from './components/Modals/RenewModal';

export default function App() {
  // Currency state
  const [currency, setCurrency] = useState<Currency>(() => {
    return (localStorage.getItem('dk_currency') as Currency) || 'NGN';
  });

  // Active view: 'home' or 'portal'
  const [activeView, setActiveView] = useState<'home' | 'portal'>('home');

  // Registered domains in portfolio
  const [domains, setDomains] = useState<RegisteredDomain[]>(() => {
    const saved = localStorage.getItem('dk_domains');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_REGISTERED_DOMAINS;
  });

  // Automated Alert Notifications log
  const [notifications, setNotifications] = useState<AlertNotification[]>(() => {
    const saved = localStorage.getItem('dk_notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('dk_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [];
  });

  // Pre-load all target domains
  const allTargets = getAllTargetDomainResults();

  // Search state
  const [searchTerm, setSearchTerm] = useState('ExperienceTech.com');
  const [isSearching, setIsSearching] = useState(false);
  const [primaryResult, setPrimaryResult] = useState<DomainCheckResult | null>(() => allTargets[0]);
  const [alternatives, setAlternatives] = useState<DomainCheckResult[]>(() => allTargets.slice(1));

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedWhois, setSelectedWhois] = useState<WhoisRecord | null>(null);
  const [selectedDomainForConfig, setSelectedDomainForConfig] = useState<RegisteredDomain | null>(null);
  const [selectedNotificationForPreview, setSelectedNotificationForPreview] = useState<AlertNotification | null>(null);
  const [selectedDomainForRenew, setSelectedDomainForRenew] = useState<RegisteredDomain | null>(null);
  const [isAddDomainOpen, setIsAddDomainOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('dk_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('dk_domains', JSON.stringify(domains));
  }, [domains]);

  useEffect(() => {
    localStorage.setItem('dk_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('dk_cart', JSON.stringify(cart));
  }, [cart]);

  // Real-time Domain Search Handler
  const handleSearch = async (rawQuery: string) => {
    if (!rawQuery.trim()) return;
    setIsSearching(true);
    setSearchTerm(rawQuery);

    const { cleanName } = cleanDomainInput(rawQuery);
    const normalizedQuery = rawQuery.trim().toLowerCase().replace(/^www\./, '');
    
    // Check if the query matches one of our target domains
    const all = getAllTargetDomainResults();
    let foundIndex = all.findIndex(d => d.domain.toLowerCase() === normalizedQuery);
    if (foundIndex === -1) {
      foundIndex = all.findIndex(d => d.domain.toLowerCase().startsWith(cleanName.toLowerCase()));
    }

    await new Promise(r => setTimeout(r, 220));

    if (foundIndex !== -1) {
      const selected = all[foundIndex];
      setPrimaryResult(selected);
      setAlternatives(all.filter((_, i) => i !== foundIndex));
    } else {
      // Build result for query with 114,000 Naira pricing
      const domainName = normalizedQuery.includes('.') ? normalizedQuery : `${cleanName}.com`;
      const customPrimary = buildDomainCheckResult(domainName, 'core', 'CUSTOM SEARCH');
      setPrimaryResult(customPrimary);
      setAlternatives(all);
    }

    // Ensure we are viewing home
    if (activeView !== 'home') {
      setActiveView('home');
    }
    setIsSearching(false);
  };

  // Cart operations
  const handleAddToCart = (domainResult: DomainCheckResult, periodYears: number) => {
    const newItem: CartItem = {
      id: `cart-${Date.now()}-${domainResult.domain}`,
      type: 'domain',
      name: domainResult.domain,
      periodYears,
      priceNGN: domainResult.regPriceNGN,
      priceUSD: domainResult.regPriceUSD,
      renewPriceNGN: domainResult.renewPriceNGN,
      renewPriceUSD: domainResult.renewPriceUSD,
      addons: {
        whoisPrivacy: true,
        dnsManagement: true,
        automatedRenewalAlerts: true
      }
    };

    setCart(prev => [...prev.filter(item => item.name !== domainResult.domain), newItem]);
    showToast(`Added ${domainResult.domain} to cart with Automated Renewal Alerts!`);
  };

  const handleChooseHostingPlan = (plan: typeof HOSTING_PLANS[0]) => {
    const newItem: CartItem = {
      id: `cart-plan-${Date.now()}`,
      type: 'hosting',
      name: `${plan.title} (Annual Package)`,
      periodYears: 1,
      priceNGN: plan.priceNGN * 12,
      priceUSD: plan.priceUSD * 12,
      renewPriceNGN: plan.priceNGN * 12,
      renewPriceUSD: plan.priceUSD * 12,
      details: 'Includes free .com.ng domain & automated renewal alerts'
    };

    setCart(prev => [...prev, newItem]);
    setIsCartOpen(true);
    showToast(`Added ${plan.title} to your shopping cart!`);
  };

  const handleRemoveCartItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateCartPeriod = (id: string, years: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, periodYears: years } : item));
  };

  const handleToggleAddon = (id: string, addonKey: 'whoisPrivacy' | 'dnsManagement' | 'automatedRenewalAlerts') => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.addons) {
        return {
          ...item,
          addons: {
            ...item.addons,
            [addonKey]: !item.addons[addonKey]
          }
        };
      }
      return item;
    }));
  };

  const handleCheckout = () => {
    // Process items in cart into registered domains
    const newDomains: RegisteredDomain[] = [];
    const newNotifs: AlertNotification[] = [];

    cart.forEach(item => {
      if (item.type === 'domain') {
        const domainParts = item.name.split('.');
        const tld = domainParts.length > 2 ? `.${domainParts.slice(-2).join('.')}` : `.${domainParts.slice(-1)}`;
        const regDate = '2026-09-29';
        const expDate = `${2026 + item.periodYears}-09-29`;
        const days = item.periodYears * 365;

        const regDom: RegisteredDomain = {
          id: `dom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          domain: item.name,
          tld,
          registrationDate: regDate,
          expiryDate: expDate,
          daysRemaining: days,
          autoRenew: true,
          status: 'active',
          renewalPriceNGN: item.renewPriceNGN,
          renewalPriceUSD: item.renewPriceUSD,
          nameservers: ['ns1.domainking.ng', 'ns2.domainking.ng'],
          privacyEnabled: true,
          emailForwarding: true,
          alertConfig: {
            enabled: true,
            channels: { email: true, sms: true, webhook: false, inApp: true },
            thresholds: { d60: true, d30: true, d14: true, d7: true, d3: true, d1: true, d0: true, grace: true },
            destinationEmail: 'tedcharleschinekezi@gmail.com',
            destinationPhone: '+234 803 123 4567',
            webhookUrl: ''
          }
        };

        newDomains.push(regDom);

        const notif: AlertNotification = {
          id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          domainId: regDom.id,
          domain: regDom.domain,
          timestamp: 'Just now',
          thresholdLabel: 'Registration & Alert Engine Active',
          channel: 'email',
          status: 'delivered',
          urgency: 'info',
          title: `Domain ${regDom.domain} successfully registered`,
          message: `Your domain is live with DNS active. Automated renewal alerts have been initialized for 60d, 30d, 14d, 7d, and 1d intervals.`,
          daysRemaining: days
        };
        newNotifs.push(notif);
      }
    });

    if (newDomains.length > 0) {
      setDomains(prev => [...newDomains, ...prev]);
      setNotifications(prev => [...newNotifs, ...prev]);
    }

    setCart([]);
    setIsCartOpen(false);
    setActiveView('portal');
    showToast('Registration successful! Domain and automated alerts are now active.');
  };

  // Auto-Renew Toggle
  const handleToggleAutoRenew = (domainId: string) => {
    setDomains(prev => prev.map(d => {
      if (d.id === domainId) {
        const nextState = !d.autoRenew;
        showToast(
          nextState
            ? `Auto-Renew enabled for ${d.domain}. Card will be debited 7 days before expiry.`
            : `Auto-Renew disabled for ${d.domain}. Multi-channel expiry alerts remain active.`
        );
        return { ...d, autoRenew: nextState };
      }
      return d;
    }));
  };

  // Renew Confirmation
  const handleConfirmRenewal = (domainId: string, additionalYears: number) => {
    setDomains(prev => prev.map(d => {
      if (d.id === domainId) {
        const currentYear = parseInt(d.expiryDate.split('-')[0]) || 2026;
        const restOfDate = d.expiryDate.substring(4);
        const newExpiry = `${currentYear + additionalYears}${restOfDate}`;
        const daysRemaining = calculateDaysRemaining(newExpiry);
        const status = evaluateDomainStatus(daysRemaining);

        // Add renewal log
        const notif: AlertNotification = {
          id: `notif-${Date.now()}`,
          domainId: d.id,
          domain: d.domain,
          timestamp: 'Just now',
          thresholdLabel: 'Renewal Processed',
          channel: 'email',
          status: 'delivered',
          urgency: 'info',
          title: `Renewal Confirmed: ${d.domain} extended by ${additionalYears} year(s)`,
          message: `Your renewal payment was successful. Next expiration date is ${newExpiry}. Thank you for securing your brand with DomainKing.`,
          daysRemaining
        };
        setNotifications(n => [notif, ...n]);

        showToast(`Successfully renewed ${d.domain} for ${additionalYears} year(s)!`);
        return {
          ...d,
          expiryDate: newExpiry,
          daysRemaining,
          status
        };
      }
      return d;
    }));
  };

  // Trigger test alert simulation
  const handleTriggerTestAlert = (domain: RegisteredDomain, channel: 'email' | 'sms' | 'webhook') => {
    const testNotif = createSimulatedNotification(domain, channel);
    setNotifications(prev => [testNotif, ...prev]);
    setSelectedNotificationForPreview(testNotif);
    showToast(`Automated test alert dispatched for ${domain.domain}!`);
  };

  // Run automated audit across all domains
  const handleRunAutomatedAudit = () => {
    let triggeredCount = 0;
    const newAlerts: AlertNotification[] = [];

    domains.forEach(d => {
      if (d.daysRemaining <= 14 && d.alertConfig.enabled) {
        triggeredCount++;
        newAlerts.push(createSimulatedNotification(d, 'email'));
      }
    });

    if (newAlerts.length > 0) {
      setNotifications(prev => [...newAlerts, ...prev]);
      showToast(`Expiry Audit complete: Dispatched ${triggeredCount} automated renewal warnings.`);
    } else {
      showToast('Expiry Audit complete: All monitored domains are up-to-date.');
    }
  };

  // Save domain alert config
  const handleSaveAlertConfig = (domainId: string, updatedConfig: RenewalAlertConfig) => {
    setDomains(prev => prev.map(d => d.id === domainId ? { ...d, alertConfig: updatedConfig } : d));
    showToast('Automated alert preferences saved successfully.');
  };

  // Add external domain
  const handleAddExternalDomain = (newDomain: RegisteredDomain) => {
    setDomains(prev => [newDomain, ...prev]);
    const welcomeNotif: AlertNotification = {
      id: `notif-${Date.now()}`,
      domainId: newDomain.id,
      domain: newDomain.domain,
      timestamp: 'Just now',
      thresholdLabel: 'External Watchlist Active',
      channel: 'email',
      status: 'delivered',
      urgency: 'info',
      title: `Watchlist Activated: ${newDomain.domain}`,
      message: `DomainKing will automatically alert you before this domain expires on ${newDomain.expiryDate}.`,
      daysRemaining: newDomain.daysRemaining
    };
    setNotifications(prev => [welcomeNotif, ...prev]);
    showToast(`Added ${newDomain.domain} to automated renewal alerts monitor!`);
  };

  // Expiring soon count
  const expiringCount = domains.filter(d => d.daysRemaining <= 14).length;
  const cartItemNames = new Set(cart.map(c => c.name));

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-red-500 selection:text-white">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-semibold animate-in fade-in slide-in-from-bottom-4 duration-200 max-w-md">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        currency={currency}
        onCurrencyChange={setCurrency}
        cartCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
        expiringCount={expiringCount}
        onOpenPortal={() => setActiveView('portal')}
        onOpenWhois={() => {
          setSelectedWhois(generateWhoisData('domainking.ng', '.ng'));
        }}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {activeView === 'portal' ? (
          <RenewalAlertsPortal
            domains={domains}
            notifications={notifications}
            currency={currency}
            onToggleAutoRenew={handleToggleAutoRenew}
            onOpenRenewModal={(dom) => setSelectedDomainForRenew(dom)}
            onOpenAlertConfigModal={(dom) => setSelectedDomainForConfig(dom)}
            onTriggerTestAlert={handleTriggerTestAlert}
            onOpenAddDomainModal={() => setIsAddDomainOpen(true)}
            onViewNotificationDetail={(notif) => setSelectedNotificationForPreview(notif)}
            onRunAutomatedAudit={handleRunAutomatedAudit}
          />
        ) : (
          <>
            {/* Hero Domain Search Section */}
            <HeroSearch
              currency={currency}
              onSearch={handleSearch}
              isSearching={isSearching}
            />

            {/* Real-Time Search Results Section */}
            {primaryResult && (
              <RealTimeResults
                primaryResult={primaryResult}
                alternatives={alternatives}
                currency={currency}
                onAddToCart={handleAddToCart}
                cartItemNames={cartItemNames}
                onInspectWhois={(whois) => setSelectedWhois(whois)}
                searchTerm={searchTerm}
              />
            )}

            {/* 3 Product Cards: Web Hosting, WordPress Hosting, Site Builder */}
            <HostingPlans
              currency={currency}
              onChoosePlan={handleChooseHostingPlan}
            />

            {/* Value Proposition & Server Health Mock: Why Choose DomainKing */}
            <WhyChooseUs />

            {/* Google Reviews Carousel/Grid */}
            <ReviewsSection />

            {/* Join Thousands of Happy Customers CTA Banner */}
            <CtaBanner
              onGetStarted={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 3 Feature Spotlights with Generated Photography */}
            <FeatureSpotlights />

            {/* Second Row of Customer Reviews */}
            <ReviewsSection
              reviews={GOOGLE_REVIEWS_ROW_2}
            />

            {/* Second CTA Banner */}
            <CtaBanner
              onGetStarted={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Frequently Asked Questions Accordion */}
            <FaqSection />

            {/* Registry Accreditation Bar */}
            <AccreditationBar />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenPortal={() => setActiveView('portal')}
        onOpenWhois={() => {
          setSelectedWhois(generateWhoisData('domainking.ng', '.ng'));
        }}
      />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        currency={currency}
        onRemoveItem={handleRemoveCartItem}
        onUpdatePeriod={handleUpdateCartPeriod}
        onToggleAddon={handleToggleAddon}
        onCheckout={handleCheckout}
      />

      <WhoisModal
        whois={selectedWhois}
        onClose={() => setSelectedWhois(null)}
      />

      <AlertConfigModal
        domain={selectedDomainForConfig}
        isOpen={!!selectedDomainForConfig}
        onClose={() => setSelectedDomainForConfig(null)}
        onSave={handleSaveAlertConfig}
      />

      <AlertPreviewModal
        notification={selectedNotificationForPreview}
        onClose={() => setSelectedNotificationForPreview(null)}
        onRenewTarget={(domName) => {
          const target = domains.find(d => d.domain === domName);
          if (target) setSelectedDomainForRenew(target);
        }}
      />

      <AddDomainModal
        isOpen={isAddDomainOpen}
        onClose={() => setIsAddDomainOpen(false)}
        onAddDomain={handleAddExternalDomain}
      />

      <RenewModal
        domain={selectedDomainForRenew}
        isOpen={!!selectedDomainForRenew}
        currency={currency}
        onClose={() => setSelectedDomainForRenew(null)}
        onConfirmRenewal={handleConfirmRenewal}
      />

    </div>
  );
}
