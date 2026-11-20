import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Award, Users, Sparkles, Building2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenEnquiry: (courseId?: number) => void;
  onExploreCourses: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenEnquiry,
  onExploreCourses
}) => {
  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Subtle Background Accent Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0f2b48_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Excellence in Education Since 1999</span>
              <span className="text-slate-400">•</span>
              <span className="text-amber-300">25+ Years Legacy</span>
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

          {/* Right Column: Authentic Classroom Image Grid Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Classroom Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-4/3">
                <img
                  src="/assets/institute/CR -1.jpeg"
                  alt="Ideal Career Institute Air-Conditioned Classroom"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-5">
                  <div className="text-white">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block">
                      Authentic Learning Environment
                    </span>
                    <h3 className="text-base sm:text-lg font-bold">
                      Fully Air-Conditioned Classrooms
                    </h3>
                  </div>
                </div>
              </div>

              {/* Secondary Floating Authentic Photo Badge */}
              <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-44 sm:w-52 rounded-xl overflow-hidden shadow-xl border-4 border-white hidden sm:block">
                <img
                  src="/assets/institute/CR -4.jpeg"
                  alt="Ideal Career Institute Batch Session"
                  className="w-full h-28 sm:h-32 object-cover"
                />
                <div className="bg-white p-2.5 text-center">
                  <span className="text-[11px] font-bold text-slate-800 block">Interactive Teaching</span>
                  <span className="text-[10px] text-slate-500">Madangir Campus</span>
                </div>
              </div>

              {/* Floating Verified Achievement Badge */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-slate-900 leading-none">333+</div>
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
