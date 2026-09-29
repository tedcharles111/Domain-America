import { TLDInfo } from '../types';

export const TLD_CATALOG: TLDInfo[] = [
  {
    extension: '.com.ng',
    category: 'african',
    regPriceNGN: 5999,
    renewPriceNGN: 6449,
    promoPriceNGN: 5999,
    regPriceUSD: 4.50,
    renewPriceUSD: 4.90,
    promoPriceUSD: 4.50,
    featured: true,
    tag: 'POPULAR NIGERIA',
    description: 'The premier choice for businesses and individuals in Nigeria.'
  },
  {
    extension: '.com',
    category: 'popular',
    regPriceNGN: 17000,
    renewPriceNGN: 17738,
    promoPriceNGN: 17000,
    regPriceUSD: 11.99,
    renewPriceUSD: 12.99,
    promoPriceUSD: 11.99,
    featured: true,
    tag: 'GLOBAL STANDARD',
    description: 'The most recognized and authoritative extension worldwide.'
  },
  {
    extension: '.ng',
    category: 'african',
    regPriceNGN: 17500,
    renewPriceNGN: 18500,
    regPriceUSD: 12.50,
    renewPriceUSD: 13.50,
    featured: true,
    tag: 'NATIONAL IDENTITY',
    description: 'Direct national top-level domain for Nigerian brands.'
  },
  {
    extension: '.org',
    category: 'popular',
    regPriceNGN: 20000,
    renewPriceNGN: 21500,
    regPriceUSD: 13.99,
    renewPriceUSD: 14.99,
    featured: true,
    tag: 'TRUSTED NON-PROFIT',
    description: 'Preferred by NGOs, institutions, and community foundations.'
  },
  {
    extension: '.africa',
    category: 'african',
    regPriceNGN: 12500,
    renewPriceNGN: 14000,
    regPriceUSD: 8.99,
    renewPriceUSD: 9.99,
    tag: 'PAN-AFRICAN',
    description: 'Unify your brand presence across the African continent.'
  },
  {
    extension: '.net',
    category: 'popular',
    regPriceNGN: 21000,
    renewPriceNGN: 22500,
    regPriceUSD: 14.50,
    renewPriceUSD: 15.50,
    description: 'Ideal for internet providers, networks, and infrastructure.'
  },
  {
    extension: '.ai',
    category: 'tech',
    regPriceNGN: 115000,
    renewPriceNGN: 115000,
    regPriceUSD: 79.99,
    renewPriceUSD: 79.99,
    featured: true,
    tag: 'TRENDING AI',
    description: 'The gold standard for artificial intelligence startups.'
  },
  {
    extension: '.io',
    category: 'tech',
    regPriceNGN: 62000,
    renewPriceNGN: 65000,
    regPriceUSD: 42.00,
    renewPriceUSD: 44.00,
    tag: 'DEV FAVORITE',
    description: 'Beloved by developers, SaaS apps, and API creators.'
  },
  {
    extension: '.store',
    category: 'business',
    regPriceNGN: 4500,
    renewPriceNGN: 14500,
    promoPriceNGN: 4500,
    regPriceUSD: 3.20,
    renewPriceUSD: 10.50,
    promoPriceUSD: 3.20,
    tag: 'E-COMMERCE',
    description: 'Clear, direct destination for digital retail and merchant stores.'
  },
  {
    extension: '.tech',
    category: 'tech',
    regPriceNGN: 6500,
    renewPriceNGN: 16000,
    promoPriceNGN: 6500,
    regPriceUSD: 4.50,
    renewPriceUSD: 11.50,
    promoPriceUSD: 4.50,
    description: 'Modern domain for technology agencies and innovators.'
  },
  {
    extension: '.org.ng',
    category: 'african',
    regPriceNGN: 5999,
    renewPriceNGN: 6449,
    regPriceUSD: 4.50,
    renewPriceUSD: 4.90,
    description: 'Accredited non-profit domain for Nigerian charities and trusts.'
  },
  {
    extension: '.co',
    category: 'business',
    regPriceNGN: 15000,
    renewPriceNGN: 24000,
    regPriceUSD: 10.50,
    renewPriceUSD: 16.50,
    description: 'Sleek, punchy alternative for modern companies.'
  },
  {
    extension: '.online',
    category: 'business',
    regPriceNGN: 3500,
    renewPriceNGN: 12000,
    promoPriceNGN: 3500,
    regPriceUSD: 2.50,
    renewPriceUSD: 8.50,
    promoPriceUSD: 2.50,
    description: 'Establish a bold universal digital presence.'
  },
  {
    extension: '.app',
    category: 'tech',
    regPriceNGN: 22000,
    renewPriceNGN: 24000,
    regPriceUSD: 15.00,
    renewPriceUSD: 16.50,
    description: 'HTTPS-enforced secure extension for mobile and web applications.'
  }
];

export const HOSTING_PLANS = [
  {
    id: 'web-hosting',
    title: 'Web Hosting',
    subtitle: 'Your journey starts here with affordable Web Hosting.',
    priceNGN: 9750,
    period: '/mo',
    priceUSD: 6.90,
    badgeColor: 'bg-amber-100 text-amber-800',
    icon: 'server',
    features: [
      { text: 'Standard Performance', included: true },
      { text: '100 GB SSD Storage', included: true },
      { text: '10 Websites', included: true },
      { text: 'Unlimited Bandwidth', included: true },
      { text: 'Free .com.ng Domain', included: true, highlight: true },
      { text: 'Free SSL Certificates', included: true },
      { text: '7 Day Money-Back Guarantee', included: true },
      { text: '99.9% Uptime Guarantee', included: true },
      { text: '24/7 Customer Support', included: true },
      { text: 'Free Malware Scanning', included: true },
      { text: 'Daily, Weekly & Monthly Backups', included: true },
      { text: 'Free CDN (quic.cdn)', included: false }
    ]
  },
  {
    id: 'wordpress-hosting',
    title: 'Wordpress Hosting',
    subtitle: 'WordPress Hosting designed to boost your websites performance.',
    priceNGN: 4500,
    period: '/mo',
    priceUSD: 3.20,
    badgeColor: 'bg-amber-100 text-amber-800',
    icon: 'wordpress',
    popular: true,
    features: [
      { text: 'Enhanced Performance', included: true },
      { text: '40 GB SSD Storage', included: true },
      { text: '2 Websites', included: true },
      { text: 'Unlimited Bandwidth', included: true },
      { text: 'Free .com.ng Domain', included: true, highlight: true },
      { text: 'Free SSL Certificates', included: true },
      { text: '7 Day Money-Back Guarantee', included: true },
      { text: '99.9% Uptime Guarantee', included: true },
      { text: '24/7 Customer Support', included: true },
      { text: 'Free Malware Scanning', included: true },
      { text: 'Daily, Weekly & Monthly Backups', included: true },
      { text: 'Free CDN (quic.cdn)', included: true }
    ]
  },
  {
    id: 'site-builder',
    title: 'Site Builder',
    subtitle: 'Create your website in minutes with easy to use site builder',
    priceNGN: 2520,
    period: '/mo',
    priceUSD: 1.80,
    badgeColor: 'bg-amber-100 text-amber-800',
    icon: 'layout',
    features: [
      { text: 'Standard Performance', included: true },
      { text: '20 GB SSD Storage', included: true },
      { text: '5 Websites', included: true },
      { text: 'Unlimited Bandwidth', included: true },
      { text: 'Free .com.ng Domain', included: true, highlight: true },
      { text: 'Free SSL Certificates', included: true },
      { text: '7 Day Money-Back Guarantee', included: true },
      { text: '99.9% Uptime Guarantee', included: true },
      { text: '24/7 Customer Support', included: true },
      { text: 'Optional Malware Scanning', included: true },
      { text: 'Optional Backups', included: true },
      { text: 'Free CDN (quic.cdn)', included: false }
    ]
  }
];

export const INITIAL_REGISTERED_DOMAINS = [
  {
    id: 'dom-1',
    domain: 'businesslaunch.com.ng',
    tld: '.com.ng',
    registrationDate: '2025-10-04',
    expiryDate: '2026-10-04', // 5 days from 2026-09-29!
    daysRemaining: 5,
    autoRenew: false,
    status: 'expiring_soon' as const,
    renewalPriceNGN: 6449,
    renewalPriceUSD: 4.90,
    nameservers: ['ns1.domainking.ng', 'ns2.domainking.ng'],
    privacyEnabled: true,
    emailForwarding: true,
    alertConfig: {
      enabled: true,
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
      webhookUrl: 'https://api.mybrand.ng/webhooks/domain-expiry'
    },
    lastAlertSent: {
      date: '2026-09-27 08:30 UTC',
      threshold: '7-Day Notice',
      channel: 'Email & SMS'
    }
  },
  {
    id: 'dom-2',
    domain: 'payafrica.ng',
    tld: '.ng',
    registrationDate: '2025-10-21',
    expiryDate: '2026-10-21', // 22 days from 2026-09-29
    daysRemaining: 22,
    autoRenew: true,
    status: 'active' as const,
    renewalPriceNGN: 18500,
    renewalPriceUSD: 13.50,
    nameservers: ['ns1.dnsmadeeasy.com', 'ns2.dnsmadeeasy.com'],
    privacyEnabled: true,
    emailForwarding: false,
    alertConfig: {
      enabled: true,
      channels: {
        email: true,
        sms: false,
        webhook: true,
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
      webhookUrl: 'https://hooks.slack.com/services/T00/B00/X123'
    },
    lastAlertSent: {
      date: '2026-09-21 09:00 UTC',
      threshold: '30-Day Notice',
      channel: 'Email & Webhook'
    }
  },
  {
    id: 'dom-3',
    domain: 'lagostechhub.com',
    tld: '.com',
    registrationDate: '2024-04-03',
    expiryDate: '2027-04-03', // 186 days remaining
    daysRemaining: 186,
    autoRenew: true,
    status: 'active' as const,
    renewalPriceNGN: 17738,
    renewalPriceUSD: 12.99,
    nameservers: ['ns1.cloudflare.com', 'ns2.cloudflare.com'],
    privacyEnabled: true,
    emailForwarding: true,
    alertConfig: {
      enabled: true,
      channels: {
        email: true,
        sms: false,
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
      destinationPhone: '',
      webhookUrl: ''
    }
  },
  {
    id: 'dom-4',
    domain: 'swiftcloud.africa',
    tld: '.africa',
    registrationDate: '2024-09-27',
    expiryDate: '2026-09-27', // 2 days past expiry -> Grace period!
    daysRemaining: -2,
    autoRenew: false,
    status: 'grace_period' as const,
    renewalPriceNGN: 14000,
    renewalPriceUSD: 9.99,
    nameservers: ['ns1.domainking.ng', 'ns2.domainking.ng'],
    privacyEnabled: false,
    emailForwarding: false,
    alertConfig: {
      enabled: true,
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
    },
    lastAlertSent: {
      date: '2026-09-28 07:15 UTC',
      threshold: 'Grace Period Alert (48h past)',
      channel: 'Email & SMS'
    }
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    domainId: 'dom-1',
    domain: 'businesslaunch.com.ng',
    timestamp: '2 hours ago',
    thresholdLabel: '5 Days Until Expiration',
    channel: 'email' as const,
    status: 'delivered' as const,
    urgency: 'critical' as const,
    title: 'CRITICAL: Domain businesslaunch.com.ng expires in 5 days',
    message: 'Auto-renewal is disabled. Renew before Oct 4, 2026 to prevent website downtime, email disruptions, and potential redemption penalties.',
    daysRemaining: 5
  },
  {
    id: 'notif-2',
    domainId: 'dom-4',
    domain: 'swiftcloud.africa',
    timestamp: 'Yesterday at 07:15 UTC',
    thresholdLabel: 'Grace Period (Expired 2 days ago)',
    channel: 'sms' as const,
    status: 'delivered' as const,
    urgency: 'critical' as const,
    title: 'URGENT: swiftcloud.africa has entered 30-day Registrar Grace Period',
    message: 'Your domain reached its renewal date on Sep 27. DNS propagation has been paused. Renew immediately to restore online services.',
    daysRemaining: -2
  },
  {
    id: 'notif-3',
    domainId: 'dom-2',
    domain: 'payafrica.ng',
    timestamp: 'Sep 21, 2026',
    thresholdLabel: '30-Day Advance Notice',
    channel: 'webhook' as const,
    status: 'delivered' as const,
    urgency: 'info' as const,
    title: 'Upcoming Renewal: payafrica.ng renews on Oct 21',
    message: 'Auto-renewal is active. DomainKing will attempt payment deduction 7 days prior to expiry on your primary card on file.',
    daysRemaining: 22
  }
];

export const FAQ_ITEMS = [
  {
    question: 'How can I get a free .com.ng domain from DomainKing?',
    answer: 'You receive a free .com.ng domain registration with any annual Web Hosting, WordPress Hosting, or Site Builder package. Simply select your annual hosting plan, choose your free .com.ng domain during checkout, and the domain fee is automatically waived for the first year.'
  },
  {
    question: 'Is the free domain available without hosting?',
    answer: 'The complimentary .com.ng domain promotion requires an active annual hosting subscription. However, standalone .com.ng domain registrations are deeply discounted at only ₦5,999 for your first year with full DNS control and free email forwarding included.'
  },
  {
    question: 'How do automated renewal alerts work?',
    answer: 'Our Automated Renewal Alert engine continuously monitors your domains across configurable intervals: 60, 30, 14, 7, 3, and 1 day prior to expiration, as well as on expiry day and during the 30-day registrar grace period. You can receive automated notifications via Email, SMS, Webhook/Slack, or in-portal push alerts so you never risk losing your high-value domain names.'
  },
  {
    question: 'Do you offer any money-back guarantees?',
    answer: 'Yes! All our hosting packages come with an unconditional 7-Day Money-Back Guarantee. If our high-speed LiteSpeed servers and 24/7 expert technical support do not meet your expectations, we provide a full prompt refund.'
  },
  {
    question: 'Where are your servers located?',
    answer: 'Our servers are housed in Tier-3 high-security datacenters with redundant power grids, carrier-neutral gigabit interconnects, and local peering within Nigeria as well as global CDN endpoints powered by QUIC.cloud to ensure sub-50ms latency across Africa and worldwide.'
  },
  {
    question: 'Can I upgrade or downgrade my hosting plan anytime?',
    answer: 'Absolutely. You can seamlessly scale CPU, RAM, and SSD storage directly inside your client portal with zero website downtime. Upgrades are prorated against your remaining billing balance.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all Nigerian bank debit cards (Mastercard, Visa, Verve), direct bank transfers via Flutterwave and Paystack, EFT, and international payments via PayPal and USD credit cards.'
  },
  {
    question: 'How do I migrate my website to your hosting?',
    answer: 'We provide 100% Free White-Glove Website Migration. Once you create your hosting account, submit a migration request with your previous cPanel or WordPress credentials, and our certified engineers will transfer your files, databases, and emails without any downtime.'
  },
  {
    question: 'What kind of security measures do you have in place?',
    answer: 'Every account is protected by enterprise Web Application Firewall (WAF), real-time proactive malware scanning, automated DDoS mitigation, CageFS account isolation, free auto-renewing Let\'s Encrypt SSL certificates, and automated daily off-site backups.'
  },
  {
    question: 'What happens if my domain expires before I renew?',
    answer: 'When a domain expires, it enters a 30-day Registrar Grace Period where you can still renew it at normal standard renewal rates without penalty. Our Automated Renewal Alerts system will repeatedly notify you across all channels to safeguard your asset.'
  }
];

export const GOOGLE_REVIEWS = [
  {
    name: 'Vicky Kumar',
    review: 'I have been using DomainKing for sometime now, and I really love the service and the support team. Whenever I encounter DNS propagation issues, they resolve it in minutes.',
    rating: 5,
    date: '2 weeks ago',
    verified: true
  },
  {
    name: 'Adebayo Ogunlesi',
    review: "I've had a great experience hosting my website with DomainKing. Their support team is responsive and professional. The automated renewal alerts saved my prime commercial .ng domain!",
    rating: 5,
    date: '1 month ago',
    verified: true
  },
  {
    name: 'Chinedu Eze',
    review: 'I have been buying domain names from DomainKing since 2018 and it has been a great experience partnering with them. Fast registration, fair Naira pricing, and rock-solid uptime.',
    rating: 5,
    date: '3 months ago',
    verified: true
  }
];

export const GOOGLE_REVIEWS_ROW_2 = [
  {
    name: 'Ngozi Okonkwo',
    review: 'I was really impressed with the assistance by Vicky Kumar and the tech team. His response was very swift and technically outstanding. Site migration took less than 45 minutes.',
    rating: 5,
    date: '3 weeks ago',
    verified: true
  },
  {
    name: 'Babatunde Bello',
    review: "Simply the best hosting company in Nigeria. I've been using their services for more than 4 years and I've never had any regrets. LiteSpeed servers make WordPress fly.",
    rating: 5,
    date: '2 months ago',
    verified: true
  },
  {
    name: 'Emeka Nwosu',
    review: "I've been using DomainKing for over 5 years now and I have never had any reason to regret using them. The new client portal and automated renewal scheduler are top tier.",
    rating: 5,
    date: '4 months ago',
    verified: true
  }
];
