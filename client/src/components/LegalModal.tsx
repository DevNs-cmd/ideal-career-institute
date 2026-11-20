import React from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="relative max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-slate-900 text-white p-6 relative flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' ? (
              <Shield className="w-5 h-5 text-red-500" />
            ) : (
              <FileText className="w-5 h-5 text-amber-500" />
            )}
            <h3 className="text-xl font-bold">
              {type === 'privacy' ? 'Privacy Policy & Student Data Protection' : 'Terms and Conditions'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-4 max-h-[70vh] overflow-y-auto text-sm text-slate-600 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p className="font-semibold text-slate-800">
                Last updated: January 2026 • Ideal Career Institute
              </p>
              <h4 className="text-base font-bold text-slate-900 pt-2">1. Information We Collect</h4>
              <p>
                When you submit an admission enquiry or contact form on our website, we collect your full name, contact phone number, email address, student grade/qualification, and course interests.
              </p>
              <h4 className="text-base font-bold text-slate-900 pt-2">2. Purpose of Data Use</h4>
              <p>
                The collected information is solely utilized by authorized academic counsellors of Ideal Career Institute to respond to your queries, provide course schedules and fee structures, and arrange campus visits. We do not sell, rent, or lease prospective student databases to third parties.
              </p>
              <h4 className="text-base font-bold text-slate-900 pt-2">3. Communications & WhatsApp Consent</h4>
              <p>
                By providing your contact details, you consent to receive direct educational updates, batch schedules, and counselling assistance via telephone, WhatsApp, or email from our admissions team.
              </p>
              <h4 className="text-base font-bold text-slate-900 pt-2">4. Data Security</h4>
              <p>
                We maintain appropriate administrative, physical, and technical safeguards to protect student enquiry data against unauthorized access, loss, or disclosure.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-slate-800">
                Last updated: January 2026 • Ideal Career Institute
              </p>
              <h4 className="text-base font-bold text-slate-900 pt-2">1. Institutional Representation</h4>
              <p>
                Ideal Career Institute operates from its verified campus at 23/663 Basement DDA Flats, Madangir, New Delhi – 110062. All courses, curriculum modules, and schedules are determined by the institutional academic board.
              </p>
              <h4 className="text-base font-bold text-slate-900 pt-2">2. Enrolment and Admissions</h4>
              <p>
                Submission of an enquiry form does not guarantee admission. Admissions are subject to seat availability, batch capacity, and formal enrolment procedures at the institute campus.
              </p>
              <h4 className="text-base font-bold text-slate-900 pt-2">3. Academic Performance & Results</h4>
              <p>
                While our expert faculty provides thorough coaching, comprehensive study materials, and rigorous testing, final academic and competitive examination results depend on consistent student attendance, homework completion, and individual dedication.
              </p>
            </>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
