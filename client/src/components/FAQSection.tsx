import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Which courses are available at Ideal Career Institute?',
      a: 'We offer courses across three key categories: 1) School Education (Classes 1–12 All Subjects, Class 11–12 Commerce, Science, and Humanities); 2) Skill Development (Computer Science & Digital Marketing); and 3) Competitive Entrance Exams (JEE, NEET, CUET, SSC, NDA, Banking, CTET, RPF, CDS, CAT, and MAT).'
    },
    {
      q: 'Where is the institute located and how many branches exist?',
      a: 'Our verified main campus is located at 23/663 Basement DDA Flats, Madangir, New Delhi – 110062, India. The institute features two branches equipped with fully air-conditioned classrooms.'
    },
    {
      q: 'What are the office timings for admission counselling?',
      a: 'Our campus is open Monday to Saturday from 9:00 AM to 5:00 PM. We are closed on Sundays for walk-ins, though online enquiries submitted via our website or WhatsApp are received and attended to promptly.'
    },
    {
      q: 'How can I enquire about admission and fee structures?',
      a: 'You can submit the online Student Enquiry Form on this website, call our direct helpline at +91 7011667297, or initiate an instant WhatsApp chat. An admission counsellor will assist you with batch timings, syllabus details, and enrolment procedures.'
    },
    {
      q: 'Are the classrooms air-conditioned and how large are the batches?',
      a: 'Yes, both branches feature fully air-conditioned, well-lit modern classrooms. We maintain disciplined, controlled batch sizes to ensure each student receives individualized conceptual attention and doubt-clearing support.'
    },
    {
      q: 'Who is the founder of Ideal Career Institute?',
      a: 'The institute was founded in 1999 by Mr. Vibhor Gupta (CEO & Founder). Starting in a modest single-room setup teaching students on the floor, his vision, dedication, and innovative pedagogy have transformed the institute into a premier educational center with 333+ documented toppers.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-red-600" /> Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Got Questions? We Have Answers.
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-red-200 bg-red-50/20 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-base font-bold text-slate-900 leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-red-600 text-white rotate-180' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-red-100/60 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
