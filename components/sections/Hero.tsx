import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Phone, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../../constants';

interface HeroProps {
  onGetQuote: () => void;
  onViewServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetQuote, onViewServices }) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGetQuote();
  };

  return (
    <div className="relative pt-24 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1621778029697-e648b727ddc7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxhd24lMjBjYXJlfGVufDB8fDB8fHww" 
          alt="Lawn Background" 
          className="w-full h-full object-cover opacity-100 animate-fadeIn"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/50 via-transparent to-brand-black"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold tracking-wider uppercase mb-6 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
              Serving Newark, NJ & Surroundings
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Professional Lawn Care <br/>
              <span className="text-brand-green">Without the Hassle.</span>
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              Reliable local lawn care near you. Get your weekends back and enjoy a perfect lawn all season long. Fully insured and bonded.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <Button onClick={onGetQuote} className="w-full sm:w-auto h-14">
                Get a Free Estimate
              </Button>
              <Button onClick={onViewServices} variant="outline" className="w-full sm:w-auto h-14">
                View Services
              </Button>
              <a 
                href={`tel:${COMPANY_INFO.phoneRaw}`} 
                className="flex items-center gap-2 text-white font-semibold hover:text-brand-green transition-colors px-6 py-4"
              >
                <Phone className="w-5 h-5" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-400 font-medium opacity-0 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green" />
                <span>4.9/5 Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green" />
                <span>Licensed & Insured</span>
              </div>
            </div>
          </div>

          {/* Quick Quote Form Card (Desktop) */}
          <div className="hidden lg:block w-full max-w-md bg-brand-card/90 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-2xl opacity-0 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-2xl font-bold text-white mb-2">Get your quote in minutes</h3>
            <p className="text-gray-400 text-sm mb-6">Fill out the form below for a fast, free estimate.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green transition-all"
              />
              <input 
                type="text" 
                placeholder="Street Address in Newark, NJ" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green transition-all"
              />
              <select className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 text-gray-300 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green transition-all appearance-none">
                <option value="" disabled selected>Select Service Needed</option>
                <option value="mowing">Lawn Mowing</option>
                <option value="cleanup">Yard Clean Up</option>
                <option value="other">Other</option>
              </select>
              <Button type="submit" fullWidth>Get My Quote</Button>
            </form>
            <p className="text-xs text-center text-gray-500 mt-4">No credit card required. Free consultation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};