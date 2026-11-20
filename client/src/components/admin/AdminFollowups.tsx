import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, Phone, MessageCircle } from 'lucide-react';
import { api, Lead } from '../../lib/api';
import { formatDate, formatIndianPhone } from '../../lib/utils';

export const AdminFollowups: React.FC = () => {
  const [leadsInFollowUp, setLeadsInFollowUp] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFollowUps = async () => {
    setIsLoading(true);
    try {
      const data = await api.getLeads({ status: 'Follow-up Required' });
      setLeadsInFollowUp(data.enquiries || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowUps();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-0.5">
            Counsellor Actions
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Student Follow-Up Pipeline
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track prospective students requiring callback, academic counselling, or batch scheduling.
          </p>
        </div>

        <div className="px-4 py-2 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 font-bold text-xs">
          {leadsInFollowUp.length} Pending Follow-Ups
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leadsInFollowUp.map((lead) => (
          <div
            key={lead.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {lead.enquiry_id}
                </span>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  Follow-up Needed
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{lead.student_name}</h3>
              <div className="text-xs text-slate-500 mt-0.5">
                Class: {lead.current_class || '—'} • Course: {lead.course_title || 'General'}
              </div>

              {lead.next_followup_date && (
                <div className="mt-3 p-2.5 bg-amber-50/70 border border-amber-100 rounded-xl text-xs flex items-center gap-2 text-amber-900 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Due: {formatDate(lead.next_followup_date)}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <a
                href={`tel:+91${lead.phone}`}
                className="flex-1 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-slate-800 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>

              <a
                href={`https://wa.me/91${lead.phone}?text=${encodeURIComponent(
                  `Hello ${lead.student_name}, this is from Ideal Career Institute following up on your admission enquiry.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-emerald-700 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        ))}

        {leadsInFollowUp.length === 0 && !isLoading && (
          <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-slate-200">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">All caught up!</h3>
            <p className="text-xs text-slate-500 mt-1">
              There are currently no pending follow-up leads in the queue.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
