import React from 'react';
import { Phone, MapPin, Clock, ArrowUp } from 'lucide-react';
import { FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from './SocialIcons';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
  onOpenEnquiry: (courseId?: number) => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToSection,
  onOpenEnquiry,
  onOpenLegal,
  onOpenAdmin
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Institute Brand & Overview */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl p-1 border border-slate-700 flex items-center justify-center">
                <img
                  src="/assets/logo.png"
                  alt="Ideal Career Institute Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight leading-tight block">
                  IDEAL CAREER <span className="text-red-500">INSTITUTE</span>
                </span>
                <span className="text-xs text-slate-400 block tracking-wider">
                  <span className="font-editorial italic font-medium text-slate-300">Excellence in Education</span> • <span className="font-cursive text-amber-400 text-sm font-bold">Since 1999</span>
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pt-2">
              At Ideal Career Institute, we believe in igniting young minds with knowledge and skills, illuminating the path to a bright future. Empowering students across commerce, science, humanities, and competitive exams.
            </p>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://www.facebook.com/profile.php?id=100095219029967"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 flex items-center justify-center transition-colors text-xs"
                title="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/kirttigulhare?igsh=aXdxaGIzdDVwZmg3&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-pink-600 hover:text-white text-slate-300 flex items-center justify-center transition-colors text-xs"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/shreyash-srivastava-b46878278/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-700 hover:text-white text-slate-300 flex items-center justify-center transition-colors text-xs"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/Shreyash_sri03"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 flex items-center justify-center transition-colors text-xs"
                title="Twitter / X"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateToSection('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('courses')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('results')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Results / Toppers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('faculty')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Faculty & Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('gallery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Campus Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Course Programs */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Popular Programs
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateToSection('courses')}
                  className="hover:text-white transition-colors text-left"
                >
                  Class 1–12 All School Subjects
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('courses')}
                  className="hover:text-white transition-colors text-left"
                >
                  Class 11–12 Commerce, Science, Arts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('courses')}
                  className="hover:text-white transition-colors text-left"
                >
                  JEE (Main & Adv) / NEET Coaching
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('courses')}
                  className="hover:text-white transition-colors text-left"
                >
                  CUET Entrance Preparation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('courses')}
                  className="hover:text-white transition-colors text-left"
                >
                  Computer Science & Digital Marketing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('courses')}
                  className="hover:text-white transition-colors text-left"
                >
                  SSC, NDA, Banking & CTET
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Campus Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Campus Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>23/663 Basement DDA Flats, Madangir, New Delhi – 110062, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <a href="tel:+917011667297" className="text-slate-200 hover:text-white font-bold">
                  +91 7011667297
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Mon–Sat: 9:00 AM – 5:00 PM</div>
                  <div className="text-[11px] text-slate-500">Sunday: Closed</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenEnquiry()}
                className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer text-center"
              >
                Book Admission Consultation
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Tech Partner */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-4 text-center md:text-left">
            <span>
              © {new Date().getFullYear()} Ideal Career Institute. All rights reserved.
            </span>
            <span>•</span>
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              onClick={onOpenAdmin}
              className="hover:text-amber-400 font-semibold transition-colors cursor-pointer"
            >
              Staff / Admin Login
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 flex items-center gap-1.5">
              <span>Technology Partner:</span>
              <strong className="text-slate-200 font-semibold">AlgoForce AI</strong>
            </span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
