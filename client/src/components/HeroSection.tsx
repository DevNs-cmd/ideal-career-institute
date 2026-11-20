import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Award,
  ChevronLeft,
  ChevronRight,
  Building2,
  Sparkles
} from 'lucide-react';

interface HeroSectionProps {
  onOpenEnquiry: (courseId?: number) => void;
  onExploreCourses: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenEnquiry,
  onExploreCourses
}) => {
  // Cinematic Slideshow State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const heroSlides = [
    {
      src: '/assets/institute/CR -1.jpeg',
      badge: 'Modern Infrastructure',
      title: 'Fully Air-Conditioned Classrooms',
      subtitle: 'Smart Audio-Visual Setup & Ergonomic Seating'
    },
    {
      src: '/assets/institute/CR -4.jpeg',
      badge: 'Interactive Mentorship',
      title: 'Focused Small Batch Sessions',
      subtitle: 'Daily Doubt Resolution & Individual Guidance'
    },
    {
      src: '/assets/institute/Classroom 1  (1).jpeg',
      badge: 'Academic Discipline',
      title: 'Dedicated Study & Practice Hall',
      subtitle: 'Structured Test Series & Regular Evaluations'
    },
    {
      src: '/assets/institute/Classroom 1  (2).jpeg',
      badge: 'Legacy of Trust',
      title: 'Excellence in Education Since 1999',
      subtitle: 'Over 25 Years of Consistent Board & Entrance Toppers'
    }
  ];

  // Auto-advance slideshow
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Background Photo Marquee Data (Authentic Classroom Photographs)
  const marqueePhotosRow1 = [
    '/assets/institute/CR -1.jpeg',
    '/assets/institute/about-1.jpeg',
    '/assets/institute/CR -4.jpeg',
    '/assets/institute/Classroom 1  (1).jpeg',
    '/assets/institute/Classroom 1  (2).jpeg'
  ];

  const marqueePhotosRow2 = [
    '/assets/institute/Classroom 1  (2).jpeg',
    '/assets/institute/CR -4.jpeg',
    '/assets/institute/about-1.jpeg',
    '/assets/institute/CR -1.jpeg',
    '/assets/institute/Classroom 1  (1).jpeg'
  ];

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden"
    >
      {/* ========================================================================= */}
      {/* 1. PROFESSIONAL BACKGROUND MOVING PHOTO REEL (Subtle Ambient Motion)     */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.14] sm:opacity-[0.16]">
        {/* Row 1: Drifting Left */}
        <div className="absolute top-8 left-0 flex animate-marquee-left gap-6 -rotate-2 transform scale-105">
          {[...marqueePhotosRow1, ...marqueePhotosRow1].map((src, i) => (
            <div
              key={`row1-${i}`}
              className="w-56 sm:w-72 h-36 sm:h-44 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-slate-300/40 bg-slate-200"
            >
              <img
                src={src}
                alt="Ideal Career Institute Ambient Scene"
                className="w-full h-full object-cover filter grayscale contrast-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Row 2: Drifting Right */}
        <div className="absolute -bottom-6 left-0 flex animate-marquee-right gap-6 -rotate-2 transform scale-105">
          {[...marqueePhotosRow2, ...marqueePhotosRow2].map((src, i) => (
            <div
              key={`row2-${i}`}
              className="w-56 sm:w-72 h-36 sm:h-44 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-slate-300/40 bg-slate-200"
            >
              <img
                src={src}
                alt="Ideal Career Institute Ambient Scene"
                className="w-full h-full object-cover filter grayscale contrast-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Ambient Gradient Masks to guarantee 100% text contrast & readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/92 to-slate-50/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50" />
      </div>

      {/* Decorative Subtle Glowing Orbs */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-red-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Background Accent Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0f2b48_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* ========================================================================= */}
      {/* 2. MAIN HERO CONTENT CONTAINER                                            */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Excellence in Education Since 1999</span>
              <span className="text-slate-400">•</span>
              <span className="text-amber-300 font-bold">25+ Years Legacy</span>
            </div>

            {/* Editorial Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Igniting Minds, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-700">
                Illuminating Futures.
              </span>
            </h1>

            {/* Authentic Institutional Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              At Ideal Career Institute, we believe in igniting young minds with knowledge and skills, illuminating the path to a bright future. With expert faculty and comprehensive courses, we empower students to excel in commerce, science, humanities, and all entrance exams.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onExploreCourses}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer text-base"
              >
                <span>Explore Our Courses</span>
                <BookOpen className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={() => onOpenEnquiry()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-slate-900 bg-red-50 hover:bg-red-100/80 border border-red-200/80 shadow-xs hover:shadow transition-all transform hover:-translate-y-0.5 cursor-pointer text-base"
              >
                <span>Enquire for Admission</span>
                <ArrowRight className="w-4 h-4 text-red-600" />
              </button>
            </div>

            {/* Key Quick Highlights */}
            <div className="pt-6 border-t border-slate-200/70 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Expert Faculty</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
                <Building2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Fully Air-Conditioned</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 col-span-2 sm:col-span-1">
                <Award className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Small Batch Focus</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Right Column: CINEMATIC DYNAMIC CLASSROOM STAGE WITH KEN BURNS MOTION     */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 relative">
            <div
              className="relative mx-auto max-w-md lg:max-w-none"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Dynamic Slideshow Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-950 aspect-4/3 group">
                
                {/* Images Layer with Crossfade & Ken-Burns Zoom */}
                {heroSlides.map((slide, index) => {
                  const isActive = index === currentSlide;
                  return (
                    <div
                      key={slide.src}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    >
                      <img
                        src={slide.src}
                        alt={slide.title}
                        className={`w-full h-full object-cover transform duration-1000 ${
                          isActive ? 'scale-105' : 'scale-100'
                        }`}
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />

                      {/* Editorial Scrim Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent flex flex-col justify-between p-5 sm:p-6">
                        
                        {/* Top Pill in Card: Live Session Indicator */}
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold border border-white/10">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            <span>Campus Life</span>
                          </span>

                          <span className="text-[11px] font-medium text-slate-300/90 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                            {currentSlide + 1} / {heroSlides.length}
                          </span>
                        </div>

                        {/* Bottom Captions */}
                        <div className="text-white space-y-1">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 block">
                            {slide.badge}
                          </span>
                          <h3 className="text-base sm:text-lg font-extrabold leading-snug">
                            {slide.title}
                          </h3>
                          <p className="text-xs text-slate-300 font-normal hidden sm:block">
                            {slide.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Left/Right Arrow Controls (Visible on hover) */}
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm cursor-pointer shadow-md"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm cursor-pointer shadow-md"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Progress Indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === currentSlide
                          ? 'w-6 bg-amber-400'
                          : 'w-1.5 bg-white/50 hover:bg-white'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Secondary Floating Authentic Photo Badge with Gentle Float Animation */}
              <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-44 sm:w-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden sm:block z-20 animate-float-reverse bg-white">
                <img
                  src="/assets/institute/CR -4.jpeg"
                  alt="Ideal Career Institute Batch Session"
                  className="w-full h-28 sm:h-32 object-cover"
                />
                <div className="bg-white p-2.5 text-center border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-800 block">Interactive Teaching</span>
                  <span className="text-[10px] text-slate-500 font-medium">Madangir Campus</span>
                </div>
              </div>

              {/* Floating Verified Achievement Badge with Gentle Float Animation */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-slate-100 flex items-center gap-3 z-20 animate-float-slow">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold shadow-xs">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-black text-slate-900 leading-none">333+</div>
                  <div className="text-[11px] font-semibold text-slate-500">Toppers Produced</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};