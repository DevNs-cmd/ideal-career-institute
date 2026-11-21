import React from 'react';
import { X, CheckCircle, Clock, Users, GraduationCap, MessageCircle, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { Course } from '../lib/api';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onOpenEnquiry: (courseId?: number) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onOpenEnquiry
}) => {
  if (!course) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[min(620px,calc(100vw-1.5rem))] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col my-auto mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-5 py-5 sm:p-8 relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block mb-2">
            {course.category}
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white pr-10">
            {course.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            {course.short_description}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 space-y-5 overflow-y-auto flex-1">
          
          {/* Overview */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-red-600" /> Course Overview
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {course.full_description}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {course.duration && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                  <Clock className="w-4 h-4 text-blue-600" /> Duration
                </div>
                <div className="text-sm font-bold text-slate-900 mt-1">
                  {course.duration}
                </div>
              </div>
            )}

            {course.eligibility && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                  <GraduationCap className="w-4 h-4 text-emerald-600" /> Eligibility
                </div>
                <div className="text-sm font-bold text-slate-900 mt-1">
                  {course.eligibility}
                </div>
              </div>
            )}
          </div>

          {/* Target Audience */}
          {course.target_audience && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-600" /> Who Should Enrol
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {course.target_audience}
              </p>
            </div>
          )}

          {/* Key Highlights */}
          {course.highlights && course.highlights.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-red-600" /> What You Will Learn
              </h3>
              <div className="space-y-2">
                {course.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer CTAs */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 flex-shrink-0">
          <a
            href={`https://wa.me/917011667297?text=${encodeURIComponent(
              `Hello Ideal Career Institute, I am interested in your ${course.title} course. Please share admission details.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Enquire on WhatsApp</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenEnquiry(course.id);
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-sm transition-colors cursor-pointer"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
