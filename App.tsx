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
  Zap,
  ArrowUp,
  Maximize2
} from 'lucide-react';
import { COMPANY_INFO, SERVICES, REVIEWS, NAV_LINKS } from './constants';
import { PageView } from './types';
import { Button } from './components/ui/Button';
import { Hero } from './components/sections/Hero';
import { ServiceCard } from './components/sections/ServiceCard';
import { StickyCall } from './components/StickyCall';
import { LeadForm } from './components/LeadForm';
import { ReviewsCarousel } from './components/sections/ReviewsCarousel';
import { ChatAssistant } from './components/ChatAssistant';

const GALLERY_IMAGES = [
  {
    url: "https://shopvalorfarms.com/cdn/shop/files/Triple-Shredded-Black-Mulch1.webp?v=1742858656&width=990",
    title: "Mulch & Trim",
    desc: "Complete flower bed revitalization in Ironbound."
  },
  {
    url: "https://cdn.prod.website-files.com/672fd9c725c3b0b9c3b44d4f/673f64cadde7e780d6bef91d_electric%20shrub%20pruning.jpg",
    title: "Overgrown Cleanout",
    desc: "Restored a neglected backyard to pristine condition."
  },
  {
    url: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=800",
    title: "Lawn Mowing",
    desc: "Regular maintenance keeping the green lush."
  },
  {
    url: "https://www.nikuze.com/cleaning/images/services/gardening.jpg",
    title: "Garden Care",
    desc: "Professional weed management and planting."
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1661411416827-4276cb8329e5?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Turf Maintenance",
    desc: "Expert fertilization and aeration results."
  },
  {
    url: "https://proactivelandscaping.com/wp-content/uploads/fall-winter-cleanup-broken-arrow-01.jpg",
    title: "Fall Cleanup",
    desc: "Seasonal leaf removal and property tidying."
  }
];

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="w-8 h-8 bg-brand-green rounded flex items-center justify-center shrink-0">
      <Zap className="text-brand-black w-5 h-5 fill-current" />
    </div>
    <span className="text-xl font-bold tracking-tight text-white">Lawn Love</span>
  </div>
);

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="text-center mb-12 animate-fadeInUp">
    {subtitle && (
      <span className="text-brand-green font-bold tracking-wider uppercase text-sm mb-2 block">
        {subtitle}
      </span>
    )}
    <h2 className="text-3xl md:text-5xl font-bold text-white">{title}</h2>
    <div className="w-20 h-1 bg-brand-green mx-auto mt-4 rounded-full"></div>
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quotePrefill, setQuotePrefill] = useState<{name?: string, service?: string, address?: string} | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<typeof GALLERY_IMAGES[0] | null>(null);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, [currentPage]);

  const navigateTo = (page: PageView) => setCurrentPage(page);

  const handleGetQuote = (data?: {name?: string, service?: string, address?: string}) => {
    setQuotePrefill(data || null);
    navigateTo('estimate');
  };

  const renderContent = () => {
    const pageWrapperClass = "animate-fadeIn pt-24 pb-20";
    
    switch(currentPage) {
      case 'services':
        return (
          <div className={`${pageWrapperClass} container mx-auto px-4`}>
            <SectionTitle title="Expert Services" subtitle="What We Offer" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service, idx) => (
                <div key={service.id} className="animate-fadeInUp" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <ServiceCard 
                    service={service} 
                    onClick={() => handleGetQuote({ service: service.id })} 
                  />
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'about':
        return (
          <div className={`${pageWrapperClass} container mx-auto px-4`}>
            <div className="max-w-6xl mx-auto">
              <SectionTitle title="Our Story" subtitle="Local & Professional" />
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="relative group animate-fadeInUp">
                  <div className="absolute -inset-4 bg-brand-green/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img 
                    src="https://lawnlove.com/cdn-cgi/image/format=auto/https%3A%2F%2Fcdn.lawnlove.com%2Fassets%2Fblocks%2Fcrew-posing.jpg" 
                    alt="Lawn Love Team" 
                    className="relative w-full rounded-2xl shadow-2xl z-10" 
                  />
                </div>
                <div className="space-y-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                  <h3 className="text-3xl font-bold text-white">Serving Newark with Pride</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Lawn Love started with a simple goal: to make professional lawn care accessible and reliable for every Newark homeowner.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Fully Licensed and Insured Professionals",
                      "Locally Owned - We know New Jersey Soil",
                      "Modern Booking & 24/7 Support",
                      "Eco-Friendly Practices Available"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-white font-medium">
                        <CheckCircle className="text-brand-green w-5 h-5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button onClick={() => handleGetQuote()} className="mt-4">Get Started Today</Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className={`${pageWrapperClass} container mx-auto px-4`}>
            <SectionTitle title="Project Showcase" subtitle="Real Results" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GALLERY_IMAGES.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedGalleryImg(img)}
                  className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-brand-card cursor-pointer animate-fadeInUp"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <img 
                    src={img.url} 
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-brand-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-brand-green text-brand-black p-3 rounded-full scale-50 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className={`${pageWrapperClass} container mx-auto px-4`}>
            <SectionTitle title="What Neighbors Say" subtitle="5-Star Service" />
            <ReviewsCarousel reviews={REVIEWS} />
          </div>
        );

      case 'contact':
      case 'estimate':
        return (
          <div className={`${pageWrapperClass} container mx-auto px-4`}>
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
              <div className="animate-fadeInUp">
                 <LeadForm 
                   initialName={quotePrefill?.name}
                   initialAddress={quotePrefill?.address}
                   initialService={quotePrefill?.service}
                 />
              </div>
              <div className="space-y-12 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <div>
                  <h2 className="text-4xl font-bold text-white mb-6">Let's Talk Shop</h2>
                  <p className="text-gray-400 text-lg">Whether you need a one-time cleanout or weekly maintenance, we're here to help.</p>
                </div>
                
                <div className="grid gap-8">
                  <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-brand-green/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-green transition-colors">
                      <Phone className="w-6 h-6 text-brand-green group-hover:text-brand-black" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Call Us</p>
                      <p className="text-xl font-bold text-white group-hover:text-brand-green transition-colors">{COMPANY_INFO.phone}</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-brand-green/10 rounded-2xl flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-brand-green" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Service Area</p>
                      <p className="text-lg text-white">Newark, NJ & Essex County</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-white/5 h-80 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all shadow-2xl">
                   <iframe 
                    title="Map of Newark"
                    width="100%" height="100%" frameBorder="0" scrolling="no" 
                    src={`https://maps.google.com/maps?q=Newark%20NJ&t=&z=13&ie=UTF8&iwloc=&output=embed&style=feature:all|element:all|saturation:-100|lightness:10`}
                   ></iframe>
                </div>
              </div>
            </div>
          </div>
        );

      case 'home':
      default:
        return (
          <div className="animate-fadeIn">
            <Hero onGetQuote={handleGetQuote} onViewServices={() => navigateTo('services')} />
            
            <section className="py-20 container mx-auto px-4">
              <SectionTitle title="Top Rated Services" subtitle="Featured" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {SERVICES.slice(0, 3).map((service, i) => (
                  <div key={service.id} className="animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                    <ServiceCard service={service} onClick={() => handleGetQuote({ service: service.id })} />
                  </div>
                ))}
              </div>
              <div className="mt-16 text-center">
                <Button variant="outline" onClick={() => navigateTo('services')} className="px-10">See All 10+ Services</Button>
              </div>
            </section>

            <section className="bg-brand-card/30 py-24 border-y border-white/5">
              <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8 animate-fadeInUp">
                  <h2 className="text-4xl md:text-5xl font-bold text-white">Why Newark Loves Us</h2>
                  <div className="grid gap-6">
                    {[
                      { icon: Star, title: "Reliability", text: "We show up on your scheduled day, every time." },
                      { icon: Clock, title: "Speed", text: "Quotes in minutes, service often next-day." },
                      { icon: ShieldCheck, title: "Trust", text: "Vetted, background-checked local crews." }
                    ].map((feat, i) => (
                      <div key={i} className="flex gap-5">
                        <div className="w-12 h-12 bg-brand-green/20 rounded-xl flex items-center justify-center shrink-0">
                          <feat.icon className="w-6 h-6 text-brand-green" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg">{feat.title}</h4>
                          <p className="text-gray-400">{feat.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button onClick={() => handleGetQuote()} className="h-14 px-10">Get a Free Quote</Button>
                </div>
                <div className="relative animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                  <img 
                    src="https://lawnlove.com/cdn-cgi/image/format=auto/https%3A%2F%2Fcdn.lawnlove.com%2Fassets%2Fblocks%2Fcrew-smiles.jpg" 
                    className="rounded-3xl shadow-2xl relative z-10" 
                    alt="Happy Crew"
                  />
                  <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl -z-10"></div>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-black text-white font-sans selection:bg-brand-green/30">
      {/* Header */}
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${currentPage !== 'home' ? 'bg-brand-black/90 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <button onClick={() => navigateTo('home')} className="hover:opacity-80 transition-opacity">
             <Logo />
          </button>

          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(link => (
              <button 
                key={link.view}
                onClick={() => navigateTo(link.view)}
                className={`text-sm font-bold tracking-tight transition-all hover:text-brand-green ${currentPage === link.view ? 'text-brand-green' : 'text-gray-300'}`}
              >
                {link.label}
              </button>
            ))}
            <Button onClick={() => handleGetQuote()} className="h-11">Book Online</Button>
          </div>

          <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-20 left-0 right-0 bg-brand-card/95 backdrop-blur-xl border-b border-white/10 transition-all duration-500 origin-top overflow-hidden ${mobileMenuOpen ? 'max-h-screen opacity-100 py-6' : 'max-h-0 opacity-0 py-0'}`}>
          <div className="flex flex-col container mx-auto px-4">
            {NAV_LINKS.map((link) => (
              <button 
                key={link.view}
                onClick={() => navigateTo(link.view)}
                className={`text-left text-xl font-bold py-4 border-b border-white/5 ${currentPage === link.view ? 'text-brand-green' : 'text-gray-300'}`}
              >
                {link.label}
              </button>
            ))}
            <Button onClick={() => handleGetQuote()} fullWidth className="mt-8 py-5 text-lg">Free Estimate</Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark border-t border-white/5 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
            <div className="space-y-6">
              <Logo />
              <p className="text-gray-400 leading-relaxed">Top-rated local lawn care services. Trusted by 5,000+ Newark neighbors.</p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-brand-green hover:bg-brand-green/10 transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 text-lg tracking-tight">Navigation</h4>
              <ul className="space-y-3">
                {NAV_LINKS.map(l => (
                  <li key={l.view}>
                    <button onClick={() => navigateTo(l.view)} className="text-gray-400 hover:text-brand-green transition-colors">{l.label}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 text-lg tracking-tight">Top Services</h4>
              <ul className="space-y-3">
                {SERVICES.slice(0, 5).map(s => (
                  <li key={s.id}>
                    <button onClick={() => handleGetQuote({ service: s.id })} className="text-gray-400 hover:text-brand-green transition-colors">{s.title}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-white mb-6 text-lg tracking-tight">Business Hours</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex justify-between"><span>Mon - Fri</span> <span>8:00am - 6:00pm</span></p>
                <p className="flex justify-between"><span>Saturday</span> <span>9:00am - 2:00pm</span></p>
                <p className="flex justify-between"><span>Sunday</span> <span className="text-brand-green/60">Closed</span></p>
              </div>
              <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="block text-center bg-brand-green/5 border border-brand-green/20 p-4 rounded-xl text-brand-green font-bold hover:bg-brand-green hover:text-brand-black transition-all">
                {COMPANY_INFO.phone}
              </a>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Lawn Love Newark. Hand-crafted in Essex County.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed z-50 left-8 bottom-28 md:bottom-8 w-12 h-12 bg-brand-card border border-white/10 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* Gallery Lightbox */}
      {selectedGalleryImg && (
        <div 
          className="fixed inset-0 z-[100] bg-brand-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedGalleryImg(null)}
        >
          <button className="absolute top-8 right-8 text-white hover:text-brand-green">
            <X className="w-10 h-10" />
          </button>
          <div className="max-w-5xl w-full space-y-6" onClick={e => e.stopPropagation()}>
            <img src={selectedGalleryImg.url} alt={selectedGalleryImg.title} className="w-full rounded-2xl shadow-2xl border border-white/10" />
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-2">{selectedGalleryImg.title}</h3>
              <p className="text-gray-400 text-lg">{selectedGalleryImg.desc}</p>
            </div>
          </div>
        </div>
      )}

      <StickyCall />
      <ChatAssistant />
    </div>
  );
};

export default App;