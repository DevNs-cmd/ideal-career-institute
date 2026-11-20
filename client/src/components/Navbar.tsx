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
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-100'
          : 'bg-white py-4 border-b border-slate-100'
      }`}
    >
      {/* Top Banner / Announcement */}
      <div className="hidden lg:block bg-slate-900 text-white text-xs py-1.5 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" /> Excellence in Education Since 1999
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">New Delhi Campus: Madangir (Basement DDA Flats)</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>Admissions Open for School (1-12) & Competitive Batches</span>
            <span className="text-slate-500">•</span>
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
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-lg p-1 border border-slate-200 shadow-xs flex items-center justify-center">
              <img
                src="/assets/logo.png"
                alt="Ideal Career Institute Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-tight block font-display">
                IDEAL CAREER <span className="text-red-600">INSTITUTE</span>
              </span>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-widest block">
                Igniting Minds • Since 1999
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  activeSection === link.id
                    ? 'text-red-600 font-semibold bg-red-50/60'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
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
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
            >
              <Phone className="w-4 h-4 text-red-600" />
              <span>+91 7011667297</span>
            </a>

            {/* Admission Enquiry Primary CTA */}
            <button
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Student Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="tel:+917011667297"
              className="p-2 text-red-600 bg-red-50 rounded-lg"
              title="Call Institute"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-100 bg-white py-4 px-2 space-y-1 shadow-lg rounded-b-2xl animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  activeSection === link.id
                    ? 'text-red-600 font-semibold bg-red-50'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2 px-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs"
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
