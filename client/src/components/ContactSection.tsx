import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, MessageCircle, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { Branch, Course } from '../lib/api';
import { INITIAL_COURSES, INITIAL_BRANCHES } from '../lib/initialData';

interface ContactSectionProps {
  branches: Branch[];
  courses: Course[];
  onSubmitEnquiry: (payload: any) => Promise<any>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  branches,
  courses,
  onSubmitEnquiry
}) => {
  const effectiveBranches = (branches && branches.length > 0) ? branches : INITIAL_BRANCHES;
  const effectiveCourses = (courses && courses.length > 0) ? courses : INITIAL_COURSES;

  const [selectedBranchId, setSelectedBranchId] = useState<number>(effectiveBranches[0]?.id || 1);
  const activeBranch = effectiveBranches.find((b) => b.id === selectedBranchId) || effectiveBranches[0];

  const [formData, setFormData] = useState({
    student_name: '',
    phone: '',
    email: '',
    current_class: 'Class 10',
    course_id: effectiveCourses[0]?.id || 1,
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
      const res = await onSubmitEnquiry({
        ...formData,
        branch_id: selectedBranchId,
        course_id: Number(formData.course_id)
      });
      setSuccessResponse(res);
      setFormData({
        student_name: '',
        phone: '',
        email: '',
        current_class: 'Class 10',
        course_id: courses[0]?.id || 1,
        contact_method: 'phone',
        message: ''
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission failed. Please verify your details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 block mb-2">
            Admissions & Assistance
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Connect With Our <span className="text-red-600">Admission Desk</span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Visit our campus in Madangir, New Delhi or submit an online enquiry for quick assistance from our academic counsellors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Contact Cards & Campus Location */}
          <div className="lg:col-span-5 space-y-6">

            {/* Campus Branch Picker if multiple branches are verified */}
            {branches.length > 1 && (
              <div className="bg-white p-2 rounded-2xl border border-slate-200 flex gap-2">
                {branches.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBranchId(b.id)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${selectedBranchId === b.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                      }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            )}

            {/* Campus Address Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Campus Address
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeBranch?.address || '23/663 Basement DDA Flats, Madangir, New Delhi – 110062, India.'}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    activeBranch?.address || '23/663 Basement DDA Flats Madangir New Delhi 110062'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 mt-2"
                >
                  <span>Get Directions on Google Maps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Phone & Click-to-Call */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Telephone Assistance
                </h3>
                <a
                  href="tel:+917011667297"
                  className="text-lg font-extrabold text-slate-900 hover:text-red-600 transition-colors block"
                >
                  +91 7011667297
                </a>
                <span className="text-xs text-slate-500">Direct admission & batch guidance</span>
              </div>
            </div>

            {/* Timings */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Office Hours
                </h3>
                <p className="text-sm text-slate-700 font-semibold">
                  Monday–Saturday: 9:00 AM – 5:00 PM
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sunday: Closed (Available via online enquiry)
                </p>
              </div>
            </div>

            {/* WhatsApp Quick Link */}
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Instant WhatsApp Support</h4>
                  <p className="text-xs text-emerald-800">Chat directly with admission desk</p>
                </div>
              </div>
              <a
                href="https://wa.me/917011667297?text=Hello%20Ideal%20Career%20Institute%2C%20I%20would%20like%20to%20know%20about%20admission%20and%20courses."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                Chat Now
              </a>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs h-56 bg-slate-200">
              <iframe
                title="Ideal Career Institute Campus Location"
                src="https://maps.google.com/maps?q=23/663+Basement+DDA+Flats+Madangir+New+Delhi+110062&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>

          </div>

          {/* Right Column: Complete Student Admission Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xl" style={{}}>

            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 block mb-1">
                Direct Submission
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Student Admission Enquiry Form
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Fill out the form below. A dedicated admission counsellor will review your details and contact you shortly.
              </p>
            </div>

            {successResponse ? (
              <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  Enquiry Received Successfully!
                </h4>
                <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-md font-mono text-xs font-bold mb-4">
                  Enquiry ID: {successResponse.enquiry_id}
                </div>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-6">
                  {successResponse.message}
                </p>

                {successResponse.whatsapp_link && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={successResponse.whatsapp_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-xs transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Continue to WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setSuccessResponse(null)}
                      className="w-full sm:w-auto px-6 py-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-sm font-bold transition-colors cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Student Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.student_name}
                      onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Mobile Number (10 Digits) <span className="text-red-500">*</span>
                    </label>
                    <div className="flex border border-slate-200 rounded-xl overflow-hidden bg-slate-50 focus-within:ring-2 focus-within:ring-red-500">
                      <span className="px-3 py-2.5 text-sm font-bold text-slate-500 bg-slate-100 border-r border-slate-200 flex items-center flex-shrink-0">+91</span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="7011667297"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                        className="flex-1 min-w-0 px-3 py-2.5 bg-transparent text-base focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Current Class / Qualification <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.current_class}
                      onChange={(e) => setFormData({ ...formData, current_class: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="Class 1–5">Class 1–5 (Primary)</option>
                      <option value="Class 6–8">Class 6–8 (Middle)</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10 (Board)</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12 (Board)</option>
                      <option value="College / Graduate">College / Graduate</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Interested Course <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.course_id}
                      onChange={(e) => setFormData({ ...formData, course_id: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {effectiveCourses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Preferred Contact Method
                    </label>
                    <select
                      value={formData.contact_method}
                      onChange={(e) => setFormData({ ...formData, contact_method: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="phone">Phone Call</option>
                      <option value="whatsapp">WhatsApp Message</option>
                      <option value="email">Email</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Specific Query or Message (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about preferred batch timings or subjects..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="pt-2">
                  <p className="text-[11px] text-slate-400 leading-snug">
                    By submitting this form, you consent to being contacted by Ideal Career Institute representatives regarding admission and course details via phone, WhatsApp, or email.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  {isSubmitting ? (
                    <span>Registering Enquiry...</span>
                  ) : (
                    <>
                      <span>Submit Admission Enquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
