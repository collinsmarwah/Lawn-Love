import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Facebook, 
  Instagram, 
  Twitter, 
  ShieldCheck, 
  Star, 
  Clock, 
  CheckCircle,
  Mail,
  Zap
} from 'lucide-react';
import { COMPANY_INFO, SERVICES, REVIEWS, NAV_LINKS } from './constants';
import { PageView } from './types';
import { Button } from './components/ui/Button';
import { Hero } from './components/sections/Hero';
import { ServiceCard } from './components/sections/ServiceCard';
import { StickyCall } from './components/StickyCall';
import { LeadForm } from './components/LeadForm';
import { ReviewsCarousel } from './components/sections/ReviewsCarousel';

const GALLERY_IMAGES = [
  {
    url: "https://shopvalorfarms.com/cdn/shop/files/Triple-Shredded-Black-Mulch1.webp?v=1742858656&width=990",
    title: "Mulch & Trim"
  },
  {
    url: "https://cdn.prod.website-files.com/672fd9c725c3b0b9c3b44d4f/673f64cadde7e780d6bef91d_electric%20shrub%20pruning.jpg",
    title: "Overgrown Cleanout"
  },
  {
    url: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=800",
    title: "Lawn Mowing"
  },
  {
    url: "https://www.nikuze.com/cleaning/images/services/gardening.jpg",
    title: "Garden Care"
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1661411416827-4276cb8329e5?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Turf Maintenance"
  },
  {
    url: "https://proactivelandscaping.com/wp-content/uploads/fall-winter-cleanup-broken-arrow-01.jpg",
    title: "Fall Cleanup"
  },
  {
    url: "https://images.unsplash.com/photo-1663185777390-d44a6f4724b9?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Precision Mowing"
  },
  {
    url: "https://images.unsplash.com/photo-1743327811352-8f9b286f9c12?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Flower Bed Installation"
  },
  {
    url: "https://images.unsplash.com/photo-1723901741532-1b233131aa8f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Landscape Design"
  },
  {
    url: "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Seasonal Planting"
  }
];

// Simple Sprout Icon wrapper
const Sprout = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
    <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
  </svg>
);

const Logo = ({ className = "" }: { className?: string }) => {
  const [error, setError] = useState(false);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {!error ? (
        <img 
          src="logo.png" 
          alt="Lawn Love" 
          className="h-10 w-auto object-contain" 
          onError={() => setError(true)}
        />
      ) : (
        <>
          <div className="w-8 h-8 bg-brand-green rounded flex items-center justify-center shrink-0">
            <Sprout className="text-brand-black w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Lawn Love</span>
        </>
      )}
    </div>
  );
};

// Helper for section headings
const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="text-center mb-12">
    {subtitle && (
      <span className="text-brand-green font-bold tracking-wider uppercase text-sm mb-2 block">
        {subtitle}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
    <div className="w-20 h-1 bg-brand-green mx-auto mt-4 rounded-full"></div>
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [currentPage]);

  const navigateTo = (page: PageView) => setCurrentPage(page);

  const renderContent = () => {
    switch(currentPage) {
      case 'services':
        return (
          <div className="pt-32 pb-20 container mx-auto px-4">
            <SectionTitle title="Our Services" subtitle="Complete Lawn Care Solutions" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  onClick={() => navigateTo('estimate')} 
                />
              ))}
            </div>
          </div>
        );
      
      case 'about':
        return (
          <div className="pt-32 pb-20 container mx-auto px-4">
            <SectionTitle title="About Lawn Love" subtitle="Local Newark Experts" />
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-2xl overflow-hidden aspect-video md:aspect-square">
                <img src="https://lawnlove.com/cdn-cgi/image/format=auto/https%3A%2F%2Fcdn.lawnlove.com%2Fassets%2Fblocks%2Fcrew-posing.jpg" alt="Lawn Care Team" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand-green/10"></div>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Dedicated to Excellence in Newark, NJ</h3>
                <p className="text-gray-400 leading-relaxed">
                  We are a locally owned and operated business serving the Newark area. We know the soil, the climate, and the grass types of Northern New Jersey better than anyone.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Our mission is simple: provide professional, reliable lawn care so you can enjoy your free time. We are fully licensed, insured, and committed to customer satisfaction.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-brand-card p-4 rounded-lg border border-white/5">
                    <ShieldCheck className="text-brand-green mb-2 w-8 h-8" />
                    <div className="font-bold text-white">Licensed & Insured</div>
                  </div>
                  <div className="bg-brand-card p-4 rounded-lg border border-white/5">
                    <MapPin className="text-brand-green mb-2 w-8 h-8" />
                    <div className="font-bold text-white">Locally Owned</div>
                  </div>
                </div>
                <Button onClick={() => navigateTo('estimate')}>Get a Free Quote</Button>
              </div>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="pt-32 pb-20 container mx-auto px-4">
            <SectionTitle title="Our Work" subtitle="See the Difference" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GALLERY_IMAGES.map((img, i) => (
                <div key={i} className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-brand-card">
                  <img 
                    src={img.url} 
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold border border-brand-green px-4 py-2 rounded-full bg-brand-black/50 backdrop-blur-sm">
                      {img.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="pt-32 pb-20 container mx-auto px-4">
            <SectionTitle title="Customer Reviews" subtitle="Trusted by Newark" />
            <ReviewsCarousel reviews={REVIEWS} />
          </div>
        );

      case 'contact':
      case 'estimate':
        return (
          <div className="pt-32 pb-20 container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="order-2 lg:order-1">
                 <LeadForm />
              </div>
              <div className="order-1 lg:order-2 space-y-8">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-4">Contact Us</h2>
                  <p className="text-gray-400">Ready to transform your lawn? Contact us today for a free quote or to schedule service.</p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-brand-green" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Phone</h4>
                      <p className="text-gray-400">Mon-Fri 8am - 6pm</p>
                      <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-xl font-bold text-brand-green hover:underline">{COMPANY_INFO.phone}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-brand-green" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Email</h4>
                      <p className="text-gray-400">For general inquiries</p>
                      <a href={`mailto:${COMPANY_INFO.email}`} className="text-lg text-white hover:text-brand-green">{COMPANY_INFO.email}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-brand-green" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Service Area</h4>
                      <p className="text-gray-400">Newark, NJ and surrounding Essex County areas including Ironbound, North Ward, Forest Hill, and University Heights.</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-white/10 h-64">
                   <iframe 
                    title="Map of Newark"
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src="https://maps.google.com/maps?q=Newark%20NJ&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    style={{ filter: 'invert(90%) hue-rotate(180deg)' }} // Simple hack for dark mode map look
                   ></iframe>
                </div>
              </div>
            </div>
          </div>
        );

      case 'home':
      default:
        return (
          <>
            <Hero 
              onGetQuote={() => navigateTo('estimate')} 
              onViewServices={() => navigateTo('services')}
            />
            
            {/* Value Props Strip */}
            <div className="bg-brand-card border-y border-white/5 py-8">
              <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <ShieldCheck className="text-brand-green w-8 h-8" />
                  <span className="font-bold text-white text-sm md:text-base">Insured & Bonded</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Star className="text-brand-green w-8 h-8" />
                  <span className="font-bold text-white text-sm md:text-base">500+ Reviews</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle className="text-brand-green w-8 h-8" />
                  <span className="font-bold text-white text-sm md:text-base">Satisfaction Guarantee</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Clock className="text-brand-green w-8 h-8" />
                  <span className="font-bold text-white text-sm md:text-base">Fast Quotes</span>
                </div>
              </div>
            </div>

            {/* Services Preview */}
            <section className="py-20 container mx-auto px-4">
              <SectionTitle title="Complete Lawn Care Solutions" subtitle="What We Do" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SERVICES.slice(0, 6).map((service) => (
                  <ServiceCard 
                    key={service.id} 
                    service={service} 
                    onClick={() => navigateTo('estimate')} 
                  />
                ))}
              </div>
              <div className="mt-12 text-center">
                <Button variant="outline" onClick={() => navigateTo('services')}>View All Services</Button>
              </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="relative py-24 overflow-hidden bg-brand-card/20"> 
              <div className="container relative mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  
                  {/* Image Column */}
                  <div className="relative order-2 lg:order-1">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                      <img 
                        src="https://lawnlove.com/cdn-cgi/image/format=auto/https%3A%2F%2Fcdn.lawnlove.com%2Fassets%2Fblocks%2Fcrew-smiles.jpg" 
                        alt="Lawn Love Crew" 
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent"></div>
                      
                      {/* Floating badge */}
                      <div className="absolute bottom-6 left-6 bg-brand-black/90 backdrop-blur-md p-4 rounded-xl border border-brand-green/20 shadow-lg max-w-xs">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-brand-black font-bold">
                             <CheckCircle className="w-6 h-6" />
                           </div>
                           <div>
                             <p className="text-white font-bold text-sm">Vetted Professionals</p>
                             <p className="text-brand-green text-xs">Background Checked</p>
                           </div>
                        </div>
                      </div>
                    </div>
                    {/* Decorative back blob */}
                    <div className="absolute -top-10 -left-10 w-full h-full border-2 border-brand-green/20 rounded-3xl -z-10 translate-x-4 translate-y-4"></div>
                  </div>

                  {/* Content Column */}
                  <div className="order-1 lg:order-2">
                    <div className="mb-10">
                      <span className="text-brand-green font-bold tracking-wider uppercase text-sm mb-2 block">
                        The Local Advantage
                      </span>
                      <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                        Why Choose Lawn Love Newark
                      </h2>
                      <div className="w-20 h-1 bg-brand-green mt-6 rounded-full"></div>
                    </div>

                    <div className="space-y-8">
                       {/* Feature 1 */}
                       <div className="flex gap-6 group">
                         <div className="w-14 h-14 bg-brand-green/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-green transition-colors duration-300">
                            <MapPin className="w-7 h-7 text-brand-green group-hover:text-brand-black transition-colors" />
                         </div>
                         <div>
                           <h3 className="text-xl font-bold text-white mb-2">Local Expertise</h3>
                           <p className="text-gray-400 leading-relaxed">
                             We aren't a big chain. We're Newark locals who understand the specific soil types and climate of Essex County.
                           </p>
                         </div>
                       </div>

                       {/* Feature 2 */}
                       <div className="flex gap-6 group">
                         <div className="w-14 h-14 bg-brand-green/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-green transition-colors duration-300">
                            <ShieldCheck className="w-7 h-7 text-brand-green group-hover:text-brand-black transition-colors" />
                         </div>
                         <div>
                           <h3 className="text-xl font-bold text-white mb-2">Satisfaction Guarantee</h3>
                           <p className="text-gray-400 leading-relaxed">
                             Your happiness is our priority. If you're not 100% satisfied with our service, we'll return to make it right free of charge.
                           </p>
                         </div>
                       </div>

                       {/* Feature 3 */}
                       <div className="flex gap-6 group">
                         <div className="w-14 h-14 bg-brand-green/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-green transition-colors duration-300">
                            <Zap className="w-7 h-7 text-brand-green group-hover:text-brand-black transition-colors" />
                         </div>
                         <div>
                           <h3 className="text-xl font-bold text-white mb-2">Fast & Reliable</h3>
                           <p className="text-gray-400 leading-relaxed">
                             We respect your time. Get lightning-fast quotes and rely on our team to show up on schedule.
                           </p>
                         </div>
                       </div>
                    </div>
                    
                    <div className="mt-10">
                      <Button onClick={() => navigateTo('estimate')} className="px-8">
                        Get Started Today
                      </Button>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* CTA Break */}
            <section className="bg-brand-green py-16">
              <div className="container mx-auto px-4 text-center md:flex md:items-center md:justify-between">
                <div className="text-brand-black text-left mb-6 md:mb-0">
                  <h2 className="text-3xl font-bold mb-2">Need something else?</h2>
                  <p className="text-brand-dark/80 font-medium">We offer custom packages for unique landscaping needs.</p>
                </div>
                <Button onClick={() => navigateTo('contact')} className="bg-brand-black text-white hover:bg-gray-800 shadow-none">
                  Contact Us
                </Button>
              </div>
            </section>

            {/* Gallery Preview */}
            <section className="py-20 bg-brand-card/30">
              <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <span className="text-brand-green font-bold tracking-wider uppercase text-sm block mb-2">Real Results</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">See the Difference</h2>
                  </div>
                  <button onClick={() => navigateTo('gallery')} className="text-brand-green font-bold hover:text-white transition-colors hidden md:block">
                    View Full Gallery →
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative rounded-2xl overflow-hidden group aspect-video">
                    <img src="https://cdn.prod.website-files.com/672fd9c725c3b0b9c3b44d4f/673f64cadde7e780d6bef91d_electric%20shrub%20pruning.jpg" alt="Lawn Transformation" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute bottom-4 left-4 bg-brand-black/80 px-4 py-2 rounded-lg backdrop-blur-sm border border-brand-green/20">
                      <span className="text-white font-bold text-sm">Overgrown Cleanout</span>
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden group aspect-video">
                    <img src="https://shopvalorfarms.com/cdn/shop/files/Triple-Shredded-Black-Mulch1.webp?v=1742858656&width=990" alt="Garden Project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute bottom-4 left-4 bg-brand-black/80 px-4 py-2 rounded-lg backdrop-blur-sm border border-brand-green/20">
                      <span className="text-white font-bold text-sm">Mulch & Trim</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 text-center md:hidden">
                  <button onClick={() => navigateTo('gallery')} className="text-brand-green font-bold">
                    View Full Gallery →
                  </button>
                </div>
              </div>
            </section>

            {/* Reviews Preview */}
            <section className="py-20 container mx-auto px-4">
              <SectionTitle title="Trusted by Newark" subtitle="Reviews" />
              <div className="grid md:grid-cols-3 gap-8">
                {REVIEWS.map(review => (
                   <div key={review.id} className="bg-brand-card p-6 rounded-xl border border-white/5">
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-brand-green text-brand-green" />
                        ))}
                      </div>
                      <p className="text-gray-300 text-sm mb-4">"{review.text}"</p>
                      <div className="font-bold text-white text-sm">- {review.author}</div>
                   </div>
                ))}
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-black/95 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => navigateTo('home')}>
             <Logo />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button 
                key={link.view}
                onClick={() => navigateTo(link.view)}
                className={`text-sm font-semibold transition-colors ${currentPage === link.view ? 'text-brand-green' : 'text-gray-300 hover:text-white'}`}
              >
                {link.label}
              </button>
            ))}
            <Button onClick={() => navigateTo('estimate')} className="ml-4">
              {COMPANY_INFO.phone}
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-white hover:text-brand-green"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        <div 
          className={`md:hidden absolute top-20 left-0 right-0 bg-brand-card border-b border-white/10 shadow-2xl transition-all duration-300 ease-in-out origin-top ${
            mobileMenuOpen 
              ? 'opacity-100 translate-y-0 visible' 
              : 'opacity-0 -translate-y-4 invisible pointer-events-none'
          }`}
        >
          <div className="flex flex-col p-4">
            {NAV_LINKS.map((link) => (
              <button 
                key={link.view}
                onClick={() => {
                  navigateTo(link.view);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-lg font-semibold py-4 px-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${
                  currentPage === link.view 
                    ? 'text-brand-green bg-brand-green/5' 
                    : 'text-gray-300'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="p-4 mt-2">
              <Button 
                onClick={() => {
                  navigateTo('estimate');
                  setMobileMenuOpen(false);
                }} 
                fullWidth 
                className="py-4 text-lg"
              >
                Get a Quote
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark border-t border-white/5 pt-16 pb-24 md:pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="mb-6">
                <Logo />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Professional, reliable, and affordable lawn care for Newark homeowners. Get your weekends back.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button onClick={() => navigateTo('about')} className="hover:text-brand-green">About Us</button></li>
                <li><button onClick={() => navigateTo('services')} className="hover:text-brand-green">Services</button></li>
                <li><button onClick={() => navigateTo('reviews')} className="hover:text-brand-green">Reviews</button></li>
                <li><button onClick={() => navigateTo('contact')} className="hover:text-brand-green">Careers</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-green shrink-0" />
                  <span>{COMPANY_INFO.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-green shrink-0" />
                  <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="hover:text-white">{COMPANY_INFO.phone}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-brand-green shrink-0" />
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white">{COMPANY_INFO.email}</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Connect</h4>
              <div className="flex gap-4">
                <a 
                  href={COMPANY_INFO.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-brand-card border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-green hover:border-brand-green transition-all"
                  aria-label="Visit us on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-brand-card border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-green hover:border-brand-green transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-brand-card border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-green hover:border-brand-green transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; 2024 Lawn Love Newark. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <StickyCall />
    </div>
  );
};

export default App;