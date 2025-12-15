import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/Button';
import { SERVICES } from '../constants';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  service: string;
  details: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
}

interface LeadFormProps {
  initialName?: string;
  initialAddress?: string;
  initialService?: string;
}

export const LeadForm: React.FC<LeadFormProps> = ({ 
  initialName = '', 
  initialAddress = '', 
  initialService = '' 
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: initialName,
    phone: '',
    email: '',
    address: initialAddress,
    service: initialService || SERVICES[0]?.id || 'mowing',
    details: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  
  const successRef = useRef<HTMLDivElement>(null);

  // Update form data if props change (e.g. re-navigating with new selection)
  useEffect(() => {
    if (initialName || initialAddress || initialService) {
      setFormData(prev => ({
        ...prev,
        name: initialName || prev.name,
        address: initialAddress || prev.address,
        service: initialService || prev.service
      }));
    }
  }, [initialName, initialAddress, initialService]);

  // Focus management for success state
  useEffect(() => {
    if (submitted && successRef.current) {
      successRef.current.focus();
    }
  }, [submitted]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Name Validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Phone Validation
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Address Validation
    if (!formData.address.trim()) {
      newErrors.address = 'Property address is required';
      isValid = false;
    } else if (formData.address.trim().length < 5) {
      newErrors.address = 'Please enter a complete address';
      isValid = false;
    }

    setErrors(newErrors);

    // Focus first invalid input if validation fails
    if (!isValid) {
      setTimeout(() => {
        const firstErrorKey = Object.keys(newErrors)[0];
        const element = document.getElementById(firstErrorKey);
        if (element) {
          element.focus();
        }
      }, 0);
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (submitted) {
    return (
      <div 
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="max-w-md mx-auto bg-brand-card border border-brand-green/20 p-8 rounded-2xl text-center focus:outline-none"
      >
        <div className="w-16 h-16 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-brand-green" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
        <p className="text-gray-400">
          Thanks for contacting Lawn Love. Our Newark team will review your property details and call you shortly with your free estimate.
        </p>
        <Button 
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              phone: '',
              email: '',
              address: '',
              service: SERVICES[0]?.id || 'mowing',
              details: ''
            });
          }} 
          variant="outline" 
          className="mt-6"
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  const getInputClassName = (error?: string) => `
    w-full bg-brand-black border rounded-lg px-4 py-3 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green
    ${error 
      ? 'border-red-500 focus:border-red-500' 
      : 'border-white/10 focus:border-brand-green'
    }
  `;

  return (
    <div className="bg-brand-card border border-white/10 rounded-2xl p-6 md:p-10 shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-6" id="form-title">Get a Free Estimate</h2>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-labelledby="form-title">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-400">Full Name</label>
            <input 
              id="name"
              name="name"
              type="text" 
              value={formData.name}
              onChange={handleChange}
              className={getInputClassName(errors.name)}
              placeholder="John Doe"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              aria-required="true"
            />
            {errors.name && (
              <div id="name-error" role="alert" className="flex items-center gap-1.5 text-red-400 text-xs mt-1 animate-fadeIn">
                <AlertCircle className="w-3 h-3" aria-hidden="true" />
                <span>{errors.name}</span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-400">Phone Number</label>
            <input 
              id="phone"
              name="phone"
              type="tel" 
              value={formData.phone}
              onChange={handleChange}
              className={getInputClassName(errors.phone)}
              placeholder="(973) 555-0123"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              aria-required="true"
            />
            {errors.phone && (
              <div id="phone-error" role="alert" className="flex items-center gap-1.5 text-red-400 text-xs mt-1 animate-fadeIn">
                <AlertCircle className="w-3 h-3" aria-hidden="true" />
                <span>{errors.phone}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-400">Email Address</label>
          <input 
            id="email"
            name="email"
            type="email" 
            value={formData.email}
            onChange={handleChange}
            className={getInputClassName(errors.email)}
            placeholder="john@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-required="true"
          />
          {errors.email && (
            <div id="email-error" role="alert" className="flex items-center gap-1.5 text-red-400 text-xs mt-1 animate-fadeIn">
              <AlertCircle className="w-3 h-3" aria-hidden="true" />
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium text-gray-400">Property Address</label>
          <input 
            id="address"
            name="address"
            type="text" 
            value={formData.address}
            onChange={handleChange}
            className={getInputClassName(errors.address)}
            placeholder="123 Example St, Newark, NJ"
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? "address-error" : undefined}
            aria-required="true"
          />
          {errors.address && (
            <div id="address-error" role="alert" className="flex items-center gap-1.5 text-red-400 text-xs mt-1 animate-fadeIn">
              <AlertCircle className="w-3 h-3" aria-hidden="true" />
              <span>{errors.address}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="service" className="text-sm font-medium text-gray-400">Service Needed</label>
          <select 
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-green focus:outline-none transition-colors appearance-none focus:ring-2 focus:ring-brand-green"
          >
            {SERVICES.map(s => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
            <option value="other">Other / Not Listed</option>
          </select>
        </div>

        <div className="space-y-2">
            <label htmlFor="details" className="text-sm font-medium text-gray-400">Additional Details (Optional)</label>
            <textarea 
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows={3}
              className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-green focus:outline-none transition-colors resize-y min-h-[5rem] focus:ring-2 focus:ring-brand-green"
              placeholder="Tell us about your lawn needs..."
            />
        </div>

        <Button type="submit" fullWidth className="text-lg py-4">
          Request My Free Quote
        </Button>
        <p className="text-xs text-gray-500 text-center">
          By submitting this form, you agree to receive calls or texts from Lawn Love Newark about your service request.
        </p>
      </form>
    </div>
  );
};