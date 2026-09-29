import React, { useState } from 'react';
import { WhoisRecord } from '../../types';
import { X, Globe, Copy, Check, Server, Shield, Calendar } from 'lucide-react';

interface WhoisModalProps {
  whois: WhoisRecord | null;
  onClose: () => void;
}

export const WhoisModal: React.FC<WhoisModalProps> = ({ whois, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!whois) return null;

  const handleCopy = () => {
    if (whois.rawWhois) {
      navigator.clipboard.writeText(whois.rawWhois);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
            <Globe className="w-5 h-5 text-red-600" />
            <h3 className="font-extrabold text-base text-slate-900">
              WHOIS Records: {whois.domain}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {/* Key Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Registrar
              </div>
              <div className="mt-1 font-bold text-slate-900">
                {whois.registrar}
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Country
              </div>
              <div className="mt-1 font-bold text-slate-900">
                {whois.registrantCountry}
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Creation Date
              </div>
              <div className="mt-1 font-mono text-xs font-bold text-slate-900">
                {whois.createdDate}
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Registry Expiration Date
              </div>
              <div className="mt-1 font-mono text-xs font-bold text-red-600">
                {whois.expiryDate}
              </div>
            </div>
          </div>

          {/* Name Servers */}
          <div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-slate-500" />
              <span>Assigned Name Servers</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1 font-mono text-xs text-slate-700">
              {whois.nameServers.map((ns, i) => (
                <div key={i}>{ns}</div>
              ))}
            </div>
          </div>

          {/* Raw Text Output */}
          {whois.rawWhois && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Raw Registry WHOIS Output
                </span>
                <button
                  onClick={handleCopy}
                  className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy raw text'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-slate-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 max-h-48">
                {whois.rawWhois}
              </pre>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Source: Live Registry WHOIS Service
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
