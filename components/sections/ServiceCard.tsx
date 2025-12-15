import React, { useState } from 'react';
import { Service } from '../../types';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  const Icon = service.icon;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div 
      onClick={onClick}
      className="group bg-brand-card border border-white/5 rounded-2xl p-6 hover:border-brand-green/50 transition-all duration-300 cursor-pointer hover:-translate-y-1"
    >
      <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-green/20 transition-colors">
        <Icon className="w-6 h-6 text-brand-green" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
      
      <div className="mb-4">
        <p className={`text-gray-400 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
          {service.description}
        </p>
        <button 
          onClick={toggleDescription}
          className="inline-flex items-center gap-1 text-xs font-bold text-brand-green mt-2 hover:text-brand-greenHover transition-colors focus:outline-none"
        >
          {isExpanded ? (
            <>Show Less <ChevronUp className="w-3 h-3" /></>
          ) : (
            <>Read More <ChevronDown className="w-3 h-3" /></>
          )}
        </button>
      </div>

      <div className="flex items-center text-brand-green font-semibold text-sm group-hover:gap-2 transition-all">
        <span>Get Estimate</span>
        <ArrowRight className="w-4 h-4 ml-1" />
      </div>
    </div>
  );
};