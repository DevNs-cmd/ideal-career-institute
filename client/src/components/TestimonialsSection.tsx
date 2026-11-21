import React, { useState } from 'react';
import { Quote, Star, MessageSquarePlus, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial } from '../lib/api';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onOpenEnquiry: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onOpenEnquiry
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold tracking-wider uppercase border border-red-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Authentic Parent & Student Voices
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            <span className="font-sans-modern font-black text-white">What Our Students' Parents </span>
            <span className="font-editorial font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300 pr-1">
              Say About Us!
            </span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-base text-slate-300 leading-relaxed font-light">
            Our students and their parents have seen remarkable improvements in academic performance and personal growth, thanks to our dedicated teaching staff and comprehensive curriculum.
          </p>
        </div>

        {testimonials && testimonials.length > 0 ? (
          /* Active Testimonials Carousel */
          <div className="max-w-4xl mx-auto relative">
            <div className="bg-slate-800/80 rounded-3xl p-8 sm:p-12 border border-slate-700 shadow-2xl relative">
              <Quote className="w-12 h-12 text-red-500/30 absolute top-6 right-6" />

              <div className="flex items-center gap-1 text-amber-400 mb-6">
                {[...Array(testimonials[currentIndex].rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <p className="text-lg sm:text-xl text-slate-100 font-light italic leading-relaxed mb-8">
                "{testimonials[currentIndex].quote}"
              </p>

              <div className="flex items-center justify-between border-t border-slate-700 pt-6">
                <div>
                  <h4 className="text-base font-bold text-white">
                    {testimonials[currentIndex].author_name}
                  </h4>
                  <span className="text-xs text-red-400 font-medium block">
                    {testimonials[currentIndex].author_relation}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Elegant Institutional Empty State as mandated by the prompt */
          <div className="max-w-3xl mx-auto bg-slate-800/60 rounded-3xl p-8 sm:p-12 border border-slate-700/80 text-center shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-red-600/20 text-red-400 flex items-center justify-center mx-auto mb-5">
              <MessageSquarePlus className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Verified Student & Parent Feedback
            </h3>
            <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed mb-6">
              In accordance with our strict institutional policy, we only showcase verified testimonials submitted directly by enrolled students and parents. Real feedback records can be reviewed and approved by management through the admin portal.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onOpenEnquiry}
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                Connect With Admission Desk
              </button>
              <a
                href="tel:+917011667297"
                className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-sm transition-colors"
              >
                Call +91 7011667297
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
