import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  PhoneCall,
  Clock,
  CheckCircle2,
  TrendingUp,
  Award,
  AlertTriangle,
  Download,
  Calendar,
  Filter,
  RefreshCw
} from 'lucide-react';
import { api, AnalyticsData } from '../../lib/api';

interface AdminDashboardProps {
  onNavigateToLeads: (statusFilter?: string) => void;
  onNavigateToDemo: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigateToLeads,
  onNavigateToDemo
}) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [includeDemo, setIncludeDemo] = useState(true);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const data = await api.getAnalytics(undefined, undefined, includeDemo);
      setAnalytics(data);
    } catch (err) {
      console.error('Failed to load analytics:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [includeDemo]);

  if (isLoading && !analytics) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Loading Real-Time CRM Analytics...
          </p>
        </div>
      </div>
    );
  }

  const s = analytics?.summary;

  return (
    <div className="space-y-8">
      
      {/* Top Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 block mb-0.5">
            Management Intelligence
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Institutional Admission Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time enquiry flow, counsellor pipeline, and student conversion metrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Demo toggle */}
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-2 rounded-xl cursor-pointer">
            <input
              type="checkbox"
              checked={includeDemo}
              onChange={(e) => setIncludeDemo(e.target.checked)}
              className="rounded text-red-600 focus:ring-red-500"
            />
            <span>Include Sample Demo Leads</span>
          </label>

          <button
            onClick={fetchAnalytics}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <a
            href="/api/enquiries/export/csv"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* Total Leads */}
        <div
          onClick={() => onNavigateToLeads()}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-400 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Leads</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{s?.totalLeads || 0}</div>
          <span className="text-[10px] text-slate-500 block mt-1">All Recorded Enquiries</span>
        </div>

        {/* New Leads */}
        <div
          onClick={() => onNavigateToLeads('New')}
          className="bg-white p-5 rounded-2xl border border-blue-200 bg-blue-50/20 shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">New</span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-blue-900">{s?.newLeads || 0}</div>
          <span className="text-[10px] text-blue-600 block mt-1">Awaiting Counsellor Contact</span>
        </div>

        {/* Contacted */}
        <div
          onClick={() => onNavigateToLeads('Contacted')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Contacted</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-purple-900">{s?.contactedLeads || 0}</div>
          <span className="text-[10px] text-slate-500 block mt-1">First Call Completed</span>
        </div>

        {/* Follow-up Pending */}
        <div
          onClick={() => onNavigateToLeads('Follow-up Required')}
          className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Follow-ups</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-900">{s?.followUpPending || 0}</div>
          <span className="text-[10px] text-amber-700 block mt-1">Pending Interaction</span>
        </div>

        {/* Confirmed Admissions */}
        <div
          onClick={() => onNavigateToLeads('Admission Confirmed')}
          className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Admissions</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-900">{s?.confirmedAdmissions || 0}</div>
          <span className="text-[10px] text-emerald-600 block mt-1">Enrolled & Confirmed</span>
        </div>

        {/* Conversion Rate */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Conversion</span>
            <div className="w-8 h-8 rounded-lg bg-white/10 text-amber-300 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">{s?.conversionRate || 0}%</div>
          <span className="text-[10px] text-slate-300 block mt-1">Admissions ÷ Enquiries</span>
        </div>

      </div>

      {/* Main Charts & Pipeline Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Status Pipeline Distribution */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Lead Status Pipeline
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Current distribution across all admission stages
              </p>
            </div>
          </div>

          <div className="space-y-3.5">
            {analytics?.statusDistribution && analytics.statusDistribution.length > 0 ? (
              analytics.statusDistribution.map((item) => {
                const total = s?.totalLeads || 1;
                const pct = Math.round((item.count / total) * 100);
                return (
                  <div key={item.status} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-700">{item.status}</span>
                      <span className="text-slate-500">
                        {item.count} leads ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          item.status === 'Admission Confirmed'
                            ? 'bg-emerald-500'
                            : item.status === 'New'
                            ? 'bg-blue-500'
                            : item.status === 'Follow-up Required'
                            ? 'bg-amber-500'
                            : item.status === 'Interested'
                            ? 'bg-purple-500'
                            : 'bg-slate-400'
                        }`}
                        style={{ width: `${Math.max(pct, 4)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">No status data available.</p>
            )}
          </div>
        </div>

        {/* Course-wise Enquiry Demand */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Course Demand Breakdown
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Which programs are generating the highest student interest
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {analytics?.courseDistribution && analytics.courseDistribution.length > 0 ? (
              analytics.courseDistribution.slice(0, 5).map((c, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                      {i + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{c.course_name}</span>
                  </div>
                  <span className="text-xs font-extrabold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                    {c.count} enquiries
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">No course enquiry data yet.</p>
            )}
          </div>
        </div>

      </div>

      {/* Demonstration Mode Callout Banner */}
      <div className="bg-gradient-to-r from-red-600 to-rose-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-300" /> Executive Management Walkthrough
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">
            Live Demonstration Mode for Institute Meeting
          </h3>
          <p className="text-xs sm:text-sm text-red-100 max-w-xl">
            Test the complete 9-step student journey from website enquiry submission to counsellor assignment, lead status changes, follow-up scheduling, and analytics tracking with dedicated sample data.
          </p>
        </div>

        <button
          onClick={onNavigateToDemo}
          className="px-6 py-3.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs sm:text-sm shadow-md transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap"
        >
          Launch 9-Step Demo Mode →
        </button>
      </div>

    </div>
  );
};
