import React from 'react';
import { CheckCircle2, Award, BookOpen, Sparkles, Building, Target } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Institutional Heritage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Welcome to <span className="text-red-600">Ideal Career Institute</span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Photography Collage */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-md border-2 border-white aspect-4/3 bg-slate-200">
                  <img
                    src="/assets/institute/about-1.jpeg"
                    alt="Classroom Lecture at Ideal Career Institute"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md border-2 border-white aspect-1/1 bg-slate-200">
                  <img
                    src="/assets/institute/CR -4.jpeg"
                    alt="Students in batch session at Ideal Career Institute"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="pt-6 space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-md border-2 border-white aspect-1/1 bg-slate-200">
                  <img
                    src="/assets/institute/CR -1.jpeg"
                    alt="Air-conditioned classroom infrastructure"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-center">
                  <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block mb-1">
                    Modern Facilities
                  </span>
                  <div className="text-2xl font-extrabold mb-1">Two AC Branches</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Designed for focused learning with optimal climate control, acoustic clarity, and comfortable seating.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
              Dedicated to exceptional education, student mentorship, and proven academic growth.
            </h3>

            {/* Exact Institutional Description from Original Website */}
            <p className="text-base text-slate-600 leading-relaxed">
              At our institute, we are dedicated to providing exceptional education and support to our students. Our goal is to create a learning environment where students can thrive and reach their full potential.
            </p>

            <p className="text-base text-slate-600 leading-relaxed">
              We offer a wide range of courses designed to meet the needs of every student. Whether you are looking to improve your grades or prepare for a competitive exam, we have the resources and expertise to help you succeed.
            </p>

            {/* Key Pillars */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-start gap-3">
                <Target className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Personalized Guidance</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Faculty addresses individual doubts and conceptual gaps.</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-start gap-3">
                <Building className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Modern Infrastructure</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Fully air-conditioned classrooms in Madangir, New Delhi.</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Comprehensive Curriculum</h4>
                  <p className="text-xs text-slate-500 mt-0.5">From Class 1–12 School Boards to JEE, NEET & CUET.</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Verified Results</h4>
                  <p className="text-xs text-slate-500 mt-0.5">333+ documented toppers since establishment in 1999.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
