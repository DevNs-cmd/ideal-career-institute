import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenEnquiry: (courseId?: number) => void;
  onNavigateToSection: (sectionId: string) => void;
  activeSection: string;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEnquiry,
  onNavigateToSection,
  activeSection,
  onOpenAdmin
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About Us', id: 'about' },
    { label: 'Courses', id: 'courses' },
    { label: 'Our Results', id: 'results' },
    { label: 'Faculty', id: 'faculty' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contact' }
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateToSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'ios-glass py-2 shadow-sm'
          : 'bg-white/80 backdrop-blur-xl py-3 border-b border-white/60'
      }`}
    >
      {/* Top Banner / Announcement */}
      <div className="hidden lg:block bg-slate-900/95 backdrop-blur-md text-white text-xs py-1.5 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Excellence in Education Since 1999
            </span>
            <span className="text-white/20">|</span>
            <span className="text-slate-300">New Delhi Campus: Madangir (Basement DDA Flats)</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>Admissions Open for School (1-12) & Competitive Batches</span>
            <span className="text-white/20">•</span>
            <button
              onClick={onOpenAdmin}
              className="hover:text-amber-300 transition-colors cursor-pointer text-xs font-semibold underline decoration-slate-600"
            >
              Admin Portal
            </button>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Institute Name */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 sm:gap-3 text-left focus:outline-none group cursor-pointer min-w-0"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 ios-glass rounded-xl sm:rounded-2xl p-1 sm:p-1.5 border border-white/90 shadow-xs flex items-center justify-center">
              <img
                src="/assets/logo.png"
                alt="Ideal Career Institute Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="min-w-0">
              <span className="text-sm sm:text-lg md:text-xl font-black tracking-tight text-slate-900 leading-tight block truncate">
                IDEAL CAREER <span className="text-red-600">INSTITUTE</span>
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 tracking-wider block truncate">
                <span className="font-editorial italic font-semibold text-slate-600">Igniting Minds</span> • <span className="font-cursive text-red-600 font-bold text-xs sm:text-sm">Since 1999</span>
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1.5 p-1 rounded-full ios-glass border border-white/70 shadow-xs">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeSection === link.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Right CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* Call Now Button */}
            <a
              href="tel:+917011667297"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-800 ios-glass-pill hover:bg-white rounded-full transition-all border border-white/80 shadow-xs active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-red-600" />
              <span>+91 7011667297</span>
            </a>

            {/* Admission Enquiry Primary CTA */}
            <button
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-full shadow-md shadow-red-600/20 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <span>Student Enquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="tel:+917011667297"
              className="p-2 text-red-600 ios-glass rounded-full border border-white/80 shadow-xs"
              title="Call Institute"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-slate-700 ios-glass border border-white/80 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden ios-glass-card my-3 p-4 rounded-3xl border border-white/80 shadow-2xl animate-in slide-in-from-top-2 duration-200 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                  activeSection === link.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-white/80'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 border-t border-slate-200/60 flex flex-col gap-2 px-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl shadow-md shadow-red-600/20 active:scale-95"
              >
                <span>Enquire for Admission</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full text-center py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Go to Admin Portal
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};