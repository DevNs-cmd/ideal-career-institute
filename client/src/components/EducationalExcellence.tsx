import React from 'react';
import { UserCheck, Sparkles, CheckCircle2, Play, BookOpen, Layers } from 'lucide-react';

export const EducationalExcellence: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-semibold tracking-wider uppercase border border-red-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Pedagogy & Methodology
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight font-outfit">
              Excellence in Education for a <span className="text-red-500">Bright Future</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              At our institute, we believe in nurturing young minds with the best educational practices, providing a comprehensive and holistic learning experience that empowers students to achieve their academic goals and beyond.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              
              {/* Experienced Faculty */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs hover:border-red-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center mb-4">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Experienced Faculty</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Our faculty bring years of teaching experience and subject matter expertise, offering personalized guidance and continuous support to each student.
                </p>
              </div>

              {/* Advanced Teaching */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs hover:border-blue-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Advanced Teaching</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We utilize advanced teaching methodologies and structured classroom pedagogy to ensure that our students receive clear conceptual understanding and exam mastery.
                </p>
              </div>

            </div>

            {/* Teaching Pillars */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Small Batch Mentorship</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>NCERT & Reference Decoding</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Weekly Progress Tracking</span>
              </div>
            </div>

          </div>

          {/* Right Column: Classroom Snapshot & Video Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700 bg-slate-800">
              <img
                src="/assets/institute/Classroom 1  (1).jpeg"
                alt="Ideal Career Institute Classroom Teaching"
                className="w-full h-80 object-cover opacity-90 hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">
                  Classroom Experience
                </span>
                <h4 className="text-xl font-bold text-white mb-2">
                  Interactive Learning Environment
                </h4>
                <p className="text-xs text-slate-300">
                  Fully equipped with modern teaching aids, comfortable air-conditioned seating, and focused batch attention.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
