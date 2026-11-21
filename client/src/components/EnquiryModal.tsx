import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { Course, Branch } from '../lib/api';
import { INITIAL_COURSES, INITIAL_BRANCHES } from '../lib/initialData';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  branches: Branch[];
  initialCourseId?: number;
  onSubmit: (payload: any) => Promise<any>;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  courses,
  branches,
  initialCourseId,
  onSubmit
}) => {
  if (!isOpen) return null;

  const effectiveCourses = (courses && courses.length > 0) ? courses : INITIAL_COURSES;
  const effectiveBranches = (branches && branches.length > 0) ? branches : INITIAL_BRANCHES;

  const [formData, setFormData] = useState({
    student_name: '',
    phone: '',
    email: '',
    current_class: 'Class 10',
    course_id: initialCourseId || effectiveCourses[0]?.id || 1,
    branch_id: effectiveBranches[0]?.id || 1,
    contact_method: 'phone',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await onSubmit({
        ...formData,
        course_id: Number(formData.course_id),
        branch_id: Number(formData.branch_id)
      });
      setSuccessResponse(res);
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission failed. Please check your inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSuccessResponse(null);
    setErrorMessage(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={resetAndClose}
    >
      <div
        className="relative w-full max-w-[min(540px,calc(100vw-1.5rem))] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] overflow-y-auto my-auto mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="bg-slate-900 text-white px-5 py-4 sm:p-6 relative sticky top-0 z-10">
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Admissions Open 2026–27
          </div>
          <h3 className="text-xl font-extrabold text-white leading-tight">
            Student Admission Enquiry
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Ideal Career Institute • Madangir, New Delhi
          </p>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {successResponse ? (
            <div className="text-center py-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900 mb-1">
                Enquiry Submitted!
              </h4>
              <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 rounded-md font-mono text-xs font-bold my-2 border border-emerald-200">
                ID: {successResponse.enquiry_id}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed my-4 max-w-sm mx-auto">
                {successResponse.message}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                {successResponse.whatsapp_link && (
                  <a
                    href={successResponse.whatsapp_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-sm transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open in WhatsApp</span>
                  </a>
                )}
                <button
                  onClick={resetAndClose}
                  className="px-6 py-3 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-sm font-bold transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Row 1: Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Student Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={formData.student_name}
                    onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 focus-within:ring-2 focus-within:ring-red-500 focus-within:bg-white">
                    <span className="flex items-center px-3 text-xs font-bold text-slate-500 bg-slate-100 border-r border-slate-200 select-none flex-shrink-0">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })
                      }
                      className="flex-1 min-w-0 px-3 py-2.5 bg-transparent text-base focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Class + Course */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Current Class <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.current_class}
                    onChange={(e) => setFormData({ ...formData, current_class: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Class 1–5">Class 1–5</option>
                    <option value="Class 6–8">Class 6–8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10 (Board)</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12 (Board)</option>
                    <option value="Graduate / College">Graduate / College</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Interested Course <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.course_id}
                    onChange={(e) => setFormData({ ...formData, course_id: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {effectiveCourses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Email + Contact Method */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Preferred Contact
                  </label>
                  <select
                    value={formData.contact_method}
                    onChange={(e) => setFormData({ ...formData, contact_method: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="phone">Direct Phone Call</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">Email</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Message / Queries (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Any particular batch timings or guidance needed..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />
              </div>

              <p className="text-[11px] text-slate-400 leading-snug">
                By submitting, you agree to be contacted by Ideal Career Institute for academic guidance.
              </p>

              {/* Buttons — stacked on mobile */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-1">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full sm:w-auto px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl text-sm font-semibold cursor-pointer text-center border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto py-2.5 px-6 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Enquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
