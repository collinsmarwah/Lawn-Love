import React from 'react';
import { Phone } from 'lucide-react';
import { COMPANY_INFO } from '../constants';

export const StickyCall: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden bg-gradient-to-t from-brand-black to-transparent pointer-events-none">
      <a 
        href={`tel:${COMPANY_INFO.phoneRaw}`}
        className="pointer-events-auto flex items-center justify-center gap-3 w-full bg-brand-green text-brand-black font-bold py-4 rounded-full shadow-xl shadow-brand-green/30 active:scale-95 transition-transform"
      >
        <Phone className="w-5 h-5" fill="currentColor" />
        Call {COMPANY_INFO.phone}
      </a>
    </div>
  );
};