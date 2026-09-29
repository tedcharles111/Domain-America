import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const AccreditationBar: React.FC = () => {
  const registries = [
    { name: 'NiRA', label: '.ng Registry accredited', highlight: true },
    { name: 'ZACR', label: 'South Africa Central Registry' },
    { name: '.africa', label: 'Registry Africa' },
    { name: 'CentralNic', label: 'Global Registry Operator' },
    { name: 'dotPW', label: 'PW Registry Partner' },
    { name: '.ug', label: 'Uganda Registry Partner' },
    { name: 'NIXI', label: 'National Internet Exchange' }
  ];

  return (
    <section className="py-12 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-8">
          We are accredited with the following official domain name registries
        </p>

        <div className="flex items-center justify-center flex-wrap gap-8 sm:gap-12 opacity-80 hover:opacity-100 transition-opacity">
          {registries.map((reg) => (
            <div
              key={reg.name}
              className="flex items-center gap-2 group cursor-default"
              title={reg.label}
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-black text-xs group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                {reg.name.substring(0, 2)}
              </div>
              <div className="text-left">
                <span className="font-extrabold text-sm sm:text-base text-slate-700 tracking-tight block">
                  {reg.name}
                </span>
                <span className="text-[10px] text-slate-400 block -mt-1">
                  Accredited
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
