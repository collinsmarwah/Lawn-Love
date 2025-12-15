import React, { useState } from 'react';
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

export const LeadForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    service: SERVICES[0]?.id || 'mowing',
    details: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

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
      <div className="max-w-md mx-auto bg-brand-card border border-brand-green/20 p-8 rounded-2xl text-center">
        <div className="w-16 h-16 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-brand-green" />
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
    w-full bg-brand-black border rounded-lg px-4 py-3 text-white transition-colors focus:outline-none
    ${error 
      ? 'border-red-500 focus:border-red-500' 
      : 'border-white/10 focus:border-brand-green'
    }
  `;

  return (
    <div className="bg-brand-card border border-white/10 rounded-2xl p-6 md:p-10 shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-6">Get a Free Estimate</h2>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Full Name</label>
            <input 
              name="name"
              type="text" 
              value={formData.name}
              onChange={handleChange}
              className={getInputClassName(errors.name)}
              placeholder="John Doe"
            />
            {errors.name && (
              <div className="flex items-center gap-1.5 text-red-400 text-xs mt-1 animate-fadeIn">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.name}</span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Phone Number</label>
            <input 
              name="phone"
              type="tel" 
              value={formData.phone}
              onChange={handleChange}
              className={getInputClassName(errors.phone)}
              placeholder="(973) 555-0123"
            />
            {errors.phone && (
              <div className="flex items-center gap-1.5 text-red-400 text-xs mt-1 animate-fadeIn">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.phone}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Email Address</label>
          <input 
            name="email"
            type="email" 
            value={formData.email}
            onChange={handleChange}
            className={getInputClassName(errors.email)}
            placeholder="john@example.com"
          />
          {errors.email && (
            <div className="flex items-center gap-1.5 text-red-400 text-xs mt-1 animate-fadeIn">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Property Address</label>
          <input 
            name="address"
            type="text" 
            value={formData.address}
            onChange={handleChange}
            className={getInputClassName(errors.address)}
            placeholder="123 Example St, Newark, NJ"
          />
          {errors.address && (
            <div className="flex items-center gap-1.5 text-red-400 text-xs mt-1 animate-fadeIn">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.address}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Service Needed</label>
          <select 
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-green focus:outline-none transition-colors appearance-none"
          >
            {SERVICES.map(s => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
            <option value="other">Other / Not Listed</option>
          </select>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Additional Details (Optional)</label>
            <textarea 
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows={3}
              className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-green focus:outline-none transition-colors resize-y min-h-[5rem]"
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