import React, { useState, useEffect } from 'react';
import { Award, ChevronLeft, ChevronRight, X, ZoomIn, Sparkles } from 'lucide-react';
import { Topper } from '../lib/api';
import { INITIAL_TOPPERS } from '../lib/initialData';

interface ToppersSectionProps {
  toppers: Topper[];
}

export const ToppersSection: React.FC<ToppersSectionProps> = ({ toppers }) => {
  const [selectedTopperIndex, setSelectedTopperIndex] = useState<number | null>(null);

  const effectiveToppers = (toppers && toppers.length > 0) ? toppers : INITIAL_TOPPERS;

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedTopperIndex === null) return;
      if (e.key === 'Escape') setSelectedTopperIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedTopperIndex((prev) => (prev !== null ? (prev + 1) % effectiveToppers.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedTopperIndex((prev) => (prev !== null ? (prev - 1 + effectiveToppers.length) % effectiveToppers.length : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTopperIndex, effectiveToppers.length]);

  return (
    <section id="results" className="py-20 md:py-28 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Proven Student Success
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight font-outfit">
            Our Hall of <span className="text-red-600">Toppers</span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Celebrating the academic excellence, hard work, and achievements of our standout students guided by Ideal Career Institute faculty.
          </p>
        </div>

        {/* Toppers Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {effectiveToppers.map((topper, idx) => (
            <div
              key={topper.id || idx}
              onClick={() => setSelectedTopperIndex(idx)}
              className="group relative bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-2xl hover:border-amber-300/80 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden flex flex-col"
            >
              {/* Image Frame with Professional Background */}
              <div className="relative w-full aspect-square bg-gradient-to-b from-slate-100 to-slate-200/70 p-4 flex items-center justify-center overflow-hidden">
                <img
                  src={topper.image_url}
                  alt={topper.student_name}
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback avatar icon
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                
                {/* Overlay Zoom Icon on hover */}
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-md">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                {/* Achievement Badge with Shimmer Sweep */}
                <div className="absolute top-2.5 right-2.5 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1 animate-shimmer">
                  <Award className="w-3 h-3 text-amber-100" />
                  <span>Topper</span>
                </div>
              </div>

              {/* Details */}
              <div className="p-3.5 text-center flex-1 flex flex-col justify-center bg-white border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
                  {topper.student_name}
                </h3>
                <span className="text-[11px] font-semibold text-slate-500 block mt-0.5 line-clamp-1">
                  {topper.exam_or_class}
                </span>
                <span className="text-[10px] text-red-600 font-bold block mt-0.5">
                  {topper.score_or_rank}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All & Modal Note */}
        <div className="text-center mt-12">
          <p className="text-xs text-slate-500">
            * Displaying authentic alumni and topper records from Ideal Career Institute. Click on any student profile to view expanded portrait.
          </p>
        </div>

      </div>

      {/* Accessible Lightbox Modal */}
      {selectedTopperIndex !== null && effectiveToppers[selectedTopperIndex] && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedTopperIndex(null)}
        >
          <div
            className="relative w-full max-w-[min(560px,calc(100vw-1.5rem))] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedTopperIndex(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() =>
                setSelectedTopperIndex((prev) => (prev !== null ? (prev - 1 + effectiveToppers.length) % effectiveToppers.length : 0))
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-lg flex items-center justify-center transition-all cursor-pointer"
              aria-label="Previous Topper"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() =>
                setSelectedTopperIndex((prev) => (prev !== null ? (prev + 1) % effectiveToppers.length : 0))
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-lg flex items-center justify-center transition-all cursor-pointer"
              aria-label="Next Topper"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Image */}
            <div className="w-full aspect-4/3 bg-gradient-to-b from-slate-100 to-slate-200 p-8 flex items-center justify-center">
              <img
                src={effectiveToppers[selectedTopperIndex].image_url}
                alt={effectiveToppers[selectedTopperIndex].student_name}
                className="max-h-full max-w-full object-contain filter drop-shadow-xl"
              />
            </div>

            {/* Modal Details */}
            <div className="p-6 bg-white text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold mb-2">
                <Award className="w-3.5 h-3.5" /> Ideal Career Institute Achiever
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                {effectiveToppers[selectedTopperIndex].student_name}
              </h3>
              <p className="text-sm font-semibold text-slate-600 mt-1">
                {effectiveToppers[selectedTopperIndex].exam_or_class}
              </p>
              <div className="mt-2 text-xs font-bold text-red-600 uppercase tracking-wider">
                {effectiveToppers[selectedTopperIndex].score_or_rank} • {effectiveToppers[selectedTopperIndex].year}
              </div>
              <div className="mt-4 text-xs text-slate-400">
                {selectedTopperIndex + 1} of {effectiveToppers.length} Toppers • Use Left / Right arrows to navigate
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
