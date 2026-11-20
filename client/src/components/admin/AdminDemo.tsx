import React, { useState } from 'react';
import { Presentation, Play, Trash2, CheckCircle2, ArrowRight, Sparkles, AlertCircle, Eye, Users } from 'lucide-react';
import { api } from '../../lib/api';

interface AdminDemoProps {
  onNavigateToLeads: () => void;
  onNavigateToOverview: () => void;
}

export const AdminDemo: React.FC<AdminDemoProps> = ({
  onNavigateToLeads,
  onNavigateToOverview
}) => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const demoSteps = [
    {
      step: '1',
      title: 'Student Opens Website',
      description: 'Prospective student visits https://idealcareerinstitute.in/, reviews institutional legacy since 1999, air-conditioned classroom photos, and 333+ verified toppers.'
    },
    {
      step: '2',
      title: 'Course Discovery & Selection',
      description: 'Student browses course programs (Class 1–12 School Boards, Commerce, Science, Humanities, JEE/NEET, CUET, Digital Marketing) and views syllabus highlights.'
    },
    {
      step: '3',
      title: 'Enquiry Submission',
      description: 'Student enters valid 10-digit mobile number, grade, interested course, and submits the validated admission form.'
    },
    {
      step: '4',
      title: 'System Records Unique ID & Notification',
      description: 'Database generates a unique reference ID (e.g. ICI-2026-XXXX), saves record securely, triggers an admin bell alert, and generates WhatsApp chat link.'
    },
    {
      step: '5',
      title: 'Lead Surfaces in Admin CRM',
      description: 'The enquiry appears in real time on the Centralized Lead Management table with status marked as "New".'
    },
    {
      step: '6',
      title: 'Counsellor Assignment',
      description: 'Administration assigns an academic advisor or senior counsellor to evaluate the student requirement.'
    },
    {
      step: '7',
      title: 'Contact & Status Lifecycle Update',
      description: 'Counsellor contacts the student, logs discussion notes, and advances status: Contacted → Interested → Counselling Scheduled.'
    },
    {
      step: '8',
      title: 'Follow-Up Scheduling',
      description: 'A formal calendar follow-up is scheduled for batch placement and parent campus consultation.'
    },
    {
      step: '9',
      title: 'Management Analytics & Conversion',
      description: 'Confirmed admissions feed into the executive dashboard, calculating conversion rates, course demand, and branch performance.'
    }
  ];

  const handleSeedDemo = async () => {
    setIsSeeding(true);
    setStatusMessage(null);
    try {
      const res = await api.seedDemoData();
      setStatusMessage(res.message);
    } catch (err: any) {
      alert('Failed to load demo data: ' + err.message);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleResetDemo = async () => {
    if (!confirm('Are you sure you want to remove all demonstration leads? Genuine leads will NOT be affected.')) return;
    setIsResetting(true);
    setStatusMessage(null);
    try {
      const res = await api.resetDemoData();
      setStatusMessage(res.message);
    } catch (err: any) {
      alert('Failed to reset demo data: ' + err.message);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 rounded-3xl shadow-xl border border-slate-700/80">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold tracking-wider uppercase mb-3 border border-red-500/30">
          <Sparkles className="w-3.5 h-3.5" /> Institutional Presentation Mode
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          9-Step Student Journey Demonstration
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Designed specifically for executive review meetings with Ideal Career Institute leadership. Seed a dedicated test dataset to experience the entire end-to-end lifecycle live.
        </p>

        <div className="pt-6 flex flex-wrap items-center gap-4">
          <button
            onClick={handleSeedDemo}
            disabled={isSeeding}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isSeeding ? 'Seeding Demo Dataset...' : '1-Click: Seed Demo Dataset'}</span>
          </button>

          <button
            onClick={handleResetDemo}
            disabled={isResetting}
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Reset Demo Records</span>
          </button>

          <button
            onClick={onNavigateToLeads}
            className="px-5 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Users className="w-4 h-4 text-red-600" />
            <span>Go to Leads CRM</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* 9-Step Visual Journey Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          The Verified 9-Step Institutional Workflow
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {demoSteps.map((s, idx) => (
            <div
              key={idx}
              className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 font-extrabold flex items-center justify-center text-xs mb-3">
                  {s.step}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Fully Implemented & Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
