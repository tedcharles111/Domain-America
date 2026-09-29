import React from 'react';
import { Crown, Facebook, Twitter, Linkedin, Shield } from 'lucide-react';

interface FooterProps {
  onOpenPortal: () => void;
  onOpenWhois: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPortal, onOpenWhois }) => {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          
          {/* Col 1: Domain Names */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4">Domain Names</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-red-600 transition-colors">Register a Domain</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Domain Pricing</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Domain Transfers</a></li>
              <li>
                <button onClick={onOpenWhois} className="hover:text-red-600 transition-colors cursor-pointer text-left">
                  WHOIS Lookup & DNS
                </button>
              </li>
              <li>
                <button onClick={onOpenPortal} className="text-red-600 font-semibold hover:underline cursor-pointer text-left">
                  Automated Renewal Alerts
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Hosting */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4">Hosting</h4>
            <ul className="space-y-2.5">
              <li><a href="#hosting-plans" className="hover:text-red-600 transition-colors">Web Hosting</a></li>
              <li><a href="#hosting-plans" className="hover:text-red-600 transition-colors">WordPress Hosting</a></li>
              <li><a href="#hosting-plans" className="hover:text-red-600 transition-colors">Reseller Hosting</a></li>
              <li><a href="#hosting-plans" className="hover:text-red-600 transition-colors">Site Builder</a></li>
              <li><a href="#hosting-plans" className="hover:text-red-600 transition-colors">Cloud Servers</a></li>
            </ul>
          </div>

          {/* Col 3: Get Help */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4">Get Help</h4>
            <ul className="space-y-2.5">
              <li><a href="#faq" className="hover:text-red-600 transition-colors">Submit a Support Ticket</a></li>
              <li><a href="#faq" className="hover:text-red-600 transition-colors">Submit a Sales Enquiry</a></li>
              <li><a href="#faq" className="hover:text-red-600 transition-colors">Report Abuse</a></li>
              <li><a href="#faq" className="hover:text-red-600 transition-colors">Knowledgebase</a></li>
              <li><a href="#faq" className="hover:text-red-600 transition-colors">Payment Help</a></li>
            </ul>
          </div>

          {/* Col 4: Legals */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4">Legals</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-red-600 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Refund Policy</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Acceptable Use Policy</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Affiliate Terms</a></li>
            </ul>
          </div>

          {/* Col 5: Security */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4">Security</h4>
            <ul className="space-y-2.5">
              <li><a href="#security-section" className="hover:text-red-600 transition-colors">SSL Certificates</a></li>
              <li><a href="#security-section" className="hover:text-red-600 transition-colors">DDoS Mitigation</a></li>
              <li><a href="#security-section" className="hover:text-red-600 transition-colors">Malware Scanner</a></li>
              <li><a href="#security-section" className="hover:text-red-600 transition-colors">Automated Backups</a></li>
            </ul>
          </div>

          {/* Col 6: Email & Workspace */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4">Email</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-red-600 transition-colors">Email & Workspace</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">SpamTitan Protection</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Google Workspace</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Webmail Login</a></li>
            </ul>
          </div>

        </div>

        {/* Brand Ownership Note */}
        <div className="py-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-slate-400">
          <div>
            <p className="font-medium text-slate-600">
              DomainKing.ng is a premier brand of HOST AFRICA (Pty) Ltd.
            </p>
            <p className="mt-1">
              NiRA accredited registrar providing official registry services for .ng and global ccTLDs.
            </p>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-3 text-xs font-bold text-slate-500 flex-wrap justify-center">
            <span className="text-[11px] text-slate-400">Accepted Payments:</span>
            <span className="px-2 py-1 bg-slate-100 rounded text-slate-700">EFT</span>
            <span className="px-2 py-1 bg-slate-100 rounded text-blue-700">PayPal</span>
            <span className="px-2 py-1 bg-slate-100 rounded text-orange-600">flutterwave</span>
            <span className="px-2 py-1 bg-slate-100 rounded text-emerald-600">Paystack</span>
            <span className="px-2 py-1 bg-slate-100 rounded text-blue-900">VISA</span>
            <span className="px-2 py-1 bg-slate-100 rounded text-red-600">Mastercard</span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © Copyright 2026 HOSTAFRICA | All Rights Reserved. By visiting this website, you agree to its terms of use.
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            <a href="#" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
