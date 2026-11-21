import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Award,
  ChevronLeft,
  ChevronRight,
  Building2,
  Sparkles,
  Star,
  Users
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
      className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-28 bg-gradient-to-b from-slate-100/80 via-white to-slate-100/60 overflow-hidden w-full max-w-full"
    >
      {/* ========================================================================= */}
      {/* 1. BACKGROUND MOVING PHOTO WATERMARK REEL (High-Visibility Animated Canvas)*/}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden max-w-full w-full opacity-80 sm:opacity-85 z-0">
        {/* Row 1: Drifting Left */}
        <div className="absolute top-2 left-0 flex animate-marquee-left gap-4 sm:gap-6 -rotate-2 transform scale-105">
          {[...marqueePhotosRow1, ...marqueePhotosRow1].map((src, i) => (
            <div
              key={`row1-${i}`}
              className="w-60 sm:w-88 h-40 sm:h-52 rounded-2xl sm:rounded-3xl overflow-hidden flex-shrink-0 shadow-lg border-2 border-white/90 bg-slate-200"
            >
              <img
                src={src}
                alt="Ideal Career Institute Ambient Scene"
                className="w-full h-full object-cover contrast-105 saturate-110"
                loading="eager"
              />
            </div>
          ))}
        </div>

        {/* Row 2: Drifting Right */}
        <div className="absolute -bottom-4 left-0 flex animate-marquee-right gap-4 sm:gap-6 -rotate-2 transform scale-105">
          {[...marqueePhotosRow2, ...marqueePhotosRow2].map((src, i) => (
            <div
              key={`row2-${i}`}
              className="w-60 sm:w-88 h-40 sm:h-52 rounded-2xl sm:rounded-3xl overflow-hidden flex-shrink-0 shadow-lg border-2 border-white/90 bg-slate-200"
            >
              <img
                src={src}
                alt="Ideal Career Institute Ambient Scene"
                className="w-full h-full object-cover contrast-105 saturate-110"
                loading="eager"
              />
            </div>
          ))}
        </div>

        {/* Soft Ambient Blend Mask - Keeps moving photos clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100/35 via-transparent to-slate-100/50" />
      </div>

      {/* Decorative iOS Ambient Glow Spheres */}
      <div className="absolute top-1/6 right-4 sm:right-16 w-72 sm:w-[450px] h-72 sm:h-[450px] bg-rose-200/35 rounded-full blur-[80px] sm:blur-[110px] pointer-events-none" />
      <div className="absolute bottom-12 left-4 sm:left-10 w-64 sm:w-[400px] h-64 sm:h-[400px] bg-blue-200/35 rounded-full blur-[80px] sm:blur-[110px] pointer-events-none" />

      {/* ========================================================================= */}
      {/* 2. MAIN HERO CONTENT CONTAINER                                            */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Heading & Value Proposition in iOS Frosted Glass Panel */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left w-full ios-glass p-6 sm:p-8 md:p-10 rounded-[28px] sm:rounded-[36px] shadow-2xl border border-white/80 backdrop-blur-2xl relative z-10">
            
            {/* iOS Dynamic Island Status Capsule */}
            <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full ios-glass-dark text-white text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide shadow-lg border border-white/20 max-w-full">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-sm shadow-red-500 flex-shrink-0" />
              <span className="truncate">Excellence in Education</span>
              <span className="text-white/30 hidden xs:inline">•</span>
              <span className="font-cursive text-amber-300 text-sm sm:text-base font-bold hidden xs:inline">Since 1999</span>
            </div>

            {/* Editorial Main Heading - Sleek, Stylish, Professional (Not overly bold) */}
            <h1 className="font-outfit text-3xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[54px] font-semibold tracking-tight leading-[1.16] text-slate-900 break-words">
              Igniting Minds,<br className="hidden sm:block" />
              <span className="text-red-600 font-bold block sm:inline mt-1 sm:mt-0">
                Illuminating Futures.
              </span>
            </h1>

            {/* Authentic Institutional Supporting Text */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              At Ideal Career Institute, we believe in igniting young minds with knowledge and skills, illuminating the path to a bright future. With expert faculty and comprehensive courses, we empower students to excel in commerce, science, humanities, and all entrance exams.
            </p>

            {/* iOS Glassmorphism Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={onExploreCourses}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl font-bold text-white ios-glass-dark hover:bg-slate-900 shadow-xl border border-white/20 ios-glass-interactive cursor-pointer text-sm sm:text-base transition-transform hover:scale-[1.02]"
              >
                <span>Explore Our Courses</span>
                <BookOpen className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={() => onOpenEnquiry()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl font-bold text-slate-900 ios-glass-pill hover:bg-white shadow-md border border-white/90 ios-glass-interactive cursor-pointer text-sm sm:text-base transition-transform hover:scale-[1.02]"
              >
                <span>Enquire for Admission</span>
                <ArrowRight className="w-4 h-4 text-red-600" />
              </button>
            </div>

            {/* iOS Glass Feature Widgets (3 Frosted Cards) */}
            <div className="pt-4 sm:pt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 max-w-2xl mx-auto lg:mx-0 w-full">
              <div className="ios-glass-pill rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 border border-white/80 shadow-xs hover:shadow-md transition-all hover:scale-[1.01]">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-left min-w-0">
                  <span className="text-xs font-bold text-slate-900 block leading-tight truncate">Expert Faculty</span>
                  <span className="text-[10px] text-slate-500 font-medium truncate block">Class 1–12 & Entrances</span>
                </div>
              </div>

              <div className="ios-glass-pill rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 border border-white/80 shadow-xs hover:shadow-md transition-all hover:scale-[1.01]">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-left min-w-0">
                  <span className="text-xs font-bold text-slate-900 block leading-tight truncate">Fully Air-Conditioned</span>
                  <span className="text-[10px] text-slate-500 font-medium truncate block">Modern AV Setup</span>
                </div>
              </div>

              <div className="ios-glass-pill rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 border border-white/80 shadow-xs hover:shadow-md transition-all hover:scale-[1.01]">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-left min-w-0">
                  <span className="text-xs font-bold text-slate-900 block leading-tight truncate">Small Batch Focus</span>
                  <span className="text-[10px] text-slate-500 font-medium truncate block">Individual Attention</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Right Column: APPLE PRO / iOS FROSTED GLASS SHOWCASE                      */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 relative w-full">
            <div
              className="relative mx-auto max-w-md lg:max-w-none w-full"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Outer Apple Pro Glass Frame */}
              <div className="ios-glass-card p-2 sm:p-3.5 rounded-[26px] sm:rounded-[36px] shadow-xl sm:shadow-2xl relative w-full">
                
                {/* Inner Screen Bezel */}
                <div className="relative rounded-[20px] sm:rounded-[26px] overflow-hidden bg-slate-950 aspect-4/3 group shadow-inner border border-black/10">
                  
                  {/* Slides with Crossfade & Ken-Burns Zoom */}
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

                        {/* iOS Frosted Scrim Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-between p-4 sm:p-5">
                          
                          {/* Top iOS Capsule: Dynamic Island Status */}
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full ios-glass-dark text-white text-[11px] font-semibold border border-white/20 shadow-md">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                              <span>Campus Life</span>
                            </span>

                            <span className="text-[11px] font-mono font-bold text-white/90 ios-glass-dark px-2.5 py-0.5 rounded-full border border-white/15">
                              0{currentSlide + 1} / 0{heroSlides.length}
                            </span>
                          </div>

                          {/* Bottom iOS Frosted Glass Caption Strip */}
                          <div className="ios-glass-dark rounded-2xl p-3.5 sm:p-4 border border-white/15 shadow-xl space-y-1">
                            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                              {slide.badge}
                            </span>
                            <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                              {slide.title}
                            </h3>
                            <p className="text-[11px] text-slate-300 font-normal hidden sm:block">
                              {slide.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* iOS Frosted Arrow Controls (Visible on hover) */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full ios-glass-dark text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg border border-white/20"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full ios-glass-dark text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg border border-white/20"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* iOS Segmented Indicator Bar */}
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1 rounded-full ios-glass-dark border border-white/10">
                    {heroSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1 rounded-full transition-all cursor-pointer ${
                          idx === currentSlide
                            ? 'w-5 bg-amber-400 shadow-xs'
                            : 'w-1.5 bg-white/40 hover:bg-white'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                </div>
              </div>

              {/* Floating iOS Lock Screen Widget: 333+ Toppers (animate-float-slow) */}
              <div className="absolute top-2.5 right-2.5 sm:-top-5 sm:-right-5 lg:-top-7 lg:-right-7 ios-glass rounded-2xl sm:rounded-[24px] p-2 sm:p-4 shadow-xl sm:shadow-2xl border border-white/90 flex items-center gap-2 sm:gap-3.5 z-20 animate-float-slow max-w-[85%]">
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-500 via-rose-600 to-red-600 text-white flex items-center justify-center font-bold shadow-md shadow-red-500/25 flex-shrink-0">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-base sm:text-xl font-bold text-slate-900 leading-none tracking-tight font-outfit">333+</div>
                  <div className="text-[10px] sm:text-[11px] font-semibold text-slate-500 mt-0.5">Toppers Produced</div>
                </div>
              </div>

              {/* Floating iOS Photos Widget: Secondary Classroom Badge (animate-float-reverse) */}
              <div className="hidden sm:block absolute sm:-bottom-6 sm:-left-4 lg:-bottom-8 lg:-left-8 w-44 sm:w-56 ios-glass rounded-2xl sm:rounded-[24px] p-2 sm:p-2.5 shadow-xl sm:shadow-2xl border border-white/90 z-20 animate-float-reverse">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden aspect-video border border-slate-100 bg-slate-200">
                  <img
                    src="/assets/institute/CR -4.jpeg"
                    alt="Ideal Career Institute Batch Session"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-2 px-1 text-center">
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-900 block leading-tight truncate">Interactive Mentorship</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium truncate block">Madangir Campus</span>
                </div>
              </div>

              {/* Floating iOS Live Activity Pill: Verified Rating */}
              <div className="absolute -bottom-3 right-6 z-20 hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full ios-glass-pill shadow-lg border border-white/90 animate-float-slow">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-slate-800">4.9 / 5.0</span>
                <span className="text-[10px] text-slate-500 font-semibold">• 500+ Parents</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};